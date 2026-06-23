#!/usr/bin/env python3
"""
apply_seo_fixes.py -- Shopify SEO fixer
Applies SEO fixes from Output/seo/seo-fixes.json to hpdun.com

Usage:
  1. Copy .env.example to .env, fill in SHOPIFY_ACCESS_TOKEN
  2. python scripts/apply_seo_fixes.py         # Dry-run (no changes)
  3. python scripts/apply_seo_fixes.py --apply  # Apply changes
"""

import os
import sys
import json
import time
import argparse
import urllib.request
import urllib.error
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SEO_FIXES_PATH = PROJECT_ROOT / "Output" / "seo" / "seo-fixes.json"
ENV_PATH = PROJECT_ROOT / ".env"
API_VERSION = "2024-04"


def load_env():
    if not ENV_PATH.exists():
        print("[FAIL] .env not found. Copy from .env.example and fill in credentials.")
        sys.exit(1)
    with open(ENV_PATH, "r", encoding="utf-8-sig") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and value and key not in os.environ:
                os.environ[key] = value


def get_credentials():
    store_url = os.environ.get("SHOPIFY_STORE_URL", "https://hpdun.com")
    access_token = os.environ.get("SHOPIFY_ACCESS_TOKEN", "")
    if not access_token:
        print("[FAIL] SHOPIFY_ACCESS_TOKEN not set. Add it to .env file.")
        print("       Get it from: Shopify Admin > Settings > Apps > Develop apps")
        sys.exit(1)
    return store_url.rstrip("/"), access_token


def shopify_request(method, endpoint, data=None, dry_run=True):
    store_url, access_token = get_credentials()
    url = f"{store_url}/admin/api/{API_VERSION}/{endpoint}"
    headers = {
        "X-Shopify-Access-Token": access_token,
        "Content-Type": "application/json",
    }
    body_bytes = None
    if data is not None:
        body_bytes = json.dumps(data).encode("utf-8")

    if dry_run:
        print(f"  [DRY RUN] {method} {endpoint}")
        if body_bytes:
            snippet = json.dumps(data, indent=2)[:200]
            print(f"    Body: {snippet}")
        return {"dry_run": True}

    req = urllib.request.Request(url, data=body_bytes, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        error_body = e.read().decode("utf-8")
        print(f"  [FAIL] HTTP {e.code}: {error_body[:200]}")
        return None
    except Exception as e:
        print(f"  [FAIL] {e}")
        return None


def get_product_id_by_handle(handle, dry_run=True):
    resp = shopify_request("GET", f"products.json?handle={handle}&fields=id,title", dry_run=dry_run)
    if dry_run:
        return f"ID_FOR_{handle}"
    if resp and resp.get("products"):
        return resp["products"][0]["id"]
    return None


def get_collection_id_by_handle(handle, dry_run=True):
    resp = shopify_request("GET", f"custom_collections.json?handle={handle}&fields=id,title", dry_run=dry_run)
    if dry_run:
        return f"ID_FOR_{handle}"
    if resp and resp.get("custom_collections"):
        return resp["custom_collections"][0]["id"]
    resp2 = shopify_request("GET", f"smart_collections.json?handle={handle}&fields=id,title", dry_run=dry_run)
    if isinstance(resp2, dict) and resp2.get("smart_collections"):
        return resp2["smart_collections"][0]["id"]
    return None


def update_product_seo(product_id, title, meta_desc, dry_run=True):
    data = {
        "product": {
            "id": product_id,
            "metafields_global_title_tag": title,
            "metafields_global_description_tag": meta_desc,
        }
    }
    return shopify_request("PUT", f"products/{product_id}.json", data, dry_run=dry_run)


def update_collection_seo(collection_id, title, meta_desc, dry_run=True):
    data = {
        "custom_collection": {
            "id": collection_id,
            "metafields_global_title_tag": title,
            "metafields_global_description_tag": meta_desc,
        }
    }
    return shopify_request("PUT", f"custom_collections/{collection_id}.json", data, dry_run=dry_run)


def update_homepage_seo(title, meta_desc, dry_run=True):
    data = {
        "shop": {
            "metafields_global_title_tag": title,
            "metafields_global_description_tag": meta_desc,
        }
    }
    return shopify_request("PUT", "shop.json", data, dry_run=dry_run)


def main():
    parser = argparse.ArgumentParser(description="Shopify SEO fixer")
    parser.add_argument("--apply", action="store_true", help="Actually apply changes (default: dry-run only)")
    parser.add_argument("--products-only", action="store_true")
    parser.add_argument("--collections-only", action="store_true")
    parser.add_argument("--homepage-only", action="store_true")
    args = parser.parse_args()

    load_env()

    if not SEO_FIXES_PATH.exists():
        print(f"[FAIL] SEO data file not found: {SEO_FIXES_PATH}")
        sys.exit(1)

    with open(SEO_FIXES_PATH, "r", encoding="utf-8-sig") as f:
        seo_data = json.load(f)

    dry_run = not args.apply
    mode = "[DRY RUN] - No changes will be made" if dry_run else "[APPLY] - Changes will be applied!"
    print()
    print("=" * 60)
    print(f"  Shopify SEO Fixer -- {seo_data['store']} -- {mode}")
    print("=" * 60)
    print()

    changes = seo_data["changes"]
    success = 0
    failed = 0

    # 1. Homepage
    if not args.products_only and not args.collections_only:
        hp = changes.get("homepage", {})
        if hp:
            print("[Home] Homepage SEO")
            result = update_homepage_seo(hp["title"], hp["meta_description"], dry_run=dry_run)
            if result:
                print(f"  [OK] Homepage title + description updated")
                success += 1
            else:
                print(f"  [FAIL] Homepage update failed")
                failed += 1

    # 2. Collections
    if not args.products_only and not args.homepage_only:
        collections = changes.get("collections", {})
        if collections:
            print(f"\n[Collections] Collection SEO ({len(collections)} collections)")
            for handle, seo in collections.items():
                coll_id = get_collection_id_by_handle(handle, dry_run=dry_run)
                if not coll_id:
                    print(f"  [WARN] {handle}: collection not found, skipping")
                    failed += 1
                    continue
                result = update_collection_seo(coll_id, seo["title"], seo["meta_description"], dry_run=dry_run)
                if result:
                    print(f"  [OK] {handle}")
                    success += 1
                else:
                    print(f"  [FAIL] {handle}")
                    failed += 1
                time.sleep(0.5)

    # 3. Products
    if not args.collections_only and not args.homepage_only:
        products = changes.get("products", {})
        if products:
            print(f"\n[Products] Product SEO ({len(products)} products)")
            for handle, seo in products.items():
                product_id = get_product_id_by_handle(handle, dry_run=dry_run)
                if not product_id:
                    print(f"  [WARN] {handle}: product not found, skipping")
                    failed += 1
                    continue
                result = update_product_seo(product_id, seo["title"], seo["meta_description"], dry_run=dry_run)
                if result:
                    print(f"  [OK] {handle}")
                    success += 1
                else:
                    print(f"  [FAIL] {handle}")
                    failed += 1
                time.sleep(0.5)

    print()
    print("=" * 60)
    print(f"  Results: {success} succeeded, {failed} failed")
    if dry_run:
        print()
        print("  [TIP] This was a dry run. To apply changes:")
        print("       python scripts/apply_seo_fixes.py --apply")
    print("=" * 60)
    print()


if __name__ == "__main__":
    main()
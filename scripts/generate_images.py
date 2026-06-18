"""
Imagen Image Generator for Ecommerce Pipeline
Calls Google Vertex AI Imagen to generate 4-grid product images.

Usage:
    py scripts/generate_images.py --product "防静电工作服" --prompt "..."
    py scripts/generate_images.py --batch prompts.json

Prerequisites:
    pip install google-cloud-aiplatform
    gcloud auth application-default login
    Set env: GOOGLE_CLOUD_PROJECT=your-project-id
"""

import argparse
import json
import os
import sys
from pathlib import Path
from datetime import datetime

try:
    from vertexai.preview.vision_models import ImageGenerationModel
except ImportError:
    print("ERROR: google-cloud-aiplatform not installed.")
    print("Run: pip install google-cloud-aiplatform")
    sys.exit(1)

def generate_image(prompt, product_name, output_dir="Output"):
    """Generate a single product image via Imagen."""
    model = ImageGenerationModel.from_pretrained("imagegeneration@006")
    
    images = model.generate_images(
        prompt=prompt,
        number_of_images=1,
        aspect_ratio="463:278",
        negative_prompt="logo, button, pocket, watermark, text, label",
    )
    
    if images:
        safe_name = product_name.replace(" ", "_").replace("/", "-")
        path = Path(output_dir) / f"{safe_name}_四宫格.png"
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        images[0].save(str(path))
        print(f"SAVED: {path}")
        return str(path)
    else:
        print(f"FAILED: {product_name} — no images returned")
        return None

def batch_generate(prompts_file, output_dir="Output"):
    """Generate images for all prompts in a JSON file."""
    with open(prompts_file, "r", encoding="utf-8") as f:
        prompts_data = json.load(f)
    
    log = {"generated_at": datetime.now().isoformat(), "results": []}
    
    for item in prompts_data:
        name = item.get("product", "unknown")
        prompt = item.get("prompt", "")
        print(f"Generating: {name} ...")
        path = generate_image(prompt, name, output_dir)
        log["results"].append({
            "product": name,
            "output": path,
            "status": "success" if path else "failed"
        })
    
    log_path = Path(output_dir) / "_generation_log.json"
    with open(log_path, "w", encoding="utf-8") as f:
        json.dump(log, f, ensure_ascii=False, indent=2)
    
    success = sum(1 for r in log["results"] if r["status"] == "success")
    print(f"Done: {success}/{len(prompts_data)} images generated. Log: {log_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate product images via Vertex AI Imagen")
    parser.add_argument("--product", help="Product name for single generation")
    parser.add_argument("--prompt", help="Image prompt text for single generation")
    parser.add_argument("--batch", help="JSON file with batch prompts")
    parser.add_argument("--output", default="Output", help="Output directory (default: Output/)")
    args = parser.parse_args()
    
    if not os.getenv("GOOGLE_CLOUD_PROJECT"):
        print("ERROR: GOOGLE_CLOUD_PROJECT not set.")
        print("Run: set GOOGLE_CLOUD_PROJECT=your-project-id")
        sys.exit(1)
    
    if args.batch:
        batch_generate(args.batch, args.output)
    elif args.product and args.prompt:
        generate_image(args.prompt, args.product, args.output)
    else:
        parser.print_help()

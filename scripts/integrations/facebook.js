#!/usr/bin/env node
// Facebook Integration v0.6.2 — HPD Page
// Usage: node facebook.js --post "text" --link "url"
//        node facebook.js --post "text" --image "path/to/img.jpg"
//        node facebook.js --page-info
// Env:   FACEBOOK_PAGE_ID, FACEBOOK_ACCESS_TOKEN

const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
const ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;
const API_VERSION = 'v19.0';

if (!PAGE_ID || !ACCESS_TOKEN) {
  console.error('Missing FACEBOOK_PAGE_ID or FACEBOOK_ACCESS_TOKEN. Set in .env.');
  process.exit(1);
}

const BASE = https://graph.facebook.com/\/\;

async function request(method, path, params) {
  const url = new URL(\\);
  url.searchParams.set('access_token', ACCESS_TOKEN);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { method });
  const data = await res.json();
  if (!res.ok) throw new Error(Facebook API \: \);
  return data;
}

async function pageInfo() {
  const data = await request('GET', '', { fields: 'name,id,fan_count,followers_count,link' });
  console.log(Page: \ (\));
  console.log(Fans: \, Followers: \);
  console.log(URL: \);
  return data;
}

async function createFeedPost(message, link) {
  const params = { message };
  if (link) params.link = link;
  const data = await request('POST', 'feed', params);
  console.log(Post created: \);
  return data;
}

async function createPhotoPost(message, imageUrl) {
  const params = { message, url: imageUrl };
  const data = await request('POST', 'photos', params);
  console.log(Photo posted: \);
  return data;
}

async function publishContent(text, mediaUrl, linkUrl) {
  if (mediaUrl) return createPhotoPost(text, mediaUrl);
  return createFeedPost(text, linkUrl);
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--page-info')) return pageInfo();

  const textIdx = args.indexOf('--post');
  const text = textIdx >= 0 ? args[textIdx + 1] : null;
  const imgIdx = args.indexOf('--image');
  const img = imgIdx >= 0 ? args[imgIdx + 1] : null;
  const linkIdx = args.indexOf('--link');
  const link = linkIdx >= 0 ? args[linkIdx + 1] : null;

  if (text) return publishContent(text, img, link);

  // Read from stdin
  let input = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) { input += chunk; }
  if (input.trim()) {
    const { message, image_url, link_url } = JSON.parse(input);
    return publishContent(message, image_url, link_url);
  }
  console.log('Usage: node facebook.js --page-info | --post "text" [--image url] [--link url] | pipe JSON');
}

main().then(() => process.exit(0)).catch(e => { console.error(e.message); process.exit(1); });

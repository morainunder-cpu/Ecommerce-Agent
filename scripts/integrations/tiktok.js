#!/usr/bin/env node
// TikTok Integration v0.6.2 — @hpdun3
// Usage: node tiktok.js --info
//        node tiktok.js --post-caption "caption" --cover "url"
//        node tiktok.js --post-caption "caption" --video "path/to/video.mp4"
// Env:   TIKTOK_ACCESS_TOKEN

const ACCESS_TOKEN = process.env.TIKTOK_ACCESS_TOKEN;
const BASE = 'https://open.tiktokapis.com/v2';

if (!ACCESS_TOKEN) {
  console.error('Missing TIKTOK_ACCESS_TOKEN. Set in .env.');
  process.exit(1);
}

const HEADERS = {
  'Authorization': Bearer \,
  'Content-Type': 'application/json',
};

async function request(method, path, body) {
  const res = await fetch(\\, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(TikTok API \: \);
  return data;
}

async function getUserInfo() {
  const data = await request('GET', '/user/info/?fields=display_name,avatar_url,follower_count,likes_count');
  const u = data.data.user;
  console.log(User: \ (@hpdun3));
  console.log(Followers: \, Likes: \);
  return u;
}

async function postContent(caption, coverUrl) {
  // Phase 1: Init video upload
  const initBody = {
    post_info: {
      title: caption,
      privacy_level: 'PUBLIC_TO_EVERYONE',
      disable_duet: false,
      disable_comment: false,
      disable_stitch: false,
    },
  };
  const init = await request('POST', '/post/publish/info/init/', initBody);
  const publishId = init.data.publish_id;

  console.log(Publish initiated: \);
  console.log(Caption: \);
  console.log(Cover: \);
  console.log(Next: Upload video file via /post/publish/video/init/ then /post/publish/status/fetch/);
  return { publish_id: publishId, status: 'initialized' };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--info')) return getUserInfo();

  const capIdx = args.indexOf('--post-caption');
  const caption = capIdx >= 0 ? args[capIdx + 1] : null;
  const covIdx = args.indexOf('--cover');
  const cover = covIdx >= 0 ? args[covIdx + 1] : null;

  if (caption) return postContent(caption, cover);

  // Read from stdin
  let input = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) { input += chunk; }
  if (input.trim()) {
    const { caption, cover_url } = JSON.parse(input);
    return postContent(caption, cover_url);
  }
  console.log('Usage: node tiktok.js --info | --post-caption "text" [--cover url] | pipe JSON');
}

main().then(() => process.exit(0)).catch(e => { console.error(e.message); process.exit(1); });

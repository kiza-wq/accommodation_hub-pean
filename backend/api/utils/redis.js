import { redis } from "../index.js";

export async function getOrSet(key, ttl, loader) {
  const cached = await redis.get(key);
  if (cached) {
    console.log(`✅ [Cache Hit]  ${key}`);
    return JSON.parse(cached);
  }
  console.log(`❌ [Cache Miss] ${key}`);
  const fresh = await loader();
  if (fresh) await redis.setEx(key, ttl, JSON.stringify(fresh));
  return fresh;
}

export async function bust(key) {
  await redis.del(key);
  console.log(`🗑️ [Cache Bust] ${key}`);
}

export function listingKey(id) {
  return `listing:v1:${id}`;
}

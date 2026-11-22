/* Service worker: แคชหน้าเว็บ (stale-while-revalidate) — ไม่แตะคำขอ API ของ Apps Script */
const V="icwn-v1",SHELL=["./","./index.html","./styles.css","./app.js","./extras.js","./manifest.webmanifest","./icons/icon-192.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.method!=="GET"||new URL(r.url).origin!==location.origin)return;
  e.respondWith(caches.open(V).then(async c=>{
    const hit=await c.match(r),net=fetch(r).then(res=>{if(res.ok)c.put(r,res.clone());return res;}).catch(()=>hit);
    return hit||net;
  }));
});

if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + ".js", a).href),
    s[n] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, c) => {
    const i =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[i]) return;
    let r = {};
    const t = (e) => n(e, i),
      o = { module: { uri: i }, exports: r, require: t };
    s[i] = Promise.all(a.map((e) => o[e] || t(e))).then((e) => (c(...e), r));
  };
}
define(["./workbox-588899ac"], function (e) {
  "use strict";
  importScripts("fallback-K8c7tmVNwJ02ULaPB-ksV.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/K8c7tmVNwJ02ULaPB-ksV/_buildManifest.js",
          revision: "364fbe7cc648de168bf7cf12c1b5b398",
        },
        {
          url: "/_next/static/K8c7tmVNwJ02ULaPB-ksV/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/16-9505b8b91e5f3e2b.js",
          revision: "9505b8b91e5f3e2b",
        },
        {
          url: "/_next/static/chunks/196-e7e8aede00b5e469.js",
          revision: "e7e8aede00b5e469",
        },
        {
          url: "/_next/static/chunks/239.6232b3cdb1e34eeb.js",
          revision: "6232b3cdb1e34eeb",
        },
        {
          url: "/_next/static/chunks/275-2fd15983457facde.js",
          revision: "2fd15983457facde",
        },
        {
          url: "/_next/static/chunks/282-5e331820b649e6a8.js",
          revision: "5e331820b649e6a8",
        },
        {
          url: "/_next/static/chunks/386-4ba164e877b0bf13.js",
          revision: "4ba164e877b0bf13",
        },
        {
          url: "/_next/static/chunks/470-9a397dab45df97f0.js",
          revision: "9a397dab45df97f0",
        },
        {
          url: "/_next/static/chunks/515-870eba2760636b26.js",
          revision: "870eba2760636b26",
        },
        {
          url: "/_next/static/chunks/535-87d18a9d5d09afaf.js",
          revision: "87d18a9d5d09afaf",
        },
        {
          url: "/_next/static/chunks/580-6f772050f40370af.js",
          revision: "6f772050f40370af",
        },
        {
          url: "/_next/static/chunks/586-8f598965ee2f7583.js",
          revision: "8f598965ee2f7583",
        },
        {
          url: "/_next/static/chunks/650-900863a65ad04fae.js",
          revision: "900863a65ad04fae",
        },
        {
          url: "/_next/static/chunks/855-9dcee5c9e738e807.js",
          revision: "9dcee5c9e738e807",
        },
        {
          url: "/_next/static/chunks/framework-36098b990598bc0c.js",
          revision: "36098b990598bc0c",
        },
        {
          url: "/_next/static/chunks/main-3829f6fda1d366e0.js",
          revision: "3829f6fda1d366e0",
        },
        {
          url: "/_next/static/chunks/pages/404-bf091b4035b75e17.js",
          revision: "bf091b4035b75e17",
        },
        {
          url: "/_next/static/chunks/pages/_app-46ccb04f6d8ebe4f.js",
          revision: "46ccb04f6d8ebe4f",
        },
        {
          url: "/_next/static/chunks/pages/_error-409f831d3504c8f5.js",
          revision: "409f831d3504c8f5",
        },
        {
          url: "/_next/static/chunks/pages/_offline-2879b1d3c7e20ebd.js",
          revision: "2879b1d3c7e20ebd",
        },
        {
          url: "/_next/static/chunks/pages/admins-945f00a633aedc00.js",
          revision: "945f00a633aedc00",
        },
        {
          url: "/_next/static/chunks/pages/auth/sign-in-b99713b6d986348c.js",
          revision: "b99713b6d986348c",
        },
        {
          url: "/_next/static/chunks/pages/home-f66722c92153e036.js",
          revision: "f66722c92153e036",
        },
        {
          url: "/_next/static/chunks/pages/index-512ac5503eed58c0.js",
          revision: "512ac5503eed58c0",
        },
        {
          url: "/_next/static/chunks/pages/kassa-156ae080f30709b0.js",
          revision: "156ae080f30709b0",
        },
        {
          url: "/_next/static/chunks/pages/loan-9fbd4cb9b372b1c2.js",
          revision: "9fbd4cb9b372b1c2",
        },
        {
          url: "/_next/static/chunks/pages/orders-02b8dfc0a0390d2b.js",
          revision: "02b8dfc0a0390d2b",
        },
        {
          url: "/_next/static/chunks/pages/payments-814f4338097d01f3.js",
          revision: "814f4338097d01f3",
        },
        {
          url: "/_next/static/chunks/pages/products-4d2c1f642abd1abe.js",
          revision: "4d2c1f642abd1abe",
        },
        {
          url: "/_next/static/chunks/pages/settings-9a8cb98e28a1673b.js",
          revision: "9a8cb98e28a1673b",
        },
        {
          url: "/_next/static/chunks/pages/spend-a8f1791ba0378c35.js",
          revision: "a8f1791ba0378c35",
        },
        {
          url: "/_next/static/chunks/pages/users-33c0febba3d4947e.js",
          revision: "33c0febba3d4947e",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-07af42ae6dc0d706.js",
          revision: "07af42ae6dc0d706",
        },
        {
          url: "/_next/static/css/24c8839bdb306adc.css",
          revision: "24c8839bdb306adc",
        },
        { url: "/_offline", revision: "K8c7tmVNwJ02ULaPB-ksV" },
        {
          url: "/android-chrome-192x192.png",
          revision: "8990406bcc46bbf0345800efa81a3a51",
        },
        {
          url: "/android-chrome-512x512.png",
          revision: "a6466aca6f75d24714b7ab6eef518e30",
        },
        {
          url: "/apple-touch-icon.png",
          revision: "a7aaa95acd1f8a7e6eb05c4beba81699",
        },
        {
          url: "/favicon-16x16.png",
          revision: "3091c6ef6c112ba4fe11bdaf6fd8f5c5",
        },
        {
          url: "/favicon-32x32.png",
          revision: "44d99006ac28abb92eea505b321db188",
        },
        { url: "/favicon.ico", revision: "b035651a4a1370b5c6f07baabcb85086" },
        {
          url: "/icon-192x192.png",
          revision: "5d6b56416e2218f2c69134a20af79cb0",
        },
        {
          url: "/icon-256x256.png",
          revision: "f6e34852a86ccbf0c21220d7b53f617e",
        },
        {
          url: "/icon-384x384.png",
          revision: "cf6e649e016f764b2a0758dc351650fd",
        },
        {
          url: "/icon-512x512.png",
          revision: "f9505f448150e419c5163889cd2e8f8d",
        },
        { url: "/manifest.json", revision: "f5d3de805145a81484fa94999b7ce4c8" },
        {
          url: "/service-worker.js",
          revision: "09529a5e51142b0e06644be4912b1ea7",
        },
        { url: "/vercel.svg", revision: "4b4f1876502eb6721764637fe5c41702" },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    );
});

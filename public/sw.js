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
  importScripts("fallback-XmcHIHjmCOZx2zEch51LT.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/XmcHIHjmCOZx2zEch51LT/_buildManifest.js",
          revision: "5fcb97b964bf64b98aec560d025f7816",
        },
        {
          url: "/_next/static/XmcHIHjmCOZx2zEch51LT/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/196-d703d3fd03870ab8.js",
          revision: "d703d3fd03870ab8",
        },
        {
          url: "/_next/static/chunks/342.0516092e74da6e12.js",
          revision: "0516092e74da6e12",
        },
        {
          url: "/_next/static/chunks/344.f4381e4eb1814230.js",
          revision: "f4381e4eb1814230",
        },
        {
          url: "/_next/static/chunks/382.86163ec40a8927f8.js",
          revision: "86163ec40a8927f8",
        },
        {
          url: "/_next/static/chunks/403-bb939b2b4651b9d7.js",
          revision: "bb939b2b4651b9d7",
        },
        {
          url: "/_next/static/chunks/435-d7120d77cdea53e8.js",
          revision: "d7120d77cdea53e8",
        },
        {
          url: "/_next/static/chunks/571-78f1c6955ba1c8d1.js",
          revision: "78f1c6955ba1c8d1",
        },
        {
          url: "/_next/static/chunks/574-5c09cda27e19315e.js",
          revision: "5c09cda27e19315e",
        },
        {
          url: "/_next/static/chunks/602.7889d9cad09fb083.js",
          revision: "7889d9cad09fb083",
        },
        {
          url: "/_next/static/chunks/621-32601d2eaa3ad804.js",
          revision: "32601d2eaa3ad804",
        },
        {
          url: "/_next/static/chunks/656.210da391086e3764.js",
          revision: "210da391086e3764",
        },
        {
          url: "/_next/static/chunks/693-b0b0819b02576442.js",
          revision: "b0b0819b02576442",
        },
        {
          url: "/_next/static/chunks/709-1ecfd4c5aef2a6c8.js",
          revision: "1ecfd4c5aef2a6c8",
        },
        {
          url: "/_next/static/chunks/779-f6f5bfd2dbfb8e2b.js",
          revision: "f6f5bfd2dbfb8e2b",
        },
        {
          url: "/_next/static/chunks/832-12cb2a71b2fa5e9a.js",
          revision: "12cb2a71b2fa5e9a",
        },
        {
          url: "/_next/static/chunks/98.ede0122e52025faa.js",
          revision: "ede0122e52025faa",
        },
        {
          url: "/_next/static/chunks/982-323eaa2d51e05c67.js",
          revision: "323eaa2d51e05c67",
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
          url: "/_next/static/chunks/pages/_app-81547f90cdc46937.js",
          revision: "81547f90cdc46937",
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
          url: "/_next/static/chunks/pages/admins-f2ad06c4adc6247e.js",
          revision: "f2ad06c4adc6247e",
        },
        {
          url: "/_next/static/chunks/pages/auth/sign-in-045c6ae06379b9ab.js",
          revision: "045c6ae06379b9ab",
        },
        {
          url: "/_next/static/chunks/pages/home-10c8e4f4292a608f.js",
          revision: "10c8e4f4292a608f",
        },
        {
          url: "/_next/static/chunks/pages/index-43627899d5eeaa18.js",
          revision: "43627899d5eeaa18",
        },
        {
          url: "/_next/static/chunks/pages/orders-4c91c5fe6782b018.js",
          revision: "4c91c5fe6782b018",
        },
        {
          url: "/_next/static/chunks/pages/products-a4540972f0ce4fc8.js",
          revision: "a4540972f0ce4fc8",
        },
        {
          url: "/_next/static/chunks/pages/roles-35f9e162ad3be007.js",
          revision: "35f9e162ad3be007",
        },
        {
          url: "/_next/static/chunks/pages/settings-6afafb3932098ac0.js",
          revision: "6afafb3932098ac0",
        },
        {
          url: "/_next/static/chunks/pages/spend-bf5120f1cc476ec8.js",
          revision: "bf5120f1cc476ec8",
        },
        {
          url: "/_next/static/chunks/pages/users-905ee4b529f798d2.js",
          revision: "905ee4b529f798d2",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-229a5e9fcf0d759e.js",
          revision: "229a5e9fcf0d759e",
        },
        {
          url: "/_next/static/css/7853e3f04500abea.css",
          revision: "7853e3f04500abea",
        },
        { url: "/_offline", revision: "XmcHIHjmCOZx2zEch51LT" },
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
        { url: "/vercel.svg", revision: "26bf2d0adaf1028a4d4c6ee77005e819" },
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

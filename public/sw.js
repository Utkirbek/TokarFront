if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>n(e,i),o={module:{uri:i},exports:r,require:t};s[i]=Promise.all(a.map((e=>o[e]||t(e)))).then((e=>(c(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback-tOFepCHpc1B1K1zkACJBw.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/194-6d28ac34102c0e0a.js",revision:"6d28ac34102c0e0a"},{url:"/_next/static/chunks/196-e7e8aede00b5e469.js",revision:"e7e8aede00b5e469"},{url:"/_next/static/chunks/237-41646ad86c8e517b.js",revision:"41646ad86c8e517b"},{url:"/_next/static/chunks/239.3191c827f8661376.js",revision:"3191c827f8661376"},{url:"/_next/static/chunks/341-1676b5a74bfd6614.js",revision:"1676b5a74bfd6614"},{url:"/_next/static/chunks/650-900863a65ad04fae.js",revision:"900863a65ad04fae"},{url:"/_next/static/chunks/709-6b0423492395a3ad.js",revision:"6b0423492395a3ad"},{url:"/_next/static/chunks/721-55b49af176f87aa9.js",revision:"55b49af176f87aa9"},{url:"/_next/static/chunks/723-51cfa783056e39f5.js",revision:"51cfa783056e39f5"},{url:"/_next/static/chunks/913-1f7bde0220e561dc.js",revision:"1f7bde0220e561dc"},{url:"/_next/static/chunks/968-093a3cc42adcf3fb.js",revision:"093a3cc42adcf3fb"},{url:"/_next/static/chunks/framework-36098b990598bc0c.js",revision:"36098b990598bc0c"},{url:"/_next/static/chunks/main-3829f6fda1d366e0.js",revision:"3829f6fda1d366e0"},{url:"/_next/static/chunks/pages/404-96c6c557b50d566c.js",revision:"96c6c557b50d566c"},{url:"/_next/static/chunks/pages/_app-d473d115891c26b5.js",revision:"d473d115891c26b5"},{url:"/_next/static/chunks/pages/_error-409f831d3504c8f5.js",revision:"409f831d3504c8f5"},{url:"/_next/static/chunks/pages/_offline-2879b1d3c7e20ebd.js",revision:"2879b1d3c7e20ebd"},{url:"/_next/static/chunks/pages/admins-9aee8710bc2b84c4.js",revision:"9aee8710bc2b84c4"},{url:"/_next/static/chunks/pages/auth/sign-in-090edbe13e1f8031.js",revision:"090edbe13e1f8031"},{url:"/_next/static/chunks/pages/home-09165a3a8afe6a4c.js",revision:"09165a3a8afe6a4c"},{url:"/_next/static/chunks/pages/index-8b5e1c319e46cb3f.js",revision:"8b5e1c319e46cb3f"},{url:"/_next/static/chunks/pages/kassa-3369d47e2f6e460f.js",revision:"3369d47e2f6e460f"},{url:"/_next/static/chunks/pages/loan-d80798376ff0e87f.js",revision:"d80798376ff0e87f"},{url:"/_next/static/chunks/pages/orders-67a2d1fb885e6371.js",revision:"67a2d1fb885e6371"},{url:"/_next/static/chunks/pages/payments-2e30092f59ee508a.js",revision:"2e30092f59ee508a"},{url:"/_next/static/chunks/pages/products-9d7bc19e21f85f7b.js",revision:"9d7bc19e21f85f7b"},{url:"/_next/static/chunks/pages/roles-ccca9cf95b464715.js",revision:"ccca9cf95b464715"},{url:"/_next/static/chunks/pages/settings-a22c396d40063df4.js",revision:"a22c396d40063df4"},{url:"/_next/static/chunks/pages/spend-b8b1d4e7fc8bd990.js",revision:"b8b1d4e7fc8bd990"},{url:"/_next/static/chunks/pages/users-4f21cf63b7fa31ab.js",revision:"4f21cf63b7fa31ab"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-2afbff7492082033.js",revision:"2afbff7492082033"},{url:"/_next/static/css/d9297088453e05b5.css",revision:"d9297088453e05b5"},{url:"/_next/static/tOFepCHpc1B1K1zkACJBw/_buildManifest.js",revision:"91112afae8a16bed7f204f984f5ff1fc"},{url:"/_next/static/tOFepCHpc1B1K1zkACJBw/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_offline",revision:"tOFepCHpc1B1K1zkACJBw"},{url:"/android-chrome-192x192.png",revision:"8990406bcc46bbf0345800efa81a3a51"},{url:"/android-chrome-512x512.png",revision:"a6466aca6f75d24714b7ab6eef518e30"},{url:"/apple-touch-icon.png",revision:"a7aaa95acd1f8a7e6eb05c4beba81699"},{url:"/favicon-16x16.png",revision:"3091c6ef6c112ba4fe11bdaf6fd8f5c5"},{url:"/favicon-32x32.png",revision:"44d99006ac28abb92eea505b321db188"},{url:"/favicon.ico",revision:"b035651a4a1370b5c6f07baabcb85086"},{url:"/icon-192x192.png",revision:"5d6b56416e2218f2c69134a20af79cb0"},{url:"/icon-256x256.png",revision:"f6e34852a86ccbf0c21220d7b53f617e"},{url:"/icon-384x384.png",revision:"cf6e649e016f764b2a0758dc351650fd"},{url:"/icon-512x512.png",revision:"f9505f448150e419c5163889cd2e8f8d"},{url:"/manifest.json",revision:"f5d3de805145a81484fa94999b7ce4c8"},{url:"/service-worker.js",revision:"09529a5e51142b0e06644be4912b1ea7"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));

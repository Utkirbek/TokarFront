if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>n(e,i),f={module:{uri:i},exports:t,require:r};s[i]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback-c60LOf2VF8vDFJxf82kR4.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/c60LOf2VF8vDFJxf82kR4/_buildManifest.js",revision:"377e75bb694d5124fe22e8bca60f5e34"},{url:"/_next/static/c60LOf2VF8vDFJxf82kR4/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/196-f5146bcda66f1060.js",revision:"f5146bcda66f1060"},{url:"/_next/static/chunks/212-46a07a950d800c73.js",revision:"46a07a950d800c73"},{url:"/_next/static/chunks/214-513c2edc087bf383.js",revision:"513c2edc087bf383"},{url:"/_next/static/chunks/268-678f05d7979581fa.js",revision:"678f05d7979581fa"},{url:"/_next/static/chunks/290-c7f7d2d299f45535.js",revision:"c7f7d2d299f45535"},{url:"/_next/static/chunks/320-d1951c824ea1cc6c.js",revision:"d1951c824ea1cc6c"},{url:"/_next/static/chunks/510-69bfe84a8bb06d32.js",revision:"69bfe84a8bb06d32"},{url:"/_next/static/chunks/583-bd9f393c8949d238.js",revision:"bd9f393c8949d238"},{url:"/_next/static/chunks/621-b11aea521335bcbf.js",revision:"b11aea521335bcbf"},{url:"/_next/static/chunks/622-44ebd80e15d869ca.js",revision:"44ebd80e15d869ca"},{url:"/_next/static/chunks/665.5c12d439d3e50a10.js",revision:"5c12d439d3e50a10"},{url:"/_next/static/chunks/67-63023311e2243c87.js",revision:"63023311e2243c87"},{url:"/_next/static/chunks/745-8fd29d2114c6cd33.js",revision:"8fd29d2114c6cd33"},{url:"/_next/static/chunks/778-341ee67f3c9eff88.js",revision:"341ee67f3c9eff88"},{url:"/_next/static/chunks/813-2dac2a727e380460.js",revision:"2dac2a727e380460"},{url:"/_next/static/chunks/855-2969b386b0db1e64.js",revision:"2969b386b0db1e64"},{url:"/_next/static/chunks/868-0661b72e4b13675f.js",revision:"0661b72e4b13675f"},{url:"/_next/static/chunks/874-9aa734302715a94e.js",revision:"9aa734302715a94e"},{url:"/_next/static/chunks/904-28c6e4d2beae5879.js",revision:"28c6e4d2beae5879"},{url:"/_next/static/chunks/957-59e3302c66d4bd59.js",revision:"59e3302c66d4bd59"},{url:"/_next/static/chunks/framework-36098b990598bc0c.js",revision:"36098b990598bc0c"},{url:"/_next/static/chunks/main-3829f6fda1d366e0.js",revision:"3829f6fda1d366e0"},{url:"/_next/static/chunks/pages/404-c67e642a761afe7d.js",revision:"c67e642a761afe7d"},{url:"/_next/static/chunks/pages/_app-5607bc845a19ea9b.js",revision:"5607bc845a19ea9b"},{url:"/_next/static/chunks/pages/_error-afb0e02a017949b8.js",revision:"afb0e02a017949b8"},{url:"/_next/static/chunks/pages/_offline-43ddcaf9a70c3a22.js",revision:"43ddcaf9a70c3a22"},{url:"/_next/static/chunks/pages/admins-ce3fe0820a22f39a.js",revision:"ce3fe0820a22f39a"},{url:"/_next/static/chunks/pages/auth/sign-in-5655c9e4a30abdcf.js",revision:"5655c9e4a30abdcf"},{url:"/_next/static/chunks/pages/home-68fe6d0340a493bd.js",revision:"68fe6d0340a493bd"},{url:"/_next/static/chunks/pages/index-2df9bb510808cbfe.js",revision:"2df9bb510808cbfe"},{url:"/_next/static/chunks/pages/kassa-28d4fef72f44ee30.js",revision:"28d4fef72f44ee30"},{url:"/_next/static/chunks/pages/loan-b6d506ace68d9ec3.js",revision:"b6d506ace68d9ec3"},{url:"/_next/static/chunks/pages/newShop-51d96c596190f078.js",revision:"51d96c596190f078"},{url:"/_next/static/chunks/pages/orders-1f3b73f8299512b5.js",revision:"1f3b73f8299512b5"},{url:"/_next/static/chunks/pages/payments-56cbe04161b45e7d.js",revision:"56cbe04161b45e7d"},{url:"/_next/static/chunks/pages/products-7128c252c45968d8.js",revision:"7128c252c45968d8"},{url:"/_next/static/chunks/pages/profit-735cb64aaa0c3890.js",revision:"735cb64aaa0c3890"},{url:"/_next/static/chunks/pages/sales-9b3714f0b6d469c3.js",revision:"9b3714f0b6d469c3"},{url:"/_next/static/chunks/pages/settings-3c235fac45fae6eb.js",revision:"3c235fac45fae6eb"},{url:"/_next/static/chunks/pages/shopes-4f2164e28ff6efff.js",revision:"4f2164e28ff6efff"},{url:"/_next/static/chunks/pages/spend-bbb7310106efd215.js",revision:"bbb7310106efd215"},{url:"/_next/static/chunks/pages/users-935c30cc501e7260.js",revision:"935c30cc501e7260"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-934f61b33006991b.js",revision:"934f61b33006991b"},{url:"/_next/static/css/24c8839bdb306adc.css",revision:"24c8839bdb306adc"},{url:"/_offline",revision:"c60LOf2VF8vDFJxf82kR4"},{url:"/android-chrome-192x192.png",revision:"8990406bcc46bbf0345800efa81a3a51"},{url:"/android-chrome-512x512.png",revision:"a6466aca6f75d24714b7ab6eef518e30"},{url:"/apple-touch-icon.png",revision:"a7aaa95acd1f8a7e6eb05c4beba81699"},{url:"/favicon-16x16.png",revision:"3091c6ef6c112ba4fe11bdaf6fd8f5c5"},{url:"/favicon-32x32.png",revision:"44d99006ac28abb92eea505b321db188"},{url:"/favicon.ico",revision:"b035651a4a1370b5c6f07baabcb85086"},{url:"/icon-192x192.png",revision:"5d6b56416e2218f2c69134a20af79cb0"},{url:"/icon-256x256.png",revision:"f6e34852a86ccbf0c21220d7b53f617e"},{url:"/icon-384x384.png",revision:"cf6e649e016f764b2a0758dc351650fd"},{url:"/icon-512x512.png",revision:"f9505f448150e419c5163889cd2e8f8d"},{url:"/manifest.json",revision:"f5d3de805145a81484fa94999b7ce4c8"},{url:"/service-worker.js",revision:"09529a5e51142b0e06644be4912b1ea7"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));

if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let r={};const t=e=>n(e,i),d={module:{uri:i},exports:r,require:t};s[i]=Promise.all(a.map((e=>d[e]||t(e)))).then((e=>(c(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("fallback-cPSONvm7eoGEK2SPLYX06.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/cPSONvm7eoGEK2SPLYX06/_buildManifest.js",revision:"7684a414ec4ad5185749254953fc449d"},{url:"/_next/static/cPSONvm7eoGEK2SPLYX06/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/16.85164dee72733247.js",revision:"85164dee72733247"},{url:"/_next/static/chunks/196-d703d3fd03870ab8.js",revision:"d703d3fd03870ab8"},{url:"/_next/static/chunks/333-9a08df926dfa915b.js",revision:"9a08df926dfa915b"},{url:"/_next/static/chunks/342.3542b51df39cde68.js",revision:"3542b51df39cde68"},{url:"/_next/static/chunks/344.16a96ee29038c77b.js",revision:"16a96ee29038c77b"},{url:"/_next/static/chunks/382.49fac794734ab19d.js",revision:"49fac794734ab19d"},{url:"/_next/static/chunks/403-27366980b8c220d8.js",revision:"27366980b8c220d8"},{url:"/_next/static/chunks/571-78f1c6955ba1c8d1.js",revision:"78f1c6955ba1c8d1"},{url:"/_next/static/chunks/602.3fce4e64db417619.js",revision:"3fce4e64db417619"},{url:"/_next/static/chunks/621-32601d2eaa3ad804.js",revision:"32601d2eaa3ad804"},{url:"/_next/static/chunks/656.2dc5df2d763c4c22.js",revision:"2dc5df2d763c4c22"},{url:"/_next/static/chunks/693-b0b0819b02576442.js",revision:"b0b0819b02576442"},{url:"/_next/static/chunks/709-1ecfd4c5aef2a6c8.js",revision:"1ecfd4c5aef2a6c8"},{url:"/_next/static/chunks/724-8900e55e0713bb36.js",revision:"8900e55e0713bb36"},{url:"/_next/static/chunks/779-f6f5bfd2dbfb8e2b.js",revision:"f6f5bfd2dbfb8e2b"},{url:"/_next/static/chunks/832-12cb2a71b2fa5e9a.js",revision:"12cb2a71b2fa5e9a"},{url:"/_next/static/chunks/98.2b7eef2c3c1320b7.js",revision:"2b7eef2c3c1320b7"},{url:"/_next/static/chunks/982-323eaa2d51e05c67.js",revision:"323eaa2d51e05c67"},{url:"/_next/static/chunks/framework-36098b990598bc0c.js",revision:"36098b990598bc0c"},{url:"/_next/static/chunks/main-3829f6fda1d366e0.js",revision:"3829f6fda1d366e0"},{url:"/_next/static/chunks/pages/_app-05dda008a3ef3bcc.js",revision:"05dda008a3ef3bcc"},{url:"/_next/static/chunks/pages/_error-409f831d3504c8f5.js",revision:"409f831d3504c8f5"},{url:"/_next/static/chunks/pages/_offline-2879b1d3c7e20ebd.js",revision:"2879b1d3c7e20ebd"},{url:"/_next/static/chunks/pages/admins-e375527902c72d18.js",revision:"e375527902c72d18"},{url:"/_next/static/chunks/pages/auth/sign-in-045c6ae06379b9ab.js",revision:"045c6ae06379b9ab"},{url:"/_next/static/chunks/pages/home-ca2be9eeed86c5fc.js",revision:"ca2be9eeed86c5fc"},{url:"/_next/static/chunks/pages/index-43627899d5eeaa18.js",revision:"43627899d5eeaa18"},{url:"/_next/static/chunks/pages/orders-3b6e621fe7f89336.js",revision:"3b6e621fe7f89336"},{url:"/_next/static/chunks/pages/products-70d8ff852d8b1fc3.js",revision:"70d8ff852d8b1fc3"},{url:"/_next/static/chunks/pages/roles-1b7ad9a0d634ecd8.js",revision:"1b7ad9a0d634ecd8"},{url:"/_next/static/chunks/pages/settings-e738718d5b2b0882.js",revision:"e738718d5b2b0882"},{url:"/_next/static/chunks/pages/users-1ae3b950ed8a3366.js",revision:"1ae3b950ed8a3366"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-f197cc707ab64213.js",revision:"f197cc707ab64213"},{url:"/_next/static/css/7853e3f04500abea.css",revision:"7853e3f04500abea"},{url:"/_offline",revision:"cPSONvm7eoGEK2SPLYX06"},{url:"/android-chrome-192x192.png",revision:"8990406bcc46bbf0345800efa81a3a51"},{url:"/android-chrome-512x512.png",revision:"a6466aca6f75d24714b7ab6eef518e30"},{url:"/apple-touch-icon.png",revision:"a7aaa95acd1f8a7e6eb05c4beba81699"},{url:"/favicon-16x16.png",revision:"3091c6ef6c112ba4fe11bdaf6fd8f5c5"},{url:"/favicon-32x32.png",revision:"44d99006ac28abb92eea505b321db188"},{url:"/favicon.ico",revision:"b035651a4a1370b5c6f07baabcb85086"},{url:"/icon-192x192.png",revision:"5d6b56416e2218f2c69134a20af79cb0"},{url:"/icon-256x256.png",revision:"f6e34852a86ccbf0c21220d7b53f617e"},{url:"/icon-384x384.png",revision:"cf6e649e016f764b2a0758dc351650fd"},{url:"/icon-512x512.png",revision:"f9505f448150e419c5163889cd2e8f8d"},{url:"/manifest.json",revision:"f5d3de805145a81484fa94999b7ce4c8"},{url:"/service-worker.js",revision:"09529a5e51142b0e06644be4912b1ea7"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s},{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600}),{handlerDidError:async({request:e})=>self.fallback(e)}]}),"GET")}));

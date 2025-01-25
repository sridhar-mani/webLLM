/*
 * Entry point for Netlify Edge when building for production.
 */

import {
  createQwikCity,
  type PlatformNetlify,
} from "@builder.io/qwik-city/middleware/netlify-edge";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";
import render from "./entry.ssr";

declare global {
  interface QwikCityPlatform extends PlatformNetlify {}
}

// Register service worker (only in browser environment)
if (typeof window !== "undefined" && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/qwik-prefetch-service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

export default createQwikCity({ render, qwikCityPlan, manifest });

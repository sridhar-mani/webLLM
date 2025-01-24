/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.dev/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";
import { ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => {
    self.clients.claim();

    const handler = new ServiceWorkerMLCEngineHandler();
    console.log("Service Worker activated and MLC Engine initialized!");
  });
declare const self: ServiceWorkerGlobalScope;

import { component$, useStore, useTask$ } from "@builder.io/qwik";
import { MLCEngineInterface, CreateServiceWorkerMLCEngine, MLCEngineConfig } from "@mlc-ai/web-llm";

// Custom hook to handle model initialization with service worker
export const useModel = (selectedModel: string) => {
  const store = useStore({
    engineInitialized: false, // To track if engine is initialized
    progress: 0,
    engineData: null as any, // Store simple data related to the engine
  });

  useTask$(async ({ track }) => {
    track(() => selectedModel); // Track selectedModel for reactivity

    if ("serviceWorker" in navigator) {
      // Registering the service worker
      navigator.serviceWorker
        .register(new URL("service-worker.ts", import.meta.url), {
          type: "module",
        })
        .then(() => {
          console.log("Service Worker registered successfully");

          // Configuration for the MLC Engine with correct type
   

          // Initialize the engine with the provided configuration
          const newEngine = await CreateServiceWorkerMLCEngine(model);

          // Storing simplified data from the engine that is serializable
          store.engineData = {
            modelName: selectedModel,
            status: 'initialized',
          };

          store.engineInitialized = true; // Update the initialization status
        })
        .catch((error) => {
          console.error("Error registering service worker: ", error);
        });
    }
  });

  return store;
};

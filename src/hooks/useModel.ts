import { 
  MLCEngineInterface, 
  CreateServiceWorkerMLCEngine, 
  MLCEngineConfig 
} from "@mlc-ai/web-llm";
import { models } from "../data/models";

export const useModel = (selectedModelIndex: number): Promise<MLCEngineInterface> => {
  const selectedModel = models.model_list[selectedModelIndex];

  const appConfig = {
    model_list: [selectedModel],
    useIndexedDBCache: models.useIndexedDBCache,
  };

  const engineConfig: MLCEngineConfig = {
    appConfig,
    initProgressCallback: () => {},
  };

  if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller) {

      return CreateServiceWorkerMLCEngine(
        selectedModel.model_id,
        engineConfig,
        {},
        1000
      ) as Promise<MLCEngineInterface>;
    } else {
      console.warn("Service Worker controller not found, registering a new one.");

      return navigator.serviceWorker
        .register(new URL("service-worker.ts", import.meta.url), { type: "module" })
        .then(() => {
          return CreateServiceWorkerMLCEngine(
            selectedModel.model_id,
            engineConfig,
            {},
            1000
          ) as Promise<MLCEngineInterface>;
        })
        .catch((error) => {
          console.error("Error registering service worker:", error);
          throw new Error("Failed to register the service worker.");
        });
    }
  }

  throw new Error("Service Worker not supported or not available in this environment.");
};

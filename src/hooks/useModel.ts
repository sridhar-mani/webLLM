import { 
  MLCEngineInterface, 
  CreateServiceWorkerMLCEngine, 
  MLCEngineConfig 
} from "@mlc-ai/web-llm";
import { models } from "../data/models";
import { isBrowser } from "@builder.io/qwik";

export const useModel = (selectedModelIndex: number): Promise<MLCEngineInterface> => {
  if (!isBrowser) {
    console.warn("Model loading only in browser");
    return Promise.reject("Browser environment required");
  }

  const selectedModel = models.model_list[selectedModelIndex];

  const appConfig = {
    model_list: [selectedModel],
    useIndexedDBCache: models.useIndexedDBCache,
  };

  const engineConfig: MLCEngineConfig = {
    appConfig,
    initProgressCallback: () => {},
  };

  if (!window.navigator.serviceWorker) {
    console.warn("Service Worker not supported");
    return Promise.reject("Service Worker not available");
  }

  return CreateServiceWorkerMLCEngine(
    selectedModel.model_id,
    engineConfig,
    {},
    1000
  ) as Promise<MLCEngineInterface>;
};
import { 
  MLCEngineInterface, 
  CreateServiceWorkerMLCEngine, 
  MLCEngineConfig, 
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
    initProgressCallback: () => {}
  };

  if ("serviceWorker" in navigator) {
    return CreateServiceWorkerMLCEngine(
      selectedModel.model_id,
      engineConfig,
      {},
      1000
    ) as Promise<MLCEngineInterface>;
  }

  throw new Error("Service worker not supported");
};
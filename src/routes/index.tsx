import { component$, useSignal } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { NavBar } from "../components/ui/nav";
import { ChatInputBox } from "../components/ui/chatInput";
import { ChatBubbles } from "~/components/ui/chatBubbles";
import { useModel } from "~/hooks/useModel";
import { MLCEngineInterface } from "@mlc-ai/web-llm";

export default component$(() => {

  const selectedModelIndex = 0;
  const engine = useSignal<MLCEngineInterface | null>(null);

  useModel(selectedModelIndex)
    .then((engineInstance) => {
      engine.value = engineInstance;
      console.log("Model initialized successfully", engineInstance);
    })
    .catch((error) => {
      console.error("Error initializing model:", error);
    });

  return (
    <div class="relative p-0 m-0 w-screen h-screen">
      <NavBar />
      <div class="w-full flex justify-center">
        <ChatBubbles />
      </div>
      <ChatInputBox />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};

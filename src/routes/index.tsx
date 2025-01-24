import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {NavBar} from '../components/ui/nav'
import {ChatInputBox} from '../components/ui/chatInput'
import { ChatBubbles } from "~/components/ui/chatBubbles";
import { useModel } from "~/hooks/useModel";



export default component$(() => {

  const selectedModel = "Llama-3.2-1B-Instruct-q4f16_1-MLC"
  const {res} = useModel(0)

  return (
    <div class='relative p-0 m-0 w-screen h-screen'>
    <NavBar></NavBar>
    <div class='w-full flex justify-center'>
    <ChatBubbles></ChatBubbles>
    </div>
    <ChatInputBox></ChatInputBox>
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

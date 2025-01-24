import { component$, useSignal } from "@builder.io/qwik";

export const ChatInputBox = component$((searchFunc:any)=>{
    const prompt = useSignal("")

    console.log(prompt);

    return(
        <div class='w-full absolute bottom-0 left-0 h-1/6 flex justify-center items-center p-5'> 
        <textarea
        value={prompt.value}
        onInput$={(_,el)=> prompt.value=el.value}
  placeholder="Enter your prompt here"

  class="textarea w-2/3 textarea-bordered rounded-2xl textarea-xs font-sans h-full text-lg"  ></textarea>
  <button class="btn glass rounded-full textarea-xs w-1/12 h-full" onClick$={()=>searchFunc()} >Chat</button>
  </div>
    )
})
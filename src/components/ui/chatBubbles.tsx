export const ChatBubbles = ({userChats,AIresponce})=>{
    return (
        <div class='w-4/5'>
        <div class="chat chat-start">
  <div class="chat-bubble">
    It's over Anakin,
    <br />
    I have the high ground.
  </div>
  {
    userChats && userChats.map((u)=>{
        return(
            <div class="chat-bubble">
                {u}
  </div>
        )
    })
  }
</div>
<div class="chat chat-end">
  <div class="chat-bubble">You underestimate my power!</div>
  </div>
</div>
    )
}
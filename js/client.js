const socket= io('http://localhost:8000')

const form = document.getElementById('send-container')
const messageInput=document.getElementById('msgInp')
const messageContainer= document.querySelector(".container")
var audio = new Audio('js/ting.mp3');
const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('msg')
    messageElement.classList.add(position)
    messageElement.style.width="24%"
    messageElement.style.padding="10px"
    messageElement.style.margin="2px"
    messageElement.style.border="2px solid black"
    messageElement.style.borderRadius="10px"
    messageContainer.append(messageElement)
    if(position == 'left'){
        audio.play();
        messageElement.style.backgroundColor="red"
    }else{
        messageElement.style.backgroundColor="blue"

    }
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value=""
})
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'left')
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left')
})
socket.on('left',data=>{
    append(`${data.name}: Left the chat`,'left')
})
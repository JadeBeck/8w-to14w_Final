// socket.io 불러오기
"use strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        send()
        chatInput.value = " ";
    }
})

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click", send)

socket.on("chatting", (data) => {
    const {name, msg, time} = data;
    LiModel(name, msg, time);
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

socket.on("result", (data) => {
    console.log(data)
    if (data.length) {
        data.forEach(message => {
            LiModel(message.name, message.msg, message.time)
        });
    }
})

function LiModel(name, msg, time) {

    const li = document.createElement("li");
    li.classList.add(nickname.value === name ? "sent" : "received")  /*같으면?"sent" 다르면 "received"*/
    const dom = `<span class="profile">
    <span class="user">${name}</span>
    <img src="https://placeimg.com/50/50/any" alt="any">
  </span>
  <span class="message">${msg}</span>
  <span class="time">${time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li);

}
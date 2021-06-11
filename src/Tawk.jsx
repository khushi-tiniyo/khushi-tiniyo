import {Component } from 'react'

class Tawk extends Component{

    constructor({ position='bottom-right'}={}){
        super()
        this.position = this.getPosition(position);
        this.open = false;
        this.initialise();
        this.createStyles();
       
    }

    getPosition(position) {
        const [vertical, horizontal] = position.split('-');
        return {
            [vertical]: '30px',
            [horizontal]: '30px',
        };
    }
    
    initialise() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        Object.keys(this.position)
            .forEach(key => container.style[key] = this.position[key]);
        document.body.appendChild(container);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container','bcolor')


        const chatIcon = document.createElement('img');
        chatIcon.src = 'Wphone.png';
        chatIcon.classList.add('icon');
        this.chatIcon = chatIcon;

        const closeIcon = document.createElement('img');
        closeIcon.src = 'download.svg';
        closeIcon.classList.add('icon', 'hidden','bcolor');
        this.closeIcon = closeIcon;

        buttonContainer.appendChild(this.chatIcon);
        buttonContainer.appendChild(this.closeIcon);
        buttonContainer.addEventListener('click', this.toggleOpen.bind(this));

        this.messageContainer = document.createElement('div');
        this.messageContainer.classList.add('hidden', 'call-container');
        
        this.createMessageContainerContent();

        container.appendChild(this.messageContainer);
        container.appendChild(buttonContainer);
    }

    createMessageContainerContent() {
        this.messageContainer.innerHTML = '';
        const title = document.createElement('h2');
        title.textContent = `Please fill out the information below to get a call from us.`;

        const form = document.createElement('form');
        form.classList.add('content');
        const phone = document.createElement('input');
        phone.required = true;
        phone.id = 'phone';
        phone.type = 'number';
        phone.placeholder = 'Phone Number';


        const name = document.createElement('input');
        name.required = true;
        name.id = 'name';
        name.placeholder = 'Name';
       
        const btn = document.createElement('button');
        btn.textContent = 'CALL US';
        form.appendChild(phone);
        form.appendChild(name);
        form.appendChild(btn);
        form.addEventListener('submit', this.submit.bind(this));

        this.messageContainer.appendChild(title);
        this.messageContainer.appendChild(form);

    }

    createStyles() {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
        body{
            background-image: url("bgimg.png");
            background-repeat: no-repeat;
            background-size: cover;
        }

      
            .icon {
                cursor: pointer;
                width: 70%;
                position: absolute;
                top: 9px;
                left: 9px;
                transition: transform .3s ease;
            }
            .hidden {
                transform: scale(0);
            }
            .button-container {
          
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .call-container h2 {
                margin: 0;
                padding: 20px 20px;
                color: #fff;
                background-color:#0000CD;
                font-size:18px;
           
            }
            .call-container form button {
                cursor: pointer;
                color: #fff;
                border: 0;
                border-radius: 4px;
                padding: 10px;           
                font-size:15px;
                text-align: center;              
                background:#0000CD url(newog.svg) no-repeat 2px center ;
                
            }
            .bcolor
            {
                background-color:#0000CD;
            }
            .call-container {
                box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1), 0 0 32px 32px rgba(0, 0, 0, 0.08);
                width: 400px;
                right: -25px;
                bottom: 75px;
                max-height: 400px;
                position: absolute;
                transition: max-height .2s ease;
                font-family: Helvetica, Arial ,sans-serif;
                background-color: #fff;
                
                
            }
            

            .call-container.hidden {
                max-height: 0px;
            }
            
            .call-container .content {
                margin: 20px 10px ;
                border: 1px solid #dbdbdb;
                padding: 10px;
                display: flex;
                background-color: #fff;
                flex-direction: column;
                // border-right-style:5px solid black;
                border:3px solid #95B9C7;
               
            }
            .call-container form * {
                margin: 5px 0;          
            }
            
            .call-container form input {
                padding: 10px;
               
            }
           
            .call-container form text {
                height: 100px;
                padding: 10px;
              
            }
            .call-container form text::placeholder {
                font-family: Helvetica, Arial ,sans-serif;
            }
           
            .call-container form button:hover {
                background-color: #16632f;
            }
        `.replace(/^\s+|\n/gm, '');
        document.head.appendChild(styleTag);
    }

    toggleOpen() {
        this.open = !this.open;
        if (this.open) {
            this.chatIcon.classList.add('hidden');
            this.closeIcon.classList.remove('hidden');
            this.messageContainer.classList.remove('hidden');
        } else {
            this.createMessageContainerContent();
            this.chatIcon.classList.remove('hidden');
            this.closeIcon.classList.add('hidden');
            this.messageContainer.classList.add('hidden');
        }
    }

    submit(event) {
        event.preventDefault();

        var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic OFhCTFRUM1NXR0Y5N080OUdSWFA6WnNwYVJobVE2OWlaM1lPRkVWWGE5Qlh2U2FGVWhXaDJhbmplNlp4OA==");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"To":"918490084783","From":"913368110804","Record":"true","Play":"https://tiniyo.s3-ap-southeast-1.amazonaws.com/public/speech_20210116062637730.mp3"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.tiniyo.com/v1/Accounts/8XBLTT3SWGF97O49GRXP/Calls", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

  this.messageContainer.innerHTML = '<h2>Thanks for your submission.</h2><p class="content">Someone will be in touch with your shortly regarding your enquiry';
        
        };

    } 

export default Tawk
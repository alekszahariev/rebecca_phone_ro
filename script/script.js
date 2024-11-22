PhonePassword()
function PhonePassword(){
    let password = prompt("Parolă pentru telefon:", "");
    if(password === "18062006"){
                   
   
    }else{
        alert("Parolă greșită")
        PhonePassword()
    }
}

let app = document.querySelector(".app")
let app_close = document.querySelector(".app-footer a")
let app_body = document.querySelector(".app-body")
let isAppOpen = false;
app_close.addEventListener("click", function(){
if(isAppOpen){
    app.style.display="none";
    app_body.innerHTML="";
    isAppOpen = false
}
})

// UPDATE CURRENT TIME
function updateCurrentTime() {
    // Get the current time
    var now = new Date();

    // Format the time as HH:MM:SS
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');

    // Display the formatted time in the span
    document.getElementById('currentTime').innerHTML = hours + ':' + minutes;
}
// Update the current time every minute
setInterval(updateCurrentTime, 60000);
// Initial update
updateCurrentTime();



let icons = document.querySelectorAll(".icon")
icons.forEach(icon =>{
    icon.style.cursor = "pointer";
    let app_to_open = icon.getAttribute("data-app")
    icon.addEventListener("click", function(){
        app.style.display="flex"
        isAppOpen = true;
        
        if(app_to_open==="Photos"){
           PhotosApp()
        }

        if(app_to_open==="messenger"){
            MessengerApp()
        }

        if(app_to_open==="Notes"){
            NotesApp()
        }

        if(app_to_open==="voicememmos"){
            VoiceMemmosApp()
        }

        if(app_to_open==="safari"){
            SafariApp()
        }

        if(app_to_open==="SchoolApp"){
            SchoolApp()
        }

        if(app_to_open==="PhoneApp"){
            PhoneApp()
        }

        if(app_to_open==="game"){
            Game()
        }
    })
})

function PhotosApp(){
    app_body.innerHTML = `
    <div class="photos-app">
    </div>
    `

    var folder = "./assets/photos_app/";
    let photos_links = [];
// Add all images from the folder to the array above
$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if (val.match(/\.(jpe?g|png|gif|jfif)$/)) {
                photos_links.push({
                    link: val,
                    date: "Fotografie"
                });
            }
        });
        appendImages()
    }
});

function  appendImages(){
    let photos_app_body = document.querySelector(".photos-app");
            photos_links.forEach(photo => {   
            var img = document.createElement("img");
            img.src = "./assets/photos_app/"+photo.link;
            img.setAttribute("data-sub-html", photo.date);
        
        
           
            // Append the anchor element to the .photos-app container
            photos_app_body.appendChild(img);
        });

        Galeria()
}
function Galeria(){
    lightGallery(document.querySelector(".photos-app"), {
        speed: 500,
        subHtmlSelectorRelative: true,
        licenseKey: "3BB5B066-2587-4658-A964-5DCAC85A5179",
    });
}



}


function MessengerApp(){
    app_body.innerHTML = `
    <div class="messenger-app">
    <div class="messenger-nav">
        <i class="fa-solid fa-bars"></i>
        <span>Chats</span>
        <i class="fa-regular fa-pen-to-square"></i>
    </div>
    
    <div class="chats">


    </div>

    </div>
    `

let conversations = []


 let chatsDiv = document.querySelector(".chats")   
// GET ALL CHATS AND CONVERSATIONS
fetch('./script/messenger/conversations.json') 
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    conversations = data
    // Loop through the data and log the first name of each conversation
    data.forEach(conversation => {
     let name = conversation.name;
     let lastMsg = conversation.lastMessage
     let id = conversation.id 
     let profilePic = conversation.profilePicture  

     chatsDiv.innerHTML += 
     `
     <div class="person" data-id="${id}">
                            <img src="${profilePic}" alt="">
                            <div class="person-info-chat">
                                <span class="name">${name}</span>
                                <div class="msg-date">
                                    <span class="msg">${lastMsg}</span>
                                    
                        </div>
                    </div>
            </div>
     `


    });

    CheckChat()
  })
  .catch(error => console.error('Error loading JSON data:', error));

  function CheckChat(){
    let people = document.querySelectorAll(".person")
    people.forEach(chat =>{
        chat.addEventListener("click", function(){
            let id = chat.getAttribute("data-id")
            let name = chat.querySelector(".person-info-chat .name").innerHTML
            let profilePic = this.querySelector(".person img").src
      const conversation = conversations.find(conv => conv.id == id);
      if (conversation) {
        app_body.innerHTML=
        `
        <div class="messages">
                    <div class="messages-nav">
                        <div class="messages-nav-left">
                            <i class="fa-solid fa-arrow-left back"></i>
                            <img src="${profilePic}" alt="">
                            <span>${name}</span>
                        </div>
                        <div class="messages-nav-right">
                            <i class="fa-solid fa-phone"></i>
                            <i class="fa-solid fa-camera"></i>
                        </div>
                    </div>
                    
                    <div class="discussion">
	

                    </div>
                    

                </div>

        `
        let  gobackarrow = document.querySelector(".back")
        gobackarrow.addEventListener("click",  function(){
            MessengerApp()
        })

        let discussionDiv = document.querySelector(".discussion")
        conversation.conversation.forEach(message => {
            const bubble = document.createElement("div");
            bubble.setAttribute("data-timestamp", message.timestamp)
            if(message.type === "msg"){
                bubble.textContent = message.message;
                bubble.innerHTML+= `<span class="timestamp">${message.timestamp}</span>`
            }
            if(message.type === "audio"){
                let audio_link = message.message
                bubble.innerHTML = 
                `
                <audio controls>
                <source src="${audio_link}" type="audio/ogg">
                 <source src="${audio_link}" type="audio/mpeg">
                Your browser does not support the audio element.
                </audio>
                `
            }

            if(message.type === "img"){
                let imglink = message.message
                bubble.innerHTML = 
                `
                <img src="${imglink}" alt="">
                `
            }
            if (message.sender === "You") {
              bubble.classList.add("bubble", "recipient");
            } else {
              bubble.classList.add("bubble", "sender");
            }
            discussionDiv.appendChild(bubble);
        });
         // add timestamp in the message
         let chatbubbles = document.querySelectorAll(".bubble")
         chatbubbles.forEach(bubble =>{
             bubble.addEventListener("click", function(){
                 let timestamp = bubble.getAttribute("data-timestamp")
                 // check if there is timestamp in the html
                 const hasTimestamp = bubble.querySelector("span.timestamp") !== null;
                 if (!hasTimestamp) {
                    bubble.innerHTML += `<span class="timestamp">${timestamp}</span>`;
                  }else{
                    const existingTimestamp = bubble.querySelector("span.timestamp");
                    existingTimestamp.remove()
                  }
             })
         })
      } 
     })
    })


  }
}

function NotesApp(){
    app_body.innerHTML = `
    <div class="notes-app">

    </div>`
    let notes = []

    let notesApp = document.querySelector(".notes-app")
    fetch('./script/essentials/notes.json') 
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    notes = data

    data.forEach(note => {
    let id = note.id
    let date = note.date
    let title = note.title
    let content = note.content.substring(0, 34);

    notesApp.innerHTML += 
    `
    <div class="note" data-id="${id}">
        <span class="date">${date}</span>
        <span class="title">${title}</span>
        <p>${content} ...</p>
    </div>
    `

    });

    CheckNote()

  })
  .catch(error => console.error('Error loading JSON data:', error));

function CheckNote(){
    let AllNotes = document.querySelectorAll(".note")
    AllNotes.forEach(note =>{
        note.addEventListener("click", function(){
          let noteId = note.getAttribute("data-id")
          const noteContent = notes.find(note => note.id == noteId);
          if (noteContent) {
            app_body.innerHTML=
            `
            <div class="read-note">
            <div class="read-note-nav">
                <div class="read-note-nav-left">
                    <i class="fa-solid fa-arrow-left back"></i>
                    <span>All</span>
                </div>
                <div class="read-note-nav-right">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>

            </div>

            <div class="read-note-body">
                <span class="date">${noteContent.date} </span>
                <h3>${noteContent.title}</h3>
                <p>${noteContent.content}</p>
            </div>

        </div>    
    
            `
            let  gobackarrow = document.querySelector(".back")
        gobackarrow.addEventListener("click",  function(){
            NotesApp()
        })
          }
        })
    })
}



}

function VoiceMemmosApp(){

    let password = prompt("Parola pentru aplicație:", "");
    if(password === "1499"){
                   
    app_body.innerHTML = 
    `
    <div class="voicememmos-app">
    <h2>All Recordings</h2>

   </div>
    `

    let voiceMemmosAppDiv = document.querySelector(".voicememmos-app")

    fetch('./script/essentials/voicememmos.json') // Replace 'messagingData.json' with the actual path to your JSON file.
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Loop through the data and log the first name of each conversation
    data.forEach(voicememmo => {
     let id = voicememmo.id
     let title = voicememmo.title
     let link = voicememmo.src
     let date = voicememmo.date
     voiceMemmosAppDiv.innerHTML += 
     `
     <div class="recording" data-src="${link}" data-id="${id}">
     <span class="title">${title}</span>
     <div class="recording-info">
         <span class="date">${date}</span>
         <span class="length"><i class="fa-solid fa-play"></i></span>
     </div>
    </div>
     `
    });
    showPlayer()
  })
  .catch(error => console.error('Error loading JSON data:', error));
  function  showPlayer(){
    let recordings = document.querySelectorAll(".recording")
    recordings.forEach(recording =>{
        recording.addEventListener("click", function(){
            let srclink = recording.getAttribute("data-src")
            
            let hasAudio = recording.querySelector("audio")
            if(hasAudio){
                
            }else{
                recording.innerHTML += 
                `
                <audio controls>
                <source src="${srclink}" type="audio/ogg">
                <source src="${srclink}" type="audio/mpeg">
                Your browser does not support the audio element.
                </audio>
                `
            }

        })
    })
  }


        }else{
            app.style.display="none";
            alert("Parolă greșită. Încercați din nou.");
                    
            }
}



 
function SafariApp(){
    app_body.innerHTML = 
    `
    <div class="safari-app">
    <div class="search-bar">
        <i class="fa-solid fa-a"></i>

        <span>google.bg</span>

        <i class="fa-solid fa-rotate-right"></i>
    </div>

    <div class="safari-body">
        <i class="fa-solid fa-wifi"></i>
        <span>No internet connection!</span>

        <div class="searches">
            <span>Search History:</span>

           

        </div>
    </div>
</div>
    `
let search_div = document.querySelector(".searches")
fetch('./script/essentials/search-history.json') // Replace 'messagingData.json' with the actual path to your JSON file.
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Loop through the data and log the first name of each conversation
    data.forEach(searchhistory => {
     let text = searchhistory.text;
     let date = searchhistory.date

     search_div.innerHTML += 
     `
     <div class="search">
                <span>${text}</span>
            </div>
     `


    });
  })
  .catch(error => console.error('Error loading JSON data:', error));

}

function SchoolApp(){
    app_body.innerHTML = 
    `
    <div class="school-app">
    <img src="./assets/bhs_logo.png"></img>
    <h1>Beverly Hills Highschool</h1>
    <p>Log in</p>
    <div class="school-app-body">
        <img src="" alt="" class="logo-school">

        <div class="login-school-app d-flex flex-column">
            <input type="text" placeholder="Username" value="teacher21753" readonly>
            <input class="password_input" type="text" placeholder="Password">
            <button>Log In</button>
        </div>

    </div>
</div>
    `
    let passwword_input = document.querySelector(".login-school-app .password_input") 
    

    let login_btn = document.querySelector(".login-school-app button")
    login_btn.addEventListener("click",  function(){
        let password = passwword_input.value
        passwword_input.value = ""

        if(password === "2518"){
           OpenTeacherPanel()
        }else{
            passwword_input.value = "Parolă greșită!"
            setTimeout(() => {
                passwword_input.value = ""
            }, 1000);
           
        }
    })


    function OpenTeacherPanel(){
        app_body.innerHTML = 
        `
        <div class="teacher-panel">
        <div class="nav-teacher">
            <i class="fa-solid fa-bars"></i>
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <img src="./assets/bhs_logo_big.png" alt="">
        <h4 style="text-align:center; margin-top:20px;"> Personalul școlii</h4>

       <div class="teachers">
        

       </div> 
        
    
    
    </div>
        `
let teacher_info = []
        let teacher_panel = document.querySelector(".teachers")
        fetch('./script/essentials/teachers.json') // Replace 'messagingData.json' with the actual path to your JSON file.
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    teacher_info = data
    // Loop through the data and log the first name of each conversation
    data.forEach(teacher => {
     let name = teacher.name;
     let position = teacher.position
     let id = teacher.id 
     let age = teacher.age  
     let degree = teacher.degree
     let psychoanaliz = teacher.psychoanaliz
     let img = teacher.img

     teacher_panel.innerHTML += 
     `
     <div class="teacher-block">
            <div class="name-position">
                <span class="teacher-name">${name}</span>
                <span class="teacher-position">${position}</span>
            </div>
            <div>
                <span data-id="${id}" class="more-info-teacher">
                 Mai multe informații
                </span>
            </div>
        </div>
     `

        OpenTeacher()
    });
  })
  .catch(error => console.error('Error loading JSON data:', error));




  function OpenTeacher(){
    let teachers_div = document.querySelectorAll(".more-info-teacher")
    teachers_div.forEach(teacher => {
      teacher.addEventListener("click", function(){
          let teacher_id = teacher.getAttribute("data-id")
          const teacher_content = teacher_info.find(teacher => teacher.id == teacher_id);

          let dosie;
          if(teacher_content.dosie =="Da"){
             dosie = "<span style='color:blue;text-decoration:underline;cursor:pointer' class=check_dosie>Da - Vezi mai multe</span>"
            }else{
             dosie = "Nu"
          }
            app_body.innerHTML =  
            
            `
            <div class="teacher-profile"> 
            <i class="fa-solid fa-arrow-left go-back-teacher"></i>
            <img class="teacher-cv" src="${teacher_content.img}"> </img>
            
            <div class="techer-profile-info">
                  <div class="first-info">
                    <span class="teacher-position">
                        ${teacher_content.position}
                    </span>
                    <h3 class="teacher-name">${teacher_content.name}</h3>
                  </div>  

                  <div class="second-info">
                    <p>
                    DATA NAȘTERII:  ${teacher_content.birthday} <br><br>

                DOSAR: ${dosie}<br><br>

                ANGAJAT LA (DATA):  ${teacher_content.naet_data}<br><br>

                ÎNVĂȚĂ DE: ${teacher_content.teaching}
                    </p>
                  </div>
            </div>
            

        
        </div>
            `
           
            let goback_btn_teacher = document.querySelector(".go-back-teacher")
            goback_btn_teacher.addEventListener("click", function(){
                OpenTeacherPanel()
            })

            if(teacher_content.dosie =="Da"){
               CheckDosie()
               }
            function CheckDosie(){
                let btn = document.querySelector(".check_dosie")
                btn.addEventListener("click", function(){
                let password = prompt("Parola numărul 3 - Malum", "");
                if(password === "02051978"){
                    document.querySelector(".teacher-profile").innerHTML = 
                    `
                    <img style="max-width:100%" src="./assets/dosie_djon/2.png"></img>
                    <img style="max-width:100%" src="./assets/dosie_djon/1.png"></img>
                    `
                }else{
                    alert("Parolă greșită. Încercați din nou.");
                }
                })
            }

      })
    })
  }




    }

}


function PhoneApp(){
    app_body.innerHTML = 
    `
    <div class="phoneapp">
                    <span>Recents</span>
                 
                </div>
    `




    let phoneApp = document.querySelector(".phoneapp")
    fetch('./script/essentials/phone-app.json') 
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    data.forEach(call => {
    let number = call.number
    let date = call.date
    let status = call.status;
    if(status==="missed"){
        status = "missed";
    }else{
        status = "taken"
    }
    phoneApp.innerHTML += 
    `
    <div class="call">
                    <span class="number ${status}">${number}</span>
                    <span class="clock">${date}</span>
    </div>
    `

    });
})
}


function Game(){

    app_body.innerHTML = 
    `
    <div class="game header">
                    <h1>Floppy Bird</h1>
                    <div class="score-container">
                      <div id="bestScore"></div>
                      <div id="currentScore"></div>
                    </div>
                  </div>
                
                  <canvas id="canvas"></canvas>
                
    `







    const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();
img.src = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

let appHeight = document.querySelector(".app").offsetHeight
console.log(appHeight)
canvas.style.width='100%';
  canvas.style.height=(appHeight-"270")+"px";
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

// general settings
let gamePlaying = false;
const gravity = .5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0, 
    flight, 
    flyHeight, 
    currentScore, 
    pipe;

// pipe settings
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;

const setup = () => {
  currentScore = 0;
  flight = jump;

  // set initial flyHeight (middle of screen - size of the bird)
  flyHeight = (canvas.height / 2) - (size[1] / 2);

  // setup first 3 pipes
  pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]);
}

const render = () => {
  // make the pipe and bird moving 
  index++;

  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background first part 
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
  // background second part
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);
  
  // pipe display
  if (gamePlaying){
    pipes.map(pipe => {
      // pipe moving
      pipe[0] -= speed;

      // top pipe
      ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
      // bottom pipe
      ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

      // give 1 point & create new pipe
      if(pipe[0] <= -pipeWidth){
        currentScore++;
        // check if it's the best score
        bestScore = Math.max(bestScore, currentScore);
        
        // remove & create new pipe
        pipes = [...pipes.slice(1), [pipes[pipes.length-1][0] + pipeGap + pipeWidth, pipeLoc()]];
        console.log(pipes);
      }
    
      // if hit the pipe, end
      if ([
        pipe[0] <= cTenth + size[0], 
        pipe[0] + pipeWidth >= cTenth, 
        pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
      ].every(elem => elem)) {
        gamePlaying = false;
        setup();
      }
    })
  }
  // draw bird
  if (gamePlaying) {
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size);
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
    flyHeight = (canvas.height / 2) - (size[1] / 2);
      // text accueil
    ctx.fillText(`Best score : ${bestScore}`, 85, 245);
    ctx.fillText('Click to play', 90, 535);
    ctx.font = "bold 30px courier";
  }

  document.getElementById('bestScore').innerHTML = `Best : ${bestScore}`;
  document.getElementById('currentScore').innerHTML = `Current : ${currentScore}`;

  // tell the browser to perform anim
  window.requestAnimationFrame(render);
}

// launch setup
setup();
img.onload = render;

// start game
document.addEventListener('click', () => gamePlaying = true);
window.onclick = () => flight = jump;


}
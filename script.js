const $ = (id) => document.getElementById(id);
var alive = 25;

function human(skin, hair, clothes, hairN, skinCol){
    this.isAlive = true;
    this.isPrisoner = false;
    this.skin_color = skin;
    this.skin_color_name = skinCol
    this.hair_color = hair;
    this.hair_name = hairN;
    this.clothes_color = clothes;
    this.appends = function(){
        $("container").innerHTML += `
        
        <div class = "element">
            <div class = "head" style = "background:${this.skin_color}">
                <div class = "hair" style=background:${this.hair_color}></div>
            </div>
            <div class = "body" style = background:${this.clothes_color}></div>
            <i class='fas iron fa-border-all'></i>
            <div class = target></div>
        </div>
        
        `;
    };
    this.kill = function(z =  Math.floor(Math.random()*all_humans.length)){
        while(all_humans[z].isAlive === false){
            z = Math.floor(Math.random() * all_humans.length);
        }
        if(bad != all_humans[z] && bad.isPrisoner == false && all_humans[z].isPrisoner == false){
            document.getElementsByClassName("element")[z].getElementsByClassName("head")[0].style.display = "none";
            document.getElementsByClassName("element")[z].getElementsByClassName("body")[0].style.background = "linear-gradient(to right, grey, #444)";
            document.getElementsByClassName("element")[z].removeEventListener("dblclick", deleteI);
            all_humans[z].isAlive = false;
            audio2.play();
            alive--;
            deathMessage(z, all_humans[z].clothes_color)
        }
    };
}

//All humans
var human1 = new human("#f1c27d", "black", 'darkred', "Black", "Lighter");
var human2 = new human("", "black", "purple", "Black", "Darker");
var human3 = new human("", "#321", "purple", "Dark Brown", "Darker");
var human4 = new human("#f1c27d", "#642", "purple", "Light Brown", "Lighter");
var human5 = new human("", "#cc7", "purple", "Blonde", "Darker");
var human6 = new human("#f1c27d", "black", "orange", "Black", "Lighter");
var human7 = new human("", "#642", "orange", "Light Brown", "Darker");
var human8 = new human("#f1c27d", "#321", "orange", "Dark Brown", "Lighter");
var human9 = new human("", "#cc7", "orange", "Blonde", "Darker");
var human10 = new human("", "#642", "darkred", "Light Brown", "Darker");
var human11 = new human("#f1c27d", "#321", "darkred", "Dark Brown", "Lighter");
var human12 = new human("", "black", "darkred", "Black", "Darker");
var human13 = new human("", "#cc7", "darkred", "Blonde", "Darker");
var human14 = new human("#f1c27d", "black", "black", "Black", "Lighter");
var human15 = new human("", "#642", "black" , "Light Brown", "Darker");
var human16 = new human("#f1c27d", "#321", "black", "Dark Brown", "Lighter");
var human17 = new human("", "#cc7", "black", "Blonde", "Darker");
var human18 = new human("#f1c27d", "black", "darkblue", "Black", "Lighter");
var human19 = new human("", "#642", "darkblue", "Light Brown", "Darker");
var human20 = new human("", "#321", "darkblue", "Dark Brown", "Darker");
var human21 = new human("#f1c27d", "#cc7", "darkblue", "Blonde", "Lighter");
var human22 = new human("", "black", "green", "Black", "Darker");
var human23 = new human("", "#642", "green", "Light Brown", "Darker");
var human24 = new human("#f1c27d", "#321", "green", "Dark Brown", "Lighter");
var human25 = new human("#f1c27d", "#cc7", "green", "Blonde", "Lighter");

//Shuffling all humans in the array then chosing one to be the killer.
var all_humans = [human1, human2, human3, human4, human5, human6, human7, human8, human9, human10, human11, human12, human13, human14, human15, human16, human17, human18, human19, human20, human21, human22, human23, human24, human25];
shuffle(all_humans);
var p = Math.floor(Math.random()*all_humans.length);
var bad = all_humans[p];

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

//One night pass and 1 person is murdered.
function continueGame(){
    $("blackScreen").style.display = "block";
    setTimeout(function(){
        $("blackScreen").style.opacity = "1";
        setTimeout(function(){
            bad.kill();
            setTimeout(function(){
                $("blackScreen").style.opacity = "0";
                setTimeout(function(){
                    $("blackScreen").style.display = "none";
                    reverse();
                    checkVitals();
                    for(let l = 0; l < Math.ceil(Math.random()*3); l++){
                        receiveMessage();
                    }
                },500);
            },1500);
        },1000);
    },100);
}

//drawing all humans
function showHumans(){
    for(let i = 0; i < all_humans.length; i++){
        all_humans[i].appends();
    }
}

//killing innocent human
function deleteI(){
    this.getElementsByClassName("head")[0].style.display = "none";
    this.getElementsByClassName("body")[0].style.background = "linear-gradient(to right, grey, #444)";
    this.getElementsByClassName("body")[0].innerText = "Innocent";
    checkVitals();
    audio1.play();
}

//Killing the murderer.
function deleteIt(){
    this.getElementsByClassName("head")[0].style.display = "none";
    this.getElementsByClassName("body")[0].style.background = "linear-gradient(to right, red, darkred)";
    this.getElementsByClassName("body")[0].innerText = "Killer";
    audio1.play();
    setTimeout(function(){
        $("blackScreen").style.display = "block";
        $("blackScreen").style.opacity = "1";
        $("results").innerText = `You Win, but ${24 - alive} villagers died`;
        $("results").style.color = "green";
        //$("replayGame").style.display = "block";
    },1000);
    checkVitals();
}

function checkVitals(){
    if(alive < 4){
        $("blackScreen").style.display = "block";
        $("blackScreen").style.opacity = "1";
        $("results").innerText = "You Lose, the killer murdered everyone";
        $("results").style.color = "red";
        //$("replayGame").style.display = "block";
    }
}

//List of messages to be received.
var messages = [
    "I saw someone running last night, I didn't get to see it well, but I think he has a " + bad.skin_color_name + " Skin Color.",
    "What do we do?",
    "There was someone running around last night, but I was too scared to go and check.",
    "Any idea who is the killer?",
    "I fell like i am the next to die",
    "The village is so scared of this killer...",
    "I think it is one of the blues",
    "The red guys are pretty suspicious.",
    "I think it may be one of the green ones.",
    "The black ones are pretty suspicious",
    "Could it be one of the orange guys?",
    "I think it might be one of the purple ones.",
    `I saw something, it is one of the ${bad.clothes_color} ones`,
    `I saw something, it is one of the ${bad.clothes_color} ones`,
    "Be careful, the killer may lie and turn ourself against us.",
    "It was quick but I have seen the killer. I remember his hair color was " + bad.hair_name,
    "It was quick but I have seen the killer. I remember his hair color was " + bad.hair_name,
    "I have a feeling that it is the guy with  " + bad.hair_name + " hair",
    "I think it is one of those black haired guys.",
    "Is it one of those blonde guys?",
    "We have to do find the killer quick, or else we won't last for long.",
    "Hey Sheriff, any clues yet? People are scared for their lives",
    "Do your job Sheriff, we are dying."
];

//Random message to be received.
function receiveMessage(m = messages[Math.floor(Math.random()*messages.length)]){
    $("messages").innerHTML += `<br><img class = "villager" src = "https://imgur.com/E1Q9bhP.jpg"><div class = "message">${m}</div>`;
}

//Telling the player who died every night.
function deathMessage(who, col){
    $("messages").innerHTML+=`<div class = death><span style = color:${col}>Villager ${who} </span> has been killed.</div>`;
}

//Open and close the messages box.
function open_close_messages(){
    if($("messages").style.transform == 'scale(1)'){
        $("messages").style.transform = 'scale(0)';
    }
    else{
        $("messages").style.transform = 'scale(1)';
    }
}

//Adding events for prison and Sheriff gun shot.
function tr(){
    let btns = Array.from(document.getElementsByClassName("element"));
    Array.from(document.getElementsByClassName("iron")).map((element, idx) => {
        element.onclick = function() {
            if($("prison").style.left == document.getElementsByClassName("element")[idx].offsetLeft + "px" && $("prison").style.bottom == innerHeight - document.getElementsByClassName("element")[idx].offsetTop - document.getElementsByClassName("element")[idx].offsetHeight + "px"){
                $("prison").style.left = "-25vmax";
                $("prison").style.bottom = "5%";
                }
            else{
                $("prison").style.left = document.getElementsByClassName("element")[idx].offsetLeft + "px";
                $("prison").style.bottom = innerHeight - document.getElementsByClassName("element")[idx].offsetTop - document.getElementsByClassName("element")[idx].offsetHeight + "px";
                all_humans[idx].isPrisoner = true;
                prisonAudio.play();
            }
        }
    })
    
    btns.map((element, idx) => {
        element.addEventListener("dblclick", function() {
            all_humans[idx].isAlive = false;
            alive--;
        }, {once:true})
    })
}

//No more prisoners.
function reverse(){
    for(let a = 0; a < all_humans.length; a++){
        all_humans[a].isPrisoner = false;
    }
    $("prison").style.left = '-25vmax';
    $("prison").style.bottom = "5%";
}

window.onload=function(){
    $("middle").style.opacity = "0";
    setTimeout(function(){
        $("game").style.opacity = "1";
        $("middle").style.display = "none";
        $("middle").remove();
    },1000)
    showHumans();
    $("messages").style.transform = 'scale(0)';
    $("Button").addEventListener("click", continueGame);
    for(let o = 0; o < document.getElementsByClassName("element").length; o++){
        document.getElementsByClassName("element")[o].addEventListener("dblclick", deleteI, {once:true});
        if(o == p){
            document.getElementsByClassName("element")[o].addEventListener("dblclick", deleteIt, {once:true});
        }
    }
    tr();
    receiveMessage("Sheriff, I found out that there is a killer among us.");
    receiveMessage("You have to investigate and find the killer before he does anything.");
    receiveMessage("Jail someone if you want to.")
    receiveMessage("We will gather here every day and talk.");
};

//Audios below
var audio1 = new Audio();
var audio2 = new Audio();
var prisonAudio = new Audio();

audio1.src = "https://www.dropbox.com/s/mg4lq7h35mj82tg/gunshot-sound-effect-hd-youtubemp3free.org.mp3?dl=1";
audio2.src = "https://www.dropbox.com/s/2xysfsp2dvful2k/knife-slash-sound-effect-youtubemp3free.org.mp3?dl=1";
prisonAudio.src = "https://www.dropbox.com/s/1g0t2ct77e34onq/prison-door-closing-sound-effect-youtubemp3free%20%28mp3cut.net%29.mp3?dl=1";

//Settings page
function show_hide_settings(){
    if($("settings").style.left == "5%"){
        $("settings").style.left = "100%";
    }
    else{
        $("settings").style.left = "5%";
    }
}

//I know how bad and confusing this code looks like.

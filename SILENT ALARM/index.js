

document.querySelector(".btn img").addEventListener("click",changeImage); 

function changeImage(){
    
    document.querySelector(".btn img").setAttribute("src", "./images/button_pressed.png");
    
    setTimeout(function() {
    document.querySelector(".btn img").setAttribute("src", "./images/button_unpressed.png");
    }, 2000);

}

document.querySelector(".btn img").addEventListener("click",playAudio);

function playAudio(){

    var sound = new Audio("./sounds/alarm.mp3");
    sound.play();

}



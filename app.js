const color_box_container = document.querySelectorAll(".color-box-container > div")
const color_answer_container = document.querySelectorAll(".color-answer-container > div");
const hoverSound = new Audio("hover.mp3");
const clickedSound = new Audio("clicked.mp3");
const copiedSound = new Audio("copied.mp3");


function waitForAudio(audio) {

    const newAudio = audio.currentTime > 0 && !audio.paused && !audio.ended
        && audio.readyState > audio.HAVE_CURRENT_DATA;
    if (!newAudio) {
        audio.play();
    }
}

let boxSounds = (element) => {
    let hoverCount = 0;

    //plays this sound when box is clicked
    if (element.matches(":active")) {
        clickedSound.currentTime = 0;
        clickedSound.pause();
        hoverSound.pause();
        hoverSound.currentTime = 0;
        hoverCount = 0;
        waitForAudio(clickedSound)
    }
    // when box is not clicked start hover sound loop
    let hoverLoop = setInterval(() => {
        //if box is hovered and not being clicked count four beats then reset hover sound
        if (element.matches(":hover") && element.matches(":active") != true) {
            if (hoverCount === 4) {
                hoverSound.pause();
                hoverSound.currentTime = 0;
                hoverCount = 0;
            }
            waitForAudio(hoverSound)
            hoverCount += 1;
        } else { // else if block is not being hovered stop and reset the hover sound and break interval
            hoverSound.pause();
            hoverSound.currentTime = 0;
            hoverCount = 0;
            clearInterval(hoverLoop)
        }
    }, 400)
}

function makeOpaque(index) {
    let divOpacityValue = parseFloat(window.getComputedStyle(color_answer_container[index]).getPropertyValue("opacity"));
    let toOpaque = setInterval(() => {

        if (divOpacityValue > 0) {
            divOpacityValue -= .05;
            color_answer_container[index].style.opacity = divOpacityValue;
        } else {
            clearInterval(toOpaque)
        }
    }, 10);
}

function fadeCopiedText(index) {
    let copyText = color_answer_container[index].childNodes[3].textContent;
    navigator.clipboard.writeText(copyText);
    let copiedText = document.querySelector("#copied")
    copiedText.textContent = "Copied!"
    let copyFade = 1

    let copyColor = setInterval(() => {
        copyFade -= .01;
        copiedText.style.opacity = copyFade
        if (copyFade < 0) {
            clearInterval(copyColor);
        }
    }, 30)
}



let boxEvents = [...color_box_container].forEach((element, index) => {
    element.addEventListener("mouseover", () => {
        boxSounds(element);
    })
    // #===========================================================================================================================
    element.addEventListener("mousedown", () => {
        boxSounds(element);
        let divOpacityValue = parseFloat(window.getComputedStyle(color_answer_container[index]).getPropertyValue("opacity"));
        let noOpaque = setInterval(() => {

            if (divOpacityValue < 1) {
                divOpacityValue += .05;
                color_answer_container[index].style.opacity = divOpacityValue;
            } else {
                clearInterval(noOpaque)
            }
        }, 10);
    })
    // #===========================================================================================================================
    element.addEventListener("mouseup", () => {
        boxSounds(element);
        makeOpaque(index);
    })
    // #===========================================================================================================================
    element.addEventListener("mouseout", () => {
        makeOpaque(index);

    })
    // #===========================================================================================================================
    element.addEventListener("dblclick", () => {
        fadeCopiedText(index);
    })


})


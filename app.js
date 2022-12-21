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

let hoverFunc = (element) => {
    let hoverCount = 0;

    if (element.matches(":active")) {
        clickedSound.currentTime = 0;
        clickedSound.pause();
        waitForAudio(clickedSound)
    }

    let hoverLoop = setInterval(() => {

        if (element.matches(":hover") && element.matches(":active") != true) {
            hoverCount += 1;
            if (hoverCount === 4) {
                hoverSound.pause();
                hoverSound.currentTime = 0;
                hoverCount = 0;

            }

            waitForAudio(hoverSound)
        } else {
            hoverSound.pause();
            hoverSound.currentTime = 0;

            clearInterval(hoverLoop)
        }
    }, 400)
}
function fadeCopiedText(index) {
    let copyText = color_answer_container[index].textContent;
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

[...color_box_container].forEach((element, index, array) => {

    element.addEventListener("mouseover", () => {
        hoverFunc(element);
    })

    // #========================================================================

    element.addEventListener("mousedown", () => {
        hoverFunc(element);
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

    // #========================================================================

    element.addEventListener("mouseup", () => {
        hoverFunc(element);
        let divOpacityValue = parseFloat(window.getComputedStyle(color_answer_container[index]).getPropertyValue("opacity"));

        let toOpaque = setInterval(() => {

            if (divOpacityValue > 0) {
                divOpacityValue -= .05;
                color_answer_container[index].style.opacity = divOpacityValue;
            } else {
                clearInterval(toOpaque)
            }

        }, 10);
    })

    // #========================================================================

    element.addEventListener("mouseout", () => {

        hoverFunc(element);

        let divOpacityValue = parseFloat(window.getComputedStyle(color_answer_container[index]).getPropertyValue("opacity"));

        let toOpaque = setInterval(() => {

            if (divOpacityValue > 0) {
                divOpacityValue -= .05;
                color_answer_container[index].style.opacity = divOpacityValue;
            } else {
                clearInterval(toOpaque)
            }
        }, 10);
    })
    // #========================================================================

    element.addEventListener("dblclick", () => {
        hoverSound.pause()
        hoverSound.currentTime = 0;

        fadeCopiedText(index);

    })


})


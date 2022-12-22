const colorContainer = document.querySelectorAll(".color-box-container > div");
const answerContainer = document.querySelectorAll(".color-answer-container > div");
const colorSection = document.querySelector(".colors-section");
let copyFade = 1;
function makeDisappear(index) {
    let divOpacityValue = parseFloat(window.getComputedStyle(answerContainer[index]).getPropertyValue("opacity"));
    let toOpaque = setInterval(() => {

        if (divOpacityValue > 0) {
            divOpacityValue -= .10;
            answerContainer[index].style.opacity = divOpacityValue;
        } else {
            clearInterval(toOpaque)
        }
    }, 10);
}

function makeAppear(index) {
    let divOpacityValue = parseFloat(window.getComputedStyle(answerContainer[index]).getPropertyValue("opacity"));
    let noOpaque = setInterval(() => {

        console.log(divOpacityValue)
        if (divOpacityValue < 1) {
            divOpacityValue += .10;
            answerContainer[index].style.opacity = divOpacityValue;
        } else {
            clearInterval(noOpaque)
        }
    }, 10);
}


let colorIterator = [...colorContainer].forEach((element, index) => {
    element.addEventListener("mouseover", () => {
        makeAppear(index)
    })

    element.addEventListener("mouseout", () => {
        makeDisappear(index);
    })
    element.addEventListener("click", () => {
        fadeCopiedText(index)
    })
});

function fadeCopiedText(index) {

    let copyText = answerContainer[index].childNodes[3].textContent;
    navigator.clipboard.writeText(copyText);
    let copiedText = document.querySelector("#copied")
    copiedText.textContent = "Copied!"

    if (copyFade === 1) {
        let copyColor = setInterval(() => {
            copyFade -= .01;
            copiedText.style.opacity = copyFade
            if (copyFade < 0) {
                copyFade = 1;
                clearInterval(copyColor);
            }
        }, 30)
    }
}


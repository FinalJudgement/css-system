const color_box_container = document.querySelectorAll(".color-box-container > div")
const color_answer_container = document.querySelectorAll(".color-answer-container > div");
let opacityController = 0;
let opacityTimer = 0;


[...color_box_container].forEach((element, index, array) => {

    // #========================================================================

    element.addEventListener("mousedown", () => {

        let noOpaque = setInterval(() => {

            if (opacityController < 1 && opacityTimer < 2) {
                opacityController += .05;
            } else {
                opacityTimer = 0;
                clearInterval(noOpaque);
            }
            opacityTimer += .05
            color_answer_container[index].style.opacity = opacityController;
        }, 10);
    })

    // #========================================================================

    element.addEventListener("mouseup", () => {

        opacityTimer = 0;
        let toOpaque = setInterval(() => {

            if (opacityController > 0) {
                opacityController -= .05;
            } else if (opacityController <= 0) {
                clearInterval(toOpaque);
            }

            color_answer_container[index].style.opacity = opacityController;
        }, 10);
    })

    // #========================================================================

    element.addEventListener("mouseout", () => {

        opacityTimer = 0;
        let toOpaque = setInterval(() => {

            if (opacityController > 0) {
                opacityController -= .05;
            } else if (opacityController <= 0) {
                clearInterval(toOpaque);
            }

            color_answer_container[index].style.opacity = opacityController;
        }, 10);
    })
    // #========================================================================

    element.addEventListener("dblclick", () => {
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

    })
})


const body = document.querySelector("body");
const content = document.querySelector(".content");

let paragraphs ={};
for (let i = 0; i <= 7; i++){
    let para = document.createElement('p');
    para.id = `p${i}`;
    para.textContent = '';
    content.appendChild(para);
    paragraphs[`p${i}`] = para;
    para.classList.add("ePubPara", "p", "text");
}

let originalText;

let parsedText = originalText.match(/[^\.!\?]+[\.!\?]+/g);
let counter = 0;
let currentPara = 0;
let intervalId = null;

function printText(){
    if(counter < parsedText.length){
        if(counter ==0){
            p0.textContent = parsedText[0].slice(3,parsedText[counter].length);
            p0.classList.add("currentText");
        } else {
            if(parsedText[counter].slice(0,4) == "</p>") {
                currentPara++;
                let paragraph = paragraphs[`p${currentPara}`];
                paragraph.classList.add("currentText");
                paragraph.textContent += parsedText[counter].slice(8, parsedText[counter].length);
            } else {
                let paragraph = paragraphs[`p${currentPara}`];
                paragraph.textContent += parsedText[counter];
                paragraph.classList.add("currentText");
            }
        }
        scrollToBottom();
        counter++;

        if(paragraphs[`p${currentPara - 1}`].classList.contains("currentText") && paragraphs[`p${currentPara}`].classList.contains("currentText")) {
            paragraphs[`p${currentPara - 1}`].classList.remove("currentText");
        }
    } else {
        clearInterval(intervalId);
    }
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

function startPrinting() {
    if (intervalId === null){
        intervalId = setInterval(printText, 1500); //?
    }
}

function stopPrinting() {
    if(intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

startPrinting();

//create a clear text value
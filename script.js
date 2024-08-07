const body = document.querySelector("body");

let paragraphs ={};
for (let i = 0; i <= 7; i++){
    let para = document.createElement('p');
    para.id = `p${i}`;
    para.textContent = '';
    body.appendChild(para);
    paragraphs[`p${i}`] = para;
    para.classList.add("ePubPara", "p", "text");
}

let originalText;

originalText = `<p>Lorem ipsum odor amet, consectetuer adipiscing elit. Nostra habitant sociosqu cubilia conubia nunc cubilia! Ullamcorper praesent dapibus vestibulum neque sapien dignissim rhoncus. Parturient cras vestibulum nulla; adipiscing mauris elementum. Metus vel venenatis inceptos massa id risus rutrum risus malesuada. Bibendum aliquet libero dis cubilia diam. Felis duis faucibus netus massa quis posuere mauris morbi egestas.</p>
<p>Morbi fusce ut placerat lobortis scelerisque. Turpis cras tellus eleifend potenti natoque; ante pellentesque sodales. Semper ullamcorper lobortis purus integer at proin venenatis vestibulum. Conubia primis facilisis pulvinar porttitor, velit ut purus libero iaculis. Auctor posuere ut sit; eu massa finibus? At feugiat sed non a ligula integer pellentesque commodo. Cursus curae a malesuada varius netus primis curabitur pellentesque. Eget accumsan augue eu erat commodo maecenas neque. Libero sapien hendrerit facilisis suscipit ligula vehicula faucibus nulla dis.</p>
<p>Tristique hac dui rhoncus neque class fermentum sociosqu massa mi. Ultrices elementum aliquam mattis molestie ligula suspendisse. Ad accumsan himenaeos magnis semper cursus ex a, nibh netus. Quisque arcu phasellus feugiat, conubia fames proin sem et. Consectetur at sociosqu tellus interdum maecenas netus maecenas. Cras eleifend molestie penatibus malesuada ridiculus integer mauris. Tempus semper ultricies imperdiet; leo nam hendrerit turpis varius. Primis elit morbi semper mattis inceptos varius. Lorem gravida sem class ex; malesuada himenaeos.</p>`;

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
        counter++;

        if(paragraphs[counter - 1] && paragraphs[counter - 1].classList.contains("currentText") && paragraphs[counter].classList.contains("currentText")) {
            console.log("free me");
            paragraphs[`p${counter - 1}`].classList.remove("currentText");
        } else if(!paragraphs[counter - 1]) {
            console.log("paragraphs[counter-1] doesn't exist")
            console.log(counter);
        } else if(!paragraphs[counter - 1].classList.contains("currentText")){
            console.log("currentText isn't attached to old para");
        } else if(!paragraphs[counter].classList.contains("currentText")) {
            console.log("currentText isn't attached to current para");
        }

        /*if (paragraphs[`p${counter - 1}`] && paragraphs[`p${counter - 1}`].classList.contains("currentText")) {
            console.log("meow");
            paragraphs[`p${counter - 1}`].classList.remove("currentText");
        }*/

    } else {
        clearInterval(intervalId);
    }
}

/*function changeTextValue(newText){
    stopPrinting();

    counter = 0;
    currentPara = 0;

    parsedText = [];
    parsedText = newText.match(/[^\.!\?]+[\.!\?]+/g);
    console.log(parsedText);
}*/

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
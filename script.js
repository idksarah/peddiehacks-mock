const body = document.querySelector("body");

let paragraphs ={};
for (let i = 0; i <= 7; i++){
    let para = document.createElement('p');
    para.id = `p${i}`;
    para.textContent = '';
    body.appendChild(para);
    paragraphs[`p${i}`] = para;
}

let originalText;

originalText = `<p>Lorem ipsum odor amet, consectetuer adipiscing elit. Nostra habitant sociosqu cubilia conubia nunc cubilia! Ullamcorper praesent dapibus vestibulum neque sapien dignissim rhoncus. Parturient cras vestibulum nulla; adipiscing mauris elementum. Metus vel venenatis inceptos massa id risus rutrum risus malesuada. Bibendum aliquet libero dis cubilia diam. Felis duis faucibus netus massa quis posuere mauris morbi egestas.</p>
<p>Morbi fusce ut placerat lobortis scelerisque. Turpis cras tellus eleifend potenti natoque; ante pellentesque sodales. Semper ullamcorper lobortis purus integer at proin venenatis vestibulum. Conubia primis facilisis pulvinar porttitor, velit ut purus libero iaculis. Auctor posuere ut sit; eu massa finibus? At feugiat sed non a ligula integer pellentesque commodo. Cursus curae a malesuada varius netus primis curabitur pellentesque. Eget accumsan augue eu erat commodo maecenas neque. Libero sapien hendrerit facilisis suscipit ligula vehicula faucibus nulla dis.</p>
<p>Tristique hac dui rhoncus neque class fermentum sociosqu massa mi. Ultrices elementum aliquam mattis molestie ligula suspendisse. Ad accumsan himenaeos magnis semper cursus ex a, nibh netus. Quisque arcu phasellus feugiat, conubia fames proin sem et. Consectetur at sociosqu tellus interdum maecenas netus maecenas. Cras eleifend molestie penatibus malesuada ridiculus integer mauris. Tempus semper ultricies imperdiet; leo nam hendrerit turpis varius. Primis elit morbi semper mattis inceptos varius. Lorem gravida sem class ex; malesuada himenaeos.</p>`;

let parsedText = originalText.match(/[^\.!\?]+[\.!\?]+/g);
let counter = 0;
let timeout;
let first = true;
let currentPara = 0;

console.log(parsedText.length);
console.log(parsedText);


function printText(text = parsedText){
    if(counter < parsedText.length){
        if(counter ==0){
            p0.textContent = parsedText[0].slice(3,parsedText[counter].length);
        } else {
            if(parsedText[counter].slice(0,4) == "</p>") {
                currentPara++;
                let paragraph = paragraphs[`p${currentPara}`];
                paragraph.textContent += parsedText[counter].slice(8, parsedText[counter].length);
            } else {
                let paragraph = paragraphs[`p${currentPara}`];
                paragraph.textContent += parsedText[counter];
            }
        }
        counter++;
    }
}

if(counter < parsedText.length){
    setInterval(printText, 500);
}

/*
code to dispaly specific sentences works; just need to adjust it to bold/mark larger whatever is currently being read
    all text is default at .3 opacity and a pretty large size
    text being read should simply be higher opacity and bold
    allow user to choose how many paragraphs/words are allowed on screen but will do later

    append sentences to each paragraph until there's a </p>
    then start a new paragraph
    every time there's a sentence bold and highlight it and then unbold lower the opacity of the the last one
    when u hit the bottom wipe the screen
*/
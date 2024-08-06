const body = document.querySelector(".body");
const p1 = document.querySelector(".p1");

/*let paragraphs ={};
for (let i = 1; i <= 10; i++){ //only takes 10 paragraphs but idk
    let para = document.createElement('p');
    para.id = `p${i}`;
    para.textContent = `Paragraph ${i}`;
    paragraphs[`p${i}`] = para;
}
*/
let text;

text = "Lorem ipsum odor amet, consectetuer adipiscing elit. Nostra habitant sociosqu cubilia conubia nunc cubilia. Ullamcorper praesent dapibus vestibulum neque sapien dignissim rhoncus. Parturient cras vestibulum nulla; adipiscing mauris elementum. Metus vel venenatis inceptos massa id risus rutrum risus malesuada. Bibendum aliquet libero dis cubilia diam. Felis duis faucibus netus massa quis posuere mauris morbi egestas.";

/*text = `Lorem ipsum odor amet, consectetuer adipiscing elit. Nostra habitant sociosqu cubilia conubia nunc cubilia. Ullamcorper praesent dapibus vestibulum neque sapien dignissim rhoncus. Parturient cras vestibulum nulla; adipiscing mauris elementum. Metus vel venenatis inceptos massa id risus rutrum risus malesuada. Bibendum aliquet libero dis cubilia diam. Felis duis faucibus netus massa quis posuere mauris morbi egestas.

Morbi fusce ut placerat lobortis scelerisque. Turpis cras tellus eleifend potenti natoque; ante pellentesque sodales. Semper ullamcorper lobortis purus integer at proin venenatis vestibulum. Conubia primis facilisis pulvinar porttitor, velit ut purus libero iaculis. Auctor posuere ut sit; eu massa finibus? At feugiat sed non a ligula integer pellentesque commodo. Cursus curae a malesuada varius netus primis curabitur pellentesque. Eget accumsan augue eu erat commodo maecenas neque. Libero sapien hendrerit facilisis suscipit ligula vehicula faucibus nulla dis.

Tristique hac dui rhoncus neque class fermentum sociosqu massa mi. Ultrices elementum aliquam mattis molestie ligula suspendisse. Ad accumsan himenaeos magnis semper cursus ex a, nibh netus. Quisque arcu phasellus feugiat, conubia fames proin sem et. Consectetur at sociosqu tellus interdum maecenas netus maecenas. Cras eleifend molestie penatibus malesuada ridiculus integer mauris. Tempus semper ultricies imperdiet; leo nam hendrerit turpis varius. Primis elit morbi semper mattis inceptos varius. Lorem gravida sem class ex; malesuada himenaeos.`;*/

let sentences = text.match( /[^\.!\?\r\n]+[\.!\?\r\n]+/g );
let counter = 0;
let timeout;
let first = true;
//let currentPara = 0; //parasgraphs themselves r 1,2,3,,4... but array is 0,1,2,3..
//let paragraph = paragraphs[`${currentPara}`];

console.log(sentences.length);
console.log(sentences);

/*function printText(text = sentences){
    for(let i =0; i < sentences.length; i++){
        paragraph = paragraphs[`${currentPara}`];
        if(sentence[i].slice(-4) == "\n\n") {
            currentPara++;
        }
        /*
        += sentence[i] to para num
        if sentence[i] ends in linebreak
            p = new para numb
         
    }
    for(let i =0; i< paragraph.length; i++){
        body.appendChild(paragraphs[i]);
    }
}*/

function highlightText(text = sentences){
    p1.textContent = text[counter];
    console.log(text[counter]);
    counter++;
    console.log(counter);
}

if(counter < sentences.length){
    setInterval(highlightText, 3500);
}
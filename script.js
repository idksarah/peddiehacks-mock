const body = document.querySelector(".body");
const header = document.querySelector(".header");

const p3 = document.createElement("p");
const p4 = document.createElement("p"); //not very good sinceit can only take 
const p5 = document.createElement("p"); //max 10 paragraphs and pargraphs can
const p6 = document.createElement("p"); //sometimes be quite short, but i'm lazy.
const p7 = document.createElement("p"); //so
const p8 = document.createElement("p"); //yeah
const p9 = document.createElement("p");
const p10 = document.createElement("p");

let text;

text = `Lorem ipsum odor amet, consectetuer adipiscing elit. Nostra habitant sociosqu cubilia conubia nunc cubilia. Ullamcorper praesent dapibus vestibulum neque sapien dignissim rhoncus. Parturient cras vestibulum nulla; adipiscing mauris elementum. Metus vel venenatis inceptos massa id risus rutrum risus malesuada. Bibendum aliquet libero dis cubilia diam. Felis duis faucibus netus massa quis posuere mauris morbi egestas.

Morbi fusce ut placerat lobortis scelerisque. Turpis cras tellus eleifend potenti natoque; ante pellentesque sodales. Semper ullamcorper lobortis purus integer at proin venenatis vestibulum. Conubia primis facilisis pulvinar porttitor, velit ut purus libero iaculis. Auctor posuere ut sit; eu massa finibus? At feugiat sed non a ligula integer pellentesque commodo. Cursus curae a malesuada varius netus primis curabitur pellentesque. Eget accumsan augue eu erat commodo maecenas neque. Libero sapien hendrerit facilisis suscipit ligula vehicula faucibus nulla dis.

Tristique hac dui rhoncus neque class fermentum sociosqu massa mi. Ultrices elementum aliquam mattis molestie ligula suspendisse. Ad accumsan himenaeos magnis semper cursus ex a, nibh netus. Quisque arcu phasellus feugiat, conubia fames proin sem et. Consectetur at sociosqu tellus interdum maecenas netus maecenas. Cras eleifend molestie penatibus malesuada ridiculus integer mauris. Tempus semper ultricies imperdiet; leo nam hendrerit turpis varius. Primis elit morbi semper mattis inceptos varius. Lorem gravida sem class ex; malesuada himenaeos.`;

let sentences = text.match( /[^\.!\?\r\n]+[\.!\?\r\n]+/g );
let counter = 0;
let timeout;
let first = true;

console.log(sentences.length);
console.log(sentences);


function printText(text = sentences){
    header.textContent = text[counter];
    console.log(text[counter]);
    counter++;
    console.log(counter);
}

if(counter < sentences.length){
    setInterval(printText, 3500);
}
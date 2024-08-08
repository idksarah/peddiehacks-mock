function getParagraphs(entireText){
    entireText = entireText.getElementsByTagName('html')[0].innerHTML;
    let firstPIndex = entireText.indexOf('<p>');
    let lastPIndex = entireText.lastIndexOf('</p>');
    let text = entireText.substring(firstPIndex, lastPIndex);
    return text;
}

let originalText;

function parseEpub(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const arrayBuffer = e.target.result;
        const book = ePub(arrayBuffer);

        book.loaded.metadata.then(metadata => {
          title.textContent = metadata.title;
        });
  
        book.loaded.spine.then(spine => {
          const chapterPromises = spine.spineItems.map((item, index) => {
            return book.load(item.href).then(content => {
              return {
                id: item.idref,
                label: item.label || `Chapter ${index + 1}`,
                content: content
              };
            });
          });
  
          Promise.all(chapterPromises)
            .then(chapters => resolve(chapters))
            .catch(reject);
        }).catch(reject);
      };
      reader.readAsArrayBuffer(file);
    });
  }
  
  const fileInput = document.querySelector('input');
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      setup.classList.add("hidden");
      input.classList.add("hidden");

      content.appendChild(title);
      parseEpub(file)
        .then(chapters => {
            originalText = getParagraphs(chapters[2].content);//returns chap 1 cause thats just how the book is structured
            printAndParseText();
            
        })
    }
  });

let setup = document.querySelector(".setup");
let input = document.querySelector('.input');
const body = document.querySelector('body');
let title = document.createElement('p');
let content = document.querySelector('.content');
title.textContent = "Untitled";

title.classList.add("text", "title");

function printAndParseText() {
    let matches = originalText.match(/<p>/g);
    let numOfPara = matches.length;

    let paragraphs ={};
    for (let i = 0; i <= numOfPara; i++){
        let para = document.createElement('p');
        para.id = `p${i}`;
        para.textContent = '';
        content.appendChild(para);
        paragraphs[`p${i}`] = para;
        para.classList.add("ePubPara", "p", "text");
    }
    
    let parsedText = originalText.match(/[^\.!\?]+[\.!\?"]+/g); //can't handle quotation marks?
    let counter = 0;
    let currentPara = 0;
    let intervalId = null;
    
    function printText(){
        if(counter < parsedText.length){
            if(counter ==0){
                p0.textContent = parsedText[0].slice(3,parsedText[counter].length);
                p0.classList.add("currentText");
            } else {
                if(parsedText[counter].slice(0,5) == "\n</p>") {
                    currentPara++;
                    let paragraph = paragraphs[`p${currentPara}`];
                    paragraph.classList.add("currentText");
                    paragraph.textContent += parsedText[counter].slice(10, parsedText[counter].length);
                } else {
                    let paragraph = paragraphs[`p${currentPara}`];
                    paragraph.textContent += parsedText[counter];
                    paragraph.classList.add("currentText");
                }
            }
            counter++;
    
            if(paragraphs[`p${currentPara - 1}`].classList.contains("currentText") && paragraphs[`p${currentPara}`].classList.contains("currentText")) {
                paragraphs[`p${currentPara - 1}`].classList.remove("currentText");
            }
        } else {
            clearInterval(intervalId);
        }
    }
    
    function startPrinting() {
        if (intervalId === null){
            intervalId = setInterval(printText, 2600);
        }
    }
    
    function stopPrinting() {
        if(intervalId !== null) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

    startPrinting();
}

content.addEventListener('click', () => {
    parseEpub();
})
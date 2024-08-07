function parseEpub(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const arrayBuffer = e.target.result;
        const book = ePub(arrayBuffer);
  
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
      parseEpub(file)
        .then(chapters => {
            getParagraphs(chapters[2].content);//returns chap 1 cause thats just how the book is structured
        })
    }
  });

function getParagraphs(entireText){
    //console.log(entireText);
    entireText = entireText.getElementsByTagName('html')[0].innerHTML;
    //console.log(entireText);

    let firstPIndex = entireText.indexOf('<p>');
    let lastPIndex = entireText.lastIndexOf('</p>');
    let text = entireText.substring(firstPIndex, lastPIndex);
    console.log(text);
    
    return text;
}

  //should make it able to choose the chapte rbut idc at this point
  //look for <p> and add on to string until </p>
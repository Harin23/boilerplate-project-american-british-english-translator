const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  translateAmerican(text){
    let puncArray = this.removeClosingPunc(text);
    text = puncArray[1];
    let punc = puncArray[0];
    text=this.translate(Object.keys(americanToBritishSpelling), americanToBritishSpelling, text, false);
    text=this.translate(Object.keys(americanOnly), americanOnly, text, false);
    text=this.translate(Object.keys(americanToBritishTitles), americanToBritishTitles, text, true);
    text=text.replace(/([0-9]+)(:)([0-9]+)/g, '<span class="highlight">$1.$3</span>');
    return (punc != null)? text+punc : text;
  }

  translateBrit(text){
    let puncArray = this.removeClosingPunc(text);
    text = puncArray[1];
    let punc = puncArray[0];
    text=this.translate(Object.keys(britishOnly), britishOnly, text, false);
    text=this.reverseTranslate(Object.keys(americanToBritishSpelling), americanToBritishSpelling, text, false);
    text=this.reverseTranslate(Object.keys(americanToBritishTitles), americanToBritishTitles, text, true);
    text=text.replace(/([0-9]+)(.)([0-9]+)/g, '<span class="highlight">$1:$3</span>');
    return (punc != null)? text+punc : text;
  }

  removeClosingPunc(text){
    let end = text.slice(-1);
    if(end=="."||end=="?"||end=="!"){
      return [end, text.slice(0, -1)];
    }else{
      return [null, text];
    };
  };

  translate(keys, object, text, cap){
    keys.sort((a, b)=>{
      return b.length - a.length
    }).forEach(key=>{
      let i = text.toLowerCase().indexOf(key);
      let test = (i!= -1)? this.partOfAnotherWord(i, text.toLowerCase(), key):false;
      if(i != -1 && cap === false && test==true){
        text=text.slice(0, i)+'<span class="highlight">'+object[key]+'</span>'+text.slice(i + key.length);
      }else if(i != -1 && test==true){
        let word = object[key];
        word = word[0].toUpperCase()+word.slice(1);
        text=text.slice(0, i)+'<span class="highlight">'+word+'</span>'+text.slice(i + key.length);
      }
    })
    return text;
  }

  reverseTranslate(keys, object, text, cap){
    keys.sort((a, b)=>{
      return b.length - a.length
    }).forEach(key=>{
      let i = text.toLowerCase().indexOf(object[key]);
      let test = (i!= -1)? this.partOfAnotherWord(i, text.toLowerCase(), object[key]):false;
      if(i != -1 && cap === false && test==true){
        text=text.slice(0, i)+'<span class="highlight">'+key+'</span>'+text.slice(i + object[key].length);
      }else if(i != -1 && test==true){
        let word = key[0].toUpperCase()+key.slice(1);
        text=text.slice(0, i)+'<span class="highlight">'+word+'</span>'+text.slice(i + object[key].length);
      }
    })
    return text;
  }

  partOfAnotherWord(i, text, word){
    if(i==0){
      return this.checkForSpaceAhead(i, text, word);
    }else if(i==text.length-word.length){
      return this.checkForSpaceBehind(i, text);
    }else{
      return this.checkForSpaceBehind(i, text) && this.checkForSpaceAhead(i, text, word);
    }
  }

  checkForSpaceBehind(i, text){
    if(text[i-1]==" "){
      return true;
    }else{
      return false;
    }
  }

  checkForSpaceAhead(i, text, word){
    if(text[i+word.length]==" "){
      return true;
    }else{
      return false;
    }
  }

}

module.exports = Translator;
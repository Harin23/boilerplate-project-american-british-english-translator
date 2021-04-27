'use strict';

const Translator = require('../components/translator.js');
module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      // console.log(req.body)
      if(req.body.hasOwnProperty('locale')===false || req.body.hasOwnProperty('text')===false){
        res.json({error: 'Required field(s) missing' })
      }
      let locale=req.body.locale;
      let text=req.body.text;
      if(text.match(/\S+/g)==null){
        res.json({ error: 'No text to translate' })
      }else{
        if(locale === "american-to-british"){
          let translated = translator.translateAmerican(text);
          if(text==translated){
            res.json({text: text, translation : "Everything looks good to me!"})
          }else{
            res.json({text: text, translation : translated})
          }
        }else if(locale === "british-to-american"){
          let translated = translator.translateBrit(text);
          if(text==translated){
            res.json({text: text, translation : "Everything looks good to me!"})
          }else{
            res.json({text: text, translation : translated})
          }
        }else{
          res.json({ error: 'Invalid value for locale field' });
        }
      }
    });
};

const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translate = new Translator();

suite('Unit Tests', () => {

  suite('american to british', () => {

    test('Mangoes are my favorite fruit.', ()=>{
      let actual = translate.translateAmerican('Mangoes are my favorite fruit.');
      let expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.'
      assert.equal(actual,  expected);
    });

    test('I ate yogurt for breakfast.', ()=>{
      let actual = translate.translateAmerican('I ate yogurt for breakfast.');
      let expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.'
      assert.equal(actual,  expected);
    });

    test("We had a party at my friend's condo.", ()=>{
      let actual = translate.translateAmerican("We had a party at my friend's condo.");
      let expected = 'We had a party at my friend\'s <span class="highlight">flat</span>.'
      assert.equal(actual,  expected);
    });
    
    test('Can you toss this in the trashcan for me?', ()=>{
      let actual = translate.translateAmerican('Can you toss this in the trashcan for me?');
      let expected = 'Can you toss this in the <span class="highlight">bin</span> for me?'
      assert.equal(actual,  expected);
    });

    test('The parking lot was full.', ()=>{
      let actual = translate.translateAmerican('The parking lot was full.');
      let expected = 'The <span class="highlight">car park</span> was full.'
      assert.equal(actual,  expected);
    });

    test('Like a high tech Rube Goldberg machine.', ()=>{
      let actual = translate.translateAmerican('Like a high tech Rube Goldberg machine.');
      let expected = 'Like a high tech <span class="highlight">Heath Robinson device</span>.'
      assert.equal(actual,  expected);
    });

    test('To play hooky means to skip class or work.', ()=>{
      let actual = translate.translateAmerican('To play hooky means to skip class or work.');
      let expected = 'To <span class="highlight">bunk off</span> means to skip class or work.'
      assert.equal(actual,  expected);
    });

    test('No Mr. Bond, I expect you to die.', ()=>{
      let actual = translate.translateAmerican('No Mr. Bond, I expect you to die.');
      let expected = 'No <span class="highlight">Mr</span> Bond, I expect you to die.'
      assert.equal(actual,  expected);
    });

    test('Dr. Grosh will see you now.', ()=>{
      let actual = translate.translateAmerican('Dr. Grosh will see you now.');
      let expected = '<span class="highlight">Dr</span> Grosh will see you now.'
      assert.equal(actual,  expected);
    });

    test('Lunch is at 12:15 today.', ()=>{
      let actual = translate.translateAmerican('Lunch is at 12:15 today.');
      let expected = 'Lunch is at <span class="highlight">12.15</span> today.'
      assert.equal(actual,  expected);
    });

  });

  suite('british to american', ()=>{
    
    test('We watched the footie match for a while.', ()=>{
      let actual = translate.translateBrit('We watched the footie match for a while.');
      let expected = 'We watched the <span class="highlight">soccer</span> match for a while.'
      assert.equal(actual,  expected);
    })

    test('Paracetamol takes up to an hour to work.', ()=>{
      let actual = translate.translateBrit('Paracetamol takes up to an hour to work.');
      let expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      assert.equal(actual,  expected);
    })

    test('First, caramelise the onions.', ()=>{
      let actual = translate.translateBrit('First, caramelise the onions.');
      let expected = 'First, <span class="highlight">caramelize</span> the onions.'
      assert.equal(actual,  expected);
    })

    test('I spent the bank holiday at the funfair.', ()=>{
      let actual = translate.translateBrit('I spent the bank holiday at the funfair.');
      let expected = 'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
      assert.equal(actual,  expected);
    })

    test('I had a bicky then went to the chippy.', ()=>{
      let actual = translate.translateBrit('I had a bicky then went to the chippy.');
      let expected = 'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
      assert.equal(actual,  expected);
    })

    test("I've just got bits and bobs in my bum bag.", ()=>{
      let actual = translate.translateBrit("I've just got bits and bobs in my bum bag.");
      let expected = 'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.'
      assert.equal(actual,  expected);
    })

    test('The car boot sale at Boxted Airfield was called off.', ()=>{
      let actual = translate.translateBrit('The car boot sale at Boxted Airfield was called off.');
      let expected = 'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
      assert.equal(actual,  expected);
    })

    test('Have you met Mrs Kalyani?', ()=>{
      let actual = translate.translateBrit('Have you met Mrs Kalyani?');
      let expected = 'Have you met <span class="highlight">Mrs.</span> Kalyani?'
      assert.equal(actual,  expected);
    })

    test('Prof Joyner of King\'s College, London.', ()=>{
      let actual = translate.translateBrit("Prof Joyner of King's College, London.");
      let expected = '<span class="highlight">Prof.</span> Joyner of King\'s College, London.'
      assert.equal(actual,  expected);
    })

    test('Tea time is usually around 4 or 4.30.', ()=>{
      let actual = translate.translateBrit('Tea time is usually around 4 or 4.30.');
      let expected = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
      assert.equal(actual,  expected);
    })

  })

});

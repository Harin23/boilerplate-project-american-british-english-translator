const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  const text = 'Mangoes are my favorite fruit.';
  const locale = 'american-to-british';
  const translated = 'Mangoes are my <span class="highlight">favourite</span> fruit.';

  test("Translation with text and locale fields", function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text: text,
        locale: locale
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {text: text, translation : translated});
        done();
      });
  });

  test("Translation with text and invalid locale field", function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text: text,
        locale: "american"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'Invalid value for locale field' });
        done();
      });
  });

  test("Translation with missing text field", function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({
        locale: locale
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Required field(s) missing' });
        done();
      });
  });

  test("Translation with missing locale field", function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text: text,
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {error: 'Required field(s) missing' });
        done();
      });
  });

  test("Translation with empty text", function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text: "",
        locale: locale
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, { error: 'No text to translate' });
        done();
      });
  });

  test("Translation with text that needs no translation", function (done) {
    chai
      .request(server)
      .post('/api/translate')
      .send({
        text: 'Mangoes are my favourite fruit.',
        locale: locale
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {text: 'Mangoes are my favourite fruit.', translation : "Everything looks good to me!"});
        done();
      });
  });

});

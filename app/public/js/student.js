/* global alert */

(function (){
  'use strict';

  var questions = [];

  function init() {

    // XXX Duplicated temporarily!
    questions = [
      {
        "question": "On average how many people are killed at work each year in the UK?",
        "answers": [
          120,
          220,
          320
        ],
        "answerIndex": 0
      },
      {
        "question": "On average how many people are affected by x?",
        "answers": [
          140,
          620,
          220
        ],
        "answerIndex": 2
      }
    ];

    // TODO on event...
    displayQuestion(0);

  }

  function onAnswerClick(e) {

    var answerIndex = $(e.currentTarget).attr('data-answerindex');

    alert( answerIndex );

  }

  function displayQuestion(questionIndex) {

    var question = questions[questionIndex],
        answers = question.answers;

    $('.student .question').html( question.question );
    $('.student .answers').empty();

    for( var i=0; i < answers.length; i++ ) {

      console.log('answers', answers);
      console.log('answers[i]', answers[i]);

      var $answerLink = $('<a href="#" data-answerindex="'+i+'">'+ answers[i] +'</a>');

      $answerLink.click(onAnswerClick);

      $('.student .answers').append( $answerLink.wrap('<li></li>').parent() );

    }

  }

  init();

})();
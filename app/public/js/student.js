/* global alert */

(function (){
  'use strict';

  var questions = [],
      questionIndex = 0,
      answerIndex = null;

  function init() {

    $.getJSON('/data/sample.json', function(data) {

      questions = data.qa;

      // TODO on event...
      displayQuestion(0);

    });

  }

  function onAnswerClick(e) {

    $('.answers li a').removeClass('selected');

    $(e.currentTarget).addClass('selected');

    answerIndex = $(e.currentTarget).attr('data-answerindex');

    console.log( 'Answer:', answerIndex );

    // TEMP replace with event!
    setTimeout(function() {

      revealAnswer();

    }, 2000);

  }

  function revealAnswer() {

    var realAnswerIndex = questions[ questionIndex ].answerIndex;

    highlightCorrectAnswer( realAnswerIndex );

    if( parseInt(answerIndex) === realAnswerIndex ) {

      console.log('Correct!');
      $('.student .message').text('You got it, woah baby you got it!').show();

    } else {

      console.log('Incorrect!');
      highlightIncorrectAnswer( answerIndex );
      $('.student .message').text('Unlucky!').show();

    }

  }

  function highlightCorrectAnswer( answIndex ) {

    $('.answers [data-answerindex='+answIndex+']').addClass('correct');

  }

  function highlightIncorrectAnswer( answIndex ) {

    $('.answers [data-answerindex='+answIndex+']').addClass('incorrect');

  }

  function displayQuestion(quIndex) {

    questionIndex = quIndex;

    var question = questions[questionIndex],
        answers = question.answers;

    $('.student .question').html( question.question );
    $('.student .answers').empty();
    $('.student .message').hide();

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
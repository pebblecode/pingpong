/* global Firebase */

(function (){
  'use strict';

  var myRootRef = new Firebase('https://pingpongapp.firebaseio.com/'),
      currentQuestion = myRootRef.child('currentQuestion'),
      studentAnswers = myRootRef.child('studentAnswers'),
      stopped = myRootRef.child('stopped'),
      question = null,
      answerIndex = null;

  function init() {

    currentQuestion.on('value', function(data) {

      console.log('data', data);

      question = data.val();

      console.log('data.val()', data.val());

      if( question && question.answers ) {
        displayQuestion();
      } else {
        console.warn('Invalid question', question);
      }

    });

    stopped.on('value', function(data) {

      if( data.val() ) {

        revealAnswer();

      }

    });

  }

  function onAnswerClick(e) {

    $('.answers li a').removeClass('selected');

    $(e.currentTarget).addClass('selected');

    answerIndex = $(e.currentTarget).attr('data-answerindex');

    console.log( 'Answer:', answerIndex );

    studentAnswers.transaction(function(currentValue) {
      if( !currentValue ) { currentValue = []; }
      currentValue[answerIndex] = currentValue[answerIndex] || 0;
      currentValue[answerIndex] = currentValue[answerIndex] + 1;
      return currentValue;
    });

    lockAnswering();

  }

  function revealAnswer() {

    var realAnswerIndex = question.answerIndex;

    highlightCorrectAnswer( realAnswerIndex );

    if( parseInt(answerIndex, 10) === realAnswerIndex ) {

      console.log('Correct!');
      $('.student .message').text('You got it, woah baby you got it!').show();

    } else {

      console.log('Incorrect!');
      highlightIncorrectAnswer( answerIndex );
      $('.student .message').text('Unlucky!').show();

    }

  }

  function lockAnswering() {

    $('.answers a').addClass('locked');

  }

  function unlockAnswering() {

    $('.answers a').removeClass('locked');

  }

  function highlightCorrectAnswer( answIndex ) {

    $('.answers [data-answerindex='+answIndex+']').addClass('correct');

  }

  function highlightIncorrectAnswer( answIndex ) {

    $('.answers [data-answerindex='+answIndex+']').addClass('incorrect');

  }

  function displayQuestion() {

    var answers = question.answers;

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

    unlockAnswering();

  }

  init();

})();
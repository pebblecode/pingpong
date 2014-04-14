/* global Firebase, FastClick */

(function (){
  'use strict';

  var myRootRef = new Firebase('https://pingpongapp.firebaseio.com/'),
      currentQuestion = myRootRef.child('currentQuestion'),
      studentAnswers = myRootRef.child('studentAnswers'),
      question = null,
      answerIndex = null;

  function init() {

    currentQuestion.on('value', function(data) {

      console.log('data', data);

      question = data.val();

      console.log('data.val()', data.val());

      if( question && question.answers ) {

        displayQuestion();

        currentQuestion.child('stopped').on('value', function(data) {

          if( data.val() ) {

            revealAnswer();

          }

        });

      } else {
        console.warn('Invalid question', question);
      }

    });

    // FastClick, to get rid of 300ms click delay on mobile
    $(function() {
      FastClick.attach(document.body);
    });

  }

  function onAnswerClick(e) {

    e.preventDefault();

    var $currentAnswerLink = $(e.currentTarget);

    if( !$currentAnswerLink.hasClass('locked') ) {

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

  }

  function revealAnswer() {

    lockAnswering();

    var yourAnswer = answerIndex == null ? -1 : parseInt(answerIndex, 10),
        realAnswerIndex = question.answerIndex;

    highlightCorrectAnswer( realAnswerIndex );

    if( yourAnswer === realAnswerIndex ) {

      console.log('Correct!');
      $('.student .message').text('Ping! You\'re right!').show();

    } else {

      if( !!yourAnswer ) {

        console.log('Incorrect!');
        highlightIncorrectAnswer( answerIndex );
        $('.student .message').text('Pong! You\'re wrong!').show();

      }

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

    answerIndex = null;

    unlockAnswering();

  }

  init();

})();
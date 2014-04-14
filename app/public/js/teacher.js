/*global Firebase:true, Handlebars:true */
(function (){
  'use strict';

  var questionData;

  var myRootRef = new Firebase('https://pingpongapp.firebaseio.com/');
  var currentQuestion = myRootRef.child("currentQuestion");
  var studentAnswers = myRootRef.child("studentAnswers");

  function updateCurrentQuestion(q) {
    currentQuestion.set(q);
  }

  function init() {
    $.getJSON('/data/sample.json', function(dataVal) {
      var data = dataVal.qa;
      questionData = dataVal.qa;
      var questions = [];
      for (var i = 0; i < data.length; i++) {
        questions.push(data[i].question);
      }

      // Generate questions list
      var questionsListTemplate = $("#questions-list-template").html();
      var qList = Handlebars.compile(questionsListTemplate)({
        questions: questions
      });

      var qListContainer = $(".questions-list");
      qListContainer.append(qList);

      $(".questions-list ul li a").click(function(e) {
        e.preventDefault();
        currentQuestion.remove();
        if (studentAnswers) {
          studentAnswers.remove();
        }

        var questionIndex = $(e.target).data('id');
        var questionTemplate = $("#question-template").html();
        var question = Handlebars.compile(questionTemplate)({
          question: questionData[questionIndex].question,
          id: questionIndex,
          answers: questionData[questionIndex].answers
        });
        var questionContainer = $(".question");

        questionContainer.empty().append(question);


        var startButton = $("#start-question");
        var stopButton = $("#stop-question");
        startButton.click(function(e) {
          var questionIndex = $(e.target).data("question");

          // Reset student answers
          studentAnswers.remove();

          // Update question
          var updateData = questionData[questionIndex];
          updateData.stopped = false;
          updateCurrentQuestion(updateData);

          // Disable start button and enable stop button
          startButton.addClass("disabled");
          stopButton.removeClass("disabled");
        });

        stopButton.click(function(e) {
          var questionIndex = $(e.target).data("question");
          var updateData = questionData[questionIndex];
          updateData.stopped = true;
          updateCurrentQuestion(updateData);

          // Disable stop button and enable start again
          stopButton.addClass("disabled");
          startButton.removeClass("disabled");
        });

        studentAnswers.on('value', function(data) {
          data = data.val();
          if (data !== null) {
            var sum = _.reduce(data, function(memo, num){ return memo + num; }, 0);
            var arrayLength = data.length;
            if (arrayLength !== null) {
              for (var i = 0; i < arrayLength; i++) {
                var value = data[i] || 0;
                var percent = (value/sum)*100;
                var index = i + 1;
                $('.bar-graph li:nth-child(' + index + ')').css('width', percent + '%');
                $('.bar-graph li:nth-child(' + index + ') span').text(percent + '%');
              }
            }
          }
        });

      });

    });

  }

  init();

})();

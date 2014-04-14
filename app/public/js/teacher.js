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
          updateCurrentQuestion(questionData[questionIndex]);

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
      });

    });

  }

  init();

})();

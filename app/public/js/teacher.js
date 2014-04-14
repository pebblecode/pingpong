/*global Firebase:true, Handlebars:true */
(function (){
  'use strict';

  var questionData;
  var myRootRef = new Firebase('https://pingpongapp.firebaseio.com/');
  var currentQuestion = myRootRef.child("currentQuestion");

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
        var questionIndex = $(e.target).data('id');
        var questionTemplate = $("#question-template").html();
        var question = Handlebars.compile(questionTemplate)({
          question: questionData[questionIndex].question,
          id: questionIndex
        });
        var questionContainer = $(".question");
        questionContainer.empty().append(question);

        $("#start-question").click(function(e) {
          var questionIndex = $(e.target).data("question");

          updateCurrentQuestion(questionData[questionIndex]);
        });

        $("#stop-question").click(function(e) {
          var questionIndex = $(e.target).data("question");

          currentQuestion.remove();
        });
      });

    });

  }

  init();

})();

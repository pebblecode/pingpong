/*global Firebase:true, Handlebars:true */
(function (){
  'use strict';

  var myRootRef = new Firebase('https://pingpongapp.firebaseio.com/');

  function init() {
    $.getJSON('/data/sample.json', function(dataVal) {
      var data = dataVal.qa;
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
    });
  }

  $(".start-button").click(function() {
    console.log("start");
  });

  init();

})();
/*global Firebase:true, Handlebars:true */
(function (){
  'use strict';

  var myRootRef = new Firebase('https://pingpongapp.firebaseio.com/');
  var currentQuestion = myRootRef.child("currentQuestion");

  currentQuestion.on('value', function(data) {
    var q = data.val();
    var qContainer = $(".main");

    if (q) {
      var questionTemplate = $("#question-template").html();
      var question = Handlebars.compile(questionTemplate)(q.question);

      qContainer.replaceWith(question);
    } else {
      qContainer.empty();
    }
  });

})();
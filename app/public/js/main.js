(function (){
  'use strict';

  var start = $('#start-question');
  var stop = $('#stop-question');

  start.click(function() {
    console.log(start.data('question'));
    // start question here
  });

  stop.click(function() {
    console.log(stop.data('question'));
    // start question here
  });


})();

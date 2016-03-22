(function(module){
  var workController = {};

  workController.index = function() {
    console.log('test');
    $('.tab-content').hide();
    $('#work').fadeIn();
  };

  module.workController = workController;
})(window);

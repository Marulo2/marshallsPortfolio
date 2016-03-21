(function(module){
  var projectController = {};

  projectController.index = function() {
    $('.tab-content').hide();
    $('#projects').fadeIn();
  };

  module.projectController = projectController;
})(window);

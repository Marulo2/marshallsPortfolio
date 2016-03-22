(function(module){
  var schoolController = {};

  schoolController.index = function() {
    $('.tab-content').hide();
    $('#school').fadeIn();
  };

  module.schoolController = schoolController;
})(window);

(function(module){
  var projectController = {};

  projectController.index = function() {
    $('.tab-content').hide();
    $('#projects').fadeIn();

    repos.requestRepos(repoView.index);
  };

  module.projectController = projectController;
})(window);

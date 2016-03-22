(function(module) {
  var repoView = {};
  var ui = function() {
    var $repos = $('#repos');

    $repos.find('ul').empty();
    $repos.show().siblings().hide();
  };

  var render = Handlebars.compile($('#repo-template').text());

  repoView.index = function() {
    ui();

    $('#repos ul').append(
      repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(window);

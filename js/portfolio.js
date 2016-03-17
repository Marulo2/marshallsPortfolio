(function(module) {
  function Portfolio (opts) {
    Object.keys(opts).forEach(function(property, keys) {
      this[property] = opts[property];
    },this);
  }

  Portfolio.projArray = [];
  Portfolio.schoolArray = [];
  Portfolio.workArray = [];

  Portfolio.prototype.toHtml = function() {
    var source = $('#projects-template').html()
    var template = Handlebars.compile(source);

    return template(this);
  }

  function makeFetchContent(localStorageId, jsonPath, loadContent) {
    return function(callback) {
      if (localStorage[localStorageId]) {
        loadContent(JSON.parse(localStorage[localStorageId]));
        callback();
      } else {
        $.getJSON(jsonPath, function(data){
          console.log(data);
          loadContent(data);
          localStorage[localStorageId] = JSON.stringify(data);
          callback();
        })
      }
    }
  };

  function makeloadContent(array) {
    return function(data) {
      Portfolio[array] = data.map(function(ele){
        return new Portfolio(ele)
      })
    }
  };

  Portfolio.loadProjects = makeloadContent('projArray');
  Portfolio.loadSchool = makeloadContent('schoolArray');
  Portfolio.loadWork = makeloadContent('workArray');

  Portfolio.fetchSchool = makeFetchContent('schoolData', 'data/school.json', Portfolio.loadSchool);
  Portfolio.fetchProjects = makeFetchContent('projectData', 'data/JSON.json', Portfolio.loadProjects);
  Portfolio.fetchWork = makeFetchContent('workData', 'data/work.json', Portfolio.loadWork);

  module.Portfolio = Portfolio;
})(window)

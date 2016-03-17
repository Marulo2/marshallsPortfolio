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

  function fetchContent(localStorageId, jsonPath, loadContent, callback) {
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
  };

  Portfolio.fetchSchool = function(callback) {
    fetchContent('schoolData', 'data/school.json', Portfolio.loadSchool, callback);
  }

  Portfolio.fetchProjects = function(callback) {
    fetchContent('projectData', 'data/JSON.json', Portfolio.loadProjects, callback);
  }

  Portfolio.fetchWork = function(callback) {
    fetchContent('workData', 'data/work.json', Portfolio.loadWork, callback);
  }

  function loadC(data, array) {
    Portfolio[array] = data.map(function(ele){
      return new Portfolio(ele)
    })
  }

  Portfolio.loadProjects = function(data) {
    loadC(data, 'projArray');
  }

  Portfolio.loadSchool = function(data) {
    loadC(data, 'schoolArray');
  }

  Portfolio.loadWork = function(data) {
    loadC(data, 'workArray');
  }

  module.Portfolio = Portfolio;
})(window)

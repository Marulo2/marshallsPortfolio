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

  function fetchContent(localStorageId, jsonPath, callback) {
    if (localStorage[localStorageId]) {
      Portfolio.loadProjects(JSON.parse(localStorage[localStorageId]));
      callback();
    } else {
      $.getJSON(jsonPath, function(data){
        console.log(data);
        Portfolio.loadProjects(data);
        localStorage[localStorageId] = JSON.stringify(data);
        callback();
      })
    }
  };

  Portfolio.fetchProjects = function(callback) {
    fetchContent('projectData', 'data/JSON.json', callback);
  }

  Portfolio.fetchSchool = function(callback) {
    fetchContent('schoolData', 'data/school.json', callback);
  }

  Portfolio.fetchWork = function(callback) {
    fetchContent('workData', 'data/work.json', callback);
  }

  Portfolio.loadProjects = function(data) {
    data.sort(function(a, b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    Portfolio.projArray = data.map(function(ele) {
      return new Portfolio(ele);
    })
  };

  Portfolio.loadSchool = function(data) {
    data.sort(function(a, b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    Portfolio.schoolArray = data.map(function(ele) {
      return new Portfolio(ele);
    })
  };

  Portfolio.loadWork = function(data) {
    data.sort(function(a, b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    Portfolio.workArray = data.map(function(ele) {
      return new Portfolio(ele);
    })
  };

  module.Portfolio = Portfolio;
})(window)



///////////////////////////////////////////////////////



// Portfolio.prototype = function() {
//
//   Portfolio.toHtml = function() {
//     var source = $('#projects-template').html()
//     var template = Handlebars.compile(source);
//
//     this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
//     this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
//
//
//     return template(this);
//   },
//
//
//   Portfolio.fetchProjects = function(callback) {
//     if (localStorage.projectData) {
//       Portfolio.loadProjects(JSON.parse(localStorage.projectData));
//       callback();
//     } else {
//       $.getJSON('/data/JSON.json', function(projectData){
//         console.log(projectData);
//         Portfolio.loadProjects(projectData);
//         localStorage.projectData = JSON.stringify(projectData);
//         callback();
//       })
//     }
//   },
//
//   Portfolio.fetchSchool = function(callback) {
//     if (localStorage.schoolData) {
//       Portfolio.loadSchool(JSON.parse(localStorage.schoolData));
//       callback();
//     } else {
//         $.getJSON('/data/school.json', function(schoolData){
//         console.log(schoolData);
//         Portfolio.loadSchool(schoolData);
//         localStorage.schoolData = JSON.stringify(schoolData);
//         callback();
//       })
//     }
//   },
//
//   portfolio.fetchWork = function(callback) {
//     if (localStorage.workData) {
//       Portfolio.loadWork(JSON.parse(localStorage.workData));
//       callback();
//     } else {
//       $.getJSON('/data/work.json', function(workData){
//         console.log(workData);
//         Portfolio.loadWork(workData);
//         localStorage.workData = JSON.stringify(workData);
//         callback();
//       })
//     }
//   },
//
//   Portfolio.loadProjects = function(data) {
//     data.sort(function(a, b) {
//       return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
//     }),
//
//     Portfolio.projArray = data.map(function(ele) {
//       return new Portfolio(ele);
//     })
//   },
//
//   portfolio.loadSchool = function(data) {
//     data.sort(function(a, b) {
//       return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
//     });
//
//     Portfolio.schoolArray = data.map(function(ele) {
//       return new Portfolio(ele);
//     })
//   },
//
//   Portfolio.loadWork = function(data) {
//     data.sort(function(a, b) {
//       return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
//     });
//
//     Portfolio.workArray = data.map(function(ele) {
//       return new Portfolio(ele);
//     })
//   };
//
// }

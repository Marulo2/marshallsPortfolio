
function Portfolio (opts) {
  this.project = opts.project;
  this.projectUrl = opts.projectUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Portfolio.projectContent = [];
Portfolio.schoolContent = [];
Portfolio.workContent = [];

Portfolio.prototype.toHtml = function() {
  var source = $('#projects-template').html()
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';


  return template(this);
}

Portfolio.fetchAll = function() {
  if (localStorage.projectData) {
    console.log('test1')
    Portfolio.loadAll(localStorage.projectData);
    tabSlide.initIndexPage();
  } else {
    console.log('test2')
    $.getJSON('data/JSON.json', function(projectData) {
      console.log(projectData);
      localStorage.projectData = projectData;
      Portfolio.loadAll(projectData);
      tabSlide.initIndexPage();
    }).error(function(e) { console.log(e); })
  }
}

Portfolio.loadAll = function(projectData) {
  projectData.sort(function(a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  projectData.forEach(function(ele) {
    Portfolio.projectContent.push(new Portfolio(ele));
  });

  // schoolData.sort(function(a,b) {
  //   return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  // });
  //
  // schoolData.forEach(function(ele) {
  //   Portfolio.schoolContent.push(new Portfolio(ele));
  // })

  // workData.sort(function(a,b) {
  //   return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  // });
  //
  // workData.forEach(function(ele) {
  //   Portfolio.workContent.push(new Portfolio(ele));
  // });

  Portfolio.projectContent.forEach(function(a){
    $('#projects').append(a.toHtml())
  });

  Portfolio.schoolContent.forEach(function(a){
    $('#school').append(a.toHtml())
  });

  Portfolio.workContent.forEach(function(a){
    $('#work').append(a.toHtml())
  });
  console.log('test3')
};

$(document).ready(function() {
  Portfolio.fetchAll();
  Portfolio.loadAll(Portfolio.projectContent);
});

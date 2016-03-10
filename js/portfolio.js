var tabContent = [];

function Portfolio (opts) {
  this.project = opts.project;
  this.projectUrl = opts.projectUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Portfolio.prototype.toHtml = function() {
  var source = $('#projects-template').html()
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return template(this);
}

projectData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

projectData.forEach(function(ele) {
  tabContent.push(new Portfolio(ele));
})

tabContent.forEach(function(a){
  $('#projects').append(a.toHtml())
});

schoolData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

schoolData.forEach(function(ele) {
  tabContent.push(new Portfolio(ele));
})

tabContent.forEach(function(a){
  $('#school').append(a.toHtml())
});

workData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

workData.forEach(function(ele) {
  tabContent.push(new Portfolio(ele));
})

tabContent.forEach(function(a){
  $('#work').append(a.toHtml())
});

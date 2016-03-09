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
  var $newPortfolio = $('projects.template').clone();
  $newPortfolio.removeClass('template');
  if (!this.publishedOn) {
    $newPortfolio.addClass('draft');
  }
  $newPortfolio.attr('data-category', this.category);
  $newPortfolio.attr('data-project', this.project);

  $newPortfolio.find('.byline a').html(this.project);
  $newPortfolio.find('.byline a').attr('href', this.projectUrl);
  $newPortfolio.find('h1:first').html(this.title);
  $newPortfolio.find('.projects-body').html(this.body);
  $newPortfolio.find('time[pubdate]').attr('datetime', this.publishedOn)
  $newPortfolio.find('time[pubdate]').attr('title', this.publishedOn)
  $newPortfolio.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago')
  $newPortfolio.append('<hr>');
  return $newPortfolio;
}

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(ele) {
  tabContent.push(new Portfolio(ele));
})

tabContent.forEach(function(a){
  $('#projects').append(a.toHtml())
});

tabContent.forEach(function(a){
  $('#school').append(a.toHtml())
});

tabContent.forEach(function(a){
  $('#work').append(a.toHtml())
});

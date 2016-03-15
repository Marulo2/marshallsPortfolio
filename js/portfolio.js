
function Portfolio (opts) {
  this.project = opts.project;
  this.projectUrl = opts.projectUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

Portfolio.all = [];

Portfolio.prototype.toHtml = function() {
  var source = $('#projects-template').html()
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';


  return template(this);
}

Portfolio.fetchAll = function() {
  if (localStorage.projectData) {
    Portfolio.loadAll(JSON.parse(localStorage.projectData));
    tabSlide.initIndexPage();
  } else {
    $.getJSON('/data/JSON.json', function(projectData){
      console.log(projectData);
      Portfolio.loadAll(projectData);
      localStorage.projectData = JSON.stringify(projectData);
      tabSlide.initIndexPage();
    })
  }
}

// Portfolio.fetchAll = function() {
//   if (localStorage.projectData) {
//     $.ajax({
//       type: 'HEAD',
//       url: '/data/JSON.json',
//       success: function(data, message, xhr) {
//         console.log(xhr);
//         var eTag = xhr.getResponseHeader('eTag');
//         if (!localStorage.eTag || eTag !== localStorage.eTag) {
//           localStorage.eTag = eTag;
//           Portfolio.getAll();
//         } else {
//           Portfolio.loadAll(JSON.parse(localStorage.projectData));
//           tabSlide.initIndexPage();
//         }
//       }
//     });
//   } else {
//     Portfolio.getAll();
//   }
// };

Portfolio.loadAll = function(projectData) {
  projectData.sort(function(a, b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  projectData.forEach(function(ele) {
    Portfolio.all.push(new Portfolio(ele));
  });

  console.log('test3')
};

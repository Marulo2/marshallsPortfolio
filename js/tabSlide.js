
(function(module) {


  var tabSlide = {};

  tabSlide.funFacts = function() {
    return Portfolio.projArray.map(function(portfolio){
      return portfolio.title.length;
    })
    .reduce(function(a,b){
      return a+b;
    })
    $('footer').append('<p>I have ' + funFacts() + ' projects!</p>') //not sure how to grab the number of projects I have needs more work
  }

  tabSlide.populateTab = function() {
    $('projects').each(function() {
      if (!$(this).hasClass('template')) {

        var val = $(this).find('address a').text();
        var optionTag = '<option value="' + val + '">' + val + '</option>';
        $('#project-filter').append(optionTag);

        val = $(this).attr('data-category');
        optionTag = '<option value="' + val + '">' + val + '</option>';
        if ($('#category-filter option[value="' + val + '"]').length === 0) {
          $('#category-filter').append(optionTag);
        }
      }
    });
  };

  tabSlide.handleMainNav = function() {
    $('.main-nav').on('click', '.tab', function() {
      $('.tab-content').hide();
      $('#' + $(this).data('content')).fadeIn();
    });

    $('.main-nav .tab:first').click();
  };

  tabSlide.initProjects = function() {
    Portfolio.projArray.forEach(function(a){
      $('#projects').append(a.toHtml())
    });
    tabSlide.populateTab();
    tabSlide.handleMainNav();
    tabSlide.funFacts();
  }

  tabSlide.initSchool = function() {
    Portfolio.schoolArray.forEach(function(a){
      $('#school').append(a.toHtml())
    });
  }

  tabSlide.initWork = function() {
    Portfolio.workArray.forEach(function(a){
      $('#work').append(a.toHtml())
    });
  }
  module.tabSlide = tabSlide;
})(window);

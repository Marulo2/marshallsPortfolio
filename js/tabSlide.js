(function(module) {
  var tabSlide = {};

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

  tabSlide.initProjects = function() {
    Portfolio.projArray.forEach(function(a){
      $('#projects').append(a.toHtml())
    });
    tabSlide.populateTab();
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

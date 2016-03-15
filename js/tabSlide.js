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

tabSlide.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click();
};


tabSlide.initIndexPage = function() {
  Portfolio.all.forEach(function(a){
    $('#projects').append(a.toHtml())
    $('#work').append(a.toHtml())
    $('#school').append(a.toHtml())
  });

  tabSlide.populateTab();
  tabSlide.handleMainNav();
};

(function(module) {
  var tabSlide = {};

  function makeInitAll(dataArray, id) {
    return function() {
      Portfolio[dataArray].forEach(function(a){
        $(id).append(a.toHtml())
      });

      $(document).ready(function(){
        $('.bxslider').bxSlider();
      });
    }
  }

  tabSlide.initSchool = makeInitAll('schoolArray', '#school');
  tabSlide.initProjects = makeInitAll('projArray', '#projects');
  tabSlide.initWork = makeInitAll('workArray', '#work');

  module.tabSlide = tabSlide;
})(window);

// build the page for the toolkit modules from a csv
d3.csv("../data/toolkit-modules.csv", function(data){

  var steps = [];
  var substeps = [];

  $.each(data,function(index, item){
    if($.inArray(item["step-no"], steps) === -1){
      var stepHtml = '<div class="panel panel-default">' +
        '<div class="panel-heading" role="tab" id="heading-' + item["step-no"] + '">' +
          '<h4 class="panel-title">' +
            '<a role="button" data-toggle="collapse" data-parent="#accordion-' + item["module-no"] + '" href="#collapse-' + item["step-no"] + '" aria-expanded="false" class="collapsed" aria-controls="collapseOne">' +
              item["step"] +
            '</a>' +
          '</h4>' +
        '</div>' +
        '<div id="collapse-' + item["step-no"] + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-' + item["step-no"] + '" aria-expanded="false" style="height: 0px;">' +
          '<div class="panel-body">' +
          // list of substeps goes here
          '</div>' +
        '</div>' +
      '</div>';
      var selector = "#accordion-" + item["module-no"];
      $(selector).append(stepHtml);
      steps.push(item["step-no"]);
    }
  });

  $.each(data,function(index, item){
    if($.inArray(item["sub-no"], substeps) === -1){
      var substepHtml = '<div id="' + item["sub-no"] + '">' +
          '<p>' + item["sub"] + '</p>' +
          '<div class="content-substep">' +
            // document links go here in collapsible thing?
          '</div>' +
        '</div>';
      var selector = "#collapse-" + item["step-no"] + " .panel-body";
      $(selector).append(substepHtml);
      steps.push(item["substep-no"]);
    }
  });

});

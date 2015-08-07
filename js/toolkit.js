function buildModuleSections(){
  d3.csv("data/toolkit-modules.csv", function(data){

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
            '<a class="substep-name" role="button" data-toggle="collapse" href="#well-' + item["sub-no"] + '" aria-expanded="false" aria-controls="well-' + item["sub-no"] + '">' + item["sub"] + '</a>' +
            '<div class="collapse" id="well-' + item["sub-no"] + '">' +
              '<div class="well well-documents">' +
                // document links go here
              '</div>' +
            '</div>' +
          '</div>';
        var selector = "#collapse-" + item["step-no"] + " .panel-body";
        $(selector).append(substepHtml);
        steps.push(item["substep-no"]);
      }
    });
    buildDocumentLinks();
  });
}

function buildDocumentLinks(){
  d3.csv("data/toolkit-documents.csv", function(data){

    $.each(data,function(index, item){
        var documentHtml = '<div class="document-link"><a >' + item["doc-name"] + '</a></div>';
        var selector = "#well-" + item["sub-no"] + " .well";
        $(selector).append(documentHtml);

    });
  });
}


// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($("#navbar-modules-links").children().hasClass("active")) {
        $(".navbar-modules").fadeIn();
    } else {
        $(".navbar-modules").fadeOut();
    }
});

buildModuleSections();

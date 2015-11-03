function buildModuleSections(){
  d3.csv("data/toolkit-modules.csv", function(data){

    $.each(data,function(index, item){

      if(item["class"] === "step"){
        var stepHtml = '<div class="panel panel-default">' +
          '<div class="panel-heading" role="tab" id="heading-' + item["m-s-ss"] + '">' +
            '<h4 class="panel-title panel-title-custom">' +
              '<a role="button" data-toggle="collapse" data-parent="#accordion-' + item["m-s-ss"] + '" href="#collapse-' + item["m-s-ss"] + '" aria-expanded="false" class="collapsed" aria-controls="collapseOne">' +
                item["title"] + ' &nbsp; <i class="fa fa-plus-square-o"></i>' +
              '</a>' +
            '</h4>' +
          '</div>' +
          '<div id="collapse-' + item["m-s-ss"] + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading-' + item["m-s-ss"] + '" aria-expanded="false" style="height: 0px;">' +
            '<div class="panel-body">' +
              '<div id="links-' + item["m-s-ss"] + '" class="links-group">' +
              // step level document links go here
              '</div>' +
              // list of substeps goes here
            '</div>' +
          '</div>' +
        '</div>';
        var selector = "#accordion-" + item["module"];   // e.g. "#accordion-m1"
        $(selector).append(stepHtml);
      }
      if(item["class"] === "substep"){
        var substepHtml = '<div id="' + item["m-s-ss"] + '" class="substepbox">' +
            '<a class="substep-name" role="button" data-toggle="collapse" href="#well-' + item["m-s-ss"] + '" aria-expanded="false" aria-controls="well-' + item["m-s-ss"] + '">' + item["title"] + ' &nbsp; <i class="fa fa-plus-square-o"></i>' + '</a>' +
            '<div class="collapse" id="well-' + item["m-s-ss"] + '">' +
              '<div id="links-' + item["m-s-ss"] + '" class="well well-documents links-group">' +
                // substep level document links go here
              '</div>' +
            '</div>' +
          '</div>';
        var selector = "#collapse-" + item["m-s-ss"].substring(0,3) + "-00 .panel-body";
        $(selector).append(substepHtml);
      }

    });

    buildDocumentLinks();
  });
}

function buildDocumentLinks(){
  d3.csv("data/toolkit-documents.csv", function(data){

    $.each(data,function(index, item){
        var documentHtml = '<div class="document-link" >' +
        '<a href="https://github.com/AmericanRedCross/ctp-toolkit-documents/raw/master/' +
        encodeURI(item["file"]) + '" download>' + item["title"] +
        ' &nbsp; ';
        switch (item["format"]) {
          case 'pdf':
            documentHtml += '<i class="fa fa-file-pdf-o"></i>';
            break;
          case 'word':
            documentHtml += '<i class="fa fa-file-word-o"></i>';
            break;
          case 'excel':
            documentHtml += '<i class="fa fa-file-excel-o"></i>';
            break;
          case 'ppt':
            documentHtml += '<i class="fa fa-file-powerpoint-o"></i>';
            break;
          default:
            break;
        }
        documentHtml +='</a></div>';
        var selector = "#links-" + item["m-s-ss-d"].substring(0,6);
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

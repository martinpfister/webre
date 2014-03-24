$( document ).ready(function() {

	jQuery('img.svg').each(function(){
    	var $img = jQuery(this);
    	var imgID = $img.attr('id');
    	var imgClass = $img.attr('class');
    	var imgURL = $img.attr('src');

    	jQuery.get(imgURL, function(data) {
        	// Get the SVG tag, ignore the rest
        	var $svg = jQuery(data).find('svg');

        	// Add replaced image's ID to the new SVG
        	if(typeof imgID !== 'undefined') {
            	$svg = $svg.attr('id', imgID);
        	}
        	// Add replaced image's classes to the new SVG
        	if(typeof imgClass !== 'undefined') {
            	$svg = $svg.attr('class', imgClass+' replaced-svg');
        	}

        	// Remove any invalid XML tags as per http://validator.w3.org
        	$svg = $svg.removeAttr('xmlns:a');

        	// Replace image with new SVG
        	$img.replaceWith($svg);
    }, 'xml');
    });
    //Widgets
    var widgets = new Array();
    widgets['platzhalter']  = '<div class="widget platzhalter"><p>Ein Platzhalter Text</p></div>';
    widgets['buttonwidget'] = '<div class="widget input"><input type="submit"></div>';
    widgets['eingabefeld']  = '<div class="widget eingabefeld">\
                                <label for="email">E-mail adress</label>\
                                <input type="text" name="email" id="email" placeholder="Enter your e-mail">\
                               </div>';
    widgets['radiobutton']  = ' <div class="widget radiobutton">\
                                  <input type="radio"><input type="radio">\
                                </div>';
    widgets['select']       = ' <div class="widget select">\
                                  <select><option>Option</option><option>Option 1</option><option>Option 2</option></select>\
                                  </div>';
    widgets['checkbox']     = ' <div class="widget checkbox">\
                                  <input type="checkbox">\
                                </div>';
    widgets['bild']         = ' <div class="widget bild">\
                                  <img src="http://lorempixel.com/710/80/">\
                                </div>';

    //Start Gridster
     var gridster = $(".gridster ul").gridster({
          widget_margins: [5, 5],
          autogrow_cols: false,
          widget_base_dimensions: [120, 40],
          min_rows: 3,
          max_cols: 12,
          resize: {
            enabled: true,
            min_size: [2, 2]
          }
    }).data('gridster');

    $(document).on( "click", ".delete", function() {
        gridster.remove_widget( $(this).parent() );
    });
    $(document).on( "click", ".edit", function(e) {
        $('#toolbox').fadeIn();
    });
    $(document).on( "click", ".close", function() {
        $('#toolbox').fadeOut();
    });


    $(document).on( "click", "#sidebar .button", function() {
        gridster.add_widget.apply(gridster, ['<li>\
                                                  <span class="delete"><img src="images/icons/remove2.svg" /></span>\
                                                  <span class="edit">\
                                                    <img src="images/icons/pencil2.svg" />\
                                                  </span>'
                                                   + widgets[$(this).attr("id")] + 
                                              '</li>',
                                               6, 2, 1, 1, null,null,
                                                function() {
                                                    //console.log('33324233');
                                                }
                                              ]);
     });

    //Start Foundation
    $(document).foundation();

    //Set Height
    resizeContent();

    $(window).resize(function() {
        resizeContent();
    });

});

function resizeContent() {
    var win_height = $('body').height();
    console.log(win_height); 
    workbench_height = win_height - 151;
    sidebar_height = win_height - 121;
    toolbox_height = win_height - 151;
    $('#workbench').height(workbench_height);
    $('#sidebar').height(sidebar_height);
    $('#toolbox').height(toolbox_height);
}
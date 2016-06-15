$(function() {
    var $allVideos = $("iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com'], object, embed"),
    $fluidEl = $("figure");

	$allVideos.each(function() {

	  $(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');

	});

	$(window).resize(function() {

	  var newWidth = $fluidEl.width();
	  $allVideos.each(function() {

	    var $el = $(this);
	    $el
	        .width(newWidth)
	        .height(newWidth * $el.attr('data-aspectRatio'));

	  });

	}).resize();

});
// Accordion original without links to each accordion tab
 /*$(function() {
    $( "#accordion1" ).accordion({ header: "h3", collapsible: true, heightStyle: "content", active: false 
	        active: hashId});

  });
  */
  $(function () {

    var hashId = 0,
        $accordion = $('#accordion1');
    if (window.location.hash) {
        $accordion.children('h3').each(function (i) {
            var txt = this.textContent.toLowerCase().replace(/\s+/g, '_');
            if ( txt === window.location.hash.slice(1) ) {
                hashId = i;
            }
        });
    }

    $accordion.accordion({
		header: 'h3',
        active: hashId,
        animate: 500,
        heightStyle: 'content',
        collapsible: true,


        create: function (event, ui) {
            $accordion.children('h3').each(function (i) {
                // set id here because jQuery UI sets them as "ui-accordion-#-header-#"
                this.id = this.textContent.toLowerCase().replace(/\s+/g, '_');
                // add the anchor
                $(this).before('<a class="accordion-link link" data-index="' + i +
                     '" href="#' + this.id + '"></a>');
            });
            $accordion.find('.accordion-link').click(function () {
                // the active option requires a numeric value (not a string, e.g. "1")
                $accordion.accordion( "option", "active", $(this).data('index') );

                // uncomment out the return false below to prevent the header jump
                return false;
            });
        }
    });

});



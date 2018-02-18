$(document).ready(function() {

	// YOUTUBE THUMBNAIL
	// 1) add thumbnail
	$(".js-youtube-video-thumbnail").each(function() {
		var youtubeVideoID = $(this).children('iframe').attr('src');
		youtubeVideoID = youtubeVideoID.split('/').pop();
		$(this).css("background-image", "url(https://img.youtube.com/vi/" + youtubeVideoID + "/sddefault.jpg)")
	});
	// 2) on click play iframe
	$('.js-youtube-video-thumbnail').on('click' , function() {
		var $this = $(this);
		$this.children("iframe")[0].src += "?autoplay=1";
		setTimeout(function() {
			$this.children(".video-thumbnail__icon").addClass('d-none');
			$this.children("iframe").removeClass('d-none');
		}, 400);
	});

	// VIMEO THUMBNAIL
	// 1) add thumbnail
	$(".js-vimeo-video-thumbnail").each(function() {
		var $this = $(this);
		var vimeoVideoID = $this.children('iframe').attr('src');
		vimeoVideoID = vimeoVideoID.split('/').pop();
		$.getJSON('http://www.vimeo.com/api/v2/video/' + vimeoVideoID + '.json?callback=?', { format: "json" }, function (data) {
			var thumbnailImg = data[0].thumbnail_large;
			$this.css("background-image", "url(" + thumbnailImg + ")");
		});
	});
	// 2) on click play iframe
	$('.js-vimeo-video-thumbnail').on('click' , function() {
		var $this = $(this);
		$this.children("iframe")[0].src += "?autoplay=1";
		setTimeout(function() {
			$this.children(".video-thumbnail__icon").addClass('d-none');
			$this.children("iframe").removeClass('d-none');
		}, 400);
	});

	// GOOGLE MAP =================================
	function initMap() {
		var coordinates = 'lat: 37.779287, lng: -122.429109',
			zoom = 15;

		map = new google.maps.Map(document.getElementById('js-google-map'), {
			center: {coordinates},
			zoom: 15,
			disableDefaultUI: true,
			zoomControl: false,
			zoomControlOptions: {
				position: google.maps.ControlPosition.LEFT_CENTER
			},
			styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
		});

		var marker = new google.maps.Marker({
			position: {lat: 37.779287, lng: -122.429109},
			map: map,
			//icon: 'img/logo_map.png'
		});

		// KEEP THE CENTER CENTERED ON WINDOW RESIZE
		var center = map.getCenter();

		google.maps.event.addDomListener(window, "resize", function() {
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
		});

		$('.map-icon').on('click' , function() {
			google.maps.event.trigger(map, 'resize');
			map.setCenter(center);
			return false;
		});
	}

	if ($('#js-google-map').length) {
		initMap();
	}

});
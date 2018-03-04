(function ($) {

	'use strict';

	$(document).ready(function() {

		// =========================
		// STANDARD GOOGLE MAP =================================
		// =========================

		function initMap() {
			var coordinates = new google.maps.LatLng(40.712348, -74.006720),
			zoom = 12;

			var map = new google.maps.Map(document.getElementById('js-map'), {
				center: coordinates,
				zoom: zoom,
				disableDefaultUI: true,
				zoomControl: true,
				fullscreenControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_CENTER
				},

				// OPTIONAL - styles for theme (https://snazzymaps.com)
				// minify code (https://www.minifier.org)

				// styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
			});

			// OPTIONAL - custom icon
			var icon = {
				url: '../img/svg/icon_map_marker.svg',
				scaledSize: new google.maps.Size(50, 50)
			};

			var marker = new google.maps.Marker({
				position: coordinates,
				map: map,

				// OPTIONAL - animation of marker
				// animation: google.maps.Animation.BOUNCE,

				// OPTIONAL - text on marker hover
				// title:"text on hover",

				// OPTIONAL - custom icon from png or svg
				// icon: icon
			});

			// OPTIONAL - add info window
			var infoWindow = new google.maps.InfoWindow({
				content: '<p>Info window</p>'
			});

			// show info window after click
			/*marker.addListener('click', function() {
				infoWindow.open(map, marker);
			});*/

			// show info window all time
			/*google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
				infoWindow.open(map,marker);
			});*/

			// close info window after click anywhere on the map
			google.maps.event.addListener(map, "click", function() {
				infoWindow.close();
			});

		}

		if ($('#js-map').length) {
			initMap();
		}

		// =========================
		// GOOGLE MAP WITH MULTIPLE MARKER =================================
		// =========================

		function initMapMultipleMarkers() {
			var map = new google.maps.Map(document.getElementById("js-map-multiple-markers"), {
				disableDefaultUI: true,
				zoomControl: true,
				fullscreenControl: true,
				zoomControlOptions: {
					position: google.maps.ControlPosition.RIGHT_CENTER
				},
			});

			// array of markers (with coordinates, name, address)
			var multipleMarkers = [
				{
					lat: 40.679680,
					lng: -73.942175,
					name: "Name 1",
					address:"Address 1"
				},
				{
					lat: 40.729391,
					lng: -74.076758,
					name: "Name 2",
					address:"Address 2"
				},
				{
					lat: 40.745260,
					lng: -73.997794,
					name: "Name 3",
					address:"Address 3"
				}
			];

			var infoWindow = new google.maps.InfoWindow();

			google.maps.event.addListener(map, "click", function() {
				infoWindow.close();
			});

			// Determine the boundaries of the visible area of the map in accordance with the position of the markers
			var bounds = new google.maps.LatLngBounds();

			// create the markers
			for (var i = 0; i < multipleMarkers.length; i++){

				var latLng = new google.maps.LatLng(multipleMarkers[i].lat, multipleMarkers[i].lng);
				var name = multipleMarkers[i].name;
				var address = multipleMarkers[i].address;

				addMarker(latLng, name, address);

				// Expand the boundaries of our visible area by adding the coordinates of our current marker
				bounds.extend(latLng);
			}

			// Automatically scale the map so that all markers are in the visible area of the map
			map.fitBounds(bounds);

			function addMarker(latLng, name, address) {
				var marker = new google.maps.Marker({
					position: latLng,
					map: map,
					title: name
				});

				google.maps.event.addListener(marker, "click", function() {
					var contentString = '<div class="infowindow">' +
																'<h5>' + name + '</h5>' +
																'<p>' + address + '</p>' +
															'</div>';

					infoWindow.setContent(contentString);
					infoWindow.open(map, marker);
				});
			}
		}

		if ($('#js-map').length) {
			initMapMultipleMarkers();
		}

		// =========================
		// YOUTUBE THUMBNAIL =================================
		// =========================

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
				$this.children(".video-thumbnail-icon").addClass('d-none');
				$this.children("iframe").removeClass('d-none');
			}, 400);
		});

		// =========================
		// VIMEO THUMBNAIL =================================
		// =========================

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
				$this.children(".video-thumbnail-icon").addClass('d-none');
				$this.children("iframe").removeClass('d-none');
			}, 400);
		});

		// =========================
		// SMALL HEADER AFTER SCROLL =================================
		// =========================

		$(window).scroll(function() {
			if ($(this).scrollTop() > 0) {
				$('.js-header').addClass('-small-header');
			} else {
				$('.js-header').removeClass('-small-header');
			}
		})

		// =========================
		// SCROLL TOP BUTTON =================================
		// =========================

		// 1) Check to see if the window is top if not then display button
		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.js-scroll-top-btn').addClass('-show');
			} else {
				$('.js-scroll-top-btn').removeClass('-show');
			}
		});

		// 2) Click event to scroll to top
		$('.js-scroll-top-btn').on('click', function() {
			$('body,html').animate({
				scrollTop: 0
			}, 1000);

			return false;
		});

		// =========================
		// SCROLL TO ELEMENT =================================
		// =========================

		$('a').on('click', function() {
			// height of header (for compensation)
			var headerHeight = $('.js-header').outerHeight(),
					idOfElement = $(this).attr('href');

			if (idOfElement.substring(0, 10) === 'scroll-to:') {
				idOfElement = '#' + idOfElement.slice(10);

				if (headerHeight === undefined) {
					headerHeight = 0;
				}

				var top = $(idOfElement).offset().top - headerHeight;
				$('body,html').animate({scrollTop: top}, 1000);
			}
		});

		// =========================
		// STICKY HEADER AND FOOTER =================================
		// =========================

		function stickyHeaderFooter() {
			// 1) height of header
			var headerHeight = $('.js-header').outerHeight();
			// 2) height of footer
			var footerHeight = $('.js-footer').outerHeight();

			// 3) compensation
			$('.js-wrap-for-sticky').css({
				'padding-top': headerHeight,
				'padding-bottom': footerHeight
			});
		}

		stickyHeaderFooter();

		$(window).resize(function() {
			stickyHeaderFooter()();
		});

	});

}(jQuery));
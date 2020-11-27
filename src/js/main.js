'use strict';

jQuery(function($) {
	initObjectFitImagesPolyfill();

	function initObjectFitImagesPolyfill() {
		var $ofi = $('img.js-ofi:not(.js-lazy)');
		objectFitImages($ofi);
	}
});
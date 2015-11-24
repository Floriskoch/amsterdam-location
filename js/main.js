$(document).ready( function() {

	$('#map').height( function() {
		return $(window).height();
	});

	var customMapType = new google.maps.StyledMapType([
	    {
	        "featureType": "landscape",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 60
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 40
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "visibility": "simplified"
	            }
	        ]
	    },
	    {
	        "featureType": "administrative.province",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "lightness": 30
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#ef8c25"
	            },
	            {
	                "lightness": 40
	            }
	        ]
	    },
	    {
	        "featureType": "road.highway",
	        "elementType": "geometry.stroke",
	        "stylers": [
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "poi.park",
	        "elementType": "geometry.fill",
	        "stylers": [
	            {
	                "color": "#b6c54c"
	            },
	            {
	                "lightness": 40
	            },
	            {
	                "saturation": -40
	            }
	        ]
	    },
	    {}
	], {
	  name: 'Custom Style'
	});
	var customMapTypeId = 'custom_style';


	window.map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 52.3702043, lng: 4.899387},
	    scrollwheel: true,
	    zoom: 14,
	    mapTypeControlOptions: {
	      mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
	    }
	});

	map.mapTypes.set(customMapTypeId, customMapType);
  	map.setMapTypeId(customMapTypeId);

	getLocation();

	$.getJSON('data/urinoirs.json', function(data) {
		$.each(data, function(i, item) {

			var position = {
				lat: parseFloat(item.latitude.replace(',', '.')),
				lng: parseFloat(item.longitude.replace(',', '.'))
			};

			var marker = {
				position: position,
				map: map,
				title: item.type,
				icon: 'img/urinoir.png'
			};

			setMarker(marker);
		});
	});

	$.getJSON('data/plaskruis.json', function(data) {
		$.each(data, function(i, item) {

			var position = {
				lat: parseFloat(item.latitude.replace(',', '.')),
				lng: parseFloat(item.longitude.replace(',', '.'))
			};

			var marker = {
				position: position,
				map: map,
				title: item.type,
				icon: 'img/plaskruis.png'
			};

			setMarker(marker);
		});
	});
	
	
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(currentLocation);
    }
}

function currentLocation(data) {
	var marker = {
		position: {
			lat: data.coords.latitude,
			lng: data.coords.longitude
		},
		map: map,
		icon: 'img/user.png'
	}

	setMarker(marker);
}

function setMarker(dataObj) {
	var marker = new google.maps.Marker(dataObj);
}
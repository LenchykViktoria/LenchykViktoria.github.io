'use strict';
const form = $('#contactForm');
form.on('submit', (e) => {
	e.preventDefault();	
});

const servicesTexts = $('.grid-item__text');

servicesTexts.map = [].map;
servicesTexts.forEach = [].forEach;

const arr = servicesTexts.map(el => {
	let a = el.innerText.split('');
	if(a.length < 85) return el.innerText;
	let newA = a.slice(0, 85);
	let index = newA.lastIndexOf(' ');
	return newA.slice(0, index).join('') + '...';
});

servicesTexts.forEach((el, idx) => {
	el.innerText = arr[idx];
});


document.addEventListener('scroll', () => {
	setMenuFixed();
});


const setMenuFixed = () => {
	const navbar = document.getElementsByClassName('navigation')[0];	
	if(window.pageYOffset >= 34){
		navbar.classList.add('fixed-top');
	} else {
		navbar.classList.remove('fixed-top');
	}
};



$(document).ready(function(){
  $('.partners__list').slick({
  	autoplay: true,
  	slidesToShow: 6,
  	arrows: false
  });
});

const mobileMenuButton = $('.navbar-toggler');
		const mobileMenu = $('#navbar');

		mobileMenuButton.on('click', function() {
			mobileMenu.toggleClass('open');
		});

		$('.navigation__link').on('click', function(e){
			e.preventDefault();
			const top = $($(this).attr('href'))[0].offsetTop;
			window.scrollTo({
				top: top,
				behavior: 'smooth'
			});
		});

		$('.up').on('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});


const navForm = document.getElementById('navigator');
const addressFrom = document.getElementById('addressFrom');
const addressTo = document.getElementById('addressTo');
const drivingMode = document.getElementById('drivingMode');
let map;
let directionsService;
let directionsDisplay;
const markersArray = [];

navForm.addEventListener('submit', (e) => {
	e.preventDefault();
	clearOverlays();
	const start = addressFrom.value;
	const end = addressTo.value;
	const mode = drivingMode.value;
	start && end ? calcRoute(start, end, mode) : start ? findPoint(start) :  end ? findPoint(end) : alert('Enter address');
});

function initMap() {
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	const krem = {lat: 49.062785, lng: 33.4156805};
	map = new google.maps.Map(document.getElementById('map'), {zoom: 7, center: krem});
	directionsDisplay.setMap(map);
}

function findPoint(address) {
	const geocoder = new google.maps.Geocoder();
	const infowindow = new google.maps.InfoWindow;
	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == 'OK') {
			map.zoom = 12;
			map.setCenter(results[0].geometry.location);
			const marker = addMarker(results[0].geometry.location)
			infowindow.setContent(results[0].formatted_address);
			infowindow.open(map, marker);
		} else {
			console.log('Geocode was not successful for the following reason: ' + status);
		}
	});
}

function calcRoute(start, end, drivingMode) {
	directionsDisplay.setMap(map);
	var request = {
		origin: start,
		destination: end,
		travelMode: drivingMode
	};
	directionsService.route(request, function(result, status) {
		if (status == 'OK') {
			directionsDisplay.setDirections(result);
		}
	});
}

function addMarker(location) {
	const marker = new google.maps.Marker({
		position: location,
		map: map
	});
	markersArray.push(marker);
	return marker;
}

// Removes the overlays from the map, but keeps them in the array
function clearOverlays() {
	directionsDisplay.setMap(null);
	if (markersArray) {
		for (let i in markersArray) {
			markersArray[i].setMap(null);
		}
	}
}

// Shows any overlays currently in the array
function showOverlays() {
	if (markersArray) {
		for (let i in markersArray) {
			markersArray[i].setMap(map);
		}
	}
}

// Deletes all markers in the array by removing references to them
function deleteOverlays() {
	if (markersArray) {
		for (let i in markersArray) {
			markersArray[i].setMap(null);
		}
		markersArray.length = 0;
	}
}
		
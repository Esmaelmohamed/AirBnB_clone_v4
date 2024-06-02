$(document).ready(function () {
  let selectedAmenities = [];
  let selectedStates = [];
  let selectedCities = [];

  $('.amenities .popover input[type=checkbox]').click(function () {
    const selectedNames = [];
    selectedAmenities = [];

    $('.amenities .popover input[type=checkbox]:checked').each(function () {
      selectedNames.unshift($(this).attr('data-name'));
      selectedAmenities.unshift($(this).attr('data-id'));
    });
    if (selectedNames.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(selectedNames.join(', '));
    }
    console.log(selectedAmenities);
  });

  $('.locations .popover h2 input[type=checkbox]').click(function () {
    const selectedNames = [];
    selectedStates = [];

    $('.locations .popover h2 input[type=checkbox]:checked').each(function () {
      selectedNames.unshift($(this).attr('data-name'));
      selectedStates.unshift($(this).attr('data-id'));
    });
    if (selectedNames.length === 0) {
      $('.locations h6.myStates').html('&nbsp;');
    } else {
      $('.locations h6.myStates').text(selectedNames.join(', '));
    }
    console.log(selectedStates);
  });

  $('.locations .popover ul ul input[type=checkbox]').click(function () {
    const selectedNames = [];
    selectedCities = [];

    $('.locations .popover ul ul input[type=checkbox]:checked').each(function () {
      selectedNames.unshift($(this).attr('data-name'));
      selectedCities.unshift($(this).attr('data-id'));
    });
    if (selectedNames.length === 0) {
      $('.locations h6.myCities').html('&nbsp;');
    } else {
      $('.locations h6.myCities').text(selectedNames.join(', '));
    }
    console.log(selectedCities);
  });

  $('.filters button').click(function (event) {
    event.preventDefault();

    $('.places').text('');

    const data = {
      amenities: selectedAmenities,
      states: selectedStates,
      cities: selectedCities
    };

    listPlaces(JSON.stringify(data));
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (response) {
      $('#api_status').addClass('available');
    },

    error: function (xhr, status) {
      console.log('error ' + xhr);
    }
  });

  listPlaces();
});

function listPlaces (data = '{}') {
  console.log(data);
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    data: data,
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      console.log(places);
      for (let i = 0; i < places.length; i++) {
        $('.places').append(`
<article>
<div class="title_box">
<h2>${places[i].name}</h2>
<div class="price_by_night">${places[i].price_by_night}</div>
</div>
<div class="information">
<div class="max_guest">${places[i].max_guest} ${places[i].max_guest > 1 ? 'Guests' : 'Guest'}</div>
<div class="number_rooms">${places[i].number_rooms} ${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}</div>
<div class="number_bathrooms">${places[i].number_bathrooms} ${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</div>
</div>
<div class="user"></div>
<div class="description">${places[i].description}</div>
</article>
`);
      }
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
}

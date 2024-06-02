$(document).ready(function () {
  // Function to update amenities list when checkboxes are clicked
  $('input[type=checkbox]').click(function () {
    const selectedNames = [];
    const selectedIds = [];
    $('input[type=checkbox]:checked').each(function () {
      selectedNames.push($(this).attr('data-name'));
      selectedIds.push($(this).attr('data-id'));
    });
    if (selectedNames.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(selectedNames.join(', '));
    }
    console.log(selectedIds);
  });

  // AJAX request to check API status
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $('#api_status').addClass('available');
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
});

$(document).ready(function () {
  // Listen for checkbox clicks
  $('input[type=checkbox]').click(function () {
    // Initialize arrays to store checkbox data
    const selectedNames = [];
    const selectedIds = [];
    
    // Iterate over checked checkboxes
    $('input[type=checkbox]:checked').each(function () {
      // Store data-name and data-id attributes
      selectedNames.push($(this).attr('data-name'));
      selectedIds.push($(this).attr('data-id'));
    });
    
    // Update display based on selected checkboxes
    if (selectedNames.length === 0) {
      $('.amenities h4').html('&nbsp;'); // Display non-breaking space if no checkboxes are selected
    } else {
      $('.amenities h4').text(selectedNames.join(', ')); // Display selected checkbox names
    }
    
    // Log selected IDs to the console
    console.log(selectedIds);
  });
});

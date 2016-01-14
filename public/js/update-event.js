$(document).ready(function() {
  $('#update-event-btn').on('click', function () {
    var $this = $(this);

    var title = $('#tb-title').val(),
      description = $('#tb-description').val(),
      image = $('#tb-image').val(),
      date = $('#tb-datetime').val(),
      town = $('#tb-town').val(),
      eventId = $('#tb-event-id').attr('event-id');
    debugger;
    $.ajax({
      url: '/events',
      type: 'PUT',
      data: {
        title: title,
        description: description,
        image: image,
        date: date,
        town: town,
        eventId: eventId
      },
      success: function() {
        window.location = '/events/' + eventId;
      }
    });
  });
});

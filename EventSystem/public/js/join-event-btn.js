$(document).ready(function() {
  $('.join-event-btn').on('click', function () {
    var $this = $(this);

    var eventId = $this.attr('event-data');

    $.ajax({
      url: '/events/join',
      type: 'PUT',
      data: {
        eventId: eventId
      },
      success: function() {
        window.location = "/events";
      }
    });
  });
});

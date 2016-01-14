$(document).ready(function() {
  $('.delete-btn').on('click', function () {
    var $this = $(this);

    $.ajax({
      url: '/users',
      type: 'DELETE',
      data: {
        userId: $this.attr('user-data')
      },
      success: function() {
        window.location = "/users";
      }
    });
  });
});



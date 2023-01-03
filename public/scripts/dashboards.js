$(() => {
  $('button').on('click', function() {
    const id = $(this).attr('id');
    const editForm = $(`<form method="POST" action="/dashboard/${id}/update">
                        <input type=password name="password" />
                        <button id = "update">Update</button></form>`);
    $('body').append(editForm);
  });
});

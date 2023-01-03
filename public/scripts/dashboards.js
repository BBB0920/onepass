//Edit button
$(() => {
  $('.edit-btn').on('click', function() {
    const id = $(this).attr('data-id');
    const editForm = $(`<form method="POST" action="/dashboard/${id}/update">
                        <input type=password name="password" />
                        <button id = "update">Update</button></form>`);
    $('body').append(editForm);
  });
});

//Delete button
$(() => {
  $('.delete-btn').on('click', function() {
    console.log($(this).attr('data-id'));
    const dataId = $(this).attr('data-id');
    const url = `/dashboard/${dataId}/delete`;
    console.log(url);
    $.ajax({
      method: 'POST',
      url: `/dashboard/${dataId}/delete`
    })
    .then(() => {
      location.reload();
    })
  });
});

// Copy button
$(() => {
  $('.copy-btn').on('click', function() {
    const copyTo = $(this).parent().find(".password").text();
    console.log(copyTo);
    navigator.clipboard.writeText(copyTo);
  })
});

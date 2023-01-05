//Edit button
$(() => {
  $('.edit-btn').on('click', function() {
    const id = $(this).attr('data-id');
    console.log(id);
    const check = ($(this).parent().find(`form.${id}`));
    if(check.length < 1) {
      const editForm = $(`<form class=${id} id="update" method="POST" action="/dashboard/${id}/update">
                            <input type=text id="newPw" />
                            <button class="btn btn-primary">Update</button>
                          </form>`);
      $(this).parent().append(editForm);
    }
  });
});

// Submit button for Edit button
$(() => {
  $('.card-body').on('submit', '#update', function(event) {

    event.preventDefault();
    if ($("#newPw").val().length > 16 || $("#newPw").val().length < 8) {
      msg(0);
    }
    else {
      let data = {password: $("#newPw").val()};
      $.ajax({
        url: `/dashboard/2/update`,
        type: 'POST',
        data: data
      })
      .then(() => {
        location.reload();
      })
    }
  });
});

// Message generation
const msg = function(msgNumber) {
  let sntc = 'Please enter between 8-16 characters.';

  $('.alert').remove();
  $('#update').append(`
    <div class="alert alert-danger" role="alert">
      ${sntc}
    </div>
  `);
  $('.alert').hide().slideDown("slow");
}

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
    const copyTo = $(this).parent().parent().find(".password").text();
    const dataId = $(this).attr('data-id');

    console.log(copyTo, dataId);

    $(`.${dataId}`).parent().find(`.alert`).remove();
    const editForm = $(`<div class="${dataId} alert alert-success" role="alert">
                        Password copied!
                      </div>`);
    $(this).parent().append(editForm);
    $(`.${dataId}`).hide().slideDown("slow");
    navigator.clipboard.writeText(copyTo);

  })
});

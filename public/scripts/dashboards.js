// Add New Password Button
$(() => {
  $('.new-pwd-btn').on('click', function() {
    console.log("hello");

    const editForm = $(`
    <div id="myNav" class="overlay">

      <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>

      <div class="overlay-content">

        <form id="new-pwd">

          <h4 class="fw-bold 1h-1 mb-3">Please fill out the following form to generate a password for your website.</h4>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Website Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Gmail">
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label">Website URL</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="www.gmail.com/login">
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput3" class="form-label">Your Account ID/Email</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Jane.Doe">
          </div>

          <label for="exampleFormControlInput2" class="form-label">Your Password Specifications</label>

          <select class="form-select length" aria-label="Default select example">
            <option selected>Password length (Default: 8)</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
          </select>
          <br>

          <div class="form-check">
            <input id="lc" class="form-check-input" type="checkbox" value="" checked>
            <label class="form-check-label" for="flexCheckChecked">
              Lowercase letters
            </label>
          </div>

          <div class="form-check uc">
            <input id="uc" class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">
              Uppercase letters
            </label>
          </div>

          <div class="form-check numbers">
            <input id="numbers" class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">
              Numbers
            </label>
          </div>

          <div class="form-check s-char">
            <input id="s-chars" class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
            <label class="form-check-label" for="flexCheckChecked">
              Special Characters
            </label>
          </div>

          <br>
          <button type="submit" class="gen-newpwd btn btn-primary" style=>Generate Password</button>
          <br>
          <br>

        </form>
      </div>
    </div>
    `)
    $(this).parent().append(editForm);
  })
});

// Generate Password Button
$(() => {
  $('.topbar').on('submit', '#new-pwd', function(event) {

    event.preventDefault();

    let oLength = $('.length').val();

    if(oLength === 'Password length (Default: 8)') {
      oLength = 8;
    }

    oLength = Number(oLength);

    const results = [check('lc'), check('uc'), check('numbers'), check('s-chars')];

    const getPassword = () => {
      return new Promise((resolve, reject) => {

        let pwrd = password(results, oLength);
        // console.log('New Password is: ', pwrd);
        resolve(pwrd);
      })
    }

  getPassword()
    .then((pwrd) => {
      try {
        document.getElementById("password").remove();
      }
      catch(err) {
      }

      const editForm = $(`
        <form id="pswd-submit">
          <input type="text" value="${pwrd}">
          <button type="submit" class="pwd-submit btn btn-primary" style=>Submit</button>
        </form>
      `);

      //Append new form after password is generated, as topbar's another child
      ($(this).children('div').last()).append(editForm);
    })
  })
})

// Submit handler for the second form (submit into the database)
// Password Submit button
$(() => {
  $('.overlay-content').on('submit', '#pswd-submit', function(event) {
    console.log("Final Button");
    event.preventDefault();
  })
})

// Open function for form
function openNav() {
  document.getElementById("myNav").style.display = "block";
}

// Close function for form
function closeNav() {
  document.getElementById("myNav").remove();//style.display = "none";
}

// // Checking the state of a checkbox
function check(id) {
  console.log(document.getElementById(id));

  return document.getElementById(id).checked;
}

//Edit button
$(() => {
  $('.edit-btn').on('click', function() {
    const id = $(this).attr('data-id');

    console.log('This is id for edit button', id);

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

// Update button for Edit button
$(() => {
  $('.buttons').on('submit', '#update', function(event) {

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

// Password Generator function
function password(results, oLength) {

  const arr = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '1234567890', '!@#$%^&*()_+-/*'];
  let counter = 0;
  let answers = [];

  for(let i in results) {
    if (results[i] === true) {
      counter++;
      answers.push(arr[i]);
    }
  }

  let length = oLength;
  let passArr = [];

  for (let i in answers) {

    let nLoop = Math.floor(Math.random() * (length - counter)) + 1; // randomly generate number between 1-13

    length = length - nLoop; // Length subtracts nLoop - the result is new length of remaining string

    if (counter === 1) {  // When counter is at 1 [the last i in answers], it simply subtracts from original length
      nLoop = oLength - passArr.length;
    }

    for (nLoop; nLoop > 0; nLoop--) {   //Loops and randomly selects
      let char = Math.floor(Math.random() * answers[i].length);
      passArr.push(answers[i][char]);
    }
    counter--;
  }

  let password = '';

  // Part 2 - Randomizing the order
  for (let j = passArr.length - 1; j >= 0; j--) {
    let randomPosition = Math.floor(Math.random() * j); // Generates random number based on length of the passArr

    password += passArr[randomPosition];

    passArr.splice(randomPosition, 1);
  }

  console.log(`Your new password is ${password}! It is ${password.length} characters long, which is equal to your originally requested length of ${oLength}`);

  return(password);
}

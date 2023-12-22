var nameBookm = document.getElementById('bookMname');
var webUrl = document.getElementById('bookMlink');
var table = document.getElementById('table');
var message = document.getElementById('popupmessage');
var bookarr = [];
if (localStorage.getItem('bookmark')) {
  bookarr = JSON.parse(localStorage.getItem('bookmark'))
  displaydata(bookarr);
}
else {
  bookarr = [];
}

function addBook() {
  if (validUrl(webUrl.value) && validname(nameBookm.value)) {
    var bookmark = {
      bname: nameBookm.value,
      bLink: webUrl.value,
    }
    bookarr.push(bookmark);
    clearform();
    displaydata(bookarr);
    localStorage.setItem('bookmark', JSON.stringify(bookarr));
  }
  else {
    message.classList.remove('d-none')
  }

}
function clearform() {
  nameBookm.value = "";
  webUrl.value = "";


}
function displaydata(arrofdata) {
  var container = ``;
  for (var i = 0; i < arrofdata.length; i++) {
    container += `
      <tr>
        <td>${i + 1}</td>
        <td>${arrofdata[i].bname}</td>
        <td><button class="btn "id="visitbtn" onclick='visit(${i})'> <i class="fa-regular fa-eye"></i> Visit</button></td>
        <td><button class="btn " id="deletebtn" onclick='deleteBook(${i})'><i class="fa-solid fa-minus"></i> Delete</button></td>
      </tr>`
  }
  table.innerHTML = container;


}

function deleteBook(indexbook) {
  bookarr.splice(indexbook, 1)
  localStorage.setItem('bookmark', JSON.stringify(bookarr));
  displaydata(bookarr);
}

function visit(index) {
  window.open(bookarr[index].bLink, "_blank");
}
function validUrl(url) {
  var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/;
  if (regex.test(url)) {
    webUrl.classList.replace('is-invalid', 'is-valid');
    return true;
  }
  else {
    webUrl.classList.add('is-invalid');
    return false;
  }

}
function validname(name) {
  var regex = /[A-z]{3}/;
  if (regex.test(name)) {
    nameBookm.classList.replace('is-invalid', 'is-valid');
    return true;
  } else {
    nameBookm.classList.add('is-invalid');
    return false;
  }
}
function removevalid() {
  webUrl.classList.remove('is-valid');
  webUrl.classList.remove('is-invalid');
  nameBookm.classList.remove('is-valid');
  nameBookm.classList.remove('is-invalid');
}
function closeModal() {
  message.classList.add("d-none");
}

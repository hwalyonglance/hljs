// Import stylesheets
import "./style.css";
let $ = require("jquery");
// Write Javascript code!
const appDiv = document.getElementById("app");
appDiv.innerHTML = `<h1>JS Starter</h1>`;

// baris 9~18 tidak boleh diubah
// $("#panggilAjax").click(function() {
//   $("#judul").text("LOADING.......");
//   $.get({
//     url: "https://jsonplaceholder.typicode.com/todos/1",
//     success: function(response) {
//       // setJudul(response.title);
//       console.log(response);
//     }
//   });
// });

// $.ajaxSetup({
//   beforeSend: function(e) {
//     // console.log(27, e);
//   },
//   complete: function(res) {
//     console.log(30, res, this.url);
//   }
// });

// harus dipanggil setelah ajax/async selesai
function setJudul(judul) {
  $("#judul").text(judul);
}

// baris 34~49 tidak boleh diubah
function ambilAngkaAcak(cb) {
  let angkaAcak_1_sampai_100 = new Promise(function(resolve, reject) {
    resolve((Math.random() * 100).toFixed());
  });
  angkaAcak_1_sampai_100.then(function(angka) {
    cb(angka);
  });
}

$("#panggilAjax").click(function() {
  ambilAngkaAcak(function(angka) {
    setJudul(angka);
    //kirimData(angka);
  });
});

function kirimData(data) {
  // anggap berhasil masuk ke callback success
  $.post({
    url: "http://localhost:8080/terima-data",
    data: data,
    success: function(res) {
      console.log(54, res);
    },
    error: function(error, b, c) {
      console.log(57, error.statusText);
    }
  });
}

function onTextChange() {
  console.log(
    $("#judul").text(),
    this instanceof MutationObserver ? "MutationObserver" : "jQuery DOMEvent"
  );
}

$("#judul").off("DOMSubtreeModified", onTextChange);
$("#judul").on("DOMSubtreeModified", onTextChange);

var observer = new MutationObserver(onTextChange);
observer.observe($("#judul")[0], {
  childList: true
});

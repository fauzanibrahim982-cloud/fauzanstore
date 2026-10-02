// ===============================
// NAVIGASI HALAMAN
// ===============================

function hideAllPages() {

  document
    .querySelectorAll(".page")
    .forEach(page => {
      page.classList.add("hidden");
    });

}


// BERANDA
function showHome() {

  hideAllPages();

  document
    .getElementById("homePage")
    .classList.remove("hidden");

  setActiveNav(0);
}


// SEMUA BUKU
function showBooks() {

  hideAllPages();

  document
    .getElementById("booksPage")
    .classList.remove("hidden");

  setActiveNav(1);
}


// BUAT BUKU
function showCreate() {

  hideAllPages();

  document
    .getElementById("createPage")
    .classList.remove("hidden");

  setActiveNav(2);
}


// AKUN
function showAccount() {

  hideAllPages();

  document
    .getElementById("accountPage")
    .classList.remove("hidden");

  setActiveNav(3);
}


// ===============================
// NAVIGASI AKTIF
// ===============================

function setActiveNav(index) {

  const buttons =
    document.querySelectorAll(
      ".bottom-nav button"
    );

  buttons.forEach(button => {
    button.classList.remove("nav-active");
  });

  if (buttons[index]) {
    buttons[index]
      .classList.add("nav-active");
  }

}


// ===============================
// LOGIN MODAL
// ===============================

function showLogin() {

  document
    .getElementById("loginModal")
    .classList.remove("hidden");

}


function closeLogin() {

  document
    .getElementById("loginModal")
    .classList.add("hidden");

}


// ===============================
// PENCARIAN BUKU
// ===============================

function searchBooks() {

  const input =
    document
      .getElementById("searchInput")
      .value
      .toLowerCase();

  const books =
    document.querySelectorAll(".book-card");

  books.forEach(book => {

    const title =
      book
        .querySelector("h3")
        .textContent
        .toLowerCase();

    const author =
      book
        .querySelector(".author")
        .textContent
        .toLowerCase();

    const genre =
      book
        .querySelector(".genre")
        .textContent
        .toLowerCase();

    if (
      title.includes(input) ||
      author.includes(input) ||
      genre.includes(input)
    ) {

      book.style.display = "";

    } else {

      book.style.display = "none";

    }

  });

}


// ===============================
// BACA BUKU
// ===============================

function readBook() {

  alert(
    "Fitur membaca buku akan kita buat di tahap berikutnya 📖"
  );

}


// ===============================
// PUBLIKASI
// ===============================

document
  .querySelector(".publish-btn")
  .addEventListener("click", function () {

    alert(
      "Sistem membuat buku akan kita aktifkan pada tahap berikutnya 📚"
    );

  });


// ===============================
// TUTUP MODAL JIKA KLIK LUAR
// ===============================

document
  .getElementById("loginModal")
  .addEventListener("click", function(event) {

    if (
      event.target === this
    ) {

      closeLogin();

    }

  });


// ===============================
// HALAMAN AWAL
// ===============================

showHome();

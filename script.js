/* ==================================================
DATABASE SEDERHANA
================================================== */

const STORAGE_KEY = "perpustakaanDigital_books";

/* ==================================================
AMBIL BUKU
================================================== */

function getBooks() {

const savedBooks =
localStorage.getItem(STORAGE_KEY);

if (!savedBooks) {
return [];
}

try {

return JSON.parse(savedBooks);

} catch (error) {

console.error(
  "Data buku rusak:",
  error
);

return [];

}

}

/* ==================================================
SIMPAN BUKU
================================================== */

function saveBooks(books) {

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(books)
);

}

/* ==================================================
NAVIGASI
================================================== */

function hideAllPages() {

document
.querySelectorAll(".page")
.forEach(page => {

  page.classList.add("hidden");

});

}

function showHome() {

hideAllPages();

document
.getElementById("homePage")
.classList.remove("hidden");

setActiveNav(0);

}

function showBooks() {

hideAllPages();

document
.getElementById("booksPage")
.classList.remove("hidden");

setActiveNav(1);

renderBooks();

}

function showCreate() {

hideAllPages();

document
.getElementById("createPage")
.classList.remove("hidden");

setActiveNav(2);

}

function showAccount() {

hideAllPages();

document
.getElementById("accountPage")
.classList.remove("hidden");

setActiveNav(3);

updateAccountStats();

}

function showReadPage() {

hideAllPages();

document
.getElementById("readPage")
.classList.remove("hidden");

}

/* ==================================================
NAVIGASI AKTIF
================================================== */

function setActiveNav(index) {

const buttons =
document.querySelectorAll(
".bottom-nav button"
);

buttons.forEach(button => {

button.classList.remove(
  "nav-active"
);

});

if (buttons[index]) {

buttons[index]
  .classList.add("nav-active");

}

}

/* ==================================================
MEMBUAT BUKU
================================================== */

function createBook() {

const title =
document
.getElementById("bookTitle")
.value
.trim();

const genre =
document
.getElementById("bookGenre")
.value;

const description =
document
.getElementById("bookDescription")
.value
.trim();

const content =
document
.getElementById("bookContent")
.value
.trim();

/* CEK INPUT */

if (!title) {

alert(
  "Masukkan judul buku terlebih dahulu."
);

return;

}

if (!description) {

alert(
  "Masukkan deskripsi buku."
);

return;

}

if (!content) {

alert(
  "Isi buku masih kosong."
);

return;

}

/* AMBIL BUKU LAMA */

const books = getBooks();

/* DATA BUKU BARU */

const newBook = {

id:
  Date.now(),

title:
  title,

genre:
  genre,

description:
  description,

content:
  content,

author:
  "Pengguna",

createdAt:
  new Date()
    .toLocaleDateString(
      "id-ID"
    )

};

/* MASUKKAN BUKU */

books.unshift(
newBook
);

/* SIMPAN */

saveBooks(
books
);

/* KOSONGKAN FORM */

document
.getElementById("bookTitle")
.value = "";

document
.getElementById("bookDescription")
.value = "";

document
.getElementById("bookContent")
.value = "";

alert(
"Buku berhasil dibuat! 📚"
);

showBooks();

}

/* ==================================================
TAMPILKAN BUKU
================================================== */

function renderBooks(
searchText = ""
) {

const bookList =
document
.getElementById("bookList");

const emptyBooks =
document
.getElementById("emptyBooks");

const books =
getBooks();

const search =
searchText
.toLowerCase()
.trim();

const filteredBooks =
books.filter(book => {

  return (

    book.title
      .toLowerCase()
      .includes(search)

    ||

    book.author
      .toLowerCase()
      .includes(search)

    ||

    book.genre
      .toLowerCase()
      .includes(search)

  );

});

bookList.innerHTML = "";

/* TIDAK ADA BUKU */

if (
books.length === 0
) {

emptyBooks
  .classList
  .remove("hidden");

return;

}

/* ADA BUKU */

emptyBooks
.classList
.add("hidden");

/* HASIL PENCARIAN KOSONG */

if (
filteredBooks.length === 0
) {

bookList.innerHTML = `

  <div class="empty-state">

    <div>
      🔎
    </div>

    <h3>
      Buku tidak ditemukan
    </h3>

    <p>
      Coba gunakan kata pencarian lain.
    </p>

  </div>

`;

return;

}

/* BUAT CARD */

filteredBooks.forEach(book => {

const card =
  document.createElement(
    "div"
  );

card.className =
  "book-card";


card.innerHTML = `

  <div class="book-cover">
    📖
  </div>

  <div class="book-info">

    <h3>
      ${escapeHTML(book.title)}
    </h3>

    <p class="author">
      ✍️ ${escapeHTML(book.author)}
    </p>

    <span class="genre">
      ${escapeHTML(book.genre)}
    </span>

    <div class="book-actions">

      <button
        onclick="readBook(${book.id})"
      >
        📖 Baca
      </button>

      <button
        class="delete-btn"
        onclick="deleteBook(${book.id})"
      >
        🗑️
      </button>

    </div>

  </div>

`;


bookList.appendChild(
  card
);

});

}

/* ==================================================
PENCARIAN
================================================== */

function searchBooks() {

const input =
document
.getElementById("searchInput")
.value;

renderBooks(
input
);

}

/* ==================================================
BACA BUKU
================================================== */

function readBook(id) {

const books =
getBooks();

const book =
books.find(
item =>
item.id === id
);

if (!book) {

alert(
  "Buku tidak ditemukan."
);

return;

}

document
.getElementById("readTitle")
.textContent =
book.title;

document
.getElementById("readGenre")
.textContent =
book.genre;

document
.getElementById("readAuthor")
.textContent =
"✍️ " + book.author;

document
.getElementById("readDescription")
.textContent =
book.description;

document
.getElementById("readContent")
.textContent =
book.content;

showReadPage();

}

/* ==================================================
HAPUS BUKU
================================================== */

function deleteBook(id) {

const books =
getBooks();

const book =
books.find(
item =>
item.id === id
);

if (!book) {
return;
}

const confirmDelete =
confirm(
"Hapus buku "${book.title}"?"
);

if (!confirmDelete) {
return;
}

const newBooks =
books.filter(
item =>
item.id !== id
);

saveBooks(
newBooks
);

renderBooks();

updateAccountStats();

}

/* ==================================================
STATISTIK AKUN
================================================== */

function updateAccountStats() {

const books =
getBooks();

const count =
document
.getElementById("bookCount");

if (count) {

count.textContent =
  books.length;

}

}

/* ==================================================
LOGIN DEMO
================================================== */

function showLogin() {

document
.getElementById("loginModal")
.classList
.remove("hidden");

}

function closeLogin() {

document
.getElementById("loginModal")
.classList
.add("hidden");

}

function demoLogin() {

const username =
document
.getElementById("loginUsername")
.value
.trim();

const password =
document
.getElementById("loginPassword")
.value
.trim();

if (!username) {

alert(
  "Masukkan nama pengguna."
);

return;

}

if (!password) {

alert(
  "Masukkan password."
);

return;

}

alert(
"Login online belum aktif. Fitur akun akan kita sambungkan ke database pada tahap berikutnya."
);

}

function demoRegister() {

alert(
"Pendaftaran akun online akan kita buat pada tahap berikutnya."
);

}

/* ==================================================
TUTUP MODAL KLIK DI LUAR
================================================== */

document
.getElementById("loginModal")
.addEventListener(
"click",
function(event) {

  if (
    event.target === this
  ) {

    closeLogin();

  }

}

);

/* ==================================================
KEAMANAN HTML
================================================== */

function escapeHTML(text) {

const div =
document.createElement(
"div"
);

div.textContent =
text;

return div.innerHTML;

}

/* ==================================================
START
================================================== */

showHome();

updateAccountStats();

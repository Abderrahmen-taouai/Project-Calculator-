// Variable Declarations
const display = document.querySelector(".display"); // Container for displaying books
const dialogShow = document.querySelector("[data-dialog-show]"); // Button to show dialog
const dialogClose = document.querySelector("[data-dialog-close]"); // Button to close dialog
const dialog = document.querySelector("[data-dialog]"); // Dialog element
const myForm = document.getElementById("myForm"); // Form element
const submit = document.querySelector('button[type="submit"]'); // Submit button
const reset = document.querySelector(".btn-rest"); // Reset button
const displaybook = document.querySelector(".btn-display"); // Display books button
let myLibrary = []; // Array to store books in the library

// Event Listener for Reset Button
reset.addEventListener("click", () => {
  myLibrary = []; // Clear the library array
  display.innerHTML = ""; // Clear the display container
});

// Function to Validate Form Input
function validateForm(event) {
  // Get form input values
  const titleInput = document.querySelector('input[name="Title"]').value;
  const authorInput = document.querySelector('input[name="Author"]').value;
  const pagesInput = document.querySelector('input[name="Pages"]').value;
  const readInput = document.querySelector(
    'input[name="option"]:checked'
  ).value;

  // Perform validation
  while (
    titleInput === "" ||
    authorInput === "" ||
    pagesInput === "" ||
    !readInput
  ) {
    alert("Please fill out all required fields.");
    return;
  }

  // If all fields are filled, create the book
  let book = `b${myLibrary.length}`;
  book = new Book(authorInput, titleInput, pagesInput, readInput);
  addBookToLibrary(book);
  CreateCard(book);
  alert("Book added");
  myForm.reset();
}

// Event Listener for Submit Button
submit.addEventListener("click", (event) => {
  event.preventDefault();
  validateForm(event);
});

// Event Listener for Dialog Show Button
dialogShow.addEventListener("click", () => {
  dialog.showModal();
});

// Event Listener for Dialog Close Button
dialogClose.addEventListener("click", () => {
  dialog.close();
});

// Event Listener for Display Books Button
displaybook.addEventListener("click", () => {
  if (myLibrary.length > 0) {
    displayFunc();
  } else {
    alert("No books in the library.");
  }
});

// Book Constructor Function
function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  read === "yes" ? (this.read = "✓") : (this.read = "X");
}

// Function to Add Book to Library
function addBookToLibrary(book) {
  myLibrary.push(book);
}

// Function to Display Books
function displayFunc() {
  myLibrary.forEach((book) => {
    let index = myLibrary.indexOf(book);

    // Update book details in the display container
    let title = document.querySelector(`.list${index}`).childNodes[0];
    title.innerHTML = `<h3>${book.title}</h3>`;
    let author = document.querySelector(`.list${index}`).childNodes[1];
    author.textContent = `Author: ${book.author}`;
    let pages = document.querySelector(`.list${index}`).childNodes[2];
    pages.textContent = `Pages: ${book.pages}`;
    let read = document.querySelector(`.list${index}`).childNodes[3];
    read.textContent = `Read: ${book.read}`;

    // Event Listener for toggling read status
    let toggleRead = document.querySelector(`.toggleRead${index}`);
    toggleRead.addEventListener("click", () => {
      book.read = book.read === "X" ? "✓" : "X";
      read.textContent = `Read: ${book.read}`;
    });
  });

  display.classList.remove("hidden");
}

// Function to Create Book Card
function CreateCard(book) {
  display.classList.add("hidden");
  let index = myLibrary.indexOf(book);
  let card = document.createElement("div");

  card.classList.add(`card${index}`);
  card.classList.add("card");

  display.appendChild(card);
  let list = document.createElement("ul");
  list.classList.add("list");
  list.classList.add(`list${index}`);

  // Create list items for book details
  for (let index = 0; index < 4; index++) {
    let li = document.createElement("li");
    li.id = `${index}`;
    li.textContent = `${index}`;
    list.appendChild(li);
  }

  card.appendChild(list);

  // Button to delete book
  let deleteBook = document.createElement("button");
  deleteBook.classList.add(`deletebook${index}`);
  deleteBook.textContent = "Remove";
  deleteBook.style =
    "background-color: #04AA6D; padding: 14px 28px; font-size: 16px;";

  // Event Listener for deleting book
  deleteBook.addEventListener("click", () => {
    myLibrary.splice(index, 1);
    card.remove();
  });
  card.appendChild(deleteBook);

  // Button to toggle reading a book
  let toggleRead = document.createElement("button");
  toggleRead.classList.add(`toggleRead${index}`);
  toggleRead.textContent = "Change read statut?";

  toggleRead.style =
    "background-color: #04AA6D; padding: 14px 28px; font-size: 16px;";

  card.appendChild(toggleRead);
}

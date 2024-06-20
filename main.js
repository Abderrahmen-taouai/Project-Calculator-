<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <script src="main.js" defer></script>
    <title>Library</title>
  </head>
  <body>
    <div class="container">
      <div class="sidebuttons">
        <button data-dialog-show>Add Book</button>
        <button class="btn-display">Display Books</button>
        <button class="btn-rest">Rest</button>
      </div>

      <div class="display"></div>
      <dialog data-dialog>
        This is an open dialog window
        <div class="form">
          <form id="myForm" action="" method="post">
            Title: <input type="text" name="Title" required /><br />
            Author: <input type="text" name="Author" required /><br />
            Pages: <input type="number" name="Pages" min="1" /><br />
            Read:
            <input type="radio" name="option" value="yes" required /> Yes
            <input type="radio" name="option" value="no" required /> No<br />
            <button type="submit">Add</button>
          </form>
        </div>
        <button data-dialog-close>close</button>
      </dialog>
    </div>
    <footer>
      by Abderrahmen Taouai
      <a href="https://github.com/Abderrahmen-taouai/Project-Calculator-">
        <br />
        GitHub
      </a>
    </footer>
  </body>
</html>

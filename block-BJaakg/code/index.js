(function () {
  let modalWindow = document.querySelector('.modal-window');
  let modalClose = document.querySelector('.modal-close');
  let openButton = document.querySelector('.btn');
  let booksUL = document.querySelector('.book_list');
  let charactersUL = document.querySelector('.characters');
  const booksURL = `https://www.anapioficeandfire.com/api/books`;

  function handleSpinner(rootElm, status = false) {
    if (status) {
      rootElm.innerHTML = `<div class="spinner"><div class="donut"></div></div>`;
    }
  }

  function displayBooks(data) {
    booksUL.innerHTML = '';
    data.forEach((book) => {
      let li = document.createElement('li');
      let h3 = document.createElement('h3');
      h3.innerText = book.name;
      let p = document.createElement('p');
      p.innerText = book.authors.join(' ');
      let button = document.createElement('button');
      button.classList.add('btn');
      button.innerText = `Show Characters (${book.characters.length})`;
      button.addEventListener('click', () => {
        displayCharacters(book.characters);
        modalWindow.style.display = 'block';
        modalWindow
          .querySelector('.modal-close')
          .addEventListener('click', () => {
            modalWindow.style.display = 'none';
          });
      });
      li.append(h3, p, button);
      booksUL.append(li);
    });
  }

  function displayCharacters(characters) {
    handleSpinner(charactersUL, true);
    Promise.all(
      characters.map((character) => fetch(character).then((res) => res.json()))
    ).then((characterData) => {
      charactersUL.innerHTML = '';
      characterData.forEach((ch) => {
        let li = document.createElement('li');
        li.innerText = `${ch.name} : (${ch.aliases.join('')})`;
        charactersUL.append(li);
      });
    });
  }

  function fetchBooks() {
    handleSpinner(booksUL, true);
    fetch(booksURL)
      .then((res) => res.json())
      .then((bookData) => {
        console.log(bookData);
        displayBooks(bookData);
      })
      .finally(() => {
        handleSpinner(booksUL);
      });
  }

  fetchBooks();
})();

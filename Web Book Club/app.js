'use strict';

const formEl = document.getElementById("form");

formEl.addEventListener("submit", handlerFunction);


function handlerFunction(event){
    event.preventDefault();
    const nameBook = event.target.searchIinput.value;
    getBook(nameBook);
}

function getBook(searchInput){
    const apiKey = "AIzaSyCuo7onwjU5xqfuhC0d9hqtU85mQp2wBJA";
    const url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}+terms&key=${apiKey}`;
    fetch(url)
    .then((respons) => respons.json())
    .then(objectBook => {
        const bookObj = new Book(objectBook);
        bookObj.renderCard();
    })
    .catch(error => console.log(error))
}



function Book(object) {
    this.title = object.items[0].volumeInfo.title;
    this.author = object.items[0].volumeInfo.authors[0];
    this.bookLink = object.items[0].volumeInfo.previewLink;
    this.bookImg = object.items[0].volumeInfo.imageLinks.thumbnail;
}

Book.prototype.renderCard = function() {
      let card = `
      <div class="card" style="width: 18rem;">
  <img src="${this.bookImg}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${this.title}</h5>
    <p class="card-text">${this.author}</p>
    <a href="${this.bookLink}" class="btn btn-primary" target="_blank">Read</a>
  </div>
</div>`
        document.getElementById("card").innerHTML = card;
}


const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');

hamburger.addEventListener('click', () => {
  navItems.classList.toggle('active');
});


// book class that represent book with some property

class Book {
    constructor(title, author, isbn) {
        this.author = author;
        this.title = title;
        this.isbn = isbn;
    }
}

// UI class that handles UI tasks

class UI{

      // display item on UI
    static displayBooks(){
        const books = Store.getBooks();

        // running a loop in the local storage to display books on UI
        books.forEach((book) => UI.addBookToList(book));
    }
    // add book to list
   static addBookToList(book){
       const table = document.querySelector('#book-list');
       const row = document.createElement('tr');

       row.innerHTML = `
         
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href = "#" class = "btn btn-danger btn-sm delete">X</a></td>
       `;

       table.appendChild(row);
   
    }
    // delete the book
    static deleteBooks(el){

        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
            UI.showAlert("Book removed", "danger");
        }
        
            
    }
    static showAlert(message,className){
        // create a div
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.append(document.createTextNode(message));
        const container  = document.querySelector('.container');
        const form = document.querySelector('form');
        container.insertBefore(div,form);
        // vanish in 3 sec
        setTimeout(() => document.querySelector('.alert').remove(),3000);

    }
  
}
// store class : handles storage
class Store{
    // get book from local storage
  static getBooks(){

      let books;

      if(localStorage.getItem('books') === null){
          books = [];
      } else{
          let temp = localStorage.getItem('books');
          books = JSON.parse(temp,0);
      }
      return books;
  
  }
  // add book to local storage
  static addBook(book){
       
    const books = Store.getBooks();
    books.push(book);

      localStorage.setItem('books', JSON.stringify(books));
  }
   // remove book from local storage
  static removeBook(isbn){

    const books = Store.getBooks();
    books.forEach((book,index) => {
        if(book.isbn === isbn){
            books.splice(index,1);
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
  }

}


  // Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

// Add a book
const form = document.querySelector('form');
form.addEventListener('submit',(e) => {
      
    e.preventDefault();
    const title = document.getElementById('title');
    const author = document.getElementById('author')
    const isbn = document.getElementById('isbn');

    // Validation
    if(title.value == "" || author.value == "" || isbn.value == ""){
        UI.showAlert("please fill in all the fields",'danger');

    } else{
        

    // Instantiate book
    const newBook = new Book(title.value,author.value,isbn.value);
   
    // add book to UI
    UI.addBookToList(newBook);

    // add book to local storage
    Store.addBook(newBook);

    // show success method
    UI.showAlert("Book added","success");
     
    // clear all the previous values in inputs.
    title.value = "";
    author.value = "";
    isbn.value = "";
    }
})
// query selector to remove an item.
document.querySelector('table').addEventListener('click',(e) => {
    // delete book from UI
    UI.deleteBooks(e.target);

    // delete book from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
});




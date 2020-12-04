// Book class that represent book with its author name, title and  isbn code.

class Book{
    constructor(title,author,isbn){
        this.title = title,
        this.author = author,
        this.isbn= isbn
    }
}
// UI tasks
class UI{
    // 1.display books
    static displayBooks(){
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    // 2.add books to list
    static addBookToList(book){
           
        // finding a parent element
        const table = document.querySelector('#book-list');

        // creating a new row

        const row = document.createElement('tr');

        row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.isbn}</td>
         <td> <a href= "#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;
        
        // appending row to its parent row
        table.appendChild(row);
    }
    // 3.remove book to list
    static removeBook(el){
           
        if(el.classList.contains('delete')){
            // finding a parent element
            const table = document.querySelector('#book-list');
            table.removeChild(el.parentElement.parentElement);
            UI.showAlert("Book removed",'danger');
        }

    }
    // 4.show alert
    static showAlert(message,className){

        const form = document.querySelector('form');
        const container = document.querySelector('.container');

        // creating a new div
        const div = document.createElement('div');

        div.className  = `alert alert-${className}`;
        div.append(document.createTextNode(message));

        container.insertBefore(div,form);

        setTimeout(() => container.removeChild(div),3000)
    }


}

// store of books

class Store{

    // get books - that takes books from localStorage and convert the string type to object of books
    static getBooks(){
        
        let books;

        if(localStorage.getItem('book') === null){
            books = [];
        } else{
            let temp = localStorage.getItem('book');
            books = JSON.parse(temp,0);
        }

       return books;
    }

    // add book to localStorage
    static addBookToLocalStorage(book){

        const books = Store.getBooks();
        books.push(book);

        localStorage.setItem('book',JSON.stringify(books));
    }

    // remove book from localStorage

    static removeBookToLocalStorage(isbn){

        const books = Store.getBooks();
        books.forEach((book,index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });
        localStorage.setItem('book',JSON.stringify(books));
    }
}

// events handling
document.addEventListener('DOMContentLoaded',UI.displayBooks);
// add book
const submit = document.querySelector('input[type="submit"]');
submit.addEventListener('click',(e) => {

     e.preventDefault();
    const title = document.querySelector('input[type="text"]');
    const author = document.getElementById('author');
    const isbn = document.getElementById('isbn');

    if(title.value == "" || author.value == "" || isbn.value == ""){
        UI.showAlert("please fill all the fields","danger");
    } else{

    const newBook = new Book(title.value,author.value,isbn.value);
    // add Book to UI
    UI.addBookToList(newBook);
    // add book to localStorage
    Store.addBookToLocalStorage(newBook);

    // generate alert
    UI.showAlert("Book added","success");

    title.value = "";
    author.value = "";
    isbn.value = "";
    }
   
});

document.querySelector('table').addEventListener('click',(e) => {

    // remove book from localStorage
    Store.removeBookToLocalStorage(e.target.parentElement.previousElementSibling.innerHTML);
    // remove book from UI
    UI.removeBook(e.target);

    
})















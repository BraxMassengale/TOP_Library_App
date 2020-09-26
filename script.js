// Library array defined
let myLibrary = [];
let idNum = 0; // Global ID number

// Classes
class Book {
    constructor(author, title, pages, status) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.status = status;
        this.idNum = idNum;
        idNum++;

        let haveRead = null;
        if (this.status === "read") {
            haveRead = "I have read";
        }
        else {
            haveRead = "I have not read"
        }

    }
    
    info = function() {
        return this.title + " by " + this.author + ". " + haveRead + " this book. It has " + this.pages + " pages."
    }
   
}

// Constants 
const theBook = new Book("Shakespeare", "The Best Book Ever", 600, "unread");
const submitButton = document.getElementById("submit"); 
const form = document.getElementById("form");
const content = document.getElementById("content");
const getRadioVal = function() {
    let val = null;

    let radioGroup = form.elements["status"];

    for(i = 0; i < radioGroup.length; i++) {
        if(radioGroup[i].checked) {
            val = radioGroup[i].value;
            break;
        }
    }
    return val;
}

// Event Listeners
submitButton.addEventListener("click", function() {
    let author = document.querySelector("#author").value;
    let title = document.querySelector("#title").value;
    let pages = document.querySelector("#pages").value;
    let status = getRadioVal();

    addToLibrary(author, title, pages, status);
    form.reset();
});



// Add to library
const addToLibrary = function(author, title, pages, status) {
    let newBook = new Book(author, title, pages, status);
    myLibrary.push(newBook);

    createBookCard(newBook);
}

// Delete from library
const deleteFromLibrary = function(book) {
    let bookID = book.idNum;
    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].idNum == bookID) {
            myLibrary.splice(i, 1);
            break;
        }
    }
}

// Create Book Card
const createBookCard = function(book) {
    let bookCard = document.createElement("div");
    document.getElementById("content").appendChild(bookCard);
    bookCard.id = `"idNum${book.idNum}"`;
    

    bookCard.innerHTML = `
    <div class="book-card">
        <div class="book-card-title"><h3>${book.title}</h3></div> <!-- .book-card-title -->
        <div class="book-card-content">
            <p>${book.author}, ${book.pages} pages</p>
            <a href="#" id="status">${book.status}</a>
            </div> <!-- .book-card-content -->
            <button id="deleteButton">Delete Book</button>
    </div> <!-- .book-card -->
    `;

    bookCard.querySelector("#deleteButton").addEventListener("click", function(){
        content.removeChild(bookCard);
        deleteFromLibrary(book);
    })

    // Change read status
    bookCard.querySelector("#status").addEventListener("click", function() {
        if(book.status == "read") {
            book.status = "unread";
            bookCard.querySelector("#status").innerHTML = `${book.status}`;
        }
        else {
            book.status = "read";
            bookCard.querySelector("#status").innerHTML = `${book.status}`;
        }
    });
}



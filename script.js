// Library array defined
let myLibrary = [];
let idNum = 0;
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
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
};

function displayLibrary() {
    for (let book of myLibrary) {
        console.log(book.title);
    }

}

const container = document.getElementById('container');
const addButton = document.getElementById('addButton');

function makeGridContainer(myLibrary) {
    
    container.style.setProperty('--grid-rows', myLibrary.length);
    container.style.setProperty('--grid-cols', 5);
    for (let obj of myLibrary) {
        addNewGridItem(obj);
    };
}

function addNewGridItem(obj) {
    let cell = document.createElement("div");
    cell.id = myLibrary.indexOf(obj);
    container.appendChild(cell).className = "grid-item";

    for (let content in obj) {
        let textbox = document.createElement("div");
        textbox.textContent = obj[content];
        cell.appendChild(textbox).className = "content-" + content;
    }

    let removeButton = document.createElement("button");
    removeButton.textContent = "REMOVE";
    cell.appendChild(removeButton).className = "removeButton"
    removeButton.addEventListener('click', () => {
        deleteBook(obj);
        
    });

    let readButton = document.createElement("button");
    readButton.textContent = "READ TOGGLE";
    cell.appendChild(readButton).className = "readButton"
    readButton.addEventListener('click', () => {
        toggleButton(obj);
        
    });
}

function newBook() {
    let newTitle = prompt("Please enter your book's title");
    let newAuthor = prompt("Who is the Author of your book?");
    let newPages = prompt("What is the number of pages?");
    let newRead = prompt("Have you read the book yet?").toUpperCase == "YES" ? true : false;
    let addingBook = new Book(newTitle, newAuthor, newPages, newRead);
    addBookToLibrary(addingBook);
    addNewGridItem(addingBook);
}

function deleteBook(obj) {
    let removeIndex = myLibrary.indexOf(obj);
    myLibrary.push(myLibrary.splice(removeIndex, 1)[0]);
    myLibrary.pop();
    
    container.removeChild(container.childNodes[removeIndex]);
    

}

function toggleButton(obj) {
    let toogleObj = document.getElementById(myLibrary.indexOf(obj));

    for (let i = 0; i < toogleObj.childNodes.length; i++) {
        if (toogleObj.childNodes[i].className == "content-read") {
            if (obj.read == false) {
                obj.read = true;
                toogleObj.childNodes[i].textContent = "true";
            
            } else {
                obj.read = false;
                toogleObj.childNodes[i].textContent = "false";
            };

        }
    }
    
}




const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);
const theHobbit2 = new Book("The Hobbit", "J.R.R. Tolkien", 100, true);
const theHobbit3 = new Book("The Hobbit", "J.R.R. Tolkien", 100, true);
addBookToLibrary(theHobbit);
addBookToLibrary(theHobbit2);
addBookToLibrary(theHobbit3);

makeGridContainer(myLibrary);

addButton.addEventListener('click', () => {
    newBook();
})
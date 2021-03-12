const shelf = document.getElementById("shelf")
const newBookButton = document.getElementById("new-book")
const newBookForm = document.getElementById("new-book-form")
const inputTitle = document.getElementById("title")
const warnTitle = document.getElementById("warn-title")
const inputAuthor = document.getElementById("author")
const warnAuthor = document.getElementById("warn-author")
const inputPages = document.getElementById("pages")
const warnPages = document.getElementById("warn-pages")
const inputRead = document.getElementById("read")
const addBookButton = document.getElementById("add-book")
const cancelButton = document.getElementById("cancel")

newBookButton.addEventListener("click", showNewBookForm)
addBookButton.addEventListener("click", processBook)
cancelButton.addEventListener("click", hideNewBookForm)

let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    info() {
        let hasRead = "has not read"
        if (this.read === true) {hasRead = "has read"}
        return (title + " by " + author + ", " + pages + " pages, " + hasRead)
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read))
}

function displayHasRead(i) {
    if (myLibrary[i].read === true) {
        return "Has read"
    } else {
        return "Has not read"
    }
}

function displayMyLibrary() {
    shelf.innerHTML = ""
    for (let i = 0; i < myLibrary.length; i++) {
        let div = document.createElement("div")
        let h2 = document.createElement("h2")
        let node = document.createTextNode(myLibrary[i].title)
        h2.appendChild(node)
        div.appendChild(h2)
        let h3 = document.createElement("h3")
        node = document.createTextNode("by " + myLibrary[i].author)
        h3.appendChild(node)
        div.appendChild(h3)
        let p = document.createElement("p")
        node = document.createTextNode(myLibrary[i].pages + " pages")
        p.appendChild(node)
        div.appendChild(p)
        let button = document.createElement("button")
        button.className = "read-button"
        button.dataset.index = i
        button.addEventListener("click", function(){
            let currentBook = myLibrary[this.dataset.index]
            currentBook.read = !currentBook.read
            this.innerHTML = displayHasRead(i)
        })
        button.innerHTML = displayHasRead(i)
        div.appendChild(button)
        button = document.createElement("button")
        button.className = "remove-button"
        button.dataset.index = i
        button.addEventListener("click", function(){
            myLibrary.splice(this.dataset.index, 1)
            displayMyLibrary()
        })
        button.innerHTML = "Remove"
        div.appendChild(button)
        shelf.appendChild(div)
    }
}

function showNewBookForm() {
    newBookButton.style.display = "none"
    newBookForm.style.display = "block"
}

function hideNewBookForm() {
    newBookButton.style.display = "block"
    newBookForm.style.display = "none"
    inputTitle.value = ""
    inputAuthor.value = ""
    inputPages.value = ""
    inputRead.checked = false
}

function hideWarnings() {
    warnTitle.style.display = "none"
    warnAuthor.style.display = "none"
    warnPages.style.display = "none"
}

function processBook() {
    hideWarnings()
    let warnings = 0
    let title = inputTitle.value.trim()
    if (title === "") {
        warnTitle.style.display = "block"
        warnings += 1
    }
    let author = inputAuthor.value.trim()
    if (author === "") {
        warnAuthor.style.display = "block"
        warnings += 1
    }
    let pages = inputPages.value
    if (pages < 1) {
        warnPages.style.display = "block"
        warnings += 1
    }
    if (warnings > 0) {return}
    let read = inputRead.checked
    addBookToLibrary(title, author, pages, read)
    hideNewBookForm()
    displayMyLibrary()
}

function loadDemoBooks() { //for debugging
    addBookToLibrary("The Hitchhiker's Guide To The Galaxy","Douglas Adams",42,true)
    addBookToLibrary("1984","George Orwell",1984,true)
    addBookToLibrary("Candide","Voltaire",100,true)
    addBookToLibrary("Slaughterhouse-Five","Kurt Vonnegut",190,true)
    displayMyLibrary()
}

displayMyLibrary()

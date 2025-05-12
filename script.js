const bookContainer= document.querySelector(".book-container")
const newBookBtn= document.getElementById("new-book-btn")
const closeDialog= document.getElementById("close-dialog")
const dialog=document.querySelector("dialog")
const submitNewBook= document.querySelector("#submit-new-book")

const bookTitle=document.querySelector("#book-title")
const bookAuthor=document.querySelector("#book-author")
const bookPages=document.querySelector("#book-pages")
const bookRead=document.querySelector("#book-read")


const myLibrary = [];

function Book(title,author,pages,read) {
  this.id=crypto.randomUUID()
  this.title=title
  this.author= author
  this.pages=pages
  this.read=read
}
Book.prototype.changeRead=function(){
  this.read=!this.read
}
function addBookToLibrary(title,author,pages,read) {
  // take params, create a book then store it in the array
  const bookIssue= new Book(title,author,pages,read)
  myLibrary.push(bookIssue)
}
addBookToLibrary("nah","nah",123,false)
addBookToLibrary("nah","nah",123,true)
addBookToLibrary("nah","nah",123,false)

function displayBooks(){
    for(let x=0;x<myLibrary.length;x++){
        let readBool= myLibrary[x].read
        let div=document.createElement("div")
        div.classList.add("book-card")
        let h1=document.createElement("h1")
        h1.textContent= `Title: ${myLibrary[x].title}`
        let pAuthor=document.createElement("p")
        pAuthor.textContent= `Author: ${myLibrary[x].author}`
        let pPages=document.createElement("p")
        pPages.textContent= `Pages: ${myLibrary[x].pages}`

        let divCheck =document.createElement("div")
        let pRead =document.createElement("p")
        pRead.textContent=`${myLibrary[x].read ? "Read":"Not read yet"}`
        let btnRead=document.createElement("button")
        btnRead.textContent= `Mark as ${myLibrary[x].read ? "not read":"read"}`
      

        let button=document.createElement("button")
        button.textContent= "X"
        
        div.appendChild(h1)
        div.appendChild(pAuthor)
        div.appendChild(pPages)
        div.appendChild(pRead)
        div.appendChild(button)
        div.appendChild(btnRead)

        bookContainer.appendChild(div)
        button.addEventListener("click",()=>{
          bookContainer.removeChild(div)
          myLibrary.splice(x,1)
          console.log(myLibrary);
          
        })
        btnRead.addEventListener("click",()=>{
          myLibrary[x].changeRead()
          pRead.textContent=`${myLibrary[x].read ? "Read":"Not read yet"}`
          btnRead.textContent= `Mark as ${myLibrary[x].read ? "not read":"read"}`
        })
    }
}

newBookBtn.addEventListener("click",()=>{
  dialog.showModal()
})
closeDialog.addEventListener("click",()=>{
  dialog.close()
})
submitNewBook.addEventListener("click",(e)=>{
  e.preventDefault()
  bookContainer.innerHTML=""
  let title=bookTitle.value.trim()
  let author=bookAuthor.value.trim()
  let pages=bookPages.value
  let read=bookRead.checked 
  bookTitle.value=""
  bookAuthor.value=""
  bookPages.value=""
  bookRead.value=false

  if(title==false || author == false || pages==false){
  return
}
  addBookToLibrary(title,author,pages,read)
  dialog.close()
  displayBooks()
})

displayBooks()


const data = users
const ITEMS_PER_PAGE = 10

const itemsOnLastPage = data.length % ITEMS_PER_PAGE
let lastPageIndex = data.length - itemsOnLastPage - 1

populateHTML(0)
displayTotal()
createPagination()
selectPage(1)

function populateHTML(contactIndex) {
    let contactList = document.querySelector('.contact-list')
    contactList.innerHTML = ""
    let totalContanctsPerPage = 10

    if (contactIndex == lastPageIndex) {
        totalContanctsPerPage = itemsOnLastPage
    }    

    for (i = 0; i < totalContanctsPerPage; i++) {
        let contactCard =
            `<div class="contact-details">
                <img class="avatar" src="${data[contactIndex].picture.thumbnail}">
                <h3>${data[contactIndex].name.first + " " + data[contactIndex].name.last}</h3>
                <span class="email">${data[contactIndex].email}</span>
            </div>
            <div class="joined-details">
                <span class="date">Joined ${data[contactIndex].registered.date.substring(0, 10)}</span>
            </div>`
        contactIndex++
        let newContactCard = document.createElement('li')
        newContactCard.innerHTML = contactCard
        newContactCard.className += "contact-item cf"
        contactList.appendChild(newContactCard)
    }
}

function displayTotal() {
    let totalContacts = document.querySelector(".page-header h3")
    totalContacts.innerHTML = "Total: " + data.length
}

function createPagination() {
    let numOfPages = Math.ceil(data.length / 10)
    let pagination = document.querySelector(".pagination")

    for (i = 0; i < numOfPages; i++) {
        let newPage = document.createElement('li')
        newPage.className += " pageItem"
        newPage.innerHTML = `<a href="#">${(i + 1)}</a>`
        newPage.setAttribute("page_index", (i + 1))
        newPage.addEventListener("click", (e) => {
            e.preventDefault()
            selectPage(newPage.getAttribute("page_index"))
        })
        pagination.appendChild(newPage)
    }
}

function selectPage(page) {
    console.log("Page number: " + page)
    let newContactIndex = 0
    if (page > 1) {
        newContactIndex = (page - 1) * 10 - 1
    }
    
    console.log("newContactIndex: " + newContactIndex)
    populateHTML(newContactIndex)
   
    setActivePage(page)
}

function setActivePage(page) {
    console.log("Page: " + page)
    let pages = document.getElementsByClassName("pageItem")
    console.log(pages)
    console.log(pages.length)
    for (i = 0; i < pages.length; i++) {
        pages[i].firstChild.classList = ""

    }
    pages[(page - 1)].firstChild.classList += " active"
}
// Your code here
initialize();

const filmTitle = document.getElementById('title');
const runTime = document.getElementById('runtime');
const filmInfo = document.getElementById('film-info');
const showTime = document.getElementById('showtime');
const ticketNum = document.getElementById('ticket-num');
const button = document.getElementById('buy-ticket');
const poster = document.getElementById('poster');
const filmList = document.getElementById('films')
filmList.replaceChildren();

function getAllfilms(id = 1){
    fetch("http://localhost:3000/films{id}")
    .then(res => res.json())
    .then(item => {
        setPosterDetails(item);
    })
}
// poster details
function setPosterDetails(item){
    filmTitle.innerHTML = item.title;
    runTime.innerHTML = `${item.runtime} minutes`;
    filmInfo.innerHTML = item.description;
    showTime.innerHTML = item.showtime;
    poster.src = item.poster;
    ticketNum.innerHTML = (item.capacity - item.tickets_sold)
    let remainingTickets = (item.capacity - item.tickets_sold)
    ticketNumber(remainingTickets);
}

function listFilms(){
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(item => {
        item.forEach(film => {
            let filmItem = document.createElement('li');
            filmItem.textContent = film.title.toUpperCase();
            filmList.append(filmItem);
            filmItem.addEventListener('click', (e) => {
                e.preventDefault();
                setPosterDetails(film);
            })
        })
        
    })
    
}
function ticketNumber(remainingTickets){
    button.addEventListener('click',(e) => {
        e.preventDefault();
            if (remainingTickets > 0){
                remainingTickets -= 1;
            ticketNum.textContent = remainingTickets;
            }
            else if (remainingTickets <= 0){
                button.textContent = "Sold Out"
            }
        })
        
    }



function initialize(){
    getAllfilms();
    listFilms()
    
}
document.addEventListener('DOMContentLoaded', () => {
    // This line waits for the HTML document to be fully loaded before running the code inside.

    const movieList = document.getElementById('films');
    // This line finds an HTML element with the id 'films' and stores it in the variable 'movieList'.

    let movieData = [];
    // This line declares an empty array called 'movieData' to store information about movies.

    function fetchMoviesFromDB() {
        // This function fetches movie data from a file named 'db.json'.
        fetch('db.json')
            .then(response => {
                // This checks if the fetch operation was successful.
                if (!response.ok) {
                    throw new Error('Error fetching movies from db.json');
                }
                // If successful, convert the response to JSON format.
                return response.json();
            })
            .then(data => {
                // After converting the response to JSON, store the movie data in the 'movieData' array.
                movieData = data.films;
                // Then, call the 'displayMovies' function to show the movies on the webpage.
                displayMovies();
            })
            .catch(error => {
                // If there's an error fetching the data, log the error and show an error message on the webpage.
                console.error('Error fetching movies from db.json:', error);
                showErrorMessage('Error loading movie data');
            });
    }

    function displayMovies() {
        // This function displays the list of movies on the webpage.
        movieData.forEach(movie => {
            // For each movie in the 'movieData' array, create a list item element.
            const li = createMovieListItem(movie);
            // Append the list item to the 'movieList' element on the webpage.
            movieList.appendChild(li);
        });
    }

    function createMovieListItem(movie) {
        // This function creates a list item element for a movie.
        const li = document.createElement('li');
        // Set the text content of the list item to the title of the movie.
        li.textContent = movie.title;
        // Add a custom attribute to the list item to store the movie's ID.
        li.dataset.movieId = movie.id;
        // Add CSS classes to style the list item.
        li.classList.add('film', 'item');
        // Add a click event listener to the list item to show details about the movie when clicked.
        li.addEventListener('click', () => updateMovieDetails(movie.id));
        // Return the created list item.
        return li;
    }

    function updateMovieDetails(movieId) {
        // This function updates the movie details section when a movie is clicked.
        const movie = movieData.find(m => m.id === movieId);
        // If the movie is not found, stop the function.
        if (!movie) return;

        // Calculate the number of available tickets for the movie.
        const availableTickets = movie.capacity - movie.tickets_sold;
        // Find the 'buy-ticket' button on the webpage.
        const buyTicketButton = document.getElementById('buy-ticket');

        // Set the text content of the 'buy-ticket' button based on the availability of tickets.
        buyTicketButton.textContent = availableTickets > 0 ? 'Buy Ticket' : 'Sold Out';
        // Toggle the 'disabled' class of the 'buy-ticket' button based on ticket availability.
        buyTicketButton.classList.toggle('disabled', availableTickets === 0);
        // Add an event listener to the 'buy-ticket' button to handle ticket purchases.
        buyTicketButton.onclick = () => {
            if (availableTickets > 0) {
                buyTicket(movie);
            }
        };

        // Update the movie details section with information about the clicked movie.
        displayMovieDetails(movie);
    }

    function buyTicket(movie) {
        // This function simulates buying a ticket for a movie.
        movie.tickets_sold++;
        // Update the ticket count display on the webpage.
        updateTicketCount(movie.id);
        // Update the movie details section with the latest ticket information.
        updateMovieDetails(movie.id);
    }

    function updateTicketCount(movieId) {
        // This function updates the displayed number of available tickets for a movie.
        const movie = movieData.find(m => m.id === movieId);
        // Calculate the number of available tickets for the movie.
        const availableTickets = movie.capacity - movie.tickets_sold;
        // Update the ticket count display on the webpage.
        document.getElementById('ticket-num').textContent = availableTickets;
    }

    function displayMovieDetails(movie) {
        // This function displays details about a movie in the movie details section on the webpage.
        document.getElementById('title').textContent = movie.title;
        document.getElementById('runtime').textContent = `${movie.runtime} minutes`;
        document.getElementById('film-info').textContent = movie.description;
        document.getElementById('showtime').textContent = movie.showtime;
        document.getElementById('poster').src = movie.poster;
        document.getElementById('poster').alt = `Poster for ${movie.title}`;
        // Update the ticket count display for the movie.
        updateTicketCount(movie.id);
    }

    function showErrorMessage(message) {
        // This function displays an error message on the webpage.
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.classList.add('ui', 'negative', 'message');
        document.body.appendChild(errorMessage);
        // Set a timeout to remove the error message after 5 seconds.
        setTimeout(() => errorMessage.remove(), 5000);
    }

    // Call the fetchMoviesFromDB function to fetch movie data when the DOM content is fully loaded.
    fetchMoviesFromDB();
});

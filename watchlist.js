let selectedMovies = document.getElementById("selected-watchlist")
let emptyWatchlist = document.getElementById("empty-watchlist")

let watchlistMovies = JSON.parse(localStorage.getItem("data")) || []

function render() {
  selectedMovies.innerHTML = ""
  if (watchlistMovies.length !== 0) {
    watchlistMovies.map((movie) => {
      fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=fc1fef96`)
        .then((response) => response.json())
        .then((data) => {
          let { Poster, Title, imdbRating, Runtime, Genre, Plot, imdbID } = data

          selectedMovies.innerHTML += `
              <div class="movie">
              <img width="100" src=${Poster} alt="img" />
             
              <div class="movie-details">
                  <h3>${Title} <span>⭐${imdbRating}</span></h3>
                  <p>
                      <span class="runtime">${Runtime} </span> 
                      <span class="genre">${Genre}</span> 
                      <span onclick=removeWatchlist("${imdbID}") class="icon-watchlist"> <i class="bi bi-dash-circle-fill">Remove</i>  </span>
                  </p>
                  <p class="plot">${Plot}</p>
      
              </div>
          </div>
              
              
              `
        })
    })
  } else {
    selectedMovies.innerHTML = ""
    emptyWatchlist.innerHTML = `
        <h3>Your watchlist is looking a little empty...</h3>
        <a href="index.html" <i class="bi bi-plus-circle-fill">Let’s add some movies!</i> </a>
    `
  }
}

render()

function removeWatchlist(imdbID) {
  watchlistMovies = watchlistMovies.filter((x) => x.imdbID !== imdbID)
  localStorage.setItem("data", JSON.stringify(watchlistMovies))
  render()
}

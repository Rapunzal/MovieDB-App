import { addTowatchList } from "./watchlist";

export function createMovie(movies) {
  infoDump.textContent = "";
  if (movies.length > 0) {
    movies.map((movie) => {
      if (movie.backdrop_path !== null) {
        const card = document.createElement("div");
        card.classList.add("card");
        infoDump.append(card);
        const favBtn = document.createElement("button");
        favBtn.id = "favBtn";
        favBtn.textContent = "Add to WatchList";
        card.append(favBtn);

        favBtn.addEventListener("click", () => addTowatchList(movie.id));

        const image = document.createElement("img");
        image.alt = "dummy";
        image.src = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
        card.append(image);
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");
        const movieTitle = document.createElement("h3");
        movieTitle.textContent = movie.original_title;
        movieInfo.append(movieTitle);
        card.append(movieInfo);
        const span = document.createElement("span");
        span.textContent = movie.vote_average.toFixed(1);
        movieInfo.append(span);
        const description = document.createElement("div");
        description.classList.add("description");
        description.textContent = movie.overview;

        card.append(description);
      }
    });
  } else {
    infoDump.innerHTML = "<h1>Oops.. Could Not find this Movie</h1>";
    infoDump.style.color = "white";
  }
}

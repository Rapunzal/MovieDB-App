export function createMovie(movies) {
  movies.map((movie) => {
    //console.log(movie);
    if (movie.backdrop_path !== null) {
      const card = document.createElement("div");
      card.classList.add("card");
      infoDump.append(card);

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
      span.textContent = movie.vote_average;
      movieInfo.append(span);
      const description = document.createElement("div");
      description.classList.add("description");
      description.textContent = movie.overview;
      card.append(description);
    }
  });
}

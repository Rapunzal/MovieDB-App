//First implemented in fetch

const infoDump = document.getElementById("infoDump");
const search = document.querySelector(".btn");
async function getMovies() {
  let movies;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjMzNWI2OWRjMDgyOGNiMDI5ZTgzN2U1OWRmOGZiYSIsIm5iZiI6MTczNjkwOTkxNS45NTUwMDAyLCJzdWIiOiI2Nzg3MjQ1YjYwMWFjZmU3YmQ0Zjk3YjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zdBOfKnmZxXUngIOJRH78BOmdBpMX4xao2I8m48P_yQ",
    },
  };

  await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res.results);
      movies = res.results;
    })
    .catch((err) => console.error(err));
  console.log(movies, " movies");
  createMovie(movies);
}

function createMovie(movies) {
  movies.map((movie) => {
    //console.log(movie);
    const card = document.createElement("div");
    card.classList.add("card");
    infoDump.append(card);

    const h1 = document.createElement("p");
    h1.innerText = movie.title;
    card.append(h1);
    const image = document.createElement("img");
    image.alt = "dummy";

    image.src = `
    
    https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

    card.append(image);
  });
}

getMovies();
//https://api.themoviedb.org/3/trending/all/day?language=en-US/v9Du2HC3hlknAvGlWhquRbeifwW.jpg

///https://api.themoviedb.org/v9Du2HC3hlknAvGlWhquRbeifwW.jpg

search.addEventListener("click", getMovie);

async function getMovie() {
  infoDump.innerHTML = "";
  let movies;
  const name = document.getElementById("inp");
  const movieName = name.value;
  console.log(movieName);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjMzNWI2OWRjMDgyOGNiMDI5ZTgzN2U1OWRmOGZiYSIsIm5iZiI6MTczNjkwOTkxNS45NTUwMDAyLCJzdWIiOiI2Nzg3MjQ1YjYwMWFjZmU3YmQ0Zjk3YjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zdBOfKnmZxXUngIOJRH78BOmdBpMX4xao2I8m48P_yQ",
    },
  };

  await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((res) => res.json())
    .then((res) => {
      movies = res.results;
    })
    .catch((err) => console.error(err));
  console.log(movies, " serach result====");
  createMovie(movies);
}

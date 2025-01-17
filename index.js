import axios from "axios";

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "";

//Setting Default headers

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjMzNWI2OWRjMDgyOGNiMDI5ZTgzN2U1OWRmOGZiYSIsIm5iZiI6MTczNjkwOTkxNS45NTUwMDAyLCJzdWIiOiI2Nzg3MjQ1YjYwMWFjZmU3YmQ0Zjk3YjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zdBOfKnmZxXUngIOJRH78BOmdBpMX4xao2I8m48P_yQ";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
axios.defaults.headers.post["Content-Type"] = "application/json";

const infoDump = document.getElementById("infoDump");
const search = document.querySelector(".btn");
async function getMovies() {
  let movies;
  try {
    const response = await axios("/movie/now_playing?language=en-US&page=1");
    const data = response.data;
    movies = data.results;
    console.log(data, " data===");
  } catch (errors) {
    console.error(errors);
  }
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

search.addEventListener("click", getMovie);

async function getMovie() {
  infoDump.innerHTML = "";
  let movies;
  const name = document.getElementById("inp");
  const movieName = name.value;
  console.log(movieName);

  const response = await axios(
    `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`
  );
  console.log(response);
  const data = response.data;
  movies = data.results;

  console.log(movies, " serach result====");
  createMovie(movies);
}

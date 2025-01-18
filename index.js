import axios from "axios";
import { createMovie } from "./script";
import { getWatchList, fetchDataWithPromise } from "./watchlist";
//Setting Default headers

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = "";
let totalPages = 100;

const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjMzNWI2OWRjMDgyOGNiMDI5ZTgzN2U1OWRmOGZiYSIsIm5iZiI6MTczNjkwOTkxNS45NTUwMDAyLCJzdWIiOiI2Nzg3MjQ1YjYwMWFjZmU3YmQ0Zjk3YjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zdBOfKnmZxXUngIOJRH78BOmdBpMX4xao2I8m48P_yQ";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
axios.defaults.headers.post["Content-Type"] = "application/json";

const infoDump = document.getElementById("infoDump");
const search = document.querySelector(".btn");
async function getMovies() {
  lastUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
  let movies;
  try {
    const response = await axios(lastUrl);
    const data = response.data;
    movies = data.results;
    console.log(data, " data===");
  } catch (errors) {
    console.error(errors);
  }
  console.log(movies, " movies");
  createMovie(movies);
}

getMovies();

search.addEventListener("click", (url) => searchMovies(url));

//Search movie
async function searchMovies() {
  let movies;
  const name = document.getElementById("inp");
  const movieName = name.value;
  console.log(movieName);
  let url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
  getMovie(url);
}

async function getMovie(url) {
  let movies;
  const name = document.getElementById("inp");
  const movieName = name.value;
  console.log(movieName);

  let prevUrl = url;
  lastUrl = prevUrl;
  infoDump.innerHTML = "";

  const response = await axios(prevUrl);
  console.log(response);
  const data = response.data;
  movies = data.results;
  currentPage = data.page;
  nextPage = currentPage + 1;
  prevPage = currentPage - 1;
  totalPages = data.total_pages;

  current.textContent = currentPage;
  if (currentPage <= 1) {
    prev.classList.add("disabled");
    next.classList.remove("disabled");
  } else if (currentPage >= totalPages) {
    prev.classList.remove("disabled");
    next.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
    next.classList.remove("disabled");
  }
  console.log(movies, " serach result====");
  createMovie(movies);
}
//Pagination
prev.addEventListener("click", () => {
  console.log("next ==", nextPage, " total pages", totalPages);
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  console.log("next ==", nextPage, " total pages", totalPages);
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  console.log(lastUrl, " lasturl");
  let partUrl = lastUrl.split("?");
  let queryParams = partUrl[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  console.log(key, " key===");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    console.log("url=====>>>", url);
    getMovie(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = partUrl[0] + "?" + b;
    getMovie(url);
  }
}

const watchlistBtn = document.getElementById("watchlistBtn");
console.log(watchlistBtn, " watchlist btn");
watchlistBtn.addEventListener("click", getWatchList);

//Using Promise
fetchDataWithPromise(
  "https://api.themoviedb.org/3/account/21752095/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc"
)
  .then((res) => res)
  .then((result) => console.log(result, " using promise"));

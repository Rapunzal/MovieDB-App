import { createMovie } from "./script";

//Post method to save movie to watch list
export async function addTowatchList(mediaId) {
  console.log(mediaId);
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjMzNWI2OWRjMDgyOGNiMDI5ZTgzN2U1OWRmOGZiYSIsIm5iZiI6MTczNjkwOTkxNS45NTUwMDAyLCJzdWIiOiI2Nzg3MjQ1YjYwMWFjZmU3YmQ0Zjk3YjYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zdBOfKnmZxXUngIOJRH78BOmdBpMX4xao2I8m48P_yQ",
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: mediaId,
      watchlist: true,
    }),
  };

  fetch("https://api.themoviedb.org/3/account/21752095/watchlist", options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

//Method to get list of saved movies
export async function getWatchList() {
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
    "https://api.themoviedb.org/3/account/21752095/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc",
    options
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      movies = res.results;
    })
    .catch((err) => console.error(err));
  console.log(movies, " ====>watchlist");
  createMovie(movies);
}

export function fetchDataWithPromise(url) {
  console.log("fetch data");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject("URL is required!");
      }
    }, 1000);
  });
}

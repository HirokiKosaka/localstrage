const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsContainer = document.getElementById('results');



searchButton.addEventListener('click', performSearch);

function performSearch() {
  const language = 'ja-JP'; // 追加: 日本語を指定
  const query = searchInput.value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=bd26887845b847dd40905b0a11f980a7&query=${query}&language=${language}`)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      displayResults(results);
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
}

function displayResults(results) {
  resultsContainer.innerHTML = '';

  results.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-item');

    const movieTitle = document.createElement('h2');
    const moviePoster = document.createElement('img');

    movieTitle.textContent = movie.title;

    if (movie.poster_path) {
      moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    } else {
      moviePoster.src = 'placeholder-image.jpg';
    }

    const watchButton = document.createElement('button');
    watchButton.textContent = '視聴済みにする';
    watchButton.addEventListener('click', () => markAsWatched(movie.id));

    movieElement.appendChild(moviePoster);
    movieElement.appendChild(movieTitle);

    resultsContainer.appendChild(movieElement);
    movieElement.appendChild(watchButton);
  });
}

function markAsWatched(movieId) {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  if (!watchedMovies.includes(movieId)) {
    watchedMovies.push(movieId);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    displayWatchedMovies();
  }
}

function displayWatchedMovies() {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  const watchedMoviesContainer = document.getElementById('watchedMoviesContainer');
  watchedMoviesContainer.innerHTML = '';

  resultsContainer.innerHTML = '';

  watchedMovies.forEach(movieId => {
    // 映画情報を取得するためのリクエスト
    const apiKey = 'bd26887845b847dd40905b0a11f980a7';
    const language = 'ja-JP'; // 取得する情報の言語を指定

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=${language}`)
      .then(response => response.json())
      .then(movie => {
        // 映画情報を表示する処理
        const movieElement = document.createElement('div');
        movieElement.classList.add('watched-movie-item');

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;

        movieTitle.textContent = movie.title;
        movieTitle.classList.add('watched-movie-title');

        movieElement.classList.add('watched-movie-item');


        const moviePoster = document.createElement('img');
        if (movie.poster_path) {
          moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        } else {
          moviePoster.src = 'placeholder-image.jpg';
        }

        movieElement.appendChild(moviePoster);
        movieElement.appendChild(movieTitle);

        resultsContainer.appendChild(movieElement);
        watchedMoviesContainer.appendChild(movieElement);
        movieElement.appendChild(deleteButton);

      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  });
  }

document.addEventListener('DOMContentLoaded', () => {
  displayWatchedMovies();
});


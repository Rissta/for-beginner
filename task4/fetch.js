const apiKey = '4129684d';

async function requestMoviesByName(arrOfNameMovies) {
  const allMovies = [];
  const type = 'movie';

  for (const name of arrOfNameMovies) {
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(name)}&type=${type}`);
      const data = await response.json();
      
      if (data.Response === "True" && data.Search) {
        for (const movieShort of data.Search) {
          const fullResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${movieShort.imdbID}`);
          const fullData = await fullResponse.json();

          const movie = {
            title: fullData.Title,
            year: fullData.Year,
            runtime: fullData.Runtime,
            rating: fullData.imdbRating,
            poster: fullData.Poster
          };

          allMovies.push(movie);
        }
      } else {
        console.warn(`Фильмы по запросу "${name}" не найдены.`);
      }
    } catch (error) {
      console.error('Ошибка при запросе к OMDb API:', error);
    }
  }

  return allMovies;
}
requestMoviesByName(['Matrix']).then(movies => {
  movies.forEach(movie => console.log(movie.title));
});

const apiKey = '4129684d';
const title = 'The Matrix';

fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`)
  .then(response => response.json())
  .then(data => {
    console.log(data); // здесь будет информация о фильме
  })
  .catch(error => {
    console.error('Ошибка при запросе к OMDb API:', error);
  });

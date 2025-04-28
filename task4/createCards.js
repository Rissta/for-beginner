export async function createCard(classElement, arrMovies) {
    const data = [];
    const movies = await requestMoviesByName(arrMovies);
    movies.forEach(movie => {
        const elementHTML = `
            <div>
                <div class="${classElement}" style="background-image: url(${movie.poster});">
                    <div class="top-data-card">
                        <div class="yllow-theme">
                            <p>${movie.rating}</p>
                        </div>
                        <div class="dark-theme">
                            <p>${movie.year}</p>
                        </div>
                    </div>
                    <div class="bot-data-card">
                        <div class="dark-theme">
                            <p>${movie.runtime}</p>
                        </div>
                    </div>
                </div>
                <p>${movie.title}</p>
            </div>`;
        data.push(elementHTML);
    });
    return data;
}

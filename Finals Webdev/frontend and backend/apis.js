document.addEventListener("DOMContentLoaded", () => {
    const genreSlider = document.getElementById("genre-slider");
    const animeContainer = document.getElementById("anime-container");

    // Fetch genres from Jikan API
    fetch("https://api.jikan.moe/v4/genres/anime")
        .then(res => res.json())
        .then(data => {
            data.data.forEach(genre => {
                const btn = document.createElement("button");
                btn.className = "genre-button";
                btn.textContent = genre.name;
                btn.addEventListener("click", () => loadAnimeByGenre(genre.mal_id));
                genreSlider.appendChild(btn);
            });
        });

    // Load anime based on genre
    function loadAnimeByGenre(genreId) {
        animeContainer.innerHTML = "<p>Loading anime...</p>";
        fetch(`https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity&limit=5`)
            .then(res => res.json())
            .then(data => {
                animeContainer.innerHTML = "";
                data.data.forEach(anime => {
                    const animeCard = document.createElement("div");
                    animeCard.className = "anime-card";

                    const info = `
                        <h3>${anime.title}</h3>
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
                        <p>${anime.synopsis ? anime.synopsis.substring(0, 200) + "..." : "No description available."}</p>
                    `;

                    animeCard.innerHTML = info;

                    animeContainer.appendChild(animeCard);
                });
            });
    }
});

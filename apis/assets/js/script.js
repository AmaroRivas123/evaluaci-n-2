function cargarPeliculas() {
  fetch('https://devsapihub.com/api-movies')
    .then(res => res.json())
    .then(data => mostrarPeliculas(data))
    .catch(err => {
      console.error('Error al cargar películas:', err);
      document.getElementById('peliculas-container').innerHTML = `<p>No se pudieron cargar las películas.</p>`;
    });
}


function mostrarPeliculas(data) {
  const container = document.getElementById('peliculas-container');
  container.innerHTML = '';

  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML = '<p>No se encontraron películas con este filtro.</p>';
    return;
  }

  data.forEach(pelicula => {
    const rating = pelicula.stars;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starsHtml += '<span class="llena">★</span>';
      }
      else {
        starsHtml += '<span class="vacia">☆</span>';
      }
    }

    const card = `
            <div class="pelicula-card">
              <img src="${pelicula.image_url}" alt="${pelicula.titulo}" class="pelicula-poster">
              <div class="pelicula-rating">
                <span class="rating-year">${pelicula.year}</span> | ${starsHtml}
              </div>
              <p class="pelicula-genre">${pelicula.genre}</p>
              <div class="pelicula-overlay">
                <h4 class="pelicula-title">${pelicula.title}</h4>
                <p class="pelicula-info">${pelicula.description}</p>
              </div>
            </div>
        `;
    container.insertAdjacentHTML('beforeend', card);
  });
}


function aplicarFiltros() {
  const Busqueda = document.getElementById('busqueda').value;
  const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;

  if (Busqueda === '') {
    cargarPeliculas();
    return;
  }
  if (Busqueda !== ''){
  if (soloLetras.test(Busqueda)) {
    fetch(`https://devsapihub.com/api-movies/genre/${Busqueda}`)
      .then(res => res.json())
      .then(data => {
        mostrarPeliculas(data);
      })
      .catch(err => console.error(err));

    return;
  }
  if (Busqueda <=5 ) {
    fetch(`https://devsapihub.com/api-movies/stars/${Busqueda}`)
      .then(res => res.json())
      .then(data => {
        mostrarPeliculas(data);
      })
      .catch(err => console.error(err));

    return;
  }
  else{
    fetch(`https://devsapihub.com/api-movies/year/${Busqueda}`)
      .then(res => res.json())
      .then(data => {
        mostrarPeliculas(data);
      })
      .catch(err => console.error(err));

    return;
  }
}

}

cargarPeliculas();



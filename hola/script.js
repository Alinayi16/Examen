let currentPage = 1;
const limit = 10; // Número de resultados por página
let currentSearch = "";
let currentCategory = "email";

// Función para realizar la búsqueda usando la API de Pipl
async function searchPipl(query, category, page = 1) {
    const apiKey = "YOUR_API_KEY";
    const url = `https://api.pipl.com/search/v5/?${category}=${query}&key=${apiKey}&page=${page}&limit=${limit}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderCards(data.records);
        togglePaginationButtons(data.has_previous, data.has_next);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Hubo un error en la búsqueda.");
    }
}

// Renderizar las tarjetas
function renderCards(records) {
    const container = document.getElementById("cards-container");
    container.innerHTML = "";  // Limpiar contenedor

    records.forEach(person => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Añadir imagen y nombre a la tarjeta
        const img = document.createElement("img");
        img.src = person.avatar || "https://via.placeholder.com/120";
        card.appendChild(img);

        const name = document.createElement("h3");
        name.textContent = `${person.name.first || ''} ${person.name.last || ''}`;
        card.appendChild(name);

        // Añadir tarjeta al contenedor
        container.appendChild(card);
    });
}

// Alternar botones de paginación (Anterior y Siguiente)
function togglePaginationButtons(hasPrevious, hasNext) {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    prevBtn.disabled = !hasPrevious;
    nextBtn.disabled = !hasNext;
}

// Eventos de búsqueda
document.getElementById("search-btn").addEventListener("click", () => {
    const query = document.getElementById("search-input").value;
    currentSearch = query;
    currentCategory = document.getElementById("search-category").value;
    currentPage = 1; // Reiniciar a la primera página
    searchPipl(query, currentCategory, currentPage);
});

// Mostrar todas las cards (esto dependerá de cómo funcione la API)
document.getElementById("show-all-btn").addEventListener("click", () => {
    currentPage = 1;
    searchPipl("", "email", currentPage);  // Busca sin filtros
});

// Paginación
document.getElementById("prev-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        searchPipl(currentSearch, currentCategory, currentPage);
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    currentPage++;
    searchPipl(currentSearch, currentCategory, currentPage);
});

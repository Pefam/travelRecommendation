// Fetch data from JSON
let travelData = [];

fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log('Data loaded:', data);
    })
    .catch(error => console.error('Error loading data:', error));

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    let recommendations = [];
    
    if (searchTerm.includes('beach')) {
        recommendations = [...travelData.beaches];
    } else if (searchTerm.includes('temple')) {
        recommendations = [...travelData.temples];
    } else if (searchTerm.includes('country')) {
        travelData.countries.forEach(country => {
            recommendations.push(...country.cities);
        });
    }

    displayRecommendations(recommendations);
}

function displayRecommendations(recommendations) {
    const resultsContainer = document.getElementById('results');
    
    recommendations.forEach(item => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        resultsContainer.appendChild(card);
    });
}

function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
}

// Navigation handling
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('href').substring(1);
        showPage(page);
    });
});

function showPage(page) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(page).style.display = 'block';
}
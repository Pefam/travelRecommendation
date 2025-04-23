let travelData = [];

// Only initialize search functionality on home page
if (document.getElementById('searchInput')) {
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            travelData = data;
            console.log('Data loaded:', data);
        })
        .catch(error => console.error('Error loading data:', error));
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    let recommendations = [];
    
    // Improved keyword matching
    const normalizedTerm = searchTerm.replace(/s$/, ''); // Remove trailing 's'
    switch(normalizedTerm) {
        case 'beach':
        case 'beache':
            recommendations = [...travelData.beaches];
            break;
        case 'temple':
            recommendations = [...travelData.temples];
            break;
        case 'countri':
        case 'country':
            travelData.countries.forEach(country => {
                recommendations.push(...country.cities);
            });
            break;
        default:
            if (searchTerm.includes('beach')) recommendations = [...travelData.beaches];
            else if (searchTerm.includes('temple')) recommendations = [...travelData.temples];
            else if (searchTerm.includes('countr')) recommendations = travelData.countries.flatMap(c => c.cities);
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
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}


const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) }
];


var map = L.map('map').setView([32.5, -95], 4);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


async function getLocality(lat, lng) {
    const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
    const data = await response.json();
    return data.locality || 'Unknown locality';
}


coordinates.forEach(async (coord, index) => {
    
    const marker = L.marker([coord.lat, coord.lng]).addTo(map);
    
   
    const locality = await getLocality(coord.lat, coord.lng);
    
    
    document.getElementById(`marker${index + 1}`).innerHTML = `
        Latitude: ${coord.lat}, Longitude: ${coord.lng}<br>
        Locality: ${locality}
    `;
    
    
    marker.bindPopup(`Marker ${index + 1}: Latitude: ${coord.lat}, Longitude: ${coord.lng} - Locality: ${locality}`).openPopup();
});
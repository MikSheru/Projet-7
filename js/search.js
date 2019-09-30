// Utilisation de la barre de recherche : une ville est sélectionnée, un marqueur est placé sur cette ville, la carte "zoom" sur l'emplacement de la ville
function onPlaceChanged() {
    mesRestaurants=[];
    let place = autocomplete.getPlace();
    
    if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        rechercher();
    } else {
        
        $("#autocomplete-input").text("");
    }           
}


function nearbySearchCallbck (results, status) {
            
    mesRestaurants = [];
    for (let i = 0; i < results.length; i++) {
        mesRestaurants.push(results[i]);
        
    }           
    
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        rechercher();
    }
}
    

function rechercher () {
    let search = {
        bounds: map.getBounds(),
        type: ["restaurant"]
    };
    places.nearbySearch(search, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {

            mesRestaurants = [];
            for (let i = 0; i < results.length; i++) {
                mesRestaurants.push(results[i]);
                
            } 
            displayRestaurants(results);
        }
    });
}


function displayRestaurants(restaurants) {
    resetResults();
    resetMarkers();
            
    googleRestaurants = [];
    for (let i = 0; i < restaurants.length; i++) {
        googleRestaurants.push(restaurants[i]);
        markers[i] = new google.maps.Marker({
            position: restaurants[i].geometry.location,
            placeId: restaurants[i].id,
            icon: createMarkerStars(googleRestaurants[i]),
            zIndex: 52,
        });
        
        // Si l'utilsateur clique sur le marqueur d'un restaurant, les détails du restaurants s'affiche devant lui
        google.maps.event.addListener(markers[i], "mouseover", afficheInfoWindowPetite);
        google.maps.event.addListener(markers[i], "mouseout", masquerInfoWindowPetite);
        google.maps.event.addListener(markers[i], "click", afficheInfoWindow);
        google.maps.event.addListener(map, "click", masquerInfoWindow);
        google.maps.event.addListener(markers[i], "touchstart", masquerInfoWindowPetite);
        google.maps.event.addListener(markers[i], "touchend", masquerInfoWindowPetite);
        
        ajouterResultsEtMarkers(i, restaurants, i);
    }
}


// Réinitialise les valeurs par défaut
function resetResults () {
    let results = document.getElementById('resultats');
    while (results.childNodes[0]) {
           results.removeChild(results.childNodes[0]);
           }
}


function resetMarkers (){
    for (let i = 0; i < markers.length; i++) {
        if (markers[i]) {
            markers[i].setMap(null);
        }
    }

    markers = [];
}


// Place les marqueurs sur la carte
function getMarker(i) {
    return markers[i] ? function () {markers[i].setMap(map);} : null;
}


// Ajoute les résultats et les marqueurs
function ajouterResultsEtMarkers (markersI, array, i) {
    ajoutResultList(array[i], markersI);
    markers[markersI].placeResult = array[i];
    setTimeout(getMarker(markersI), i * 100); 
}
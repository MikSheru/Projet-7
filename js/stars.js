function getEtoiles (place) {
    let rating = [];
    
    if (place.rating) {
        for (let i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                rating.push("✩");
            } else {
                rating.push("✭");
            }
        }
        return rating.join(" ");
    }
}


// Permet la création des étoiles pour classer les restaurants
function getEtoilesRating (elt, rating) {
    elt.empty();
    for (let i = 0; i < 5; i++) {
        if (rating <= (i + 0.25)) {
            elt.append('<i class="far fa-star star-rating-font-size"></i>');
        } else if (rating < (i + 0.75)) {
            elt.append('<i class="fas fa-star-half-alt star-rating-font-size"></i>');
        } 
        else {
             elt.append('<i class="fas fa-star star-rating-font-size"></i>');
        }
        
        elt.css("display", "");
    }
}


function resetFiltre() {
    
    toutesEtoiles = false;
    tri3Etoile = false;
    tri4Etoile = false;
    tri5Etoile = false;
}


// Crée les marqueurs avec des étoiles
function createMarkerStars (result) {
    let rating = Math.round(result.rating);
    let markerIcon;
    
    if (isNaN(rating)) {
        markerIcon = "img/" + "marker.png";
    } else {
        markerIcon = "img/" + "marker" + rating + ".png";
    }
    return markerIcon;
}


// Permet de trier les restaurants selon leurs notes
function trierFiltres (min, max) { 

    return mesRestaurants.filter(restaurant => (Math.round(restaurant.rating) >= min && Math.round(restaurant.rating) <= max));    
      
}
    

filterBtn.click(function () {
    if (minStar.val() <= maxStar.val()) {
        restaurantsFiltres = trierFiltres(minStar.val(), maxStar.val());
        displayRestaurants(restaurantsFiltres);    
    } else {
        alert('La note minimum doit être inférieure à la note maximum !');
    }
    
});
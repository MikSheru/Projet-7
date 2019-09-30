// Permet d'afficher une fenêtre contenant des informations
function afficheInfoWindow () {
    masquerInfoWindowPetite();
    let marker = this;
    places.getDetails({
        placeId: marker.placeResult.place_id
    }, function (place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        infoWindow.open(map, marker);
        creerIWContent(place);
        displayRestaurantInfo(place);
    });
}

function afficheInfoWindowPetite () {
    masquerInfoWindow();
    let marker = this;
    places.getDetails({
        placeId: marker.placeResult.place_id
    }, function (place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        infoWindowPetite.open(map, marker);
        creerIWContentPetit(place);
    });
}

function afficheInfoWindowMesRest () {
    masquerInfoWindowPetite();
    let marker = this;
    infoWindow.open(map, marker);
    creerIWContent(mesRestaurants[marker.id]);
    displayRestaurantInfo(mesRestaurants[marker.id]);
}

function afficheInfoWindowPetiteMesRest () {
    masquerInfoWindowPetite();
    let marker = this;
    infoWindowPetite.open(map, marker);
    creerIWContentPetit(mesRestaurants[marker.id]);
}

function ajoutRestaurantInfoWindow () {
    let marker = this;
    if (restoEstNouveau) {
        infoWindowNouveauRest.open(map, marker);
        creerResDetailContent(marker);
        nouveauRestMarker.push(marker);
        nResNum += 1;
    } else {
        infoWindow.open(map, marker);
        creerIWContent(nouveauPlace[marker.id]);
        displayRestaurantInfo(nouveauPlace[marker.id]);
    }
}


// Permet de fermer les fenêtres d'informations "InfoWindows"
function masquerInfoWindow (marker) {
    infoWindow.close(map, marker);
}

function masquerInfoWindowPetite (marker) {
    infoWindowPetite.close(map, marker);
}

function masquerInfoWindowNouveauRest (marker) {
    infoWindowNouveauRest.close(map, marker);
}


// Met en place les informations de la petite fenêtre
function creerIWContentPetit (place) {
    $("#iw-icon-small").html('<img class="photo" ' + 'src="' + createPhoto(place) + '"/>');
    $("#iw-url-small").html('<b>' + place.name + '</b>');
    
    if (place.rating) {
        getEtoilesRating($("#iw-url-small"), place.rating);
    } else {
        $("#iw-rating-small").css("display", "none");
    }
}

// Met en place les informations de la grande fenêtre
function creerIWContent (place) {
    $("#iw-icon").html('<img class="photo" src="' + createPhoto(place) +'"/>');            
    $("#iw-url").html('<b><a href="#restaurant-info">' + place.name + '</a></b>');
    $("#iw-address").text(place.vicinity);
    if (place.formatted_phone_number) {
        
        $("#iw-phone").css("display", "");
        $("#iw-phone").text(place.formatted_phone_number);
        
    } else {

        $("#iw-phone").css("display", "none");
    }     
    
    if (place.rating) {
        
        getEtoilesRating($("#iw-rating"), place.rating);
    } else {

        $("#iw-rating").css("display", "block");
        //$("#iw-rating-small").html(ratingHtml);
    }
    if (place.website) {
        let website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = "http://" + place.website + "/";
        }
        
        $("#iw-website").css("display", "");
        $("#iw-website").html('<a href="' + website + '">' + place.website + '</a>');
        
    } else {

        $("#iw-website").css("display", "none");
    }
    if (place.opening_hours) {
        if (place.opening_hours.open_now) {

            $("#iw-open").css("display", "");
            $("#iw-open").text("Maintenaint Ouvert");
        } else {
            
            $("#iw-open").css("display", "none");
        }
    }

    $("#iw-reviews").text("Voir les commentaires");
}
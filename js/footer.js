// Affiche des informations distinctes sur le restaurant sélectionné en dessous de la carte
function displayRestaurantInfo (place) {
    afficheForm();
    restaurantInfoElt.css("display", "block");
    $("#name").text(place.name);
    $("#address").text(place.vicinity);
    $("#telephone").text(place.formatted_phone_number);            
    if (place.website) {
        let website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = "https://" + place.website + "/";
        }               

        $("#website").html('<a href="' + website + '">Allez sur le site du restaurant</a>');

    }

    let reviewsElt = $("#reviews");
    let reviewsHtml = "";

    reviewsElt.html(reviewsHtml);
    if (place.reviews) {
        if (place.reviews.length > 0) {
            for (let i = 0; i < place.reviews.length; i += 1) {
                let review = place.reviews[i];
                let avatar;
                if (place.reviews[i].profile_photo_url) {
                        avatar = place.reviews[i].profile_photo_url;
                    } else {
                        avatar = 'img/avatar.png';
                    }
                reviewsHtml += '<div class="restaurant-reviews">' +
                    '<h3 class="review-title">' +
                    '<span class="profile-photo" style="background-image: url(' + avatar + ')"></span>';

                if (place.rating) {
                    reviewsHtml += '<span id="review-rating" class="rating">' + getEtoiles(review) + '</span>';

                }
                reviewsHtml += '</h3>' +
                    '<p>' + place.reviews[i].text + '</p>' +
                    '</div>';
                reviewsElt.html(reviewsHtml);
                }
        }
    }

    // Permet d'ajouter Google Street View à notre site
    let sv = new google.maps.StreetViewService();
    sv.getPanorama({
        location: place.geometry.location,
        radius: 50
    }, processSVData);
    
    let panoElt = document.getElementById("pano");
    let streetViewWrapper = $("#street-view-wrapper");
    let voirPhoto = $("#see-photo");
    let voirStreetView = $("#see-street-view");
    let photoElt = $("#photo");            

    photoElt.html('<img class="photo-big" ' + 'src="' + createPhoto(place) + '"/>');    
    
    streetViewWrapper.css("display", "block");
    voirStreetView.css("display", "none");
    photoElt.css("display", "none");
    
    if(avoirPhoto) {
        voirPhoto.css("display", "block");
    } else {
        voirPhoto.css("display", "none");
    }

    function processSVData (data, status) {
        if (status === "OK") {
            let panorama = new google.maps.StreetViewPanorama(panoElt);
            panorama.setPano(data.location.pano);
            panorama.setPov({
                heading: 270,
                pitch: 0
            });
            panorama.setVisible(true);
            
            // Affiche Google Street View en cliquant sur le bouton "Voir via Google Street View"
            voirStreetView.click(function() {
                voirStreetView.css("display", "none");
                voirPhoto.css("display", "block");
                streetViewWrapper.css("display", "block");
                photoElt.css("display", "none");
            });                   
            
            // Affiche la ou les photos du restaurant si on clique sur le bouton "Photo(s) du restaurant"
            voirPhoto.click(function(){
                voirStreetView.css("display", "block");
                voirPhoto.css("display", "none");
                streetViewWrapper.css("display", "none");
                photoElt.css("display", "block");
            });                    
            
        } else {
            voirPhoto.css("display", "none");
            streetViewWrapper.css("display", "none");
            photoElt.css("display", "block");
        }
    }
}


// Mise en place d'une photo pour un restaurant, en lien avec l'API Google
function createPhoto (place) {
    let photos = place.photos;
    let photo;
    
    if (!photos) {
        photo = place.icon;
        avoirPhoto = false;
    } else {
        avoirPhoto = true;
        photo = photos[0].getUrl({
            "maxWidth": 600,
            "maxHeight": 400
        });
    }
    return photo;
}
// La liste des restaurants apparaît à droite du site
function ajoutResultList (result, i) {
    let ratingElt;
    let listElt = $("<div/>").addClass("results-list").appendTo($("#resultats"));
    listElt.on("click", function () {
        google.maps.event.trigger(markers[i], "click");
    });
    let details = $("<div/>").addClass("placeIcon").appendTo(listElt);
    $("<img/>").attr("src", createPhoto(result)).appendTo(details);
    let listDetails = $("<div/>").addClass("placeDetails").appendTo(listElt);
    $("<div/>").addClass("name").text(result.name).appendTo(listDetails);
    if (result.rating) {
        ratingElt = $("<div/>").addClass("rating");
        getEtoilesRating(ratingElt, result.rating);

        details += ratingElt.appendTo(listDetails);
        details += $("<div/>").addClass("rating-note").text(result.rating).appendTo(listDetails);
    }
    details += $("<a/>").attr("href", "#restaurant-info").addClass("reviews-link").text("Plus d'informations").appendTo(listDetails);
    
}


// Permet de mettre en place les informations afin d'ajouter un restaurant
function creerResDetailContent (marker) {
    restaurantInfoElt.css("display", "block");
    form.css("padding", "10px");

    form.html('<h3 class="add-res-heading">Remplissez les données</h3>' +
        '<input type="text" id="res-name" name="res-name" placeholder=" Nom" required/>' +
        '<input type="hidden" id="res-location-lat" name="res-location-lat" value="' + marker.position.lat() +'"/>' +
        '<input type="hidden" id="res-location-lng" name="res-location-lng" value="' + marker.position.lng() +'"/>' +
        '<input type="text" name="res-address" id="res-address" placeholder=" Adresse" required/>' +
        '<label for="res-rating">Note : </label>' +
        '<select name="res-rating" id="res-rating" required>' +
            '<option value="1">1</option>' +
            '<option value="2">2</option>' +
            '<option value="3">3</option>' +
            '<option value="4">4</option>' +
            '<option value="5">5</option>' +
        '</select>' +
        '<input type="text" name="res-telephone" id="res-telephone" placeholder=" Téléphone" />' +
        '<input type="text" name="res-website" id="res-website" placeholder=" Site-web"/>' +
        '<button id="add-restaurant" class="button add-restaurant">Ajouter le restaurant </button>');
}

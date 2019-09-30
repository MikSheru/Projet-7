// Fonction qui permet d'initialiser la carte
function initMap () {

    // Nous allons utiliser la géolocalisation afin de connaître l'emplacement exacte de l'utilisateur
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $(".filtre option:first").attr("selected", true);
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            if (typeof google === "object" && typeof google.maps === "object") {
                rechercheElt.css("display", "block");
                filtreOptionsElt.css("display", "block");
            }            
            
            map = new google.maps.Map(document.getElementById("map"), {
                center: pos,
                zoom: 14,
                streetViewControl: false
            });
            
            infoWindow = new google.maps.InfoWindow({
                content: document.getElementById("info-content")
            });
            
            infoWindowPetite = new google.maps.InfoWindow({
                content: document.getElementById("info-content-small"),
            });
            
            infoWindowNouveauRest = new google.maps.InfoWindow({
                content: document.getElementById("info-content-new-restaurant"),
            });
            
            infoWindow.setPosition(pos);
            map.setCenter(pos);
            
            let marker = new google.maps.Marker({
                position: pos,
                title: "Vous vous trouvez ici.",
                draggable: true
            });
            
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout (function () {
                marker.setAnimation(null)
            }, 2500);
            
            marker.setMap(map);
            
            autocomplete = new google.maps.places.Autocomplete(
                (document.getElementById("autocomplete-input")), {
                    types: ["(cities)"],
            });
            
            autocomplete.addListener('place_changed', onPlaceChanged);
            google.maps.event.trigger(map, "resize");
            
            // Lorsque la carte est positionnée, effectuer une nouvelle recherche pour les restaurants
            map.addListener("dragend", function () {
                mesRestaurants = [];
                resetFiltre();
                rechercher();
            });           
            
            // Afin d'ajouter un nouveau restaurant, il vous suffit d'effectuer un "clic droit" sur la carte
            map.addListener("rightclick", function (e) {
                masquerInfoWindow(marker);
                restoEstNouveau = true;
                
                let latlng = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
                var marker = new google.maps.Marker({
                    position: latlng,
                    icon: createMarkerStars(latlng),
                    id: nResNum + 1
                });
                
                google.maps.event.addListener(marker, "click", ajoutRestaurantInfoWindow);
                marker.setMap(map);
            });

            // Utilise les APIs de Google Places
            places  = new google.maps.places.PlacesService(map);
            service = new google.maps.places.PlacesService(map);
            
            service.nearbySearch({
                location: pos,
                radius: 500,
                type: ['restaurant']
            }, nearbySearchCallbck);
        
        $("#form-add-restaurant").submit(function (e) {
            e.preventDefault();
            form.css("padding", "");
            let nom = $("#res-name");
            let address = $("#res-address");
            let telephone = $("#res-telephone");
            let website = $("#res-website");
            let rating = $("#res-rating");
            let locationLat = $("#res-location-lat");
            let locationLng = $("#res-location-lng");
            
            let position = new google.maps.LatLng(locationLat.val(), locationLng.val());
            
            if (nom.val().trim().length > 0 && address.val().trim().length > 0) {
                let place = {
                    name: nom.val(),
                    vicinity: address.val(),
                    website: website.val(),
                    url: website.val(),
                    formatted_phone_number: telephone.val(),
                    rating: rating.val(),
                    position: position,
                    geometry: {location: position},
                    icon: 'img/restaurant.png',
                    reviews: "",
                    photos: "",
                };
            
                nouveauPlace.push(place);
                masquerInfoWindowNouveauRest(marker);
                var marker = nouveauRestMarker[nResNum];
                restoEstNouveau = false;
                infoWindow.open(map, marker);
                creerIWContent(place);
                displayRestaurantInfo(place);
            } else {
                alert("Le champ nom du restaurant ou addresse ne doit pas comporter d'espaces vides.");
            }
        });
        
        }, function (error) {
            let loadingElt = $("#loading");
            
            if (error.code === 0) {
                
                loadingElt.html("Une erreur inconnue est survenue.");
            } else if (error.code === 1) {
                
                loadingElt.html("Vous avez refusé la demande de géolocalisation. Afin de faire fonctionner le site, veuillez actualiser la page et cette fois-ci, autoriser la géolocalisation.");
            } else if (error.code === 2) {
               
                loadingElt.html("Les informations de localisation sont indisponibles.");
            } else if (error.code === 3) {
    
                loadingElt.html("La demande d'obtention de l'emplacement de l'utilisateur a expiré.");
            }
        });      
            
    } else {
        handleLocationError(false, infoWindow, map.getCenter(pos));
    }     
}
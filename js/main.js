// Variables permettant d'initialiser la carte
let map;
let infoWindow;
let infoWindowPetite;
let infoWindowNouveauRest;
let markers = [];
let pos = {
    lat: 45.599998,
    lng: -0.05,
};
let places;
let services;


// Tout ce qui touche aux APIs et aux restaurants
let autocomplete;
let mesRestaurants = [];
let restaurantsFiltres = [];
let googleRestaurants = [];
let nouveauPlace = [];
let avoirPhoto = true;
let hostnameRegexp = new RegExp('^https?://.+?/');


// Variables permettant la classification des restaurants
let trierPar = document.getElementById("filtre");
let minStar = $('#min-star');
let maxStar = $('#max-star');
let filterBtn = $('#filter-btn'); 
let toutesEtoiles = false;
let tri3Etoile = false;
let tri4Etoile = false;
let tri5Etoile = false;


// Variables permettant l'ajout d'un nouveau restaurant et d'un nouvel avis 
let restoEstNouveau = true;
let nResNum = -1;
let form = $("#form-add-restaurant");
let nouveauRestMarker = [];
let nouvelAvisArray = [];
let nouveauAvisArray = [];


// Tout ce qui touche aux styles et aux sélections
let restaurantInfoElt = $("#restaurant-info");
let rechercheElt = $("#recherche");
let filtreOptionsElt = $("#filtre-options");
restaurantInfoElt.css("display", "none");
rechercheElt.css("display", "none");
filtreOptionsElt.css("display", "none");


// Permet de faire fonctionner le bouton "Actualiser"
$("#actualiser-btn").on('click', function () {
    
    $(".filtre option:first").attr("selected", true);
    window.location.reload();   
});
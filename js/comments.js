// Permet d'afficher ou non le formulaire permettant d'ajouter un nouveau commentaire
function afficheForm() {
    $("#form-wrapper").css("display", "block");
    $("#add-review-button").css("display", "block");
}

function masquerForm() {
    $("#form-wrapper").css("display", "none");
    $("#add-review-button").css("display", "none");
}


// Le nouveau commentaire sera placée au dessus des autres commentaires, et il sera sauvegardé le temps que le visiteur quitte la page
$("#add-review").submit(function (e) {
    e.preventDefault(); 
    let nouveauNom = $("#your-name");
    let nouveauRating = $("#your-rating");
    let nouveauAvis = $("#your-review");
    
    if (!(nouveauNom.val() && nouveauRating.val() && nouveauAvis.val())) {
        return;
    }
    
    if (nouveauNom.val().trim().length > 0 && nouveauAvis.val().trim().length > 0) {
        ajouterAvis(nouveauNom.val(), nouveauRating.val(), nouveauAvis.val());
        nouveauNom.val("");
        nouveauRating.val("");
        nouveauAvis.val("");
        masquerForm();
    } else {
        alert("Les champs ne doit pas comporter d'espaces vides !");
    }
});


function ajouterAvis (nouveauNom, nouveauRating, nouveauAvis) {
    let nouveauAvisDetails = {
        name: nouveauNom,
        rating: nouveauRating,
        review: nouveauAvis,
    };
    let avatar = 'img/avatar.png';
    let avisElt = $("#reviews");
    let nouveauAvisHTML = "";
    nouveauAvisHTML += '<div class="restaurant-reviews">' +
        '<h3 class="review-title">' +
        '<span class="profile-photo" style="background-image: url(' + avatar + ')"></span>' +
        '<span id="review-rating" class="rating">' + getEtoiles(nouveauAvisDetails) +'</span>' +
        '</h3>' +
        '<p>' + nouveauAvisDetails.review + '</p>' +
        '</div>';
    nouveauAvisArray.push(nouveauAvisDetails);
    avisElt.prepend(nouveauAvisHTML);
}
// Sélection des éléments du formulaire
const formulaire = document.querySelector('form');
const nom = document.getElementById('nom');
const mail = document.getElementById('mail');
const password = document.getElementById('password');
const securite = document.getElementById('securite');
const acceptTerms = document.getElementById('acceptTerms');

// Sélection des spans d’erreur
const erreurNom = document.getElementById('erreurNom');
const erreurMail = document.getElementById('erreurMail');
const erreurPassword = document.getElementById('erreurPassword');
const erreurSecurite = document.getElementById('erreurSecurite');
const erreurAcceptTerms = document.getElementById('erreurAcceptTerms');

// Expressions régulières
const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,})+$/;
const regexMail = /^[\w.-]+@(gmail|yahoo|outlook|hotmail)\.com$/;
const regexCode = /^[A-Z]{3}-\d{3}-[A-Z]{3}$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// Explication regexPassword :
// (?=.*[a-z]) → au moins une minuscule
// (?=.*[A-Z]) → au moins une majuscule
// (?=.*\d) → au moins un chiffre
// (?=.*[\W_]) → au moins un caractère spécial
// .{8,} → au moins 8 caractères


// Fonction de validation générique
function validerChamp(champ, regex, messageErreur, zoneErreur) {
    if (champ.value.trim() === "") {
        zoneErreur.textContent = "Ce champ est obligatoire.";
        return false;
    } else if (!regex.test(champ.value.trim())) {
        zoneErreur.textContent = messageErreur;
        return false;
    } else {
        zoneErreur.textContent = "";
        return true;
    }
}

// Fonction spécifique pour le mot de passe
function validerPassword() {
    if (password.value.trim() === "") {
        erreurPassword.textContent = "Le mot de passe est obligatoire.";
        return false;
    } else if (!regexPassword.test(password.value.trim())) {
        erreurPassword.textContent =
            "Le mot de passe doit contenir au moins 8 caractères avec maj, min, chiffre et caractère spécial";
        return false;
    } else {
        erreurPassword.textContent = "";
        return true;
    }
}

// Validation de la case à cocher
function validerConditions() {
    if (!acceptTerms.checked) {
        erreurAcceptTerms.textContent = "Vous devez accepter les conditions";
        return false;
    } else {
        erreurAcceptTerms.textContent = "";
        return true;
    }
}


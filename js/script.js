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

// Écouteurs d'événements pour validation en direct (formulaire réactif)
nom.addEventListener("input", () => validerChamp(nom, regexNom, "Format : Prénom Nom (min 2 mots)", erreurNom));
mail.addEventListener("input", () => validerChamp(mail, regexMail, "Email valide (domaine zcceptés : gmail, yahoo, outlook, hotmail)", erreurMail));
password.addEventListener("input", validerPassword);
securite.addEventListener("input", () => validerChamp(securite, regexCode, "Format attendu : ABC-123-XYZ", erreurSecurite));
acceptTerms.addEventListener("change", validerConditions);
// Mise en majuscule des premières lettres dans le champ "nom"
nom.addEventListener("input", () => {
    let mots = nom.value.toLowerCase().split(" ");
    nom.value = mots.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(" ");
    validerChamp(nom, regexNom, "Format : Prénom Nom (min 2 mots)", erreurNom);
});

// Formatage automatique du champ "securite" en ABC-123-XYZ
securite.addEventListener("input", () => {
    let valeur = securite.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // enlève tout sauf lettres/chiffres
    let partie1 = valeur.slice(0, 3);
    let partie2 = valeur.slice(3, 6);
    let partie3 = valeur.slice(6, 9);

    let resultat = partie1;
    if (valeur.length > 3) resultat += "-" + partie2;
    if (valeur.length > 6) resultat += "-" + partie3;

    securite.value = resultat;
    validerChamp(securite, regexCode, "Format attendu : ABC-123-XYZ", erreurSecurite);
});


// Validation globale à la soumission du formulaire
formulaire.addEventListener("submit", function (e) {
    e.preventDefault(); // Bloque la soumission tant que tout n'est pas OK

    const champNomOK = validerChamp(nom, regexNom, "Format : Prénom Nom (min 2 mots)", erreurNom);
    const mailOK = validerChamp(mail, regexMail, "Email valide (domaine zcceptés : gmail, yahoo, outlook, hotmail)", erreurMail);
    const passwordOK = validerPassword();
    const codeOK = validerChamp(securite, regexCode, "Format attendu : ABC-123-XYZ", erreurSecurite);
    const conditionsOK = validerConditions();

    if (champNomOK && mailOK && passwordOK && codeOK && conditionsOK) {
        alert("Compte créé avec succès !");
        formulaire.submit();
    }
});

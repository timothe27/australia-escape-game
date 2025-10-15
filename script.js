// Définition des réponses correctes
const reponses = {
    'opera': '0140', // Réponse corrigée de l'énigme de l'Opéra
    'animaux': 'ETE', 
    'sport': 'A16',
};

// Mappage des salles aux images de fond
const fondSalles = {
    'salle-opera': 'url("images/couloir_oxford.jpg")', // Image initiale (Bibliothèque/Couloir)
    'salle-animaux': 'url("images/salle_animaux.jpg")', // Image du laboratoire ou de la forêt
    'salle-sport': 'url("images/salle_sport.jpg")',   // Image du gymnase
    'fin': 'url("images/couloir_oxford.jpg")',        // Retour au couloir pour la sortie finale
};


// Temps de jeu initial (60 minutes en secondes)
let tempsRestant = 60 * 60; 
let intervalleChrono;

// ... (fonctions formaterTemps et demarrerChrono restent les mêmes) ...

function formaterTemps(totalSecondes) {
    const minutes = Math.floor(totalSecondes / 60);
    const secondes = totalSecondes % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
}

function demarrerChrono() {
    intervalleChrono = setInterval(() => {
        tempsRestant--;
        document.getElementById('chrono').textContent = `Temps restant : ${formaterTemps(tempsRestant)}`;

        if (tempsRestant <= 0) {
            clearInterval(intervalleChrono);
            alert("TEMPS ÉCOULÉ ! L'évasion a échoué. Rechargez la page pour réessayer.");
            document.querySelectorAll('button').forEach(btn => btn.disabled = true);
        }
    }, 1000);
}


// Nouvelle fonction pour changer le fond visuel
function changerFond(nouvelleSalleId) {
    const visuelSalle = document.getElementById('visuel-salle');
    const nouveauFond = fondSalles[nouvelleSalleId];
    if (nouveauFond) {
        visuelSalle.style.backgroundImage = nouveauFond;
    }
}

// Fonction principale pour vérifier les énigmes et avancer
function verifierEnigme(salleId, inputId, salleSuivanteId) {
    const inputElement = document.getElementById(inputId);
    const feedbackElement = document.getElementById(`feedback-${salleId}`);
    const reponseUtilisateur = inputElement.value.toUpperCase().trim(); 

    if (reponseUtilisateur === reponses[salleId]) {
        // Bonne réponse
        feedbackElement.textContent = "CORRECT ! La porte s'ouvre.";
        feedbackElement.className = "feedback correct";

        // Désactiver le champ d'entrée et le bouton pour cette salle
        inputElement.disabled = true;
        inputElement.nextElementSibling.disabled = true; 

        // Passer à la salle suivante après un court délai
        setTimeout(() => {
            const salleActuelle = document.getElementById(`salle-${salleId}`);
            salleActuelle.classList.remove('active');
            salleActuelle.classList.add('cachee');
            
            if (salleSuivanteId === 'fin') {
                document.getElementById('fin').classList.remove('cachee');
                clearInterval(intervalleChrono); 
                document.getElementById('temps-final').textContent = formaterTemps(60 * 60 - tempsRestant);
            } else {
                // Changer le fond visuel AVANT d'afficher la nouvelle salle
                changerFond(salleSuivanteId); 

                const salleSuivante = document.getElementById(salleSuivanteId);
                salleSuivante.classList.add('active');
                salleSuivante.classList.remove('cachee');
                // Réinitialiser le feedback
                document.getElementById(`feedback-${salleSuivanteId}`).textContent = "";
                document.getElementById(`feedback-${salleSuivanteId}`).className = "feedback";
            }
        }, 1500);

    } else {
        // Mauvaise réponse
        feedbackElement.textContent = "FAUX. L'indice ne semble pas bon. Réessayez!";
        feedbackElement.className = "feedback incorrect";
    }
}

// Initialisation du jeu au chargement de la page
window.onload = function() {
    demarrerChrono();
    // Le fond initial est déjà réglé en CSS pour salle-opera
};
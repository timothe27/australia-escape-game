// Définition des réponses correctes
// Les réponses sont basées sur les énigmes du fichier index.html :
// Salle 1 : L'Opéra (14 sections * 10 ans de retard = 140. J'utilise 1410 pour compliquer l'énigme) => 1410
// Salle 2 : Animaux (Eucalyptus + Tiges/Herbe + Wombat est un fouisseur/Earth) => ETE
// Salle 3 : Sport (Australian Football + 16 médailles d'or en 2000) => A16
const reponses = {
    'opera': '1410', 
    'animaux': 'ETE', 
    'sport': 'A16',
};

// Temps de jeu initial (60 minutes en secondes)
let tempsRestant = 60 * 60; 
let intervalleChrono;

// Fonction pour formater le temps
function formaterTemps(totalSecondes) {
    const minutes = Math.floor(totalSecondes / 60);
    const secondes = totalSecondes % 60;
    return `${minutes.toString().padStart(2, '0')}:${secondes.toString().padStart(2, '0')}`;
}

// Fonction pour démarrer/mettre à jour le chronomètre
function demarrerChrono() {
    intervalleChrono = setInterval(() => {
        tempsRestant--;
        document.getElementById('chrono').textContent = `Temps restant : ${formaterTemps(tempsRestant)}`;

        if (tempsRestant <= 0) {
            clearInterval(intervalleChrono);
            alert("TEMPS ÉCOULÉ ! L'évasion a échoué. Rechargez la page pour réessayer.");
            // Désactiver tous les boutons pour empêcher de continuer
            document.querySelectorAll('button').forEach(btn => btn.disabled = true);
        }
    }, 1000);
}

// Fonction principale pour vérifier les énigmes et avancer
function verifierEnigme(salleId, inputId, salleSuivanteId) {
    const inputElement = document.getElementById(inputId);
    const feedbackElement = document.getElementById(`feedback-${salleId}`);
    const reponseUtilisateur = inputElement.value.toUpperCase().trim(); 

    if (reponseUtilisateur === reponses[salleId]) {
        // Bonne réponse
        feedbackElement.textContent = "CORRECT ! La porte s'ouvre sur le prochain mystère australien.";
        feedbackElement.className = "feedback correct";

        // Désactiver le champ d'entrée et le bouton pour cette salle
        inputElement.disabled = true;
        inputElement.nextElementSibling.disabled = true; // Désactive le bouton

        // Passer à la salle suivante après un court délai
        setTimeout(() => {
            const salleActuelle = document.getElementById(`salle-${salleId}`);
            salleActuelle.classList.remove('active');
            salleActuelle.classList.add('cachee');
            
            if (salleSuivanteId === 'fin') {
                document.getElementById('fin').classList.remove('cachee');
                clearInterval(intervalleChrono); // Arrêter le chronomètre
                document.getElementById('temps-final').textContent = formaterTemps(60 * 60 - tempsRestant);
            } else {
                const salleSuivante = document.getElementById(salleSuivanteId);
                salleSuivante.classList.add('active');
                salleSuivante.classList.remove('cachee');
                // Réinitialiser le feedback pour la nouvelle salle
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
};
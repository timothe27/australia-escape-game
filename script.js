// NEW, EASIER CORRECT ANSWERS:
// Room 1: Opera (4 digits in 1959 * 14 shells = 56). Code: 0056
// Room 2: Animals (Kangaroo, Opossum, Wallaby -> K, O, W. Alphabetical: KOW). Key: KOW
// Room 3: Sport (Bondi Beach -> B. Australian flag colours -> 3). Key: B3
const reponses = {
    'opera': '0056', 
    'animaux': 'KOW', 
    'sport': 'B3',
};

// Mappage des salles aux images de fond (maintenu pour les couleurs CSS)
const fondSalles = {
    'salle-opera': 'url("images/couloir_oxford.jpg")', 
    'salle-animaux': 'url("images/salle_animaux.jpg")', 
    'salle-sport': 'url("images/salle_sport.jpg")',   
    'fin': 'url("images/couloir_oxford.jpg")',        
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
        document.getElementById('chrono').textContent = `Time Remaining: ${formaterTemps(tempsRestant)}`;

        if (tempsRestant <= 0) {
            clearInterval(intervalleChrono);
            alert("TIME IS UP! Escape failed. Reload the page to retry.");
            document.querySelectorAll('button').forEach(btn => btn.disabled = true);
        }
    }, 1000);
}


// Fonction pour changer le fond visuel (même si c'est géré par couleur en CSS)
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
        // Correct Answer
        feedbackElement.textContent = "CORRECT! The door opens to the next Australian mystery.";
        feedbackElement.className = "feedback correct";

        // Disable input and button for this room
        inputElement.disabled = true;
        inputElement.nextElementSibling.disabled = true; 

        // Move to the next room after a short delay
        setTimeout(() => {
            const salleActuelle = document.getElementById(`salle-${salleId}`);
            salleActuelle.classList.remove('active');
            salleActuelle.classList.add('cachee');
            
            if (salleSuivanteId === 'fin') {
                document.getElementById('fin').classList.remove('cachee');
                clearInterval(intervalleChrono); 
                document.getElementById('temps-final').textContent = formaterTemps(60 * 60 - tempsRestant);
            } else {
                // Change the visual background (CSS handles the color change based on this)
                changerFond(salleSuivanteId); 

                const salleSuivante = document.getElementById(salleSuivanteId);
                salleSuivante.classList.add('active');
                salleSuivante.classList.remove('cachee');
                // Reset feedback
                document.getElementById(`feedback-${salleSuivanteId}`).textContent = "";
                document.getElementById(`feedback-${salleSuivanteId}`).className = "feedback";
            }
        }, 1500);

    } else {
        // Incorrect Answer
        feedbackElement.textContent = "INCORRECT. The clue seems wrong. Try again!";
        feedbackElement.className = "feedback incorrect";
    }
}

// Initialization on page load
window.onload = function() {
    demarrerChrono();
};
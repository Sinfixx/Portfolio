//Preloader

window.addEventListener("load", function() {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');

    // Rendre le preloader transparent (commence la transition)
    preloader.style.opacity = '0';

    // Attendre la fin de la transition (0.5s) pour le masquer complètement
    setTimeout(function() {
        preloader.style.display = 'none'; // Cacher complètement le preloader
        content.style.display = 'block';  // Afficher le contenu
        content.style.opacity = '1';      // Activer la transition d'apparition du contenu
    }, 500); // Délai correspondant à la durée de la transition CSS (0.5s)
});

//Scroll

document.addEventListener('DOMContentLoaded', () => {
    const scrollBtns = document.querySelectorAll('.scrollBtn');
  
    scrollBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
  
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      });
    });
  });

// Afficher / cacher les projets
const showMoreBtn = document.getElementById('show-more');
const showLessBtn = document.getElementById('show-less');
const allProjects = document.querySelectorAll('.project-card');

let displayedProjects = 3; // Nombre de projets affichés par défaut

const pageHeight = document.documentElement.scrollHeight +200;
document.documentElement.style.setProperty('--page-height', `${pageHeight}px`);

showMoreBtn.addEventListener('click', function() {
    displayedProjects += 3; // Affiche 3 projets supplémentaires
    updateProjectDisplay();
});

showLessBtn.addEventListener('click', function() {
    displayedProjects -= 3; // Masque 3 projets
    updateProjectDisplay();
});

function updateProjectDisplay() {
    // Obtenez tous les projets
    const allProjects = document.querySelectorAll('.project-card');
    const totalProjects = allProjects.length;

    // Cacher / Afficher les projets avec transition
    allProjects.forEach((project, index) => {
        if (index < displayedProjects) {
            project.classList.remove('hidden'); // Affiche le projet avec transition
        } else {
            project.classList.add('hidden'); // Cache le projet avec transition
        }
    });

    const n = Math.min(displayedProjects, totalProjects);
    const projectHeight = document.querySelector('.project-card').offsetHeight; // Récupérer la hauteur d'une carte projet
    if (window.innerWidth < 1200) {
        document.querySelector('.project-container').style.maxHeight = `${(n + (3 - n % 3) % 3) * ((projectHeight)+50)}px`; // Ajuster la max-height dynamiquement
        // Code pour les écrans petits
    } else {
        document.querySelector('.project-container').style.maxHeight = `${((n + (3 - n % 3) % 3)/3) * ((projectHeight)+50)}px`; // Ajuster la max-height dynamiquement
        // Code pour les écrans grands
    }
    

    // Gérer l'affichage des boutons
    showMoreBtn.classList.toggle('hidden', displayedProjects >= totalProjects);
    showLessBtn.classList.toggle('hidden', displayedProjects <= 3);
}

// Initialiser l'affichage des projets
updateProjectDisplay();

window.addEventListener('resize', () => {
    updateProjectDisplay();
    removeAllSnowflakes();
});

//Menu Slide :

// Mobile navbar toggle
document.querySelector('.mobile-nav').addEventListener('click', function() {
    document.querySelector('.navbar').classList.toggle('active');
});

// Sélectionner les éléments
const hamburger = document.getElementById('hamburger');
const menuSlide = document.getElementById('menu-slide');
const menuLinks = document.querySelectorAll('#menu-slide ul li a');
const body = document.body;

// Ouvrir et fermer le menu avec le bouton hamburger
hamburger.addEventListener('click', () => {
    menuSlide.classList.toggle('active');
    body.classList.toggle('no-scroll');
    hamburger.classList.toggle('rotate');
});

// Fermer le menu et naviguer vers la section
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Empêcher le comportement par défaut
        const targetSection = document.querySelector(link.getAttribute('href'));

        // Animation de fermeture du menu
        hamburger.classList.toggle('rotate');
        menuSlide.classList.remove('active');
        body.classList.remove('no-scroll');

        // Attendre que l'animation se termine avant de scroller
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Temps de transition (doit correspondre au `transition` de CSS)
    });
});


//Projets détails

// Sélection des éléments
const projectCards = document.querySelectorAll('.project-card');
const detailViews = document.querySelectorAll('.detail'); // Tous les divs de détail


// Fonction pour ouvrir la vue détaillée du projet cliqué
function openDetail(projectId) {
    const detailView = document.querySelector(`#d${projectId}`); // Sélectionne le bon div de détail
    if (detailView) {
        detailView.classList.add('active'); // Affiche le détail
        body.classList.add('no-scroll'); // Bloque le scroll
    }
}

// Fonction pour fermer la vue détaillée
function closeDetail() {
    detailViews.forEach(detailView => {
        detailView.classList.remove('active'); // Cache tous les détails
    });
    body.classList.remove('no-scroll'); // Rétablit le scroll
}

// Ajout d'écouteurs d'événements sur chaque carte de projet
projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.id.substring(1); // Récupère l'ID du projet (p1, p2, p3 => 1, 2, 3)
        openDetail(projectId); // Ouvre le détail correspondant (d1, d2, d3)
    });
});

// Ajout d'écouteurs d'événements pour chaque bouton de fermeture
detailViews.forEach(detailView => {
    const closeDetailBtn = detailView.querySelector('.close-detail');
    closeDetailBtn.addEventListener('click', closeDetail);
});

// Optionnel : Fermer si on clique en dehors du détail
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('detail')) {
        closeDetail();
    }
});

//=================fond parallax=========================

window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    let scrollPosition = window.pageYOffset;
    parallax.style.backgroundPositionY = `${(scrollPosition-2000) * 0.2}px`; /* Ajuste le coefficient pour contrôler la vitesse */
});

window.addEventListener('load', function() {
    const parallax = document.querySelector('.parallax');
    let scrollPosition = window.pageYOffset;
    parallax.style.backgroundPositionY = `${(scrollPosition-2000) * 0.2}px`; /* Ajuste le coefficient pour contrôler la vitesse */
});

//=================splash screen=========================

document.addEventListener('DOMContentLoaded', () => {
    const enterButton = document.getElementById('enter-button');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const resetButton = document.getElementById('reset-button');

    // Vérifie si l'utilisateur est déjà entré
    if (localStorage.getItem('hasEntered') === 'true') {
        body.classList.remove('no-scroll'); // Rétablit le scroll
        splashScreen.style.opacity = '0';
        splashScreen.style.display = 'none';
        // Utilise une légère temporisation pour permettre l'animation de transition d'opacité
        setTimeout(() => {
            mainContent.style.opacity = '1';
        }, 10);
    }else{
        body.classList.add('no-scroll'); // Bloque le scroll
    }
    
    enterButton.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        body.classList.remove('no-scroll'); // Rétablit le scroll
        setTimeout(() => {
            splashScreen.style.display = 'none';
            // Utilise une légère temporisation pour déclencher l'opacité
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 10);

            localStorage.setItem('hasEntered', 'true');
        }, 500);
    });

    // Réaffiche le splash screen lors du clic sur le bouton de réinitialisation
    resetButton.addEventListener('click', () => {
        localStorage.removeItem('hasEntered');
        body.classList.add('no-scroll'); // Bloque le scroll
        // Transition pour masquer le contenu principal
        mainContent.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'flex';
            // Utilise une légère temporisation pour déclencher la transition du splash screen
            setTimeout(() => {
                splashScreen.style.opacity = '1';
            }, 10);
        }, 500);
    });
});

/* ========= Mailto ===================*/

function sendMail(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.toUpperCase();
    const email = document.getElementById("email").value; // Renommé correctement
    const message = document.getElementById("message").value;

    // Formatage du corps de l'email
    const body = `
        Nom : ${name}
        Email : ${email}
        Date : ${new Date().toLocaleDateString()}
        
        Message :
        ${message}
    `.trim(); // trim() pour enlever les espaces superflus

    // Construction de l'URL mailto
    const mailto_URL =
        `mailto:cyrian.torrejon@etu.univ-grenoble-alpes.fr?subject=Contact&body=` + encodeURIComponent(body);

    // Redirection
    window.location.href = mailto_URL;
}

/* =============== Neige ==============*/

// Configuration
const SNOWFLAKE_COUNT = 100; // Nombre de flocons
const MIN_FALL_SPEED = 17; // Vitesse minimale de chute en secondes
const MAX_FALL_SPEED = 25; // Vitesse maximale de chute en secondes
const MIN_SWAY_SPEED = 3; // Durée minimale de l'oscillation
const MAX_SWAY_SPEED = 6; // Durée maximale de l'oscillation
// Largeur totale disponible pour les flocons (excluant les marges)
const screenWidth = window.innerWidth;
const margin = 30; // Marge de chaque côté
const availableWidth = screenWidth - 2 * margin;

// Conteneur pour les flocons
const snowContainer = document.getElementById('snow-container');

// Génère un flocon de neige
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄'; // Caractère du flocon (modifiable)

    // Position horizontale aléatoire
    const leftPosition = Math.random() * availableWidth + margin;
    snowflake.style.left = `${leftPosition}px`;

    // Taille aléatoire
    const size = Math.random() * 10 + 10; // Entre 10px et 20px
    snowflake.style.fontSize = `${size}px`;

    // Opacité aléatoire
    snowflake.style.opacity = Math.random();

    // Durée de l'oscillation
    const swaySpeed = Math.random() * (MAX_SWAY_SPEED - MIN_SWAY_SPEED) + MIN_SWAY_SPEED;

    // Durée de l'animation de chute (vitesse)
    const fallSpeed = Math.random() * (MAX_FALL_SPEED - MIN_FALL_SPEED) + MIN_FALL_SPEED;

    snowflake.style.animationDuration = `${swaySpeed}s` + ',' + `${fallSpeed}s`;

    // Ajoute le flocon au conteneur
    snowContainer.appendChild(snowflake);

    // Retire le flocon après qu'il ait quitté l'écran
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

// Génère un flocon de neige adapté aux appareils mobiles
function createMobileSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄'; // Caractère du flocon (modifiable)

    // Position horizontale aléatoire
    const leftPosition = Math.random() * availableWidth + margin;
    snowflake.style.left = `${leftPosition}px`;
    
    // Taille aléatoire
    const size = Math.random() * 5 + 5; // Entre 10px et 20px
    snowflake.style.fontSize = `${size}px`;

    // Opacité aléatoire
    snowflake.style.opacity = Math.random();

    // Durée de l'oscillation
    const swaySpeed = Math.random() * (MAX_SWAY_SPEED - MIN_SWAY_SPEED) + MIN_SWAY_SPEED;

    // Durée de l'animation de chute (vitesse)
    const fallSpeed = Math.random() * (MAX_FALL_SPEED - MIN_FALL_SPEED) + MIN_FALL_SPEED;

    snowflake.style.animationDuration = `${swaySpeed}s` + ',' + `${fallSpeed}s`;

    // Ajoute le flocon au conteneur
    snowContainer.appendChild(snowflake);

    // Retire le flocon après qu'il ait quitté l'écran
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

// Adapter la génération des flocons selon le type d'appareil
setInterval(() => {
    if (document.hidden) return; // Évite de générer des flocons lorsque l'onglet est inactif
    if (window.innerWidth < 1200) {
        createMobileSnowflake(); // Génère un flocon adapté au mobile
    } else {
        createSnowflake(); // Génère un flocon adapté au bureau
    }
}, 650);

function removeAllSnowflakes() {
    const snowflakes = document.querySelectorAll('.snowflake');
    snowflakes.forEach(snowflake => {
        snowflake.remove();
    });
}
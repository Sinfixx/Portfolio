window.addEventListener("load", function() {
    const loadingScreen = document.getElementById("loading-screen");
    const content = document.getElementById("content");

    // Attendre un peu pour l'effet de fondu
    setTimeout(function() {
        loadingScreen.classList.add("hidden"); // Ajoute la classe pour l'animation de fondu

        // Retirer complètement l'écran de chargement après l'animation
        setTimeout(function() {
            loadingScreen.style.display = "none";
            content.style.display = "block"; // Afficher le contenu principal du site
        }, 500); // Correspond à la durée de la transition en CSS
    }, 500); // Optionnel : attendre un peu avant de lancer le fondu
});

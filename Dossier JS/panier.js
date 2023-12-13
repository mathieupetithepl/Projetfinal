function getPanierFromLocalStorage() {
    return JSON.parse(localStorage.getItem('panier')) || [];
}

function sauvegarderPanierDansLocalStorage(panier) {
    localStorage.setItem('panier', JSON.stringify(panier));
}

function ajouterAuPanier(nomProduit, prixProduit) {
    const panier = getPanierFromLocalStorage();
    const produitExistant = panier.find(produit => produit.nom === nomProduit);

    if (produitExistant) {
        produitExistant.quantite += 1;
    } else {
        panier.push({ nom: nomProduit, prix: prixProduit, quantite: 1 });
    }

    sauvegarderPanierDansLocalStorage(panier);
    afficherPanier();
}

function afficherPanier() {
    const listePanier = document.getElementById('liste-panier');
    const totalPanier = document.getElementById('total-panier');
    listePanier.innerHTML = '';

    const panier = getPanierFromLocalStorage();
    let total = 0;

    panier.forEach((produit, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${produit.nom} - Quantité: ${produit.quantite} - $${(produit.prix * produit.quantite).toFixed(2)}`;

        const supprimerButton = document.createElement('button');
        supprimerButton.textContent = 'Supprimer';
        supprimerButton.onclick = function () {
            supprimerProduit(index);
        };

        listItem.appendChild(supprimerButton);
        listePanier.appendChild(listItem);
        total += produit.prix * produit.quantite;
    });

    totalPanier.textContent = total.toFixed(2);
}

function supprimerPanier() {
    localStorage.removeItem('panier');
    afficherPanier();
}

function supprimerProduit(index) {
    const panier = getPanierFromLocalStorage();
    panier.splice(index, 1);
    sauvegarderPanierDansLocalStorage(panier);
    afficherPanier();
}

afficherPanier();

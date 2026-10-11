# OUAGA PASS — application web PWA (prototype full-stack)

Application de démonstration avec **serveur Node.js**, persistance JSON, comptes organisateurs, super administrateur, approbation d'événements, tickets QR, validation anti-réutilisation et tableau de bord.

## Installation locale

Prérequis : **Node.js 20+**, **Python 3** et module `qrcode`.

```bash
cd OUAGA_PASS_APP
python3 -m pip install -r requirements.txt
export ADMIN_EMAIL="landrycompaore950@gmail.com"
export ADMIN_PASSWORD="CHOISISSEZ_UN_MOT_DE_PASSE_FORT_ET_UNIQUE"
npm start
```

Sous Windows PowerShell :

```powershell
py -m pip install -r requirements.txt
$env:ADMIN_EMAIL="landrycompaore950@gmail.com"
$env:ADMIN_PASSWORD="CHOISISSEZ_UN_MOT_DE_PASSE_FORT_ET_UNIQUE"
npm start
```

Ouvrir **http://localhost:3000**. Le compte administrateur est créé **au premier démarrage**. Le mot de passe n'est pas inclus dans les fichiers : vous devez le choisir vous-même. **Ne communiquez jamais ce mot de passe dans le chat.**

## Tester

1. Connectez-vous en tant qu'administrateur et créez un événement (publié directement).
2. Dans une fenêtre privée, créez un compte organisateur et soumettez un événement.
3. Connectez-vous en tant qu'administrateur et approuvez cet événement.
4. Réservez un billet de démonstration depuis la page publique : un QR est généré localement.
5. Connectez-vous en tant qu'organisateur propriétaire ou administrateur et scannez le QR (ou collez le code). Un second passage est refusé.

## Limitations importantes — PAS prêt pour la production

- **Aucun paiement réel** : l'achat est simulé et émet un billet de test, même sans paiement. Ne pas utiliser pour un événement payant réel.
- Les abonnements sont une **présentation commerciale** uniquement : pas encore de facturation ni d'application des quotas.
- La persistance est un **fichier JSON local** : adaptée à une démonstration sur un seul processus, pas à un déploiement multi-serveur. Les validations ne sont atomiques que dans ce processus Node.js.
- Pas encore de comptes d'agents distincts, de récupération de mot de passe, de limitation des tentatives de connexion, de journaux centralisés, de notifications ou de rapprochement bancaire.
- Le scanner caméra utilise `BarcodeDetector` lorsque pris en charge ; sinon, saisie manuelle du code. HTTPS requis pour la caméra hors localhost.
- L'installation PWA nécessite un hébergement HTTPS (ou localhost). L'icône SVG peut nécessiter des variantes PNG pour une meilleure compatibilité iOS.
- Les informations d'acheteurs sont enregistrées localement : prévoir une politique de confidentialité et les protections nécessaires avant toute utilisation commerciale.

## Passage en production

Utiliser PostgreSQL avec transactions et verrouillage atomique lors de la validation, gestion de sessions persistantes, protections anti-CSRF et anti-brute-force, système de rôles complet, emails transactionnels, HTTPS, sauvegardes, surveillance, prestataire de paiement agréé (avec webhooks vérifiés et rapprochement), règles de reversement et obligations légales adaptées aux pays desservis.

**OUAGA PASS est un prototype fonctionnel pour valider le parcours, pas un système de paiement opérationnel.**

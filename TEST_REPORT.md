# TEST_REPORT — résultats réels du 31 octobre 2026

Environnement : Linux, Node 22, jsdom, Chromium (Playwright). Aucun test sur Windows/Chrome.

| Suite | Commande | Résultat |
|---|---|---|
| Intégrité du contenu (4 modules, 30 séances, 120 activités, 600 points, 4 mécaniques distinctes par séance, réponses uniques, explications présentes, zones/niveaux/programmes valides) | `npm test` | ✅ |
| Unitaires : scoring 0–5, bandes, stats, profils, premier/meilleur essai, persistance, stockage corrompu, export/import (fusion sans écrasement, fichiers invalides, données hostiles), CSV anti-injection, formules du tableur, interpréteur (sécurité, sémantique), robot | `npm test` | ✅ |
| Moteurs sous jsdom : pour chacune des 120 activités, résultat vide < 5/5 puis `solve()` → 5/5 | `npm test` | ✅ |
| **Total node:test** | | **258 réussis, 0 échec** |
| E2E Chromium **hors ligne**, `file://`, interface réelle : 120 activités résolues et enregistrées → 600 points, conservés après rechargement ; export JSON ; fenêtre simulée par clics réels (5/5) ; tableur par saisie réelle (formule correcte acceptée, valeur fausse refusée) ; **0 erreur console, 0 requête externe** | `npm run test:e2e` | ✅ |
| Accessibilité automatique axe-core (WCAG 2 A/AA, 18 écrans) | `npm run test:axe` | ✅ 0 violation |
| Sons locaux : préférences par profil, valeur par défaut, coupure, survol facultatif, volume borné et persistance | `npm test` + E2E sans réseau | ✅ |
| Captures 1366×768 et 1024×768 inspectées visuellement (tableau de bord, assemblage, robot, bureau) | manuel | ✅ (un défaut d'affichage trouvé et corrigé) |

## Ce que ces tests ne prouvent pas
- Que les contenus soient pédagogiquement justes (aucune relecture humaine).
- Que tout fonctionne sur Chrome/Windows, avec le lanceur PowerShell ou après réouverture complète du navigateur.
- Que tous les parcours manuels des simulations (explorateur de fichiers, éditeur, navigateur, e-mail, graphique) fonctionnent à la souris : ils sont validés par l'état interne (`solve`) ; seules la fenêtre et le tableur ont été testés par clics/saisie réels.
- L'accessibilité réelle pour un lecteur d'écran.

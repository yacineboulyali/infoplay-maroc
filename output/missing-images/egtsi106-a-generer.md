# EGTSI106 · images à générer

Généré le 2026-11-14 par `node scripts/audit-egtsi106-visuals.cjs`. 67 images à produire (41 pour le cours, 26 pour les activités).

## Consignes pour Codex

- Une image par ligne, au format **WebP 512 × 512**, enregistrée exactement au chemin `public/images/label-illustrations/<id>.webp` (colonne « id »).
- Style identique aux illustrations existantes du dossier : objet unique, dessin plat aux contours foncés, couleurs franches, fond crème uni, sans texte ni logo de marque.
- Représenter l’objet ou l’action décrits par le libellé, compréhensibles par un élève de 15 ans.
- Après génération : `node scripts/sync-label-illustrations.mjs` puis `npm run build`. Dès que l’image existe, elle remplace automatiquement l’icône (une seule représentation par notion).
- La liste complète, avec les pages où chaque libellé apparaît, est dans `output/missing-images/egtsi106-worklist.jsonl`.
- Hors liste : « Entrée » (`lbl-0891ea66`) garde son pictogramme dans EGTSI106, car l’image existante représente la touche du clavier du module 2. Ne pas régénérer cette clé.

## 1. Cours : mots clés, notions et vignettes de leçon (41)

| id | Libellé | Où | Affiché aujourd’hui | Séance |
|---|---|---|---|---|
| `lbl-1f47a245` | Application | carte mot clé | mot-repère | S1, S2 |
| `lbl-c580721c` | Applications et utilitaires | notion du cours | mot-repère | S1 |
| `lbl-59dff311` | Donnée et information | notion du cours | icône générique | S1, S2 |
| `lbl-16491fdd` | Entrée → traitement → sortie | notion du cours | mot-repère | S1 |
| `lbl-29df28d3` | Entrée et sortie | notion du cours, élément d’activité | pictogramme | S1 |
| `lbl-c0f40ff7` | Fichier, dossier, extension | notion du cours | icône générique | S1 |
| `lbl-5ab146ef` | La digitalisation | notion du cours | icône générique | S1 |
| `lbl-5d14dffb` | LAN et WAN | notion du cours | icône générique | S1 |
| `lbl-804c404d` | Le numérique | notion du cours | mot-repère | S1 |
| `lbl-79fc1401` | Logiciel | notion du cours | icône générique | S1 |
| `lbl-88392bea` | Logiciels système | notion du cours | icône générique | S1 |
| `lbl-dcfc60ce` | Réseau | notion du cours | icône générique | S1 |
| `lbl-feaae863` | Risques et protection | notion du cours | icône générique | S1 |
| `lbl-d96a9e35` | Services | notion du cours | mot-repère | S1 |
| `lbl-70ddaa1c` | Système d’exploitation | carte mot clé | icône générique | S1 |
| `lbl-71a4dbed` | Types d’ordinateurs | notion du cours | icône générique | S1 |
| `lbl-424e94b7` | Utilitaire | carte mot clé | mot-repère | S1 |
| `lbl-1a5c896c` | Équipements et usages | notion du cours | mot-repère | S2 |
| `lbl-d7702c14` | Imprimantes | notion du cours | icône générique | S2 |
| `lbl-79d42f76` | Logiciels | notion du cours | icône générique | S2 |
| `lbl-6838052d` | PC, serveur et superordinateur | notion du cours | icône générique | S2 |
| `lbl-1b8805fa` | Protection | notion du cours | icône générique | S2 |
| `lbl-3204729a` | Réseau local et réseau étendu | notion du cours | icône générique | S2 |
| `lbl-1d215c8f` | Résolution | carte mot clé | mot-repère | S2 |
| `lbl-795f4889` | Toner | carte mot clé | mot-repère | S2 |
| `lbl-ba09578d` | Archivage | notion du cours | mot-repère | S3 |
| `lbl-46d940f6` | Archive ZIP | carte mot clé | mot-repère | S3 |
| `lbl-3e903b4d` | Barre des tâches | carte mot clé | icône générique | S3 |
| `lbl-2bb7f6c2` | Bit et octet | notion du cours | pictogramme | S3 |
| `lbl-d70c48c7` | Bureau | notion du cours | mot-repère | S3 |
| `lbl-f2310d2a` | Bureau et fenêtres | notion du cours | mot-repère | S3 |
| `lbl-e3dadf4b` | Chemin | carte mot clé | mot-repère | S3 |
| `lbl-53685671` | Édition | notion du cours | mot-repère | S3 |
| `lbl-fd26f6f8` | Explorateur | notion du cours | icône générique | S3 |
| `lbl-2cd52ea3` | Navigation | notion du cours | mot-repère | S3 |
| `lbl-1289a690` | Octet | carte mot clé | pictogramme | S3 |
| `lbl-6e5d4d81` | Paramètres et Panneau de configuration | notion du cours | mot-repère | S3 |
| `lbl-3a5b4444` | Raccourci | carte mot clé | mot-repère | S3 |
| `lbl-1b70adde` | Raccourci et ZIP | notion du cours | mot-repère | S3 |
| `lbl-ddc0bc01` | Supports | notion du cours | mot-repère | S3 |
| `lbl-8da76cad` | Zone de notification | carte mot clé | mot-repère | S3 |

## 2. Activités (26)

| id | Libellé | Où | Affiché aujourd’hui | Séance |
|---|---|---|---|---|
| `lbl-55089696` | Conserve les fichiers en mémoire flash | indice à nommer | pictogramme | S1 |
| `lbl-f8c72011` | Exécute les instructions | indice à nommer | pictogramme | S1 |
| `lbl-9cc4ebda` | La RAM est une mémoire… | élément d’activité | pictogramme | S1 |
| `lbl-bb36f79d` | Le processeur est… | élément d’activité | pictogramme | S1 |
| `lbl-c9d40915` | Quel composant exécute les instructions ? | élément d’activité | pictogramme | S1 |
| `lbl-48937726` | Quel élément est un logiciel ? | élément d’activité | icône générique | S1 |
| `lbl-86064a56` | Quel exemple illustre une digitalisation ? | élément d’activité | icône générique | S1 |
| `lbl-dff0c39e` | Quel geste prépare une récupération après une panne ? | élément d’activité | mot-repère | S1 |
| `lbl-59e88fde` | Quel réseau relie les postes de la même salle ? | élément d’activité | icône générique | S1 |
| `lbl-9a0d3db7` | Sortie | élément d’activité | icône générique | S1 |
| `lbl-c7d7afde` | Comment récupérer des fichiers après la perte du téléphone ? | élément d’activité | pictogramme | S2 |
| `lbl-21cbf303` | Communication entre ordinateurs | élément d’activité | icône générique | S2 |
| `lbl-d3d330a6` | Quel élément donne un sens au nombre 24 ? | élément d’activité | icône générique | S2 |
| `lbl-cad197d5` | Une calculatrice demande l’accès aux contacts. Que faire ? | élément d’activité | icône générique | S2 |
| `lbl-3b05393c` | Une mise à jour de sécurité est proposée par les réglages. Que faire ? | élément d’activité | icône générique | S2 |
| `lbl-50e52509` | Combien font 3 Mo ? | élément d’activité | icône générique | S3 |
| `lbl-a01e9e07` | Combien font 32 bits ? | élément d’activité | pictogramme | S3 |
| `lbl-02682836` | Comment partager à distance avec des collègues autorisés ? | élément d’activité | mot-repère | S3 |
| `lbl-3c36d595` | Comment regrouper les fichiers dans une archive ? | élément d’activité | icône générique | S3 |
| `lbl-5b0e4efe` | Gère l’accès à la caméra et au microphone | indice à nommer | pictogramme | S3 |
| `lbl-ac4e4177` | Invite de commandes Windows | élément d’activité | pictogramme | S3 |
| `lbl-75a90b6a` | Quel élément permet d’accéder au dossier depuis le bureau ? | élément d’activité | icône générique | S3 |
| `lbl-f86b7e38` | Quel nom permet de retrouver la première version par date ? | élément d’activité | icône générique | S3 |
| `lbl-deac3cc2` | Quel support permet de transporter un rapport hors ligne ? | élément d’activité | icône générique | S3 |
| `lbl-9a658c3a` | Quelle combinaison verrouille la session ? | élément d’activité | icône générique | S3 |
| `lbl-02505b4a` | Unité composée de huit bits | indice à nommer | pictogramme | S3 |

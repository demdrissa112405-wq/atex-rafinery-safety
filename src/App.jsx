import { useState } from "react";
import { jsPDF } from "jspdf";
import "./App.css";

const courses = [
  {
    id: "atex",
    menu: "Partie 1 — ATEX",
    title: "Formation ATEX (Atmosphères Explosives)",
    content:
      "Maîtrise des risques liés aux gaz, vapeurs, brouillards et poussières inflammables : formation du triangle de l’explosion, limites d’explosivité, zonage, sources d’inflammation, choix du matériel certifié et comportement attendu en zone classée.",
  },
  {
    id: "risques",
    menu: "Partie 2 — Risques pétroliers",
    title: "Risques Spécifiques en Raffinerie",
    content:
      "Identification et maîtrise des risques majeurs : toxicité du H₂S, incendies d’hydrocarbures, explosions de nuages de vapeurs, BLEVE, travaux à chaud, espaces confinés, pertes de confinement et situations d’urgence.",
  },
  {
    id: "raffinage",
    menu: "Partie 3 — Raffinage",
    title: "Process & Opérations de Raffinage",
    content:
      "Compréhension des flux de raffinage : réception du brut, dessalage, distillation atmosphérique, distillation sous vide, conversion catalytique, hydrotraitement, reformage, traitement des gaz acides, récupération du soufre, blending et expédition.",
  },
  {
    id: "securite",
    menu: "Partie 4 — Sécurités",
    title: "Systèmes de Sécurité Instrumentés & Barrières",
    content:
      "Étude des couches de protection : détection précoce, alarmes, automatismes d'arrêt d'urgence, soupapes, disques de rupture, torche, réseau incendie, mousse, permis de travail, consignation et culture sécurité.",
  },
  {
    id: "dommages",
    menu: "Partie 5 — Dommages",
    title: "Intégrité Mécanique & Modes de Dommages",
    content:
      "Analyse des mécanismes de dégradation des équipements sous l’effet de la température, de la pression, des agents corrosifs, des cycles mécaniques, de l’hydrogène, du H₂S, de l’eau, des acides et des contraintes d’exploitation.",
  },
  {
    id: "esp",
    menu: "Partie 6 — ESP",
    title: "Équipements Sous Pression (ESP)",
    content:
      "Réglementation, exploitation et sécurité des enceintes contenant une énergie emmagasinée importante : ballons, échangeurs, réacteurs, chaudières, tuyauteries, soupapes, inspections, consignation et ouverture.",
  },
  {
  id: "agro",
  menu: "Agroalimentaire",
  title: "Sécurité en industrie agroalimentaire",
  content:
    "Formation complète sur les risques industriels, hygiène, sécurité alimentaire, consignation, nettoyage industriel et prévention des accidents en industrie agroalimentaire."
  },
];

const detailedLessons = {
  atex: [
    {
      title: "Le phénomène ATEX",
      visual: "atex",
      text:
        "Une ATEX est un mélange avec l’air, dans des conditions atmosphériques, de substances inflammables sous forme de gaz, vapeurs, brouillards ou poussières. Après inflammation, la combustion se propage rapidement à l’ensemble du mélange non brûlé. En raffinerie, les ATEX peuvent apparaître autour des pompes, brides, évents, purges, bacs, points de chargement, unités gaz et zones de maintenance.",
      objective: "Comprendre les conditions de formation d’une atmosphère explosive.",
      equipment: ["Évents de bacs", "Purges", "Échantillonneurs", "Pompes", "Postes de chargement"],
      risks: ["Explosion volumétrique", "Onde de choc", "Effet de souffle", "Brûlures", "Projection"],
      prevention: ["Étanchéité", "Ventilation", "Inertage", "Détection gaz", "Suppression des sources d’ignition"],
      points: [
        "Le triangle de l’explosion complète le triangle du feu avec la concentration, la dispersion et parfois le confinement.",
        "La LIE est la concentration minimale de gaz ou vapeur permettant l’inflammation.",
        "La LSE est la concentration maximale au-delà de laquelle le mélange est trop riche pour brûler.",
        "Un brouillard d’huile peut être explosif même sous le point d’éclair du liquide.",
      ],
    },
    {
      title: "Limites d’explosivité et point d’éclair",
      visual: "limits",
      text:
        "Le danger ATEX dépend fortement de la concentration du produit dans l’air. Un mélange trop pauvre ne s’enflamme pas ; un mélange trop riche ne s’enflamme pas immédiatement mais peut redevenir explosif après dilution. Le point d’éclair indique la température minimale à laquelle un liquide émet suffisamment de vapeurs pour s’enflammer en présence d’une source d’ignition.",
      objective: "Interpréter LIE, LSE, point d’éclair et explosimétrie.",
      equipment: ["Explosimètre", "Détecteur multigaz", "Analyseur LIE", "Fiche de données sécurité"],
      risks: ["Lecture erronée", "Retour trop précoce en zone", "Vapeurs résiduelles", "Inflammation différée"],
      prevention: ["Mesure avant intervention", "Contrôle continu", "Ventilation", "Attente de stabilisation atmosphérique"],
      points: [
        "0 % LIE ne signifie pas toujours absence totale de produit, mais absence de concentration explosible selon l’appareil utilisé.",
        "Une mesure doit être faite dans les points bas, points hauts et zones peu ventilées selon la densité du gaz.",
        "Un liquide chauffé au-dessus de son point d’éclair devient beaucoup plus dangereux.",
        "Les détecteurs doivent être étalonnés avec un gaz de référence adapté.",
      ],
    },
    {
      title: "Classification des zones ATEX",
      visual: "zones",
      text:
        "L’employeur doit classer les emplacements où une ATEX peut se former. Ce zonage définit le niveau d’exigence du matériel électrique et non électrique. La zone ne décrit pas la gravité de l’explosion, mais la probabilité et la durée de présence de l’atmosphère explosive.",
      objective: "Différencier les zones gaz/vapeurs et poussières.",
      equipment: ["Plan de zonage", "Signalétique ATEX", "Matériel Ex d", "Matériel Ex i", "Barrières Zener"],
      risks: ["Matériel standard en zone classée", "Ignition permanente", "Erreur de permis", "Travail à chaud non maîtrisé"],
      prevention: ["Plan de zonage à jour", "Audit terrain", "Choix matériel adapté", "Formation des intervenants"],
      points: [
        "Zone 0 : présence permanente, longue ou fréquente d’une ATEX gaz/vapeur.",
        "Zone 1 : présence occasionnelle en fonctionnement normal.",
        "Zone 2 : présence rare et de courte durée en situation anormale.",
        "Zones 20, 21, 22 : équivalent pour les poussières combustibles.",
      ],
    },
    {
      title: "Maîtrise des sources d’inflammation",
      visual: "ignition",
      text:
        "L’élimination des sources d’inflammation est la deuxième ligne de défense. Les sources peuvent être électriques, mécaniques, thermiques, électrostatiques, chimiques ou liées aux travaux. En zone ATEX, un simple outil inadapté peut suffire à déclencher l’événement redouté.",
      objective: "Supprimer tout apport d’énergie d’activation en zone classée.",
      equipment: ["Outils anti-étincelles", "Vêtements antistatiques", "Téléphones certifiés", "Moteurs Ex", "Lampes Ex"],
      risks: ["Électricité statique", "Auto-inflammation", "Courants vagabonds", "Surface chaude", "Frottement mécanique"],
      prevention: ["Mise à la terre", "Liaison équipotentielle", "Contrôle température", "Permis de feu", "Matériel certifié"],
      points: [
        "Une décharge électrostatique humaine peut enflammer certains gaz ou vapeurs.",
        "Les surfaces chaudes des fours, moteurs ou tuyauteries peuvent être des sources permanentes.",
        "Le matériel doit être marqué CE Ex et adapté à la zone et au groupe de gaz.",
        "Les travaux à chaud doivent être interdits sans permis, mesures atmosphériques et surveillance.",
      ],
    },
    {
      title: "Organisation documentaire ATEX",
      visual: "barriers",
      text:
        "La maîtrise ATEX repose aussi sur la documentation : plan de zonage, inventaire du matériel, procédures de maintenance, habilitations, permis de travail et document relatif à la protection contre les explosions. Une installation peut être techniquement équipée, mais rester dangereuse si la documentation n’est pas appliquée sur le terrain.",
      objective: "Relier l’analyse ATEX aux pratiques opérationnelles.",
      equipment: ["DRPCE", "Plans", "Permis", "Registres de maintenance", "Fiches équipements"],
      risks: ["Zonage obsolète", "Modification non évaluée", "Maintenance non conforme", "Erreur de classification"],
      prevention: ["Mise à jour documentaire", "Gestion du changement", "Vérifications périodiques", "Formation terrain"],
      points: [
        "Toute modification de procédé doit déclencher une revue du zonage.",
        "Un équipement réparé peut perdre sa conformité si la réparation n’est pas maîtrisée.",
        "La signalisation doit correspondre à la réalité du terrain.",
        "L’audit terrain permet de détecter les écarts entre plan et installation réelle.",
      ],
    },
  ],

  risques: [
    {
      title: "Phénomènes thermiques des hydrocarbures",
      visual: "fire",
      text:
        "Les feux d’hydrocarbures se distinguent par leur puissance thermique. On distingue le feu de nappe, le feu de jet, le feu de bac, le flash fire et le BLEVE. Le danger principal est le rayonnement thermique, qui peut blesser les personnes, fragiliser les structures et déclencher un effet domino.",
      objective: "Identifier la cinétique et les conséquences d’un incendie pétrolier.",
      equipment: ["Canons mousse", "Réseau incendie", "Rideaux d’eau", "Déluge", "Vannes d’isolement"],
      risks: ["Rayonnement thermique", "Effet domino", "Propagation", "Pollution", "Brûlures"],
      prevention: ["Ignifugeage", "Refroidissement", "Isolement rapide", "Détection flamme", "Distances de sécurité"],
      points: [
        "Le feu de jet peut attaquer localement une structure comme un chalumeau.",
        "La mousse agit sur les feux de liquides, mais pas sur un jet de gaz.",
        "L’eau sert surtout à refroidir les équipements exposés.",
        "L’isolement de la source est souvent plus important que l’attaque directe de la flamme.",
      ],
    },
    {
      title: "Toxicité du sulfure d’hydrogène H₂S",
      visual: "gas",
      text:
        "Le H₂S est un gaz toxique, incolore, souvent associé aux bruts acides, gaz acides, eaux de procédé et unités de désulfuration. Il est plus lourd que l’air et peut s’accumuler dans les points bas, fosses, caniveaux et espaces confinés. À forte concentration, il peut provoquer une perte de connaissance rapide.",
      objective: "Survivre en présence de gaz acide et appliquer les bons réflexes.",
      equipment: ["Détecteur individuel", "Masque de fuite", "ARI", "Balise de chantier", "Manche à air"],
      risks: ["Anosmie", "Arrêt respiratoire", "Mort foudroyante", "Intoxication collective"],
      prevention: ["Détection permanente", "Évacuation face ou travers au vent", "Procédure d’alerte", "Travail en binôme"],
      points: [
        "L’odeur d’œuf pourri disparaît à forte concentration : c’est un signe de danger extrême.",
        "Ne jamais secourir une victime sans protection respiratoire adaptée.",
        "Le sens du vent doit être vérifié avant toute évacuation ou intervention.",
        "Les points bas et espaces confinés doivent être contrôlés avant accès.",
      ],
    },
    {
      title: "UVCE, VCE et explosion de nuage",
      visual: "cloud",
      text:
        "Une explosion de nuage de vapeur se produit lorsqu’une fuite de gaz ou de liquide volatil forme un nuage inflammable qui se disperse puis rencontre une source d’inflammation. Les zones encombrées ou confinées augmentent l’intensité de l’explosion.",
      objective: "Comprendre la formation et l’escalade d’un nuage inflammable.",
      equipment: ["Détecteurs LIE", "Vannes ESD", "Modèles de dispersion", "Alarmes", "Plans d’évacuation"],
      risks: ["Surpression", "Effondrement", "Bris de vitres", "Effet domino", "Flash fire"],
      prevention: ["Détection rapide", "Isolement source", "Ventilation", "Réduction des inventaires", "Éloignement des bâtiments"],
      points: [
        "L’inflammation peut être retardée : le nuage peut se déplacer avant d’exploser.",
        "Les obstacles augmentent la turbulence et peuvent renforcer la surpression.",
        "Les bâtiments temporaires doivent être éloignés des unités à risque.",
        "Une fuite de GPL ou de naphta léger peut former rapidement un nuage dangereux.",
      ],
    },
    {
      title: "Interventions à risques : chaud, hauteur, capacité",
      visual: "confined",
      text:
        "Les travaux en capacité, travaux à chaud, levages, ouvertures de lignes et interventions en hauteur sont parmi les plus accidentogènes. Ils exigent une préparation documentaire, une analyse de risques, une coordination des coactivités et une surveillance terrain.",
      objective: "Sécuriser les coactivités critiques.",
      equipment: ["Explosimètre", "Ventilateur", "Harnais", "Permis", "Plan de levage"],
      risks: ["Anoxie", "Explosion résiduelle", "Chute", "Coincement", "Feu couvant"],
      prevention: ["Analyse de risques", "Surveillance constante", "LOTO", "Briefing sécurité", "Contrôle atmosphère"],
      points: [
        "Le test d’atmosphère est obligatoire avant toute entrée en capacité.",
        "Un surveillant doit rester à l’extérieur, prêt à donner l’alerte.",
        "Le permis de travail est un contrat de sécurité, pas une formalité.",
        "Un changement de conditions impose l’arrêt et la réévaluation du travail.",
      ],
    },
  ],

  raffinage: [
    {
      title: "Architecture générale de la raffinerie",
      visual: "refineryflow",
      text:
        "Une raffinerie est un système d’unités interconnectées où le brut est séparé, converti, traité puis mélangé. Les unités de séparation trient les coupes par volatilité ; les unités de conversion transforment les molécules lourdes ; les unités de traitement retirent les impuretés ; le blending ajuste les spécifications commerciales.",
      objective: "Visualiser le flux matière, énergie et sécurité.",
      equipment: ["Parc de stockage", "Dessaleur", "Fours", "Colonnes", "Réacteurs", "Expéditions"],
      risks: ["Inventaire important", "Haute température", "Pression", "Interconnexion", "Effet domino"],
      prevention: ["POI", "Automates de sécurité", "Inspection", "Contrôle procédé", "Gestion du changement"],
      points: [
        "Le brut est un mélange complexe d’hydrocarbures.",
        "Les utilités — vapeur, air, eau, azote, électricité — sont vitales au procédé.",
        "La sécurité procédé vise à garder le produit dans les équipements.",
        "Une perturbation sur une unité peut impacter les unités en aval ou en amont.",
      ],
    },
    {
      title: "Préparation du brut : stockage et dessalage",
      visual: "storage",
      text:
        "Avant distillation, le brut est stocké, homogénéisé et dessalé. Le dessalage élimine eau, sels et sédiments pour limiter la corrosion chlorhydrique, l’encrassement des échangeurs et les perturbations de colonne.",
      objective: "Comprendre l’importance du conditionnement de la charge.",
      equipment: ["Bacs brut", "Pompes de charge", "Dessaleur électrostatique", "Échangeurs", "Purge eau"],
      risks: ["Eau entraînée", "Sels", "Dépôts", "Moussage", "Corrosion acide"],
      prevention: ["Décantation", "Lavage eau", "Contrôle interface", "Suivi chlorures", "Drainage maîtrisé"],
      points: [
        "Les chlorures peuvent former de l’acide chlorhydrique en tête de colonne.",
        "Le dessaleur utilise souvent un champ électrique pour séparer eau et huile.",
        "Une mauvaise purge peut envoyer de l’eau salée vers l’unité.",
        "La qualité du brut conditionne la stabilité de toute la chaîne.",
      ],
    },
    {
      title: "Distillation atmosphérique et sous vide",
      visual: "column",
      text:
        "La distillation atmosphérique chauffe le brut vers des températures élevées puis sépare les fractions selon leur point d’ébullition. La distillation sous vide traite ensuite le résidu atmosphérique à pression réduite pour récupérer les gasoils lourds sans craquage excessif.",
      objective: "Comprendre le fractionnement par température et pression.",
      equipment: ["Four", "Colonne atmosphérique", "Colonne sous vide", "Reflux", "Condenseurs"],
      risks: ["Choc thermique", "Corrosion acide", "Surpression", "Cokage", "Entrée d’air"],
      prevention: ["Régulation cascade", "Injection inhibiteurs", "Contrôle vide", "Suivi température", "Inspection interne"],
      points: [
        "Le GPL et le naphta sont des coupes de tête.",
        "Le kérosène et le gazole sont soutirés latéralement.",
        "Le résidu atmosphérique est retraité sous vide.",
        "La température du four est un paramètre critique de sécurité et de qualité.",
      ],
    },
    {
      title: "Conversion : FCC, hydrocraquage, visbreaking",
      visual: "fcc",
      text:
        "La conversion augmente la valeur du brut en transformant les fractions lourdes en produits plus légers. Le FCC utilise un catalyseur circulant ; l’hydrocraquage utilise hydrogène et haute pression ; le visbreaking réduit la viscosité des résidus lourds.",
      objective: "Maximiser le rendement en produits blancs en sécurité.",
      equipment: ["Réacteur FCC", "Régénérateur", "Cyclones", "Compresseur H₂", "Réacteurs haute pression"],
      risks: ["Fragilisation par hydrogène", "Coke", "CO", "Catalyseur chaud", "Surpression"],
      prevention: ["Métallurgie adaptée", "Suivi pression différentielle", "Détection H₂", "Contrôle combustion", "Soupapes"],
      points: [
        "Le FCC produit essence, GPL et gazoles.",
        "Le catalyseur FCC circule à haute température.",
        "L’hydrocraquage produit des carburants propres mais nécessite beaucoup d’hydrogène.",
        "Les emballements thermiques doivent être maîtrisés par le contrôle des lits catalytiques.",
      ],
    },
    {
      title: "Traitement : HDS, amines, Claus et blending",
      visual: "blend",
      text:
        "L’hydrotraitement retire soufre, azote et composés instables. Le soufre est converti en H₂S, capté par les amines puis transformé en soufre élémentaire dans l’unité Claus. Le blending mélange les bases pour obtenir les produits finis selon spécifications.",
      objective: "Relier qualité produit, environnement et sécurité.",
      equipment: ["Réacteur HDS", "Absorbeur amines", "Unité Claus", "Bacs produits", "Analyseurs qualité"],
      risks: ["H₂S", "SO₂", "Hydrogène", "Erreur de mélange", "Vapeurs inflammables"],
      prevention: ["Détection gaz", "Suivi amine", "Contrôle qualité", "Procédures chargement", "Analyse laboratoire"],
      points: [
        "Le soufre extrait peut être vendu ou stocké sous forme liquide ou solide.",
        "Le reformage produit aussi de l’hydrogène utile à la raffinerie.",
        "Le blending ajuste densité, soufre, point éclair, indice d’octane ou cétane.",
        "Une erreur de blending peut rendre un produit non conforme ou dangereux.",
      ],
    },
  ],

  securite: [
    {
      title: "Barrières de détection",
      visual: "detector",
      text:
        "Les détecteurs de gaz, de flamme, de fumée et les analyseurs constituent les yeux du système de sécurité. Ils doivent couvrir les zones de fuite potentielles, être testés régulièrement et déclencher des actions adaptées.",
      objective: "Détecter l’anomalie avant l’accident.",
      equipment: ["Cellules H₂S", "Détecteurs LIE", "Détecteurs UV/IR", "Balises", "Détecteurs portables"],
      risks: ["Zone morte", "Saturation capteur", "Dérive du zéro", "Alarme ignorée"],
      prevention: ["Bump tests", "Étalonnage", "Nettoyage optique", "Cartographie détection", "Maintenance"],
      points: [
        "Un détecteur fixe ne remplace pas le détecteur individuel.",
        "Le H₂S se recherche plutôt en zones basses ; le méthane en zones hautes.",
        "L’alarme doit être audible, visible et comprise.",
        "Un détecteur en défaut est une barrière indisponible.",
      ],
    },
    {
      title: "ESD, SIS et décharge finale",
      visual: "esd",
      text:
        "En cas de dérive majeure, l’ESD ou le SIS isole l’unité, arrête les machines critiques et ferme les vannes de sécurité. Les soupapes protègent mécaniquement les équipements en envoyant le surplus vers le réseau torche ou une zone sûre.",
      objective: "Maintenir l’intégrité de l’installation lors d’un scénario anormal.",
      equipment: ["Vannes motorisées", "Automate sécurité", "PSV", "Disques de rupture", "Collecteur torche"],
      risks: ["Vanne bloquée", "Défaillance automate", "Gel des lignes", "Retour de flamme", "Surpression"],
      prevention: ["Tests fonctionnels", "Maintenance préventive", "Preuve périodique", "Analyse SIL", "Gestion des bypass"],
      points: [
        "La torche est un organe de sécurité ultime, pas un outil normal de production.",
        "L’ESD doit être suffisamment indépendant du système de conduite.",
        "Une soupape qui s’ouvre révèle souvent une dérive procédé.",
        "Un bypass de sécurité doit être autorisé, limité dans le temps et compensé.",
      ],
    },
    {
      title: "Protection incendie et intervention",
      visual: "firewater",
      text:
        "La protection incendie repose sur l’eau, la mousse, les rideaux d’eau, les systèmes déluge, les monitors, les extincteurs et l’organisation d’intervention. La stratégie consiste souvent à refroidir, isoler puis éteindre si l’intervention est sûre.",
      objective: "Choisir les moyens adaptés au type de feu.",
      equipment: ["Pompes incendie", "Réseau eau", "Mousse", "Monitors", "Déluge", "Extincteurs"],
      risks: ["Agent extincteur inadapté", "Débit insuffisant", "Propagation", "Rayonnement", "Accès impossible"],
      prevention: ["Essais périodiques", "Plan d’attaque", "Formation pompiers", "Maintenance réseau", "Réserve d’eau"],
      points: [
        "La mousse est adaptée aux feux de liquides hydrocarbures.",
        "L’eau refroidit les parois et structures exposées.",
        "Il ne faut pas éteindre un jet fire si la fuite continue et forme un nuage.",
        "La priorité est la vie humaine puis l’isolement de la source.",
      ],
    },
    {
      title: "Permis, LOTO et maîtrise des coactivités",
      visual: "permit",
      text:
        "Le permis de travail décrit la tâche, les risques, les mesures de prévention, les conditions limites et les autorisations. Le LOTO empêche la remise sous énergie d’un équipement. La coactivité nécessite coordination, communication et surveillance.",
      objective: "Éviter les accidents d’intervention et de maintenance.",
      equipment: ["Permis", "Cadenas", "Étiquettes", "Platines", "Registre", "Plan de prévention"],
      risks: ["Remise en énergie", "Ouverture sous pression", "Travail simultané incompatible", "Erreur de ligne"],
      prevention: ["Consignation", "Vérification zéro énergie", "Briefing", "Balisage", "Surveillance chantier"],
      points: [
        "Un permis n’est valable que pour un périmètre, une durée et des conditions données.",
        "La consignation doit être vérifiée sur le terrain, pas seulement déclarée.",
        "La coactivité peut créer un risque absent de chaque tâche prise séparément.",
        "Le stop work authority doit être encouragé.",
      ],
    },
  ],

  dommages: [
    {
      title: "Mécanismes de corrosion en raffinerie",
      visual: "corrosion",
      text:
        "La corrosion en raffinerie peut être uniforme, localisée, galvanique, sous dépôt, sous isolation, naphténique, sulfidique ou liée aux chlorures. Elle réduit l’épaisseur des parois et compromet la tenue mécanique des équipements sous pression.",
      objective: "Anticiper la perte de métal et prévenir les pertes de confinement.",
      equipment: ["Échangeurs", "Lignes de condensats", "Bacs", "Colonnes", "Fours"],
      risks: ["Fuite de produit chaud", "Rupture de ligne", "Contamination", "Incendie", "Arrêt non planifié"],
      prevention: ["Suivi ultrason", "Coupons corrosion", "Inhibiteurs", "Choix matériau", "Inspection RBI"],
      points: [
        "La corrosion naphténique survient à haute température sur certains bruts acides.",
        "L’eau stagnante en fond de bac accélère la corrosion.",
        "L’érosion-corrosion est fréquente dans les coudes et réductions.",
        "Les changements de brut peuvent modifier complètement le profil de corrosion.",
      ],
    },
    {
      title: "Corrosion sous isolation CUI",
      visual: "cui",
      text:
        "L’eau s’infiltre sous le calorifuge et stagne contre l’acier chaud, provoquant une corrosion invisible et rapide. La CUI est l’une des causes majeures de fuites imprévues car l’équipement peut sembler correct extérieurement.",
      objective: "Détecter l’invisible avant la fuite.",
      equipment: ["Tuyauteries isolées", "Colonnes calorifugées", "Supports", "Piquages", "Équipements extérieurs"],
      risks: ["Fuite massive", "Rupture brutale", "Chute de calorifuge", "Amincissement caché"],
      prevention: ["Peinture adaptée", "Dépose isolant", "Radiographie", "Thermographie", "Inspection points bas"],
      points: [
        "La zone critique est souvent comprise entre environ 50 °C et 150 °C selon les conditions.",
        "Les points bas, supports et pénétrations d’isolant sont très sensibles.",
        "Un isolant mouillé est un accélérateur de corrosion.",
        "La CUI doit être intégrée au plan d’inspection, pas traitée au hasard.",
      ],
    },
    {
      title: "Dommages liés à l’hydrogène et au H₂S",
      visual: "h2sdamage",
      text:
        "L’hydrogène et les milieux sulfureux peuvent provoquer fissuration, fragilisation, cloquage, HIC, SSC ou perte de ductilité. Ces dommages dépendent du matériau, de la dureté, des contraintes, de la présence d’eau et des conditions de procédé.",
      objective: "Comprendre les risques métallurgiques en unités sous hydrogène ou gaz acides.",
      equipment: ["Hydrotraitement", "Hydrocraquage", "Unités amines", "Gaz acides", "Séparateurs HP"],
      risks: ["Fissuration", "Fragilisation", "Rupture fragile", "Fuite toxique", "Incendie"],
      prevention: ["Matériaux qualifiés", "Contrôle dureté", "PWHT", "Suivi H₂S", "Inspection CND"],
      points: [
        "Le H₂S humide est beaucoup plus critique que le H₂S sec.",
        "Les soudures et zones contraintes sont souvent les plus sensibles.",
        "Les unités sous hydrogène exigent une métallurgie spécifique.",
        "Une fissure peut évoluer sans perte d’épaisseur significative visible.",
      ],
    },
    {
      title: "Fatigue, fluage et rupture fragile",
      visual: "fatigue",
      text:
        "La fatigue est liée aux sollicitations cycliques ; le fluage apparaît à haute température sous contrainte prolongée ; la rupture fragile peut survenir brutalement avec peu de déformation. Ces modes de dommages concernent particulièrement les fours, réacteurs, tuyauteries vibrantes et équipements vieillissants.",
      objective: "Identifier les dommages mécaniques non liés directement à la corrosion.",
      equipment: ["Fours", "Réacteurs", "Tuyauteries vibrantes", "Supports", "Soudures"],
      risks: ["Fissuration", "Rupture brutale", "Déformation", "Arrêt d’unité", "Projection"],
      prevention: ["Analyse vibrations", "Suivi température", "CND", "Contrôle supports", "Gestion durée de vie"],
      points: [
        "La fatigue démarre souvent aux concentrations de contraintes.",
        "Les vibrations peuvent fissurer les petits piquages.",
        "Le fluage concerne les équipements chauds sur longue durée.",
        "La rupture fragile est particulièrement dangereuse car peu annonciatrice.",
      ],
    },
  ],

  esp: [
    {
      title: "Risques liés à la pression",
      visual: "vessel",
      text:
        "Les ESP emmagasinent une énergie considérable sous forme de pression fluide. Une défaillance peut entraîner une libération instantanée d’énergie, une projection de fragments, un jet de produit dangereux, une onde de choc ou un incendie si le fluide est inflammable.",
      objective: "Respecter la réglementation et les limites de service.",
      equipment: ["Accumulateurs", "Chaudières", "Ballons", "Réacteurs", "Échangeurs"],
      risks: ["Déchirure de paroi", "Projection de brides", "Onde de choc", "Jet toxique", "Brûlure"],
      prevention: ["Épreuve hydraulique", "Tarage soupapes", "Dossier constructeur", "Inspection", "Limites opératoires"],
      points: [
        "L’air comprimé peut être aussi dangereux qu’un gaz inflammable par son énergie mécanique.",
        "Le non-respect des pressions de service est une faute grave.",
        "L’inspection périodique est une obligation de sécurité.",
        "Les accessoires de sécurité doivent être accessibles, testés et non isolés sans autorisation.",
      ],
    },
    {
      title: "Soupapes, disques de rupture et scénarios de surpression",
      visual: "pressure",
      text:
        "La surpression peut venir d’un feu externe, d’une dilatation thermique, d’une erreur de vanne, d’un blocage sortie, d’une réaction incontrôlée ou d’une défaillance de régulation. Les soupapes et disques de rupture protègent l’équipement contre l’éclatement.",
      objective: "Comprendre les accessoires critiques de protection pression.",
      equipment: ["PSV", "Disque de rupture", "Collecteur torche", "Manomètres", "Alarmes pression"],
      risks: ["Mauvais tarage", "Ligne bouchée", "Décharge dangereuse", "Soupape isolée", "Rupture"],
      prevention: ["Tests périodiques", "Dimensionnement", "Gestion des vannes d’isolement", "Inspection", "Procédures"],
      points: [
        "Une PSV doit être dimensionnée pour des scénarios crédibles.",
        "Une soupape isolée sans mesure compensatoire est une barrière perdue.",
        "Le disque de rupture s’ouvre de façon irréversible.",
        "La décharge doit être envoyée vers une zone sûre, souvent la torche.",
      ],
    },
    {
      title: "Consignation et ouverture d’un ESP",
      visual: "inspection",
      text:
        "L’ouverture d’un équipement — trou d’homme, bride, ligne, filtre, échangeur — est une phase critique. Elle impose une isolation positive, une dépressurisation, une purge, une vidange, un contrôle atmosphérique et une vérification de l’absence totale d’énergie.",
      objective: "Zéro accident lors des ouvertures d’équipements.",
      equipment: ["Joints", "Boulonnerie", "Platines", "Purge", "Détecteur gaz", "Cadenas"],
      risks: ["Jet de fluide résiduel", "Asphyxie", "Inflammation", "Brûlure", "Projection"],
      prevention: ["Double sectionnement et purge", "Pose de platines", "Zéro énergie", "Ouverture progressive", "Permis"],
      points: [
        "L’isolement par simple vanne est insuffisant pour une entrée en capacité.",
        "Le dévissage des boulons doit être progressif et contrôlé.",
        "Les sulfures de fer pyrophoriques peuvent s’enflammer au contact de l’air.",
        "La purge doit être dirigée vers un point sûr, pas vers une zone de passage.",
      ],
    },
  ],
};

const extraSections = [
  {
    id: "dt84",
    menu: "DT 84 — Inspection ESP",
    title: "DT 84 — Plan d’inspection des équipements sous pression",
    items: [
      {
        title: "Finalité du DT 84",
        text:
          "Le DT 84 est un guide professionnel pour établir un plan d’inspection des équipements sous pression suivis par un Service Inspection Reconnu. Il sert à définir et justifier la nature, les localisations, les étendues et les périodicités des inspections, contrôles et requalifications. Dans la formation, il permet de relier sécurité procédé, intégrité mécanique et conformité réglementaire.",
        actions: [
          "Définir les équipements concernés : récipients, tuyauteries, accessoires sous pression et accessoires de sécurité.",
          "Identifier les modes de dégradation susceptibles d’affecter les équipements.",
          "Évaluer la criticité par probabilité et conséquence de défaillance.",
          "Définir les inspections, CND, zones contrôlées et périodicités.",
          "Réviser le plan d’inspection après retour d’expérience, incident, dépassement COCL ou grand arrêt.",
        ],
      },
      {
        title: "Notions clés : SIR, ESP, plan d’inspection, boucle d’iso-dégradation",
        text:
          "Le DT 84 introduit une logique structurée : un équipement sous pression est suivi dans le temps par un plan d’inspection ; les équipements ayant des matériaux, fluides, pressions, températures et modes d’endommagement proches peuvent être regroupés en boucles d’iso-dégradation. Cette approche évite de contrôler au hasard et permet de cibler les zones réellement sensibles.",
        actions: [
          "SIR : service inspection reconnu chargé de définir et suivre les plans d’inspection.",
          "ESP : récipient, tuyauterie, générateur ou accessoire sous pression soumis à surveillance.",
          "Plan d’inspection : document prescrivant les opérations de surveillance dans le temps.",
          "Boucle d’iso-dégradation : ensemble d’équipements ayant des conditions de service et modes de dégradation communs.",
          "Équipement témoin : équipement représentatif choisi car il serait probablement touché en premier en cas de dommage.",
        ],
      },
      {
        title: "Méthode DT 84 : inspection basée sur la criticité",
        text:
          "La démarche DT 84 repose sur trois piliers : modes de dégradation, criticité et retour d’expérience. La criticité combine une catégorie de probabilité de défaillance et une catégorie de conséquence. Plus la criticité est élevée, plus l’effort d’inspection doit être important et ciblé.",
        actions: [
          "Probabilité : dommage, inspection, fabrication, état de l’équipement et stabilité du procédé.",
          "Conséquence : quantité relâchée, état du fluide, inflammabilité, toxicité, indisponibilité et effets induits.",
          "Criticité forte : revalidation des hypothèses, renforcement du suivi ou remise en cause du maintien en service.",
          "Criticité moyenne-forte : revue spécifique des modalités de suivi.",
          "Criticité faible ou moyenne : suivi selon plan, avec adaptation possible selon REX.",
        ],
      },
      {
        title: "COCL — Conditions Opératoires Critiques Limites",
        text:
          "Une COCL est un seuil de paramètre physique ou chimique dont le dépassement peut modifier l’endommagement d’un équipement ou déclencher un nouveau mode de dégradation. Dans une raffinerie, ces paramètres sont essentiels pour relier exploitation et intégrité mécanique.",
        actions: [
          "Température : risque de fluage, corrosion naphténique ou oxydation à chaud.",
          "pH : risque de corrosion acide, basique ou corrosion sous dépôt.",
          "Vitesse fluide : risque d’érosion-corrosion, cavitation ou amincissement localisé.",
          "Concentration d’impuretés : chlorures, H₂S, eau, oxygène, soufre, acides organiques.",
          "Tout dépassement de COCL doit être analysé, tracé et exploité dans la révision du plan d’inspection.",
        ],
      },
      {
        title: "Choix des contrôles non destructifs selon le dommage",
        text:
          "Le DT 84 rappelle que le contrôle doit être adapté au défaut recherché. Un contrôle visuel ne suffit pas pour tous les dommages ; les ultrasons, la radiographie, le TOFD, la magnétoscopie, le ressuage, l’émission acoustique ou les courants de Foucault doivent être choisis selon le mécanisme d’endommagement.",
        actions: [
          "Perte d’épaisseur : ultrasons, radiographie/gammagraphie, mesures d’épaisseur.",
          "Fissures débouchantes : ressuage, magnétoscopie si matériau ferromagnétique, examen visuel si accessible.",
          "Fissures non débouchantes : ultrasons angle, TOFD, courants de Foucault selon géométrie.",
          "Fluage : répliques métallographiques, TOFD, ultrasons selon zone et accessibilité.",
          "Piqûres et corrosion localisée : visuel interne, ultrasons ciblés, radiographie selon accessibilité.",
        ],
      },
      {
        title: "Zones sensibles à intégrer au plan d’inspection",
        text:
          "Le DT 84 insiste sur les points singuliers : ce sont souvent les lieux de perte de confinement. Pour les tuyauteries, une attention particulière doit être portée aux supports, zones de rétention sous calorifuge, piquages, purges, évents, bras morts, points bas, zones de vibration et zones susceptibles de coups de bélier.",
        actions: [
          "Points bas et bras morts : corrosion sous dépôt, eau stagnante, H₂S humide.",
          "Supports et sorties de calorifuge : CUI, contraintes, frottements.",
          "Coudes, réductions, tés : érosion-corrosion et turbulence.",
          "Piquages, purges, évents : zones de concentration de contraintes et de rétention.",
          "Soudures et attaches internes : fissuration, corrosion locale, fatigue.",
        ],
      },
      {
        title: "Révision du plan d’inspection",
        text:
          "Un plan d’inspection n’est pas figé. Il doit être révisé lorsqu’un changement significatif modifie la sévérité du milieu ou la susceptibilité aux dommages : changement de conditions opératoires, nouveau mode de dégradation, cinétique différente, dépassement de COCL, incident, anomalie d’inspection ou retour d’expérience.",
        actions: [
          "Réviser après grand arrêt ou requalification.",
          "Réviser après découverte d’un dommage non prévu.",
          "Réviser après modification de charge, température, pression, pH ou composition fluide.",
          "Réviser après incident, fuite, vibration, déformation ou dépassement COCL.",
          "Tracer l’objet et le justificatif de toute révision.",
        ],
      },
    ],
  },
  {
    id: "rex",
    menu: "REX sécurité",
    title: "REX — Retours d’expérience : apprendre du passé",
    items: [
      {
        title: "BP Texas City — 2005 : sur-remplissage et rejet atmosphérique",
        text:
          "Explosion d’une unité d’isomérisation lors d’un démarrage. Une colonne a été sur-remplie ; des hydrocarbures ont été envoyés vers une capacité de purge atmosphérique non reliée à une torche. Le nuage inflammable a été enflammé par un moteur de véhicule. L’accident illustre les limites d’une culture sécurité centrée uniquement sur les accidents individuels au lieu de la sécurité procédé.",
        actions: [
          "Surveiller strictement les phases de démarrage, arrêt et redémarrage.",
          "Supprimer les rejets atmosphériques pour hydrocarbures légers.",
          "Installer des sécurités haut niveau indépendantes.",
          "Éloigner les bâtiments temporaires et véhicules des unités dangereuses.",
          "Utiliser des indicateurs de sécurité procédé, pas seulement des taux d’accidents corporels.",
        ],
      },
      {
        title: "Buncefield — 2005 : sur-remplissage de réservoir",
        text:
          "Débordement d’un réservoir d’essence suite à la défaillance d’une jauge de niveau et d’une sécurité haut-haut. Formation d’un immense nuage de vapeur puis explosion. L’événement montre l’importance de l’indépendance des barrières, de la surveillance des réceptions et de la préparation aux scénarios de nuage inflammable.",
        actions: [
          "Diversifier les technologies de mesure de niveau.",
          "Tester périodiquement les alarmes haut niveau et haut-haut.",
          "Superviser les transferts et réceptions de produits volatils.",
          "Vérifier l’étanchéité et la capacité des cuvettes de rétention.",
          "Prendre en compte le scénario VCE dans les plans d’urgence.",
        ],
      },
      {
        title: "Chevron Richmond — 2012 : corrosion sulfidique",
        text:
          "Rupture d’un coude de tuyauterie amincie par corrosion sulfidique. Une fuite de gazole léger chaud a formé un nuage de vapeur inflammable, exposant de nombreux travailleurs. Le REX met en évidence l’importance du programme d’inspection, de la métallurgie et du traitement des recommandations techniques.",
        actions: [
          "Identifier les circuits sensibles à la corrosion sulfidique.",
          "Utiliser l’inspection basée sur les risques pour prioriser les zones critiques.",
          "Remplacer les tuyauteries lorsque la métallurgie est insuffisante.",
          "Ne pas tenter de colmater une fuite chaude au-dessus du point d’auto-inflammation.",
          "Traiter les recommandations d’inspection comme des actions de sécurité critiques.",
        ],
      },
      {
        title: "Piper Alpha — 1988 : permis de travail et communication",
        text:
          "Catastrophe offshore déclenchée par la remise en service d’une pompe alors qu’une soupape avait été déposée pour maintenance. L’événement est un cas majeur de défaillance de permis de travail, de communication entre équipes et de maîtrise des modifications temporaires.",
        actions: [
          "Durcir les passations de consignes entre quarts.",
          "Identifier physiquement les équipements sous permis et indisponibles.",
          "Maîtriser les modifications temporaires.",
          "Vérifier l’état réel d’un équipement avant redémarrage.",
          "Étudier l’effet domino dès la conception et l’exploitation.",
        ],
      },
      {
        title: "REX général — signaux faibles et barrières dégradées",
        text:
          "Les grands accidents ne résultent presque jamais d’une seule erreur. Ils proviennent souvent d’une accumulation : alarme inhibée, inspection reportée, fuite tolérée, procédure contournée, communication incomplète, formation insuffisante ou barrière indisponible.",
        actions: [
          "Considérer les signaux faibles comme des alertes sérieuses.",
          "Vérifier la disponibilité réelle des barrières de sécurité.",
          "Documenter les presque-accidents et les écarts.",
          "Transformer chaque REX en action concrète.",
          "Faire vivre le retour d’expérience dans les causeries sécurité.",
        ],
      },
    ],
  },
  {
    id: "checklists",
    menu: "Checklists terrain",
    title: "Checklists de sécurisation opérationnelle",
    items: [
      {
        title: "Préparation zone ATEX",
        text: "À vérifier avant tout début de chantier en zone classée.",
        actions: [
          "Plan de zonage consulté et compris.",
          "Balises de détection en place si nécessaire.",
          "Vêtements coton ou antistatiques portés.",
          "Mise à la terre de l’unité mobile vérifiée.",
          "Permis de feu signé et affiché si travaux chauds.",
          "Sources d’ignition supprimées ou maîtrisées.",
        ],
      },
      {
        title: "Entrée en capacité / espace confiné",
        text: "La vie des intervenants dépend de la préparation et de la surveillance.",
        actions: [
          "Équipement isolé physiquement avec platines si nécessaire.",
          "O₂, LIE, H₂S et gaz toxiques mesurés.",
          "Ventilation forcée active et contrôlée.",
          "Surveillant extérieur identifié et équipé.",
          "Plan d’évacuation d’urgence connu.",
          "Moyens de communication testés.",
        ],
      },
      {
        title: "Manœuvre de vannes et ouverture ESP",
        text: "Éviter les erreurs de ligne, coups de bélier et ouvertures sous pression.",
        actions: [
          "Étiquette équipement vérifiée.",
          "Pression lue sur deux moyens si possible.",
          "Ouverture progressive anti-coup de bélier.",
          "Position de repli identifiée en cas de fuite.",
          "Écran facial et gants adaptés portés.",
          "Signalement immédiat si vanne dure, bloquée ou fuyarde.",
        ],
      },
    ],
  },
  {
    id: "bonnespratiques",
    menu: "Bonnes pratiques",
    title: "Culture sécurité : comportements et erreurs",
    items: [
      {
        title: "Règles d’or du raffineur",
        text: "Les réflexes qui évitent l’accident grave.",
        actions: [
          "Analyser les risques avant chaque tâche.",
          "Utiliser les outils adaptés à la zone.",
          "Respecter les barrières de sécurité.",
          "Intervenir uniquement sur l’équipement identifié.",
          "Porter les EPI adaptés au produit et à l’énergie.",
          "S’arrêter en cas de doute ou de changement de situation.",
        ],
      },
      {
        title: "Signaux faibles à ne jamais ignorer",
        text: "Ces indices annoncent souvent un événement plus grave.",
        actions: [
          "Vibration inhabituelle d’une pompe.",
          "Odeur suspecte même faible.",
          "Suintement sur bride ou purge.",
          "Alarme répétitive ou inhibée.",
          "Pression ou température qui dérive sans explication.",
          "Corrosion visible, calorifuge humide ou peinture cloquée.",
        ],
      },
      {
        title: "Erreurs fréquentes",
        text: "Erreurs classiques observées en exploitation et maintenance.",
        actions: [
          "Considérer une petite fuite comme acceptable.",
          "Entrer en espace confiné sans mesure continue.",
          "Se fier à l’odeur pour détecter le H₂S.",
          "Utiliser un outil non ATEX en zone classée.",
          "Ouvrir une bride sans confirmation zéro énergie.",
          "Travailler avec une barrière de sécurité indisponible sans mesure compensatoire.",
        ],
      },
    ],
  },
  {
    id: "urgence",
    menu: "Fiches urgence",
    title: "Réactions immédiates en cas d’incident",
    items: [
      {
        title: "Détection gaz ou vapeurs",
        text: "Réaction immédiate en cas d’alarme fixe, portable ou suspicion de fuite.",
        actions: [
          "Arrêt immédiat des travaux à chaud.",
          "Évacuation vers zone saine en tenant compte du vent.",
          "Alerte salle de contrôle ou chef de quart.",
          "Balisage et interdiction des sources d’ignition.",
          "Retour uniquement après autorisation et mesures conformes.",
        ],
      },
      {
        title: "Départ de feu",
        text: "Prioriser l’alerte, la protection des personnes et l’isolement de la source.",
        actions: [
          "Donner l’alarme immédiatement.",
          "Tenter l’extinction uniquement si feu naissant et personnel formé.",
          "Évacuer au point de rassemblement si nécessaire.",
          "Refroidir les équipements exposés si procédure prévue.",
          "Procéder au dénombrement des équipes.",
        ],
      },
      {
        title: "Accident corporel / H₂S",
        text: "Ne pas transformer un accident en accident multiple.",
        actions: [
          "Protéger la zone et alerter les secours internes.",
          "Ne pas entrer sans ARI si gaz toxique suspecté.",
          "Extraire la victime uniquement avec moyens adaptés.",
          "Déclencher les premiers secours par personnel formé.",
          "Conserver les informations utiles : produit, heure, zone, mesures gaz.",
        ],
      },
    ],
  },
  {
    id: "glossaire",
    menu: "Glossaire",
    title: "Dictionnaire technique de la raffinerie",
    items: [
      { title: "ATEX", text: "Atmosphère explosive : mélange air + combustible dans le domaine d’explosivité." },
      { title: "LIE / LSE", text: "Limite inférieure / supérieure d’explosivité." },
      { title: "ESD", text: "Emergency Shutdown : système d’arrêt d’urgence automatisé." },
      { title: "SIS", text: "Safety Instrumented System : système instrumenté de sécurité." },
      { title: "PSV", text: "Pressure Safety Valve : soupape de protection contre la surpression." },
      { title: "LOTO", text: "Lock-Out / Tag-Out : consignation par cadenassage et étiquetage." },
      { title: "BLEVE", text: "Boiling Liquid Expanding Vapor Explosion : explosion d’un liquide sous pression chauffé." },
      { title: "VCE / UVCE", text: "Explosion de nuage de vapeur, confinée ou non confinée." },
      { title: "HDS", text: "Hydrodésulfuration : extraction du soufre par réaction avec l’hydrogène." },
      { title: "CUI", text: "Corrosion Under Insulation : corrosion sous isolation." },
      { title: "RBI", text: "Risk-Based Inspection : inspection basée sur les risques." },
      { title: "MOC", text: "Management of Change : gestion du changement." },
    ],
  },
];

const questions = [
  ["Selon la logique DT 84, un plan d’inspection sert principalement à :", "Définir et justifier les opérations de surveillance d’un ESP", "Remplacer toutes les procédures de sécurité", "Supprimer les inspections terrain"],
  ["Dans le DT 84, la criticité combine :", "Probabilité de défaillance et conséquence de défaillance", "Couleur de l’équipement et âge du site", "Débit nominal et nom du constructeur"],
  ["Une boucle d’iso-dégradation regroupe :", "Des équipements à conditions de service et modes de dégradation proches", "Des équipements de couleurs identiques", "Tous les équipements d’un site sans distinction"],
  ["Une COCL est :", "Un seuil opératoire dont le dépassement peut influencer l’endommagement", "Une soupape de sécurité", "Une méthode de peinture"],
  ["Un dépassement de COCL doit conduire à :", "Une analyse et une possible révision du plan d’inspection", "Continuer sans action", "Supprimer le détecteur"],
  ["Pour une perte d’épaisseur, une méthode CND courante est :", "La mesure d’épaisseur par ultrasons", "La mesure de bruit ambiant", "La pesée des opérateurs"],
  ["Pour les tuyauteries, le DT 84 attire l’attention sur :", "Supports, bras morts, purges, évents et zones sous calorifuge", "Uniquement les peintures neuves", "Uniquement les bureaux proches"],
  ["Un équipement témoin est choisi car :", "Il est représentatif et serait probablement touché en premier par le dommage", "Il est le plus propre", "Il est le plus facile à photographier"],
  ["Le retour d’expérience dans le DT 84 permet :", "D’adapter les modes de dégradation, la criticité et les contrôles", "D’éviter toute inspection", "De remplacer la réglementation"],
  ["Une criticité forte implique généralement :", "Une revue renforcée du suivi et des mesures de réduction du risque", "Une baisse automatique des contrôles", "Aucune action particulière"],
  ["Quels éléments complètent le triangle du feu pour parler d’explosion ?", "Concentration, suspension/dispersion et parfois confinement", "Eau, azote et pression", "Chaleur, vent et électricité"],
  ["Qu’est-ce que la LIE ?", "La concentration minimale de gaz pour une explosion", "La limite de température d’une pompe", "La pression maximale d’un bac"],
  ["Une zone ATEX 1 signifie que l’atmosphère explosive est :", "Probable en fonctionnement normal", "Présente en permanence", "Rare ou accidentelle"],
  ["Pourquoi le H₂S est-il particulièrement traître ?", "Il peut paralyser l’odorat à forte dose", "Il est toujours visible", "Il brille dans le noir"],
  ["En cas d’alarme gaz, il faut d’abord :", "Arrêter les travaux et se mettre en sécurité", "Courir vers la fuite", "Désactiver l’alarme"],
  ["Quel est le rôle principal d’une soupape PSV ?", "Éviter l’éclatement par surpression", "Régler le débit de production", "Mesurer le niveau"],
  ["La CUI est dangereuse car :", "Elle est cachée sous l’isolation", "Elle refroidit le produit", "Elle empêche la corrosion"],
  ["Que signifie une isolation positive ?", "Mise en place d’une séparation physique type platine", "Fermeture simple d’une vanne", "Arrêt d’un ordinateur"],
  ["Le REX BP Texas City montre l’importance de :", "La sécurité procédé et la maîtrise des démarrages", "La décoration des unités", "La couleur des équipements"],
  ["Dans une colonne de distillation, les produits les plus légers se trouvent :", "En tête de colonne", "En fond de colonne", "Dans les égouts"],
  ["Le FCC sert à :", "Transformer des coupes lourdes en produits plus légers", "Produire de l’eau", "Stocker le brut"],
  ["Avant une entrée en espace confiné, il faut vérifier :", "O₂, explosivité et gaz toxiques", "La couleur de la peinture", "La météo uniquement"],
  ["La torche d’une raffinerie sert à :", "Brûler les surplus de gaz en sécurité", "Éclairer le site", "Chauffer les bureaux"],
  ["La principale source d’inflammation lors d’un dépotage peut être :", "L’électricité statique", "Le bruit", "La lumière du jour"],
  ["Un matériel Ex d est :", "Un matériel antidéflagrant", "Un matériel interdit", "Un matériel sans électricité"],
  ["Pourquoi utilise-t-on de l’azote ?", "Pour inerter et réduire l’oxygène", "Pour accélérer la combustion", "Comme carburant camion"],
  ["Une anoxie correspond à :", "Un manque d’oxygène", "Un excès de pression", "Une brûlure chimique"],
  ["Le REX Piper Alpha concerne notamment :", "Permis de travail et communication", "Peinture", "Foudre uniquement"],
  ["Face à un feu de jet, l’action prioritaire est souvent :", "Isoler la source", "Mettre de la mousse sur la flamme", "S’approcher pour observer"],
  ["Un signal faible peut être :", "Une vibration anormale", "Une réunion", "Un badge"],
  ["La consignation LOTO garantit que :", "L’équipement ne peut pas redémarrer et est sans énergie", "Le travail sera rapide", "Le produit est conforme"],
  ["Le REX Buncefield met en avant :", "Le risque de sur-remplissage de réservoir", "La fatigue du personnel uniquement", "La qualité du carburant"],
  ["Le REX Chevron Richmond met en avant :", "Le suivi de corrosion et la métallurgie", "La vitesse des camions", "La couleur des tuyaux"],
  ["Une barrière de sécurité indisponible doit conduire à :", "Évaluation du risque et mesures compensatoires", "Continuer normalement", "Ignorer l’information"],
  ["Le MOC sert à :", "Maîtriser les changements techniques ou organisationnels", "Faire la maintenance uniquement", "Changer la couleur des plans"],
  ["Le RBI signifie :", "Inspection basée sur les risques", "Réacteur basse intensité", "Réseau brut interne"],
  ["Le HDS utilise principalement :", "De l’hydrogène", "De l’oxygène pur", "Du sable"],
  ["L’unité Claus traite :", "Le H₂S pour produire du soufre", "L’eau potable", "Les peintures"],
  ["Le point d’éclair concerne :", "La température minimale d’émission de vapeurs inflammables", "La pression maximale", "La masse volumique uniquement"],
  ["Un permis de travail est :", "Une analyse et autorisation formalisée", "Un simple papier administratif", "Un remplacement des EPI"],
].map((q, index) => ({
  id: index + 1,
  question: q[0],
  answers: [q[1], q[2], q[3]],
  correct: 0,
}));

export default function App() {
  const [activePage, setActivePage] = useState("accueil");
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const score = Object.keys(selectedAnswers).filter(
    (key) => selectedAnswers[key] === questions[key - 1].correct
  ).length;

  return (
    <main className="layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandIcon">⚠</div>
          <div>
            <h2>ATEX</h2>
            <p>REFINERY SAFETY</p>
          </div>
        </div>

        <nav className="sideMenu">
          <button onClick={() => setActivePage("accueil")} className={activePage === "accueil" ? "active" : ""}>Accueil</button>
          <button onClick={() => setActivePage("dashboard")} className={activePage === "dashboard" ? "active" : ""}>Tableau de bord</button>

          {courses.map((course) => (
            <button key={course.id} onClick={() => setActivePage(course.id)} className={activePage === course.id ? "active" : ""}>
              {course.menu}
            </button>
          ))}

          {extraSections.map((section) => (
            <button key={section.id} onClick={() => setActivePage(section.id)} className={activePage === section.id ? "active" : ""}>
              {section.menu}
            </button>
          ))}

          <button onClick={() => setActivePage("qcm")} className={activePage === "qcm" ? "active" : ""}>QCM final</button>
          <button onClick={() => setActivePage("resultats")} className={activePage === "resultats" ? "active" : ""}>Résultats</button>
        </nav>

        <div className="sidebarFooter">
          <p>Progression QCM</p>
          <strong>{Object.keys(selectedAnswers).length} / {questions.length} réponses</strong>
        </div>
      </aside>

      <section className="content">
        {activePage === "accueil" && <Home />}
        {activePage === "dashboard" && <Dashboard />}
        {courses.map((course) => activePage === course.id ? <Course key={course.id} course={course} /> : null)}
        {extraSections.map((section) => activePage === section.id ? <ExtraSection key={section.id} section={section} /> : null)}
        {activePage === "qcm" && (
          <>
            <Quiz
              questions={questions}
              selectedAnswers={selectedAnswers}
              setSelectedAnswers={setSelectedAnswers}
            />
            <DownloadPDF questions={questions} />
          </>
        )}
        {activePage === "resultats" && <Results score={score} total={questions.length} setSelectedAnswers={setSelectedAnswers} />}
      </section>
    </main>
  );
}

function Dashboard() {
  const stats = [
    { label: "Parties de cours", value: courses.length },
    { label: "Sections REX/Outils", value: extraSections.length },
    { label: "Questions QCM", value: questions.length },
    { label: "Expertise visée", value: "Niveau 2" },
  ];

  return (
    <section className="page">
      <p className="pageLabel">Vue globale</p>
      <h1>Tableau de bord de formation</h1>
      <p className="intro">
        Parcours de spécialisation aux risques industriels majeurs en environnement de raffinage et pétrochimie.
        Le tableau de bord synthétise les modules, les ressources de terrain et l’évaluation finale.
      </p>

      <div className="dashboardGrid">
        {stats.map((stat) => (
          <div className="dashboardCard" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="roadmap">
        <h2>Parcours recommandé</h2>
        {[
          ["01", "ATEX", "Comprendre la formation d’une atmosphère explosive et le zonage."],
          ["02", "Risques pétroliers", "Identifier H₂S, incendie, explosion, BLEVE et espaces confinés."],
          ["03", "Raffinage", "Comprendre les unités principales et les flux matière."],
          ["04", "Sécurités", "Relier détection, ESD, PSV, torche et permis de travail."],
          ["05", "Dommages", "Analyser corrosion, CUI, H₂S, fatigue et fluage."],
          ["06", "REX", "Transformer les accidents passés en barrières concrètes."],
        ].map(([num, title, text]) => (
          <div className="roadmapStep" key={num}>
            <span>{num}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <header className="topbar">
        <div>
          <p className="pageLabel">Expertise sécurité procédé</p>
          <h1>ATEX & Refinery Safety Training</h1>
        </div>
      </header>

      <section className="hero">
        <div className="heroText">
          <span className="badge">RÉGLEMENTATION • PRÉVENTION • TECHNIQUE</span>
          <h2>Garantir l'intégrité physique et humaine face aux risques pétroliers.</h2>
          <p>
            Une plateforme pédagogique immersive pour maîtriser le zonage ATEX, les procédés de raffinage,
            les modes de dommages, les ESP, les barrières de sécurité et les retours d’expérience majeurs.
          </p>
        </div>

        <div className="trainingCard">
          <div className="cardHeader">
            <span>Certification interne</span>
            <strong>{questions.length} Questions</strong>
          </div>
          <h3>Parcours complet</h3>
          <p>Validation des acquis sur les modules techniques et les REX historiques.</p>
          <div className="progress"><div></div></div>
          <ul>
            <li>Schémas de procédés enrichis</li>
            <li>Analyses d'accidents REX</li>
            <li>Checklists opérationnelles</li>
            <li>QCM avec correction instantanée</li>
          </ul>
        </div>
      </section>

      <section className="drawingSection">
        <div className="drawingCard">
          <RefineryDrawing />
          <div>
            <h2>Chaîne de transformation</h2>
            <p>De l’arrivée du brut à l’expédition : séparation, conversion thermique/catalytique, traitement et purification.</p>
          </div>
        </div>

        <div className="drawingCard reverse">
          <SafetyDrawing />
          <div>
            <h2>Les couches de protection</h2>
            <p>La défense en profondeur : prévention, détection, arrêt d’urgence, décharge, lutte incendie et culture sécurité.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Course({ course }) {
  const lessons = detailedLessons[course.id];

  return (
    <section className="page">
      <p className="pageLabel">Module de formation technique</p>
      <h1>{course.title}</h1>
      <p className="intro">{course.content}</p>

      <div className="lessonList">
        {lessons.map((lesson, index) => (
          <div className="lessonCard" key={lesson.title}>
            <div className="lessonVisual"><Visual type={lesson.visual} /></div>
            <div className="lessonBody">
              <div className="lessonNumber">{String(index + 1).padStart(2, "0")}</div>
              <h2>{lesson.title}</h2>
              <p>{lesson.text}</p>
              <div className="miniGrid">
                <InfoBox title="Objectif" items={[lesson.objective]} />
                <InfoBox title="Équipements" items={lesson.equipment} />
                <InfoBox title="Risques" items={lesson.risks} />
                <InfoBox title="Prévention" items={lesson.prevention} />
              </div>
              <h4>Points clés à retenir</h4>
              <ul>{lesson.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoBox({ title, items }) {
  return (
    <div className="infoBox">
      <strong>{title}</strong>
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}

function ExtraSection({ section }) {
  return (
    <section className="page">
      <p className="pageLabel">Ressources & outils</p>
      <h1>{section.title}</h1>
      <div className="extraGrid">
        {section.items.map((item) => (
          <div className="extraCard" key={item.title}>
            <h2>{item.title}</h2>
            {item.text && <p>{item.text}</p>}
            {item.actions && <ul>{item.actions.map((action) => <li key={action}>{action}</li>)}</ul>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Visual({ type }) {
  return (
    <div className={`visual visual-${type}`}>
      <div className="v-circle"></div>
      <div className="v-line"></div>
      <div className="v-box one"></div>
      <div className="v-box two"></div>
      <div className="v-box three"></div>
      <span>{type.toUpperCase()}</span>
    </div>
  );
}

function RefineryDrawing() {
  return (
    <div className="processDrawing">
      <div className="unit tank">Brut</div><div className="pipe"></div>
      <div className="unit heater">Four</div><div className="pipe"></div>
      <div className="unit column">Distil.</div><div className="pipe"></div>
      <div className="unit reactor">Conv.</div><div className="pipe"></div>
      <div className="unit product">Fini</div>
    </div>
  );
}

function SafetyDrawing() {
  return (
    <div className="safetyDrawing">
      <div className="barrier">Capteurs</div><div className="barrier">ESD</div><div className="barrier">PSV</div>
      <div className="barrier">Torche</div><div className="centerShield">SITE</div><div className="barrier">Incendie</div>
      <div className="barrier">Permis</div><div className="barrier">LOTO</div><div className="barrier">REX</div>
    </div>
  );
}

function Quiz({ questions, selectedAnswers, setSelectedAnswers }) {
  return (
    <section className="page">
      <p className="pageLabel">Validation des acquis</p>
      <h1>QCM final de certification</h1>
      <div className="quizList">
        {questions.map((q) => (
          <div className="questionCard" key={q.id}>
            <h3>{q.id}. {q.question}</h3>
            <div className="answers">
              {q.answers.map((answer, index) => {
                const selected = selectedAnswers[q.id] === index;
                const answered = selectedAnswers[q.id] !== undefined;
                const correct = index === q.correct;
                let className = "answer";
                if (answered && selected && correct) className += " correct";
                if (answered && selected && !correct) className += " wrong";
                if (answered && !selected && correct) className += " showCorrect";
                return <button key={answer} className={className} onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: index })}>{answer}</button>;
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DownloadPDF({ questions }) {
  const cleanPDFText = (value) => {
    return String(value)
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[–—]/g, "-")
      .replace(/•/g, "-")
      .replace(/₂/g, "2")
      .replace(/₃/g, "3")
      .replace(/°/g, " deg")
      .replace(/œ/g, "oe")
      .replace(/Œ/g, "OE")
      .replace(/€/g, "EUR");
  };
  const addHeader = (doc, title) => {
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, pageWidth, 30, "F");

    doc.setFillColor(249, 115, 22);
    doc.roundedRect(14, 8, 14, 14, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.text(cleanPDFText("ATEX & Refinery Safety"), 34, 14);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(cleanPDFText(title), 34, 21);
  };

  const addFooter = (doc) => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;

    doc.setDrawColor(203, 213, 225);
    doc.line(14, pageHeight - 15, pageWidth - 14, pageHeight - 15);

    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(cleanPDFText("Formation ATEX - Raffinerie - ESP - Securite procede"), 14, pageHeight - 8);
    doc.text(cleanPDFText(`Page ${pageNumber}`), pageWidth - 28, pageHeight - 8);
  };

  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const maxWidth = pageWidth - margin * 2;
    let y = 42;

    const newPage = () => {
      addFooter(doc);
      doc.addPage();
      addHeader(doc, "QCM de validation des acquis");
      y = 42;
    };

    addHeader(doc, "QCM de validation des acquis");

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(cleanPDFText("Questionnaire QCM"), margin, y);
    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text(cleanPDFText("Nom : ________________________________"), margin, y);
    doc.text(cleanPDFText("Date : ____ / ____ / ______"), pageWidth - margin - 58, y);
    y += 8;
    doc.text(cleanPDFText("Consigne : cochez une seule reponse par question."), margin, y);
    y += 12;

    questions.forEach((q) => {
      const questionLines = doc.splitTextToSize(cleanPDFText(`${q.id}. ${q.question}`), maxWidth - 8);
      const answerLines = q.answers.map((answer, index) => {
        const letter = ["A", "B", "C"][index];
        return doc.splitTextToSize(cleanPDFText(`[ ] ${letter}) ${answer}`), maxWidth - 14);
      });

      const estimatedHeight =
        questionLines.length * 5 +
        answerLines.reduce((sum, lines) => sum + lines.length * 5 + 1, 0) +
        13;

      if (y + estimatedHeight > pageHeight - 22) {
        newPage();
      }

      const boxY = y - 5;
      const boxHeight = Math.max(34, estimatedHeight);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, boxY, maxWidth, boxHeight, 3, 3, "FD");

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.text(questionLines, margin + 4, y);
      y += questionLines.length * 5 + 3;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);

      answerLines.forEach((lines) => {
        doc.text(lines, margin + 7, y);
        y += lines.length * 5 + 1;
      });

      y = boxY + boxHeight + 8;
    });

    addFooter(doc);
    doc.save("QCM_ATEX_Refinery_Safety.pdf");
  };

  const generateCorrectionPDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const maxWidth = pageWidth - margin * 2;
    let y = 42;

    const newPage = () => {
      addFooter(doc);
      doc.addPage();
      addHeader(doc, "Corrigé du QCM");
      y = 42;
    };

    addHeader(doc, "Corrigé du QCM");

    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(cleanPDFText("Corrige - reponses attendues"), margin, y);
    y += 12;

    questions.forEach((q) => {
      const questionLines = doc.splitTextToSize(cleanPDFText(`${q.id}. ${q.question}`), maxWidth);
      const answerLines = doc.splitTextToSize(cleanPDFText(`Reponse : A) ${q.answers[q.correct]}`), maxWidth - 6);
      const neededHeight = questionLines.length * 5 + answerLines.length * 5 + 8;

      if (y + neededHeight > pageHeight - 22) {
        newPage();
      }

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(questionLines, margin, y);
      y += questionLines.length * 5 + 2;

      doc.setTextColor(22, 163, 74);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.text(answerLines, margin + 4, y);
      y += answerLines.length * 5 + 5;
    });

    addFooter(doc);
    doc.save("Corrige_QCM_ATEX_Refinery_Safety.pdf");
  };

  return (
    <div className="downloadSection">
      <h2>Télécharger le QCM</h2>
      <p>
        Générez un vrai PDF professionnel directement avec jsPDF : questionnaire
        imprimable + corrigé séparé pour le formateur.
      </p>
      <div className="downloadButtons">
        <button onClick={generatePDF}>Télécharger le QCM PDF</button>
        <button onClick={generateCorrectionPDF} className="secondaryButton">
          Télécharger le corrigé
        </button>
      </div>
    </div>
  );
}

function Results({ score, total, setSelectedAnswers }) {
  const percent = Math.round((score / total) * 100);
  const message = percent >= 80 ? "Certification réussie !" : "Révisions nécessaires.";

  return (
    <section className="page">
      <p className="pageLabel">Bilan</p>
      <h1>Score final</h1>
      <div className="resultCard">
        <h2>{score} / {total}</h2>
        <p>{percent}% — {message}</p>
        <div className="progress large"><div style={{ width: `${percent}%` }}></div></div>
        <button onClick={() => setSelectedAnswers({})}>Recommencer le QCM</button>
      </div>
    </section>
  );
}

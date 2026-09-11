import { OptionKey } from '../types';

export interface AnswerKeyEntry {
  answer: OptionKey;
  explanation: string;
}

/**
 * Corrigé officiel des bonnes réponses et explications du Module 2
 * Source officielle fournie par l'instructeur.
 */
export const DEFAULT_ANSWER_KEYS: Record<string, AnswerKeyEntry> = {
  // 2.1.11 — Bilan des forces et théorie du disque sustentateur
  '2.1-1': {
    answer: 'B',
    explanation: 'Un multirotor utilise principalement ses rotors pour produire à la fois la sustentation et la traction. Pour avancer, il incline sa poussée afin de créer une composante horizontale.'
  },
  '2.1-2': {
    answer: 'C',
    explanation: "Dans la théorie du disque sustentateur, la vitesse de l'air loin en aval du rotor vaut le double de la vitesse induite au niveau du disque."
  },
  '2.1-3': {
    answer: 'A',
    explanation: 'En doublant le diamètre, la surface du disque est multipliée par quatre. À poussée et masse constantes, la puissance induite idéale est divisée par deux.'
  },
  '2.1-4': {
    answer: 'C',
    explanation: "L'angle d'équilibre vérifie :\ntan(θ) = Traînée / Poids\nPoids = 3,4 × 9,81 = 33,354 N\ntan(θ) = 6,2 / 33,354 ≈ 0,186\nθ ≈ 10,6°"
  },
  '2.1-5': {
    answer: 'A',
    explanation: "Les petites hélices possèdent une faible inertie et permettent de modifier rapidement la poussée, ce qui améliore l'agilité du drone, même si leur rendement est généralement inférieur."
  },

  // 2.2.10 — Commandes, sous-actionnement et mixage
  '2.2-1': {
    answer: 'B',
    explanation: "Un quadrirotor possède quatre commandes principales pour contrôler six degrés de liberté. Deux translations sont donc obtenues indirectement par l'inclinaison de l'appareil."
  },
  '2.2-2': {
    answer: 'A',
    explanation: "Le multirotor se déplace horizontalement en inclinant son vecteur de poussée. Une composante de la poussée assure alors le déplacement horizontal tandis que l'autre compense le poids."
  },
  '2.2-3': {
    answer: 'A',
    explanation: 'Une matrice de mixage carrée et inversible signifie qu\'à chaque combinaison de force et de moments correspond un jeu unique de poussées à appliquer aux moteurs.'
  },
  '2.2-4': {
    answer: 'B',
    explanation: "Un hexarotor possède davantage d'actionneurs que de degrés de liberté à commander. Sa matrice de mixage est donc sous-déterminée et peut permettre de trouver des solutions malgré la perte d'un moteur."
  },
  '2.2-5': {
    answer: 'D',
    explanation: "La boucle de stabilisation doit agir très rapidement car un multirotor est naturellement instable et peut dévier de plusieurs degrés en une fraction de seconde."
  },

  // 2.3.12 — Repères, attitude et quaternions
  '2.3-1': {
    answer: 'B',
    explanation: "Un accéléromètre embarqué mesure naturellement dans le repère de l'appareil, car il est solidaire de la structure sur laquelle il est installé."
  },
  '2.3-2': {
    answer: 'C',
    explanation: "Un appareil immobile et horizontal subit la mesure de la gravité sur son axe vertical. La valeur mesurée est approximativement de 9,81 m/s² sur cet axe et nulle sur les deux axes horizontaux."
  },
  '2.3-3': {
    answer: 'A',
    explanation: "Les rotations dans l'espace ne commutent pas. Modifier l'ordre des rotations produit donc une orientation différente."
  },
  '2.3-4': {
    answer: 'D',
    explanation: "Le blocage de cardan est une perte d'un degré de liberté dans la représentation par angles d'Euler lorsque deux axes deviennent alignés, notamment lorsque le tangage atteint la verticale."
  },
  '2.3-5': {
    answer: 'C',
    explanation: "Les quaternions permettent de représenter l'attitude sans la singularité associée aux angles d'Euler, notamment le blocage de cardan."
  },

  // 2.4.12 — Hélices et rendement aérodynamique
  '2.4-1': {
    answer: 'D',
    explanation: 'La poussée est proportionnelle au carré de la vitesse de rotation. Si la vitesse de rotation est doublée : 2² = 4. La poussée est donc multipliée par quatre.'
  },
  '2.4-2': {
    answer: 'B',
    explanation: "L'efficacité de deux hélices de même diamètre se compare objectivement avec leur figure de mérite, calculée à partir des coefficients de poussée et de puissance mesurés."
  },
  '2.4-3': {
    answer: 'A',
    explanation: "La théorie de l'élément de pale étudie la pale localement, tranche par tranche. Elle permet notamment d'analyser le vrillage et les efforts le long de la pale."
  },
  '2.4-4': {
    answer: 'C',
    explanation: 'Le faible nombre de Reynolds des petites hélices dégrade les performances aérodynamiques des profils et limite leur figure de mérite, souvent autour de 0,70.'
  },
  '2.4-5': {
    answer: 'B',
    explanation: 'La poussée dépend du diamètre à la puissance quatrième dans les relations de dimensionnement. Utiliser le diamètre commercial au lieu du diamètre réel peut donc fausser le calcul de la poussée.'
  },

  // 2.5.12 — Moteurs sans balais et association moteur-hélice
  '2.5-1': {
    answer: 'D',
    explanation: 'La constante de vitesse Kv indique le régime à vide par volt appliqué. Une valeur élevée correspond généralement à un moteur plus rapide et produisant moins de couple par ampère.'
  },
  '2.5-2': {
    answer: 'D',
    explanation: "Le régime réel dépend de l'interaction entre le moteur et l'hélice. Cette association détermine notamment le rendement, le courant consommé et l'échauffement."
  },
  '2.5-3': {
    answer: 'D',
    explanation: 'Le rendement passe par un maximum. Il est faible à bas courant à cause des pertes fixes et diminue à fort courant à cause notamment des pertes cuivre.'
  },
  '2.5-4': {
    answer: 'A',
    explanation: "Lorsque le régime augmente à tension fixée, la force électromotrice augmente. Il reste donc moins de tension disponible pour faire circuler le courant, ce qui réduit le couple disponible."
  },
  '2.5-5': {
    answer: 'B',
    explanation: "La limite de courant est principalement une limite thermique. Lorsque l'air est plus chaud, le refroidissement est moins efficace et le moteur atteint plus rapidement sa température maximale admissible."
  },

  // 2.6.11 — Stabilité et dynamique du multirotor
  '2.6-1': {
    answer: 'B',
    explanation: 'La stabilité statique concerne la première réaction du système après une perturbation. La stabilité dynamique concerne l\'évolution complète de la réponse dans le temps.'
  },
  '2.6-2': {
    answer: 'C',
    explanation: "Sans commande, un multirotor est statiquement neutre en attitude : il ne possède pas naturellement de moment de rappel qui le ramène à l'horizontale."
  },
  '2.6-3': {
    answer: 'D',
    explanation: 'Une oscillation d\'amplitude constante est une oscillation entretenue. Le système se trouve à la frontière de la stabilité avec un amortissement quasi nul.'
  },
  '2.6-4': {
    answer: 'A',
    explanation: "Pour un coefficient d'amortissement de 0,7, le dépassement est d'environ 5 %. Cette valeur représente un bon compromis entre rapidité et faible dépassement."
  },
  '2.6-5': {
    answer: 'C',
    explanation: "L'instabilité naturelle rend le multirotor agile, car rien ne s'oppose naturellement aux changements d'attitude imposés par les commandes."
  },

  // 2.7.11 — Correcteur PID
  '2.7-1': {
    answer: 'B',
    explanation: "L'action proportionnelle produit une commande proportionnelle à l'écart courant entre la consigne et la valeur mesurée."
  },
  '2.7-2': {
    answer: 'A',
    explanation: "Une action proportionnelle forte réagit à l'écart présent sans anticiper suffisamment la dynamique du système. L'appareil peut donc arriver rapidement à la consigne, la dépasser et osciller."
  },
  '2.7-3': {
    answer: 'C',
    explanation: "L'action dérivée apporte l'amortissement. Elle correspond au coefficient d'amortissement du système du second ordre."
  },
  '2.7-4': {
    answer: 'C',
    explanation: "L'action intégrale accumule l'écart résiduel au cours du temps jusqu'à produire le moment nécessaire pour compenser la charge décentrée."
  },
  '2.7-5': {
    answer: 'D',
    explanation: "Un mauvais réglage des gains sur l'appareil réel peut déstabiliser le drone et provoquer une collision ou endommager le matériel. La simulation permet de limiter ce risque."
  },

  // 2.8.11 — Vibrations et filtrage
  '2.8-1': {
    answer: 'A',
    explanation: 'Les vibrations proviennent notamment du balourd des hélices, à la fréquence de rotation, ainsi que du passage des pales, à un multiple de cette fréquence.'
  },
  '2.8-2': {
    answer: 'C',
    explanation: "Les vibrations sont amplifiées par l'action dérivée du correcteur, qui réagit aux variations rapides et peut transmettre un tremblement aux moteurs."
  },
  '2.8-3': {
    answer: 'B',
    explanation: "Une fréquence de coupure trop basse introduit un retard important dans la mesure filtrée. Ce retard peut déstabiliser la boucle de commande."
  },
  '2.8-4': {
    answer: 'C',
    explanation: "Le premier geste consiste à enregistrer et analyser le signal, notamment avec son spectre fréquentiel, afin d'identifier les fréquences et les sources probables des vibrations."
  },
  '2.8-5': {
    answer: 'D',
    explanation: "Un filtre passe-bas est impuissant lorsque le bruit occupe la même bande de fréquences que le mouvement utile. Le filtrer supprimerait également une partie du signal nécessaire à la commande."
  },

  // 2.9.11 — Inertie, centre de gravité et répartition des masses
  '2.9-1': {
    answer: 'B',
    explanation: "Les termes hors diagonale du tenseur d'inertie représentent les couplages entre les axes. Une rotation autour d'un axe peut ainsi engendrer une tendance à tourner autour d'un autre."
  },
  '2.9-2': {
    answer: 'C',
    explanation: "Un décalage du centre de gravité crée un moment permanent. Dans le cas indiqué, ce moment consomme une part notable de l'autorité de tangage, environ un sixième."
  },
  '2.9-3': {
    answer: 'D',
    explanation: "Les gains du correcteur dépendent de la dynamique du système, elle-même liée aux moments d'inertie. Modifier la répartition des masses modifie donc les inerties et nécessite une nouvelle vérification du réglage."
  },
  '2.9-4': {
    answer: 'B',
    explanation: "On peut mesurer le moment d'inertie d'un appareil en le suspendant à un fil et en mesurant la période de ses oscillations en rotation."
  },
  '2.9-5': {
    answer: 'D',
    explanation: "Sur un multirotor plat, le moment d'inertie de lacet est généralement le plus grand, car les masses sont éloignées de l'axe vertical mais proches du plan horizontal."
  },

  // 2.10.12 — Voilure fixe, rotor et appareils convertibles
  '2.10-1': {
    answer: 'B',
    explanation: "Une aile dépend du mouvement de l'appareil pour créer l'écoulement d'air nécessaire à la portance. Un rotor crée lui-même son écoulement en mettant l'air en mouvement."
  },
  '2.10-2': {
    answer: 'C',
    explanation: "La vitesse de décrochage est la vitesse minimale en dessous de laquelle l'aile ne peut plus produire suffisamment de portance pour soutenir le poids de l'appareil."
  },
  '2.10-3': {
    answer: 'D',
    explanation: "Une grande envergure augmente l'allongement de l'aile, ce qui réduit la traînée induite et améliore la finesse du planeur."
  },
  '2.10-4': {
    answer: 'A',
    explanation: "À masse égale, la consommation d'un multirotor en stationnaire peut être environ quatre fois supérieure à celle d'une voilure fixe en croisière."
  },
  '2.10-5': {
    answer: 'C',
    explanation: "Un appareil convertible transporte en permanence la masse et la traînée liées à l'architecture qu'il n'utilise pas pendant une phase donnée du vol."
  },

  // 2.11.11 — Autonomie et dimensionnement énergétique
  '2.11-1': {
    answer: 'B',
    explanation: "Le calcul naïf énergie divisée par puissance surestime généralement l'autonomie réelle de 20 à 30 %, notamment à cause de la profondeur de décharge utile et du rendement de décharge."
  },
  '2.11-2': {
    answer: 'D',
    explanation: "Une décharge profonde réduit fortement la durée de vie de la batterie et peut provoquer une chute de tension susceptible de perturber ou d'arrêter le système."
  },
  '2.11-3': {
    answer: 'C',
    explanation: "L'ajout de packs identiques augmente l'autonomie avec un rendement décroissant, car chaque pack supplémentaire ajoute aussi une masse que le drone doit transporter."
  },
  '2.11-4': {
    answer: 'B',
    explanation: "Une équation implicite est une équation dans laquelle l'inconnue apparaît des deux côtés, ce qui empêche généralement de l'isoler directement par une simple transformation algébrique."
  },
  '2.11-5': {
    answer: 'D',
    explanation: "Un multirotor consomme généralement le moins à une vitesse d'avancement modérée, car la puissance induite diminue lorsque l'appareil se déplace."
  },

  // 2.12.12 — Simulation logicielle en boucle et ArduPilot
  '2.12-1': {
    answer: 'A',
    explanation: "Une simulation logicielle en boucle exécute le firmware réel, avec ses modes de vol et ses comportements de repli, contrairement au simulateur simplifié écrit au chapitre 2.7."
  },
  '2.12-2': {
    answer: 'B',
    explanation: "Une version précise du firmware est figée pour garantir la reproductibilité des résultats et parce qu'une version répandue est généralement mieux documentée."
  },
  '2.12-3': {
    answer: 'C',
    explanation: "Le paramètre INS_GYRO_FILTER d'ArduPilot contrôle la fréquence de coupure du filtre passe-bas appliqué au gyroscope."
  },
  '2.12-4': {
    answer: 'D',
    explanation: "La structure en cascade sépare le réglage de l'amortissement, limité notamment par le bruit, du réglage de la vivacité, qui constitue un choix de comportement."
  },
  '2.12-5': {
    answer: 'A',
    explanation: "Une simulation logicielle en boucle ne reproduit pas parfaitement les vibrations réelles, le bruit des capteurs, les défauts de fabrication et les caractéristiques du vent réel."
  }
};

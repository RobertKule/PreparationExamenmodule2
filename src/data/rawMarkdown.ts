/**
 * Source de vérité du contenu pédagogique - Module 2 Formation Drone.
 * Fichier Markdown original fourni.
 */
export const MODULE_2_MARKDOWN_SOURCE = `2.1.11. Auto-évaluation
Question 1. En quoi le bilan des forces d’un multirotor diffère-t-il de celui d’un avion en
palier ?
A. Il ne diffère pas, les quatre forces s’appliquant à tout aéronef quelle que soit son
architecture.
B. Un seul organe produit portance et traction, si bien que la poussée doit être
inclinée pour avancer.
C. La traînée y est négligeable aux vitesses usuelles, ce qui ramène le bilan à deux
forces opposées.
D. Le poids y varie avec l’inclinaison, la composante utile diminuant lorsque
l’appareil se penche.
Question 2. Dans la théorie du disque sustentateur, que vaut la vitesse de l’air loin en aval
du rotor ?
A. La vitesse induite au disque, l’air conservant sa vitesse une fois traversé le plan
des rotors.
B. La moitié de la vitesse induite au disque, l’écoulement ralentissant en s’éloignant
du rotor.
C. Le double de la vitesse induite au disque, l’accélération se poursuivant en aval du
disque.
D. Une vitesse indéterminée, la théorie ne décrivant que ce qui se passe au plan du
disque.
Question 3. On double le diamètre des hélices d’un multirotor sans modifier sa masse. Que
devient la puissance induite idéale ?
A. Elle est divisée par deux, la surface de disque étant multipliée par quatre par cette
opération.
B. Elle est divisée par quatre, dans la proportion exacte de l’augmentation de surface
de disque.
C. Elle reste inchangée, la poussée à produire étant déterminée par le seul poids de
l’appareil.
D. Elle est multipliée par deux, une hélice plus grande exigeant un couple moteur
plus important.
Question 4. Un appareil de 3,4 kg présente une traînée de 6,2 N à 15 m/s. Quelle est son
inclinaison d’équilibre ?
A. Environ 6,8°, l’angle se déduisant du rapport de la traînée à la poussée totale de
l’appareil.
B. Environ 18,4°, l’inclinaison croissant comme le carré de la vitesse de l’air
rencontrée.
C. Environ 10,6°, l’angle ayant pour tangente le rapport de la traînée au poids de
l’appareil.
D. Environ 30,0°, valeur limite au-delà de laquelle un multirotor ne peut plus tenir sa
position.
Question 5. Pourquoi construit-on des drones à petites hélices alors qu’ils consomment
davantage ?
A. Parce que leur moindre inertie permet de modifier la poussée bien plus vite, donc
d’être agile.
B. Parce que leur rendement aérodynamique est supérieur à celui des hélices de
grand diamètre.
C. Parce qu’elles produisent une poussée plus élevée à régime de rotation et masse
comparables.
D. Parce que la réglementation limite le diamètre des hélices sur les appareils les
plus légers.

2.2.10. Auto-évaluation
Question 1. Pourquoi dit-on qu’un quadrirotor est sous-actionné ?
A. Parce que ses quatre moteurs sont sous-dimensionnés au regard de la masse
qu’ils doivent porter.
B. Parce qu’il dispose de quatre commandes pour six degrés de liberté, deux
translations restant indirectes.
C. Parce que sa poussée est insuffisante pour lui permettre de monter à la verticale
à pleine charge.
D. Parce que la perte d’un moteur le laisse avec trois commandes seulement,
insuffisantes pour voler.
Question 2. Comment un multirotor se déplace-t-il horizontalement ?
A. En inclinant sa poussée, la composante horizontale assurant le déplacement et la
verticale la portance.
B. En modulant une poussée latérale produite par des rotors spécifiquement
orientés vers les côtés.
C. En augmentant la poussée des moteurs situés du côté opposé à la direction visée
pour le déplacement.
D. En agissant sur le moment de lacet, qui oriente l’appareil puis le propulse dans la
direction du cap.
Question 3. Que traduit le fait que la matrice de mixage d’un quadrirotor soit carrée et
inversible ?
A. Qu’à chaque commande de force et de moments correspond exactement un jeu
de poussées à produire.
B. Que l’appareil peut continuer à voler après la perte de l’un quelconque de ses
quatre moteurs.
C. Que la poussée totale est toujours répartie également entre les quatre moteurs
de l’appareil.
D. Que les quatre moteurs doivent tourner exactement à la même vitesse en toutes
circonstances.
Question 4. Pourquoi un hexarotor peut-il survivre à la perte d’un moteur, contrairement à
un quadrirotor ?
A. Parce que ses moteurs sont individuellement plus puissants et compensent la
poussée manquante.
B. Parce que sa matrice de mixage est sous-déterminée et admet des solutions
même une poussée bloquée.
C. Parce que la réglementation impose une redondance à partir d’une certaine
masse au décollage.
D. Parce que ses rotors tournant plus lentement, la perte de l’un d’eux affecte moins
l’équilibre.
Question 5. Pourquoi la boucle de stabilisation d’attitude doit-elle agir à un rythme de
l’ordre de la milliseconde ?
A. Parce que les capteurs inertiels ne produisent des mesures exploitables qu’à cette
cadence élevée.
B. Parce que la liaison de commande impose ce rythme pour transmettre les ordres
du télépilote.
C. Parce que les moteurs ne peuvent modifier leur poussée qu’à des intervalles de
cet ordre de grandeur.
D. Parce que l’appareil, naturellement instable, dévie de plusieurs degrés en une
fraction de seconde.

2.3.12. Auto-évaluation
Question 1. Dans quel repère s’exprime naturellement la mesure d’un accéléromètre
embarqué ?
A. Dans le repère du monde, l’accéléromètre mesurant une accélération absolue par
rapport au sol.
B. Dans le repère de l’appareil, le capteur étant solidaire de la structure à laquelle il
est fixé.
C. Dans un repère intermédiaire aligné sur l’horizon, indépendant de l’inclinaison de
l’appareil.
D. Dans les deux repères simultanément, le capteur fournissant la mesure sous ses
deux formes.
Question 2. Que mesure un accéléromètre parfait sur un appareil parfaitement immobile et
horizontal ?
A. Une valeur nulle sur ses trois axes, l’appareil ne subissant aucune accélération de
mouvement.
B. La gravité répartie selon l’inclinaison, donc nulle sur l’axe vertical et non nulle sur
les autres.
C. La gravité entière sur son axe vertical, soit 9,81, et une valeur nulle sur les deux
axes horizontaux.
D. Une valeur dépendant du lacet de l’appareil, l’orientation en cap modifiant la
mesure obtenue.
Question 3. Pourquoi l’ordre d’application des trois angles d’attitude doit-il être fixé par
convention ?
A. Parce que les rotations dans l’espace ne commutent pas, un ordre différent
donnant une orientation différente.
B. Parce que certains ordres provoquent un blocage de cardan que d’autres évitent
complètement.
C. Parce que les capteurs imposent un ordre matériel qui doit être respecté par le
calcul.
D. Parce que la norme du quaternion résultant dépend de l’ordre dans lequel on
compose les angles.
Question 4. Qu’est-ce que le blocage de cardan ?
A. Une saturation des moteurs qui survient lorsque l’appareil demande une
inclinaison trop forte.
B. Un blocage mécanique de la nacelle stabilisée lorsqu’un de ses axes atteint sa
butée physique.
C. Une divergence de l’estimateur d’attitude provoquée par une accélération trop
brutale de l’appareil.
D. Une perte d’un degré de liberté de la description par angles d’Euler lorsque le
tangage atteint la verticale.
Question 5. Pourquoi les calculateurs de vol travaillent-ils en quaternions plutôt qu’en
angles d’Euler ?
A. Parce que les quaternions sont plus intuitifs et se visualisent plus facilement que
trois angles.
B. Parce que les quaternions consomment moins de calcul, un produit de
quaternions étant plus rapide.
C. Parce que les quaternions ne rencontrent jamais de singularité, contrairement
aux angles d’Euler.
D. Parce que les capteurs inertiels fournissent directement leur mesure sous forme
de quaternion.

2.4.12. Auto-évaluation
Question 1. La poussée d’une hélice s’écrit proportionnelle au carré du régime. Que
devient-elle si l’on double la vitesse de rotation ?
A. Elle double, la poussée étant directement proportionnelle à la vitesse de rotation
de l’hélice.
B. Elle reste inchangée, le coefficient de poussée compensant l’augmentation de la
vitesse de rotation.
C. Elle est multipliée par huit, la poussée suivant la même loi cubique que la
puissance consommée.
D. Elle est multipliée par quatre, la poussée variant comme le carré de la vitesse de
rotation.
Question 2. Comment compare-t-on objectivement l’efficacité de deux hélices de même
diamètre ?
A. Par leur poussée brute au même régime, la plus efficace produisant la plus grande
poussée.
B. Par leur figure de mérite, calculée à partir de leurs coefficients de poussée et de
puissance mesurés.
C. Par leur pas, une hélice à pas plus fort déplaçant davantage d’air et donc
consommant moins.
D. Par leur nombre de pales, une hélice tripale étant systématiquement plus efficace
qu’une bipale.
Question 3. Qu’ajoute la théorie de l’élément de pale à la théorie du disque sustentateur ?
A. Elle traite la pale localement, tranche par tranche, ce qui explique le vrillage et la
solidité.
B. Elle donne la puissance minimale absolue, que la théorie du disque ne permet pas
de calculer.
C. Elle supprime le besoin de mesures, en prédisant exactement la poussée de toute
hélice réelle.
D. Elle remplace les coefficients adimensionnels par des grandeurs directement
dimensionnelles.
Question 4. Pourquoi la figure de mérite d’une hélice de petit drone plafonne-t-elle vers
0,70 ?
A. Parce que les moteurs de petits drones ont un rendement qui limite la figure de
mérite atteignable.
B. Parce que la réglementation limite la vitesse de rotation, donc l’efficacité, des
hélices de drones.
C. Parce que le faible nombre de Reynolds dégrade les profils, indépendamment de
la fabrication.
D. Parce que les hélices de drones sont fabriquées en plastique, matériau moins
performant que le composite.
Question 5. Une fiche de mesure rapporte ses coefficients au diamètre réel de 14,6 pouces,
mais l’hélice est vendue comme une 15 pouces. Qu’implique cet écart ?
A. Rien, la différence de 0,4 pouce étant négligeable devant les incertitudes de toute
mesure.
B. Qu’employer le diamètre commercial fausse la poussée calculée, la relation
dépendant du diamètre à la puissance quatrième.
C. Que l’hélice est défectueuse, son diamètre réel devant correspondre exactement
à sa désignation commerciale.
D. Que la fiche de mesure est erronée, aucune hélice ne pouvant avoir un diamètre
inférieur à sa valeur annoncée.

2.5.12. Auto-évaluation
Question 1. Que caractérise la constante de vitesse d’un moteur sans balais ?
A. Le couple maximal qu’il peut fournir avant de saturer, exprimé par ampère de
courant absorbé.
B. Sa résistance interne, qui détermine directement les pertes par effet Joule à
courant donné.
C. Le rendement maximal qu’il atteint à son point de fonctionnement optimal,
exprimé en pourcentage.
D. Son régime à vide par volt appliqué, une constante élevée donnant un moteur
rapide et peu de couple.
Question 2. Pourquoi un moteur et une hélice se choisissent-ils ensemble et non
séparément ?
A. Parce que le fabricant vend toujours le moteur et l’hélice en ensemble apparié et
indissociable.
B. Parce que la réglementation impose de certifier le moteur et l’hélice comme un
ensemble unique.
C. Parce qu’une hélice ne peut être montée que sur un moteur du même fabricant,
pour des raisons mécaniques.
D. Parce que le régime réel résulte de leur rencontre, ce qui fixe le rendement et
l’échauffement.
Question 3. Le rendement d’un moteur sans balais en fonction du courant a quelle allure ?
A. Il croît continûment avec le courant, un courant plus élevé produisant toujours
plus de puissance utile.
B. Il décroît continûment avec le courant, les pertes par effet Joule augmentant sans
cesse avec celui-ci.
C. Il reste constant sur toute la plage d’emploi, le moteur étant conçu pour un
rendement uniforme.
D. Il passe par un maximum, faible à bas courant par les pertes fixes et à fort
courant par les pertes cuivre.
Question 4. À tension fixée, que se passe-t-il quand le régime d’un moteur augmente ?
A. La force électromotrice augmente, laissant moins de tension pour le courant,
donc moins de couple disponible.
B. Le couple disponible augmente, un régime plus élevé permettant de fournir
davantage de puissance mécanique.
C. Le courant à vide augmente proportionnellement, ce qui accroît les pertes
internes du moteur.
D. La résistance des bobinages diminue, le refroidissement s’améliorant avec la
vitesse de rotation.
Question 5. Pourquoi la limite de courant continu d’un moteur diminue-t-elle en air chaud
?
A. Parce que la résistance des bobinages diminue en air chaud, ce qui augmente
dangereusement le courant.
B. Parce que la limite est thermique, et qu’un air plus chaud évacue moins bien la
chaleur produite.
C. Parce que le contrôleur réduit volontairement le courant pour protéger le moteur
en air chaud.
D. Parce que l’air chaud étant moins dense, l’hélice appelle davantage de couple et
donc de courant.

2.6.11. Auto-évaluation
Question 1. Quelle est la différence entre stabilité statique et stabilité dynamique ?
A. La statique concerne les petits appareils, la dynamique les gros, la masse
changeant le comportement.
B. La statique juge la première réaction à une perturbation, la dynamique l’évolution
complète dans le temps.
C. La statique concerne le vol immobile, la dynamique le vol en déplacement, selon
la vitesse de l’appareil.
D. La statique se mesure au sol et la dynamique en vol, les deux décrivant les mêmes
phénomènes.
Question 2. Comment un multirotor se comporte-t-il en stabilité statique d’attitude, sans
commande ?
A. Il est statiquement stable, un moment de rappel le ramenant naturellement vers
l’horizontale.
B. Il est statiquement très instable, la moindre perturbation déclenchant un
basculement immédiat.
C. Il est statiquement neutre, ne subissant ni rappel ni éloignement lorsqu’on
l’écarte de l’horizontale.
D. Il est alternativement stable et instable selon l’axe considéré, le roulis différant du
tangage.
Question 3. Une réponse dynamique oscille à amplitude constante, sans croître ni
décroître. Comment la qualifier ?
A. Convergente, l’appareil finissant par se stabiliser après un régime transitoire
d’oscillations.
B. Divergente, toute oscillation persistante conduisant à terme à la perte de contrôle
de l’appareil.
C. Statiquement instable, l’oscillation étant le signe d’un défaut de rappel vers la
position d’équilibre.
D. Oscillante entretenue, à la frontière de la stabilité, signe d’un amortissement
quasi nul du système.
Question 4. Que vaut approximativement le dépassement d’un système du second ordre
pour un coefficient d’amortissement de 0,7 ?
A. Environ 5 %, ce qui fait de cette valeur un bon compromis entre rapidité et faible
dépassement.
B. Environ 37 %, valeur trop élevée qui traduit un amortissement insuffisant pour la
plupart des usages.
C. Environ 50 %, l’appareil dépassant de moitié sa cible avant de revenir vers sa
position d’équilibre.
D. Nul, un coefficient de 0,7 correspondant à un amortissement critique sans aucun
dépassement.
Question 5. Pourquoi dit-on que l’instabilité naturelle du multirotor est un atout ?
A. Parce qu’elle réduit la consommation, un appareil instable dépensant moins pour
tenir sa position.
B. Parce qu’elle supprime le besoin d’une commande, l’appareil trouvant seul son
équilibre en vol.
C. Parce qu’elle rend l’appareil agile, rien ne s’opposant au changement d’attitude
imposé par la commande.
D. Parce qu’elle simplifie la mécanique, un appareil instable comportant moins de
pièces mobiles.

2.7.11. Auto-évaluation
Question 1. Quel est le rôle de l’action proportionnelle dans un correcteur PID ?
A. Anticiper l’écart futur en mesurant sa vitesse de variation, ce qui amortit la
réponse du système.
B. Produire une commande proportionnelle à l’écart courant, ramenant l’appareil
vers sa consigne.
C. Accumuler l’écart au cours du temps pour effacer les erreurs persistantes de
position.
D. Limiter la commande maximale afin d’éviter la saturation des moteurs lors des
grandes manoeuvres.
Question 2. Pourquoi une action proportionnelle seule, si elle est forte, fait-elle osciller
l’appareil ?
A. Parce qu’elle réagit à l’écart présent sans anticiper, arrivant à la consigne avec de
la vitesse et dépassant.
B. Parce qu’elle accumule l’erreur au cours du temps, ce qui finit par produire une
commande excessive.
C. Parce qu’elle sature les moteurs, qui ne peuvent suivre une commande
proportionnelle trop élevée.
D. Parce qu’elle amplifie le bruit de mesure, dont les variations rapides déstabilisent
la commande.
Question 3. Quelle action apporte l’amortissement d’un correcteur PID, et à quelle
grandeur du chapitre 2.6 correspond-elle ?
A. L’action intégrale, qui correspond à la pulsation propre du système du second
ordre.
B. L’action proportionnelle, qui correspond au coefficient d’amortissement du
système.
C. L’action dérivée, qui correspond au coefficient d’amortissement du système du
second ordre.
D. L’action intégrale, qui correspond au coefficient d’amortissement du système du
second ordre.
Question 4. Un appareil se stabilise à 8 degrés au lieu des 10 demandés, sous l’effet d’une
charge décentrée. Quelle action corrige ce défaut ?
A. L’action dérivée, qui freine l’appareil et l’empêche de s’écarter de sa consigne sous
la charge.
B. L’action proportionnelle, qu’il suffit d’augmenter pour vaincre le moment de la
charge décentrée.
C. L’action intégrale, qui accumule l’écart résiduel jusqu’à produire le moment
compensant la charge.
D. Aucune action du PID, ce défaut relevant d’un rééquilibrage mécanique de la
charge sur l’appareil.
Question 5. Pourquoi règle-t-on un correcteur en simulation avant de le faire sur l’appareil
réel ?
A. Parce que la simulation calcule seule les gains optimaux, ce que l’appareil réel ne
permet pas de faire.
B. Parce que la réglementation impose une validation en simulation avant tout vol
d’un appareil neuf.
C. Parce que l’appareil réel ne mesure pas l’attitude avec assez de précision pour
régler les gains.
D. Parce qu’un mauvais gain sur l’appareil réel peut le déstabiliser et casser du
matériel, à la différence de la simulation.

2.8.11. Auto-évaluation
Question 1. Quelle est la source principale de vibration d’un multirotor, et à quelle
fréquence agit-elle ?
A. Le balourd des hélices, à la fréquence de rotation, et le passage des pales, à un
multiple de celle-ci.
B. Le frottement des roulements moteurs, à une fréquence très supérieure au
régime de rotation.
C. La flexion des bras, à la fréquence propre de la structure, indépendante du
régime des moteurs.
D. Le bruit électronique du contrôleur, à la fréquence de commutation, dans la
gamme des kilohertz.
Question 2. Par quel mécanisme les vibrations dégradent-elles le plus directement la
commande d’attitude ?
A. Elles échauffent les moteurs, dont le rendement chute et qui ne fournissent plus
la poussée demandée.
B. Elles desserrent progressivement les fixations, modifiant la géométrie et donc la
matrice de mixage.
C. Elles sont amplifiées par l’action dérivée du correcteur, qui transmet aux moteurs
un tremblement rapide.
D. Elles réduisent la portée de la liaison radio, en rayonnant un bruit
électromagnétique parasite.
Question 3. Pourquoi ne peut-on pas simplement abaisser fortement la fréquence de
coupure du filtre pour éliminer tout le bruit ?
A. Parce qu’une coupure trop basse consomme trop de puissance de calcul pour le
processeur de vol.
B. Parce qu’une coupure basse introduit un retard important qui déstabilise la
boucle de commande.
C. Parce que le filtre cesse de fonctionner en dessous d’une certaine fréquence de
coupure minimale.
D. Parce qu’une coupure basse amplifie au contraire les vibrations situées juste sous
cette fréquence.
Question 4. Quel est le premier geste pour diagnostiquer un appareil qui vibre ?
A. Augmenter le gain dérivé du correcteur jusqu’à ce que les vibrations soient
amorties par la commande.
B. Remplacer la centrale inertielle, principale suspecte d’un comportement
vibratoire anormal en vol.
C. Calculer le spectre du signal enregistré, dont les raies désignent les sources de
vibration.
D. Rigidifier immédiatement toute la structure, cause la plus fréquente des
vibrations d’un multirotor.
Question 5. Dans quel cas un filtre passe-bas est-il impuissant à retirer le bruit vibratoire ?
A. Lorsque le bruit est trop fort, aucun filtre ne pouvant atténuer une vibration de
grande amplitude.
B. Lorsque le régime des moteurs est trop élevé, portant les vibrations au-delà de la
coupure du filtre.
C. Lorsque la structure est trop rigide, ses fréquences propres échappant à l’action
du filtre.
D. Lorsque le bruit occupe la même bande de fréquences que le mouvement utile de
l’appareil.

2.9.11. Auto-évaluation
Question 1. Que représentent les termes hors diagonale du tenseur d’inertie ?
A. Les moments d’inertie autour de chacun des trois axes principaux de l’appareil
considéré.
B. Les couplages entre axes, une rotation autour d’un axe engendrant une tendance
à tourner autour d’un autre.
C. Les erreurs de mesure du tenseur, qui devraient être nulles sur un appareil
correctement calculé.
D. Les moments parasites créés par le décalage du centre de gravité par rapport au
centre géométrique.
Question 2. Un centre de gravité décalé de quatorze millimètres vers l’avant sur un appareil
de 3,4 kilogrammes. Qu’en conclure ?
A. Que le décalage est négligeable, quatorze millimètres étant très inférieurs aux
dimensions de l’appareil.
B. Que l’appareil ne pourra pas décoller, le moment parasite dépassant l’autorité de
commande disponible.
C. Qu’il crée un moment permanent consommant une part notable de l’autorité de
tangage, ici environ un sixième.
D. Que le centrage doit impérativement être corrigé, aucun décalage n’étant
acceptable en conception.
Question 3. Pourquoi faut-il revérifier le réglage du correcteur après avoir modifié la
répartition des masses ?
A. Parce que les capteurs se dérèglent lorsqu’on démonte l’appareil pour déplacer un
composant.
B. Parce que la masse totale change, ce qui modifie la poussée nécessaire au vol
stationnaire.
C. Parce que le centre de gravité se déplace, ce qui invalide la matrice de mixage de
l’appareil.
D. Parce que les gains sont proportionnels à l’inertie, qui dépend de la répartition
des masses.
Question 4. Comment mesure-t-on le moment d’inertie d’un appareil existant sans le
calculer ?
A. En pesant l’appareil sur trois balances placées sous chacun de ses points d’appui
au sol.
B. En le suspendant à un fil et en mesurant la période de ses oscillations en rotation.
C. En mesurant l’accélération angulaire produite par une commande de moment
connue en vol.
D. En additionnant les inerties individuelles des composants données par leurs
fabricants.
Question 5. Sur un multirotor plat, quel moment d’inertie est le plus grand, et pourquoi ?
A. Celui de roulis, l’appareil étant plus étroit dans cette direction que dans les
autres.
B. Celui de tangage, la charge utile étant généralement placée en avant du centre de
l’appareil.
C. Les trois sont égaux, la symétrie du multirotor imposant une inertie identique sur
chaque axe.
D. Celui de lacet, toutes les masses étant éloignées de l’axe vertical alors qu’elles
sont proches du plan.

2.10.12. Auto-évaluation
Question 1. Quelle différence fondamentale sépare une aile d’un rotor du point de vue de la
production de portance ?
A. L’aile produit une portance proportionnelle à la vitesse, le rotor une portance
proportionnelle à son régime.
B. L’aile dépend du mouvement de l’appareil pour créer son écoulement, le rotor
crée lui-même le sien.
C. L’aile emploie un profil aérodynamique, alors que le rotor produit sa portance par
simple déviation d’air.
D. L’aile produit une portance constante, alors que celle du rotor varie avec l’altitude
de l’appareil.
Question 2. Que fixe la vitesse de décrochage d’un appareil à voilure fixe ?
A. La vitesse maximale au-delà de laquelle la structure de l’aile risque de se rompre
en vol.
B. La vitesse de croisière la plus économique, à laquelle la finesse de l’appareil est
maximale.
C. La vitesse minimale en dessous de laquelle l’aile ne peut plus porter le poids de
l’appareil.
D. La vitesse à laquelle la traînée induite devient égale à la traînée parasite de
l’appareil.
Question 3. Pourquoi un planeur a-t-il une très grande envergure ?
A. Pour augmenter la surface alaire, ce qui réduit la charge alaire et donc la vitesse
de décrochage.
B. Pour abaisser le centre de gravité, ce qui améliore la stabilité en roulis lors des
virages lents.
C. Pour augmenter la résistance structurale de l’aile, qui subit de fortes contraintes
en vol de pente.
D. Pour augmenter l’allongement, ce qui réduit la traînée induite et améliore donc la
finesse.
Question 4. À masse égale, quel rapport sépare la consommation d’un multirotor en vol
stationnaire de celle d’une voilure fixe en croisière ?
A. Un rapport voisin de quatre, tenant au principe même de sustentation et non à la
qualité de conception.
B. Un rapport voisin de un, les deux architectures consommant à peu près autant
pour porter la même masse.
C. Un rapport voisin de quinze, correspondant à la finesse aérodynamique typique
d’une aile de drone.
D. Un rapport variable et imprévisible, dépendant entièrement de la qualité de
conception de chaque appareil.
Question 5. Pourquoi un appareil convertible n’est-il pas simplement la somme des
avantages des deux architectures ?
A. Parce que ses lois de commande sont trop complexes pour être mises en oeuvre
sur un calculateur embarqué.
B. Parce que la réglementation interdit les architectures mixtes en dehors des
opérations certifiées.
C. Parce qu’il transporte en permanence la masse et la traînée de l’architecture qu’il
n’emploie pas alors.
D. Parce que ses rotors de sustentation ne peuvent pas produire assez de poussée
pour un décollage vertical.

2.11.11. Auto-évaluation
Question 1. De combien le calcul naïf de l’autonomie, énergie divisée par puissance,
surestime-t-il la durée réelle ?
A. De quelques pour cent seulement, les batteries modernes délivrant presque toute
leur énergie nominale.
B. De vingt à trente pour cent, en raison de la profondeur de décharge utile et du
rendement de décharge.
C. De plus de la moitié, la majeure partie de l’énergie nominale n’étant jamais
accessible en pratique.
D. Il ne la surestime pas, cette division donnant précisément l’autonomie que
l’appareil réalisera en vol.
Question 2. Pourquoi ne descend-on pas en dessous d’environ vingt pour cent de charge
restante ?
A. Parce que le calculateur de vol s’éteint automatiquement en dessous de ce seuil
de charge.
B. Parce que la réglementation impose cette réserve minimale pour toute opération
de drone.
C. Parce que la batterie ne peut physiquement plus délivrer de courant en dessous
de ce niveau.
D. Parce que la décharge profonde abrège fortement la durée de vie et expose à une
chute de tension.
Question 3. Que se passe-t-il lorsqu’on ajoute des packs de batterie identiques à un
multirotor ?
A. L’autonomie croît proportionnellement, chaque pack ajoutant la même durée que
le précédent.
B. L’autonomie décroît immédiatement, la masse ajoutée dépassant toujours
l’énergie qu’elle apporte.
C. L’autonomie croît avec un rendement décroissant, chaque pack rapportant moins
que le précédent.
D. L’autonomie reste constante, l’énergie supplémentaire servant exactement à
porter la masse ajoutée.
Question 4. Qu’est-ce qu’une équation implicite dans un contexte de dimensionnement ?
A. Une équation dont les coefficients ne sont pas connus avec précision et doivent
être estimés.
B. Une équation où l’inconnue apparaît des deux côtés, ce qui empêche de l’isoler
algébriquement.
C. Une équation qui ne peut être résolue qu’avec des outils de calcul formel
spécialisés.
D. Une équation dont la solution n’a pas de sens physique et doit donc être écartée
du calcul.
Question 5. À quelle vitesse un multirotor consomme-t-il le moins ?
A. À vitesse nulle, en vol stationnaire, tout déplacement demandant une puissance
supplémentaire.
B. À sa vitesse maximale, où le rendement de l’ensemble de la chaîne propulsive est
le plus élevé.
C. À la vitesse qui minimise l’énergie par kilomètre, laquelle donne aussi l’endurance
maximale.
D. À une vitesse d’avancement modérée, la puissance induite diminuant lorsque
l’appareil translate.

2.12.12. Auto-évaluation
Question 1. Qu’est-ce qui distingue une simulation logicielle en boucle du simulateur écrit
au chapitre 2.7 ?
A. Elle exécute le firmware réel, avec ses modes de vol et ses comportements de
repli, et non un correcteur écrit par l’étudiant.
B. Elle emploie un modèle physique plus exact, prenant en compte les vibrations et
le bruit réel des capteurs de l’appareil.
C. Elle fonctionne en temps réel, alors que le simulateur du chapitre 2.7 calcule plus
vite ou plus lentement que le temps réel.
D. Elle nécessite un calculateur de vol matériel connecté à l’ordinateur pour
exécuter le code de l’autopilote.
Question 2. Pourquoi fige-t-on une version précise du firmware pour toute la formation ?
A. Parce que les versions antérieures cessent d’être téléchargeables une fois qu’une
nouvelle version stable paraît.
B. Parce que la reproductibilité exige que tous obtiennent le même résultat, et parce
qu’une version répandue est mieux documentée.
C. Parce que les paramètres changent de nom à chaque version, ce qui rendrait les
chapitres entièrement caducs.
D. Parce que la réglementation impose de déclarer la version employée pour toute
opération de drone.
Question 3. Que gouverne le paramètre INS_GYRO_FILTER d’ArduPilot ?
A. La fréquence d’échantillonnage du gyroscope, c’est-à-dire le nombre de mesures
qu’il produit par seconde.
B. La fréquence de rotation des moteurs à laquelle le filtre coupe-bande dynamique
se cale automatiquement.
C. La fréquence de coupure du filtre passe-bas appliqué au gyroscope, celui-là
même du chapitre 2.8
D. La fréquence de la boucle de stabilisation d’attitude, qui détermine la rapidité de
correction de l’appareil.
Question 4. En quoi la structure en cascade d’ArduPilot est-elle préférable au correcteur
unique du chapitre 2.7 ?
A. Elle consomme moins de calcul, deux boucles simples étant plus économiques
qu’un correcteur unique complet.
B. Elle supprime le besoin d’action dérivée, la boucle extérieure assurant à elle seule
l’amortissement du système.
C. Elle permet d’atteindre des pulsations propres inaccessibles à un correcteur
unique, quelle que soit l’inertie.
D. Elle sépare le réglage de l’amortissement, contraint par le bruit, de celui de la
vivacité, qui est un choix.
Question 5. Qu’est-ce qu’une simulation logicielle en boucle ne reproduit pas ?
A. Les vibrations réelles, le bruit des capteurs, les défauts de fabrication et les
caractéristiques du vent réel.
B. L’enchaînement des modes de vol et le déclenchement des comportements de
repli en cas de panne.
C. Le comportement de l’appareil lors de la perte d’un moteur, qui ne peut
s’observer qu’en vol réel.
D. Les lois de la mécanique du vol, qu’elle remplace par un modèle simplifié sans
valeur prédictive.
`;

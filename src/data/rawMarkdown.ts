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

/**
 * Source de vérité du contenu pédagogique - Module 1 Formation Drone.
 * Chapitres 1.1 à 1.6 (30 questions au total).
 */
export const MODULE_1_MARKDOWN_SOURCE = `1.1. Auto-évaluation — Avertissement pédagogique
Question 1. Un chapitre porte la mention « régime de conception » dans son en-tête. Qu'est-ce que cela vous indique ?
A. Que son contenu gouverne un dimensionnement, et qu'il sera traité jusqu'à l'équation et la source.
B. Qu'il concerne le Module 5, seul module du programme consacré à la conception d'un appareil.
C. Qu'il est réservé aux étudiants avancés et peut être sauté lors d'une première lecture du cours.
D. Qu'il présente un projet à réaliser, dont le résultat sera évalué lors de la soutenance finale.
Question 2. Vous exécutez un script qui affiche None au lieu du nombre attendu. Quelle est la cause la plus probable ?
A. La version de Python installée est trop ancienne pour exécuter la fonction que vous avez écrite.
B. Une virgule décimale à la française a été employée à la place du point dans une des valeurs.
C. La fonction calcule le résultat mais ne le renvoie pas, le mot-clé return ayant été omis.
D. Le fichier a été enregistré sous un nom qui entre en conflit avec un module de la bibliothèque.
Question 3. Pourquoi le programme conserve-t-il les termes techniques en anglais plutôt que de les traduire ?
A. Parce que la traduction française de ces termes n'existe pas et resterait donc incompréhensible.
B. Parce que la documentation professionnelle est en anglais, et qu'un vocabulaire francisé serait à désapprendre.
C. Parce que la réglementation internationale impose l'anglais dans toute documentation aéronautique.
D. Parce que les termes anglais sont plus courts et allègent la lecture des chapitres les plus denses.
Question 4. Vous devez calculer la surface balayée par une hélice de 15 pouces. Dans quel ordre effectuer les opérations?
A. Élever au carré, puis convertir en mètres, puis diviser par deux, puis multiplier par pi.
B. Convertir en mètres, puis élever au carré, puis multiplier par pi, puis diviser par deux.
C. Diviser par deux, puis élever au carré, puis convertir en mètres, puis multiplier par pi.
D. Convertir en mètres, puis diviser par deux, puis élever au carré, puis multiplier par pi.
Question 5. Votre script s'exécute sans aucun message d'erreur. Que pouvez-vous en conclure ?
A. Que le calcul est correct, l'absence d'erreur signalant que Python a validé les opérations.
B. Que les unités employées sont cohérentes, Python vérifiant l'homogénéité des grandeurs.
C. Que la syntaxe est correcte, sans aucune information sur l'exactitude du résultat obtenu.
D. Que les fonctions renvoient bien une valeur, faute de quoi l'exécution se serait interrompue.

1.2. Auto-évaluation — Définitions et vocabulaire
Question 1. Un appareil exécute seul un plan de vol enregistré, et le télépilote peut interrompre la mission à tout instant depuis sa station. Comment se qualifie-t-il?
A. En aéronef autonome, puisqu'il conduit son vol sans intervention humaine pendant la mission.
B. En aéronef modèle, puisque la mission est enregistrée à l'avance et non commandée en direct.
C. En UAS mais pas en RPAS, la notion de RPAS supposant un pilotage manuel continu de l'appareil.
D. En RPA au sein d'un RPAS, la possibilité d'intervention du pilote étant le critère déterminant.
Question 2. Un pilote vole en immersion et voit l'appareil uniquement par la caméra embarquée. Aucun observateur n'est présent. Quel est le mode d'opération?
A. BVLOS, le contact visuel s'entendant sur l'aéronef lui-même et à l'oeil nu, sans aide.
B. VLOS, puisque le pilote dispose à tout instant d'une vue directe et continue de la scène.
C. EVLOS, le retour vidéo jouant le rôle d'extension du contact visuel du télépilote.
D. Indéterminé, la qualification dépendant de la distance à laquelle se trouve l'appareil.
Question 3. Quel rapport d'inclusion lie correctement les termes?
A. UAS et RPAS désignent le même ensemble, le second étant simplement le terme européen.
B. Le RPAS inclut l'UAS, qui inclut le RPA, lui-même sous-ensemble de l'aéronef sans équipage.
C. L'UAS inclut les RPAS, les aéronefs autonomes et les aéronefs modèles, le RPA étant l'aéronef.
D. L'UA inclut l'UAS, la partie volante contenant par définition les éléments qui lui sont associés.
Question 4. Vous rédigez un dossier destiné à l'autorité de l'aviation civile. Comment désignez-vous le boîtier depuis lequel le télépilote conduit le vol?
A. Station sol, terme employé par tous les fabricants et compris sans ambiguïté par les autorités.
B. Station de pilotage à distance, terme normalisé, la station n'étant d'ailleurs pas toujours au sol.
C. Ground control station, l'anglais étant la langue de référence de la documentation aéronautique.
D. Radiocommande, terme qui décrit le plus fidèlement la fonction assurée par cet équipement.
Question 5. Une page web attribue au mot drone une origine sous forme d'acronyme technique. Quelle démarche adopter?
A. La retenir, plusieurs pages concordantes constituant une convergence de sources suffisante.
B. La rejeter d'emblée, toute information trouvée en ligne étant par principe non recevable.
C. La rejeter faute d'attestation ancienne, la plus vieille trace connue étant un nom de code.
D. La retenir sous réserve, en la citant comme hypothèse tant qu'aucun document ne l'infirme.

1.3. Auto-évaluation — Familles de drones et classifications
Question 1. À encombrement et à masse identiques, comment se comparent un quadrirotor et un hexarotor en vol stationnaire?
A. L'hexarotor consomme moins, la charge par rotor étant répartie sur six moteurs au lieu de quatre.
B. L'hexarotor consomme environ 16% de plus, sa surface totale de disque étant plus faible de 25%.
C. Les deux consomment autant, la surface totale de disque ne dépendant que de l'encombrement.
D. L'hexarotor consomme environ 25% de plus, dans la proportion exacte de la surface perdue.
Question 2. Une mission impose d'inspecter un pylône en restant immobile à 30 m du sol pendant vingt minutes. Quelle architecture est écartée en premier, et pourquoi ?
A. Le VTOL, car sa transition entre régimes ne peut pas s'effectuer à proximité immédiate d'un obstacle.
B. L'hexarotor, car sa consommation supérieure interdit une station prolongée de cette durée.
C. Le quadrirotor, car l'absence de redondance est inacceptable lors d'un survol d'infrastructure.
D. La voilure fixe, car elle ne peut pas maintenir une position fixe, sa portance exigeant l'avancement.
Question 3. Que traduit exactement le facteur géométrique employé dans ce chapitre ?
A. La surface de disque disponible pour un nombre de rotors donné, à encombrement imposé.
B. Le rendement aérodynamique des hélices, qui se dégrade lorsque leur diamètre diminue.
C. La marge de poussée résiduelle après la perte d'un moteur sur une architecture donnée.
D. La masse de structure nécessaire pour porter un nombre croissant de bras et de moteurs.
Question 4. Un appareil de 3 kg est un multirotor. Que pouvez-vous en déduire quant à la catégorie d'opération applicable?
A. Qu'il relève de la catégorie ouverte, sa masse étant très inférieure au seuil réglementaire usuel.
B. Qu'il relève de la catégorie spécifique, tout multirotor professionnel y étant systématiquement soumis.
C. Rien, la catégorie dépendant du risque de l'opération et non de l'architecture ni de la seule masse.
D. Qu'il dépend du seuil de 25 kg, lequel détermine à lui seul le régime applicable à l'appareil.
Question 5. Pourquoi construit-on des octorotors alors qu'ils consomment davantage?
A. Parce que la multiplication des rotors améliore la stabilité en rafale et la précision de position.
B. Parce qu'ils tolèrent la perte d'un moteur, ce qui protège une charge utile ou un survol sensible.
C. Parce qu'ils permettent d'emporter des hélices plus grandes et donc de gagner en autonomie.
D. Parce que la réglementation impose la redondance au-delà d'un certain seuil de masse au décollage.

1.4. Auto-évaluation — Usages et écosystème industriel
Question 1. Une mission de cartographie exige un recouvrement latéral de 60% entre bandes voisines. Quel effet cela a-t-il sur la couverture ?
A. Aucun sur la couverture, le recouvrement ne concernant que la qualité du modèle reconstruit.
B. Il réduit la couverture de 60%, chaque bande étant survolée deux fois au lieu d'une seule.
C. Il ramène la largeur utile à 40% de la largeur de bande, réduisant d'autant la couverture.
D. Il augmente la durée de vol de 60%, sans modifier la surface finalement couverte au sol.
Question 2. Quelle est la contrainte dominante d'une mission d'épandage agricole ?
A. La précision de navigation, la trajectoire devant être régulière et l'altitude parfaitement constante.
B. La variation de masse et de centrage en cours de vol, la charge utile se vidant pendant la mission.
C. L'endurance, l'appareil devant rester en vol plusieurs heures pour couvrir une surface utile.
D. La liaison à longue distance, l'appareil s'éloignant fortement de son point de mise en œuvre.
Question 3. Pourquoi dit-on que la valeur d'une mission réside dans la donnée et non dans le vol?
A. Parce que le vol est devenu banal et que sa réalisation n'a plus aucune difficulté technique.
B. Parce que la réglementation interdit de facturer le survol et impose de facturer le produit livré.
C. Parce que le coût du vol est négligeable devant celui du traitement des images enregistrées.
D. Parce que le client achète une carte ou un diagnostic, l'appareil n'étant qu'un porteur de capteur.
Question 4. Un projet doit être réparable localement, avec des pièces disponibles sur place. Quel modèle de l'écosystème privilégier, et à quel prix ?
A. Le modèle ouvert, au prix d'un travail d'intégration et de mise au point qui incombe à l'équipe.
B. Le modèle intégré, au prix d'une prise en main plus longue mais d'une fiabilité nettement accrue.
C. Le modèle intégré, au prix d'un coût initial élevé compensé par la simplicité de la maintenance.
D. Le modèle ouvert, au prix d'une fiabilité moindre imposée par des composants non qualifiés.
Question 5. Un appareil dimensionné au niveau de la mer est exploité à 1300 m d'altitude par temps chaud. À quoi faut-il s'attendre ?
A. À une autonomie inchangée, la masse volumique n'intervenant que dans la vitesse de croisière.
B. À un déficit de performance, la masse volumique réduite diminuant la poussée disponible.
C. À un gain de performance, l'air moins dense opposant une traînée plus faible à l'appareil.
D. À un comportement identique, les contrôleurs compensant automatiquement l'effet d'altitude.

1.5. Auto-évaluation — Anatomie et architecture UAS
Question 1. Que recouvre exactement le segment liaison d'un système d'aéronef sans équipage?
A. La liaison de commande, seul chemin de données dont dépend directement la sécurité du vol.
B. L'ensemble des antennes embarquées, la partie au sol relevant du segment sol du système.
C. Les trois chemins de données, commande et contrôle, télémétrie et charge utile, avec leurs antennes.
D. La liaison vidéo, qui constitue le flux dominant en débit et donc l'essentiel du besoin en liaison.
Question 2. Pourquoi ne place-t-on pas un calculateur compagnon puissant dans la boucle de stabilisation d'attitude?
A. Parce que sa durée de traitement n'est pas garantie, alors que cette boucle a des échéances strictes.
B. Parce que sa consommation électrique dépasse ce que la carte de distribution peut lui fournir.
C. Parce qu'il ne dispose pas des liaisons matérielles nécessaires pour commander directement les ESC.
D. Parce que sa fréquence de calcul est trop faible pour suivre le rythme des ordres du télépilote.
Question 3. Un appareil dérive lentement en position par vent nul. Quel raisonnement adopter ?
A. Remplacer le récepteur satellite, seul élément responsable de la connaissance de la position.
B. Augmenter le gain du régulateur de position, la dérive traduisant une correction insuffisante.
C. Alourdir l'appareil pour accroître son inertie et réduire sa sensibilité aux perturbations.
D. Examiner la fonction de connaissance de l'état, que plusieurs causes distinctes peuvent dégrader.
Question 4. Un budget de masse montre une structure représentant 40% de la masse au décollage. Qu'en conclure?
A. Que l'appareil est particulièrement robuste, ce qui constitue un avantage pour un usage exigeant.
B. Que cette masse est indisponible pour la charge utile et l'énergie, et qu'il faut en chercher la raison.
C. Que le budget comporte une erreur, aucune structure ne pouvant atteindre une telle proportion.
D. Que l'appareil est correctement dimensionné, la structure devant primer sur les autres postes.
Question 5. Pourquoi décrire un appareil par fonctions plutôt que par composants?
A. Parce que les composants sont trop nombreux pour être énumérés dans un document de conception.
B. Parce que la réglementation impose une description fonctionnelle dans les dossiers d'autorisation.
C. Parce que les fonctions sont plus faciles à expliquer à un client qui ne connaît pas la technique.
D. Parce que les fonctions restent stables quand les composants changent, et guidant le diagnostic.

1.6. Auto-évaluation — Cadre réglementaire
Question 1. Quelle est la portée d'un document produit par l'Organisation de l'aviation civile internationale?
A. Il s'adresse aux États, qui s'engagent à le transposer, et n'oblige pas directement l'exploitant.
B. Il s'applique directement à tout exploitant, dans tous les États signataires de la convention.
C. Il n'a qu'une valeur indicative et aucun État n'est tenu d'en reprendre les prescriptions.
D. Il s'applique aux vols internationaux uniquement, le vol national relevant du seul droit local.
Question 2. Un appareil de 900 g doit survoler un rassemblement de personnes. Que peut-on en dire ?
A. Qu'il relève du régime le plus léger, sa masse étant très en deçà de tous les seuils usuels.
B. Que la réglementation ne s'applique pas, les appareils sous un kilogramme en étant dispensés.
C. Que la masse ne suffit pas à conclure, le survol de personnes relevant d'un régime exigeant.
D. Que le survol est interdit sans exception, aucun aéronef sans équipage ne pouvant y procéder.
Question 3. Qu'est-ce qui distingue une réglementation fondée sur le risque d'une réglementation fondée sur l'objet ?
A. La première s'applique aux professionnels, la seconde aux usages de loisir et d'aéromodélisme.
B. La première considère les conditions de l'opération, la seconde les caractéristiques de l'appareil.
C. La première emploie des seuils de masse, la seconde des seuils de hauteur et de distance.
D. La première relève de l'Organisation internationale, la seconde des autorités nationales.
Question 4. Pourquoi la réglementation doit-elle être prise en compte dès le début de la conception?
A. Parce que le dossier d'autorisation demande plusieurs mois et doit être déposé très en amont.
B. Parce qu'elle interdit certaines architectures, dont le choix doit être arrêté dès le départ.
C. Parce que l'autorité doit valider le cahier des charges avant tout commencement des travaux.
D. Parce qu'elle produit des exigences techniques qui pèsent, occupent de la place et consomment.
Question 5. Un vol hors vue directe est envisagé sur 40 km. Quelle exigence en découle directement pour l'aéronef?
A. Un comportement défini et éprouvé en cas de perte de la liaison de commande et de contrôle.
B. Une motorisation redondante, obligatoire au-delà d'une certaine distance de mise en œuvre.
C. Une masse maximale au décollage inférieure au seuil réglementaire de l'État de l'opération.
D. Un pilotage entièrement manuel, l'automatisme étant proscrit hors de la vue du télépilote.
`;

/**
 * Source de vérité du contenu pédagogique - Module 6 : Programmation et Autonomie logicielle.
 */
export const MODULE_6_MARKDOWN_SOURCE = `6.1. Auto-évaluation
Question 1. Dans quelle famille d'outils se range MAVProxy, station qui reçoit la liaison de l'appareil et peut la réémettre vers un script et vers une interface graphique ?
A. Un configurateur de firmware, qui règle les gains PID d'un appareil de course.
B. Un outil de conception, qui dessine la mécanique et l'électronique de l'appareil.
C. Une station de contrôle au sol, qui supervise et distribue le flux de l'appareil.
D. Un outil de diagnostic électronique, qui mesure la continuité et repère les interférences.
Bonne réponse : C
Explication : MAVProxy est une station de contrôle au sol (GCS) en ligne de commande. Sa fonctionnalité clé est le multiplexage client-serveur MAVLink : elle reçoit le flux série/radio et le redistribue vers plusieurs consommateurs (comme Mission Planner et un script Python).

Question 2. Un concepteur veut exécuter un script Python qui commande un appareil simulé, tout en surveillant sa télémétrie dans une interface graphique. Quelle chaîne d'outils répond à ce besoin ?
A. SITL pour simuler, MAVProxy pour multiplexer le flux, et une station sol graphique en parallèle du script.
B. Un configurateur Betaflight pour simuler, relié directement à un tableur de supervision.
C. Une station sol graphique seule, qui écrit et exécute elle-même le script d'autonomie.
D. Le protocole MAVLink employé comme langage de programmation du comportement autonome.
Bonne réponse : A
Explication : La chaîne d'outils standard réunit le simulateur firmware (SITL), le multiplexeur (MAVProxy) qui distribue les paquets UDP, la GCS graphique (Mission Planner/QGC) pour la vue opérateur, et le script Python d'autonomie.

Question 3. Sur une liaison à 57 600 bauds chargée à 27% par un jeu de supervision, on double la cadence de tous les flux. Que peut-on dire sans nouveau calcul détaillé ?
A. La charge reste à 27%, car elle ne dépend que du nombre de messages, pas de leur cadence.
B. La charge passe à environ 54%, car le débit est proportionnel à la cadence des flux.
C. La charge passe à 100%, car doubler la cadence sature toujours la liaison.
D. La charge diminue, car des messages plus fréquents sont mieux compressés.
Bonne réponse : B
Explication : Le débit D est linéairement proportionnel à la cadence f_i selon la formule D = 10 * sum(f_i * (p_i + 12)). Si toutes les cadences f_i doublent, le débit total et la charge doublent (27% * 2 = 54%).

Question 4. Pour enregistrer les accélérations à 50 Hz afin d'analyser une vibration, faut-il privilégier le journal de télémétrie ou le journal embarqué DataFlash, et pourquoi ?
A. Le journal de télémétrie, car il est reçu au sol et donc plus facile à consulter en direct.
B. Le journal embarqué, car il est écrit sur la carte de l'autopilote sans passer par la radio, qui saturerait.
C. Indifféremment, car les deux journaux enregistrent exactement les mêmes données aux mêmes cadences.
D. Le journal de télémétrie, car le journal embarqué ne peut pas enregistrer les données d'accélération.
Bonne réponse : B
Explication : Une émission d'IMU/accélération à 50 Hz sur la liaison radio (limitée par le débit utile d'environ 28 800 bit/s) sature la bande passante. Le journal embarqué DataFlash écrit directement sur la carte SD/mémoire flash du contrôleur à haute fréquence sans contrainte radio.

Question 5. Pourquoi le débit réellement utile d'une radio SiK à 57 600 bauds est-il plus faible que cette valeur ?
A. Parce que la radio impose un chiffrement qui divise le débit par un facteur fixe de dix.
B. Parce que le débit série annoncé est toujours une valeur fausse sans rapport avec le réel.
C. Parce que la liaison 8N1 transmet 10 bits par octet, ce qui n'est pas compté dans le débit.
D. Parce que la liaison est half-duplex et porte un surdébit de protocole, qui réduisent le débit utile.
Bonne réponse : D
Explication : La radio SiK fonctionne en alternat (half-duplex) et ajoute son propre surdébit de trame radio (correction d'erreur, entêtes radio), ce qui divise par deux environ le débit réellement utile (soit ~28 800 bit/s).

6.2. Auto-évaluation
Question 1. Pourquoi la boucle de stabilisation d'attitude n'est-elle pas écrite en Python sur le calculateur compagnon ?
A. Parce que sa latence, variable et de quelques dizaines de millisecondes, est trop lente pour la stabilisation.
B. Parce que Python ne sait pas lire les capteurs d'attitude de l'appareil en vol.
C. Parce que le calculateur compagnon n'a pas accès aux moteurs, contrairement au flight controller.
D. Parce que la réglementation interdit de programmer la stabilisation dans un langage interprété.
Bonne réponse : A
Explication : La stabilisation d'attitude exige une boucle temps réel déterministe à plusieurs centaines de hertz (ex: 400 Hz sur le microcontrôleur). La latence d'un script Python sous Linux (non temps réel) oscille de 10 à 50 ms, ce qui provoquerait l'instabilité et le crash de l'aéronef.

Question 2. Un script pymavlink envoie une commande d'armement juste après avoir ouvert la connexion, sans autre étape, et rien ne se passe. Quelle est la cause la plus probable ?
A. La commande d'armement doit toujours être précédée d'un décollage, envoyé en premier.
B. Le mode GUIDED n'accepte jamais de commande d'armement venant d'un script externe.
C. Le script n'a pas attendu le heartbeat, donc la cible de la commande n'est pas connue.
D. La bibliothèque pymavlink ne permet pas d'armer, seule DroneKit en est capable.
Bonne réponse : C
Explication : wait_heartbeat() permet à pymavlink de découvrir le target_system et le target_component de l'autopilote. Sans cette attente, le script envoie le message vers un ID système inconnu/nul (0), et l'autopilote l'ignore.

Question 3. Pour un projet d'autonomie destiné à durer et à être maintenu, faut-il bâtir sur pymavlink ou sur DroneKit, et pourquoi ?
A. Sur DroneKit, car sa concision réduit le nombre de lignes et donc le nombre de bogues.
B. Indifféremment, car les deux bibliothèques sont maintenues au même rythme.
C. Sur DroneKit, car il est le seul optimisé pour PX4 comme pour ArduPilot.
D. Sur pymavlink, car il est activement maintenu et donne accès à tout le protocole.
Bonne réponse : D
Explication : DroneKit est un projet abandonné (non maintenu depuis plusieurs années et non optimisé pour PX4). pymavlink est la bibliothèque officielle maintenue par le projet ArduPilot, offrant un accès complet à chaque message MAVLink.

Question 4. Pour un ordre de déplacement de 50 m, faut-il une conversion géodésique complète ou l'approximation équirectangulaire suffit-elle ?
A. Une géodésique complète, car l'approximation plate se trompe de plusieurs mètres dès 50 m.
B. L'approximation suffit, car son erreur y est millimétrique, loin sous l'erreur du GPS.
C. Une géodésique complète, car l'approximation ne vaut qu'exactement à l'équateur.
D. L'approximation suffit, car aucune méthode n'est plus précise que le GPS de toute façon.
Bonne réponse : B
Explication : L'erreur de l'approximation plate (équirectangulaire) à 50 m est de l'ordre du millimètre, ce qui est totalement négligeable par rapport à la précision d'un GPS civil standard (1 à 2,5 mètres).

Question 5. Dans quel ordre un script fait-il décoller un multirotor, et pourquoi attendre entre le décollage et l'action suivante ?
A. Armer, décoller, puis passer en GUIDED, l'ordre du mode important peu au décollage.
B. Décoller, puis armer, l'armement confirmant le décollage déjà lancé par le script.
C. Passer en GUIDED, armer, décoller, puis attendre l'altitude avant l'action suivante.
D. Passer en GUIDED, décoller, puis armer, l'armement n'étant utile qu'en vol stabilisé.
Bonne réponse : C
Explication : L'ordre logique et sécurisé est : 1. Activer le mode GUIDED, 2. Armer les moteurs, 3. Envoyer la commande de décollage (MAV_CMD_NAV_TAKEOFF), 4. Attendre dans une boucle que l'altitude relative atteigne la valeur cible (~95%) avant d'envoyer l'ordre suivant.

6.3. Auto-évaluation
Question 1. Quel est l'apport principal de MAVSDK par rapport à pymavlink pour un projet maintenu ?
A. Il donne accès à chaque champ de chaque message brut, ce que pymavlink masque.
B. Il offre des actions prêtes à l'emploi et reste activement maintenu, au prix du détail.
C. Il remplace le protocole MAVLink par un protocole propriétaire plus rapide.
D. Il s'exécute sur le flight controller, alors que pymavlink reste au sol.
Bonne réponse : B
Explication : MAVSDK offre une API moderne de haut niveau (C++/Python asynchrone) avec des fonctions claires (arm(), takeoff(), land()) sous la gouvernance de la Dronecode Foundation, remplaçant avantageusement DroneKit.

Question 2. Dans le modèle de ROS 2, comment un nœud de caméra transmet-il ses images à un détecteur qui les analyse ?
A. Par un service, en envoyant une requête au détecteur et en attendant sa réponse.
B. En publiant les images sur un topic auquel le détecteur s'abonne, sans les connaître l'un l'autre.
C. En écrivant les images dans un fichier que le détecteur relit à intervalle régulier.
D. En appelant directement une fonction du détecteur à l'intérieur du même programme.
Bonne réponse : B
Explication : ROS 2 s'appuie sur le modèle Publication/Abonnement anonyme via des topics. Le nœud caméra produit le flux vidéo sur un topic, et le détecteur s'y abonne sans couplage direct entre les deux programmes.

Question 3. Un nœud ROS 2 correctement écrit ne reçoit aucun topic /ap/ de l'autopilote ArduPilot. Quelle vérification faire en premier ?
A. Vérifier que le paramètre DDS_ENABLE vaut 1 sur l'autopilote.
B. Réécrire le nœud, car ArduPilot ne publie jamais de topics ROS 2.
C. Remplacer ROS 2 par MAVROS, seul capable de parler à ArduPilot.
D. Augmenter la profondeur de file du nœud pour recevoir les messages.
Bonne réponse : A
Explication : L'intégration DDS native d'ArduPilot (AP_DDS) est désactivée par défaut (DDS_ENABLE = 0). Aucun topic ROS 2 ne circule tant que ce paramètre n'est pas passé à 1 sur l'autopilote.

Question 4. Une chaîne à trois nœuds a un âge maximal de données de 150 ms. On double la seule cadence du nœud le plus rapide. Que peut-on attendre de l'âge maximal ?
A. Il est divisé par deux, car le nœud le plus rapide fixe la latence de la chaîne.
B. Il augmente, car un nœud plus rapide surcharge les autres de messages.
C. Il diminue peu, car ce sont les nœuds les plus lents qui pèsent le plus.
D. Il devient nul, car un nœud assez rapide annule la latence de la chaîne.
Bonne réponse : C
Explication : Dans la formule de l'âge maximal t_age = sum(1/f_i) + t_tr, les nœuds ayant les plus faibles cadences f_i génèrent les périodes 1/f_i les plus longues. Augmenter un nœud déjà rapide ne réduit que très faiblement la somme totale.

Question 5. Pour un projet réunissant une caméra, un détecteur, un planificateur et la commande de l'appareil en parallèle, quel outil est le plus adapté ?
A. Un script pymavlink unique, car il est le plus simple à écrire et à déployer.
B. DroneKit, car sa concision convient aux projets à plusieurs traitements.
C. Un tableur, car il suit facilement les données des différents capteurs.
D. Un middleware comme ROS 2, car il structure des nœuds parallèles réutilisables.
Bonne réponse : D
Explication : Dès qu'un système dépasse 2 ou 3 traitements concurrents lourds, l'utilisation d'un middleware (ROS 2) évite un script monolithique fragile en isolant les pannes et en structurant les flux via DDS.

6.4. Auto-évaluation
Question 1. Que devient un appareil ArduPilot en mode GUIDED si le calculateur compagnon cesse d'envoyer des consignes sans autre panne ?
A. Il freine et maintient sa position, puis le failsafe agit si le silence se prolonge.
B. Il poursuit indéfiniment la dernière consigne reçue jusqu'à épuisement de la batterie.
C. Il tombe immédiatement, faute de consigne pour commander ses moteurs.
D. Il repasse tout seul en mode manuel et rend la main au pilote sans délai.
Bonne réponse : A
Explication : Sur ArduPilot en mode GUIDED, l'absence de nouvelle consigne de vitesse/position provoque un freinage automatique et un passage en vol stationnaire, puis le Failsafe GCS prend le relais si le silence dépasse le délai configuré.

Question 2. Un projet envoie ses consignes depuis une boucle unique qui lit la caméra, décide, puis envoie. Pourquoi cette architecture est-elle fragile ?
A. Parce qu'une boucle unique consomme deux fois plus de calcul qu'un fil séparé.
B. Parce qu'un traitement de perception long retarde l'envoi et peut faire perdre le mode.
C. Parce que la caméra ne peut pas être lue dans la même boucle que l'envoi.
D. Parce que MAVLink interdit d'envoyer une consigne après une lecture de caméra.
Bonne réponse : B
Explication : Dans une boucle unique, si le traitement d'image prend soudainement 0,7 s, l'intervalle entre consignes passe à 0,75 s. Comme 0,75 s > 0,5 s (seuil de perte), l'autopilote annule le mode ou freine au pire moment.

Question 3. Une boucle unique envoie ses consignes à 20 Hz. Un traitement de perception passe soudain à 0,6 s. Que se passe-t-il, sachant que le mode se perd au-delà de 0,5 s de silence ?
A. Rien, car 20 Hz garantit une consigne toutes les 50 ms quoi qu'il arrive.
B. Le mode tient, car 0,6 s reste inférieur à la période nominale de la boucle.
C. La perception est ignorée et la consigne précédente est renvoyée automatiquement.
D. Le mode est perdu, car l'écart entre consignes atteint environ 0,65 s, au-delà du seuil.
Bonne réponse : D
Explication : En boucle unique, l'intervalle réel d'émission est delta_t = t_perc + T = 0,6 s + 0,05 s = 0,65 s. Dépassant le seuil de 0,5 s, le mode de vol est perdu.

Question 4. Comment garantir un flux de consignes régulier malgré une perception parfois lente ?
A. En accélérant la perception jusqu'à ce qu'elle tienne toujours sous 50 ms.
B. En augmentant FS_GCS_TIMEOUT pour que l'autopilote tolère les trous du flux.
C. En dédiant un fil qui envoie la dernière consigne à cadence fixe, indépendant de la perception.
D. En réduisant la cadence des consignes à 2 Hz pour laisser du temps à la perception.
Bonne réponse : C
Explication : La solution d'architecture consiste à créer un thread d'émission dédié qui répète la dernière consigne connue à cadence fixe (ex: 20 Hz / 50 ms), pendant que le thread de perception met à jour cette consigne à son propre rythme.

Question 5. À quoi servent respectivement le chien de garde côté calculateur et le failsafe FS_GCS_ENABLE côté autopilote ?
A. Le chien de garde réagit au silence d'un composant, le failsafe au silence de tout le calculateur.
B. Les deux font la même chose, l'un des deux est donc redondant et peut être retiré.
C. Le chien de garde règle la cadence des consignes, le failsafe règle la vitesse de vol.
D. Le failsafe réagit vite à la perception, le chien de garde attend cinq secondes avant d'agir.
Bonne réponse : A
Explication : Le watchdog applicatif (compagnon) réagit très vite (< 0,5 s) si un sous-module (ex: vision) se bloque. Le Failsafe GCS (autopilote) réagit si l'ensemble du calculateur compagnon plante ou s'éteint (FS_GCS_TIMEOUT = 3 s).

6.5. Auto-évaluation
Question 1. Pourquoi l’autopilote fusionne-t-il l’inertie et le GPS plutôt que de se fier au seul GPS ?
A. Parce que le GPS est toujours plus précis que l’inertie et n’a donc pas besoin d’aide.
B. Parce que l’inertie est rapide et réactive entre deux mesures GPS, lentes et bruitées.
C. Parce que la loi impose l’usage simultané de deux capteurs de position sur un drone.
D. Parce que le GPS mesure l’attitude, que l’inertie est incapable de fournir seule.
Bonne réponse : B
Explication : La centrale inertielle (IMU) mesure les mouvements à haute fréquence de manière très réactive. Le GPS (plus lent, rafraîchi à quelques hertz et bruité) permet quant à lui de recaler périodiquement la dérive accumulée par l'inertie.

Question 2. Dans le cycle du filtre de Kalman, comment évolue l’incertitude sur l’estimation pendant l’étape de prédiction ?
A. Elle augmente, car intégrer des mesures inertielles bruitées éloigne l’estimation de la vérité.
B. Elle diminue, car la prédiction apporte une information nouvelle qui affine l’estimation.
C. Elle reste constante, car la prédiction ne fait que recopier l’estimation précédente.
D. Elle s’annule, car le modèle de mouvement est supposé parfaitement exact.
Bonne réponse : A
Explication : Pendant l'étape de prédiction, le filtre intègre les mesures des capteurs inertiels. Comme ces mesures comportent du bruit, cette intégration accumule des erreurs et fait augmenter l'incertitude (la variance P). C'est l'étape de correction par mesure externe qui la fait ensuite diminuer.

Question 3. Une prédiction de variance 4 est corrigée par une mesure de variance 9. Que vaut le gain de Kalman, et que signifie-t-il ?
A. Le gain vaut 0,69, et le filtre suit surtout la mesure, jugée plus fiable.
B. Le gain vaut 2,25, et il amplifie l’innovation au-delà de sa valeur.
C. Le gain vaut 0,31, et le filtre ne répercute qu’un tiers de l’innovation.
D. Le gain vaut 0,50, car la correction partage toujours l’écart en deux parts égales.
Bonne réponse : C
Explication : Le gain de Kalman vaut K = P^- / (P^- + R) = 4 / (4 + 9) = 4 / 13 ≈ 0,31. La prédiction (variance 4) étant jugée plus sûre que la mesure (variance 9), le filtre ne répercute qu'environ un tiers de l'innovation (l'écart entre mesure et prédiction) sur l'estimation.

Question 4. Pour un récepteur GPS RTK très précis, comment régler EK3_POSNE_M_NSE par rapport à un GPS standard ?
A. Plus élevé, pour que le filtre se méfie d’une précision trop belle pour être vraie.
B. Identique, car le paramètre ne dépend pas de la qualité du récepteur.
C. Plus faible, car un récepteur précis mérite plus de confiance, donc un bruit plus petit.
D. À zéro, pour que le filtre suive exactement le GPS sans aucune prédiction.
Bonne réponse : C
Explication : EK3_POSNE_M_NSE représente la variance du bruit de mesure R attribuée au GPS. Un récepteur RTK étant plus précis, son bruit est faible ; il faut donc régler un paramètre plus bas pour indiquer au filtre de lui accorder une plus forte confiance.

Question 5. Une innovation normalisée reste durablement bien supérieure à l’unité. Qu’en déduire ?
A. Que le filtre est particulièrement sain, puisque l’innovation est grande et informative.
B. Que la variance de prédiction est devenue nulle, ce qui fige l’estimation.
C. Que le gain de Kalman va automatiquement passer à 1 pour suivre la mesure.
D. Que la mesure s’écarte de la prédiction bien plus que ne le prévoient les incertitudes.
Bonne réponse : D
Explication : L'innovation normalisée compare l'écart réel entre mesure et prédiction à l'incertitude globale attendue. Si elle dépasse nettement 1,0, cela signale une incohérence : la mesure est en désaccord anormal avec la prédiction (décrochage GPS, vibrations, perturbations).

6.6. Auto-évaluation
Question 1. Pourquoi une position issue de la caméra peut-elle remplacer celle du GPS dans l’EKF d’ArduPilot ?
A. Parce que l’EKF réclame une mesure de position, quelle qu’en soit la source, pour sa correction.
B. Parce que la caméra est toujours plus précise que le GPS en toutes circonstances.
C. Parce que l’EKF cesse de fonctionner dès que le GPS est absent et doit être remplacé.
D. Parce que la caméra mesure directement la position absolue sur la Terre, comme le GPS.
Bonne réponse : A
Explication : L’EKF d’ArduPilot n’impose pas que la position vienne obligatoirement des satellites ; il a simplement besoin d’une mesure de position, quelle qu’en soit la source, pour exécuter son étape de correction. Une position calculée par une caméra peut donc servir de source au même titre que le GPS.

Question 2. D’où vient la dérive de l’odométrie visuelle sur un long trajet ?
A. De l’accumulation des petites erreurs de chaque estimation de déplacement, sans correction.
B. D’un défaut de la caméra, qui se corrige en augmentant sa résolution.
C. Du GPS, dont les interférences perturbent le calcul visuel en arrière-plan.
D. De la fermeture de boucle, qui introduit une erreur à chaque retour sur ses pas.
Bonne réponse : A
Explication : L’odométrie visuelle estime le mouvement en cumulant les déplacements relatifs image après image. Chaque estimation comportant une petite erreur, ces incertitudes s’accumulent sans borne au cours du temps et de la distance parcourue, provoquant une dérive inévitable sans recalage externe.

Question 3. Que résout l’ajout de l’inertie à une odométrie visuelle monoculaire ?
A. Rien, l’inertie n’apporte aucune information utile à une caméra qui voit déjà tout.
B. L’ambiguïté d’échelle et la fragilité en mouvement rapide, l’inertie donnant l’échelle et la robustesse.
C. La fermeture de boucle, que seule l’inertie sait déclencher en reconnaissant les lieux.
D. La consommation électrique, une centrale inertielle consommant moins qu’une caméra.
Bonne réponse : B
Explication : Une caméra monoculaire seule ne perçoit pas l'échelle métrique absolue (effet de perspective géométrique). L'IMU mesure les accélérations réelles en m/s², ce qui permet de lever l'ambiguïté d'échelle et assure la continuité de l'estimation lors des mouvements rapides ou flous d'image (VIO).

Question 4. Un drone parcourt 300 m en aller simple avec une VIO à 1 % de dérive. Quelle erreur de position attendre à l’arrivée, et le SLAM changerait-il quelque chose ici ?
A. Environ 0,3 m, et le SLAM la réduirait encore par fermeture de boucle.
B. Environ 30 m, car la dérive croît comme le carré de la distance parcourue.
C. Zéro, car la VIO ne dérive pas tant que l’inertie fonctionne.
D. Environ 3 m, mais le SLAM ne changerait rien faute de repasser par un lieu connu.
Bonne réponse : D
Explication : Avec un taux de dérive de 1 % sur une distance de 300 m en aller simple, l'erreur de position attendue à l'arrivée est de 300 m × 0,01 = 3 m. Sur un trajet en aller simple sans repasser par un lieu déjà exploré, le SLAM ne peut effectuer aucune fermeture de boucle ; il ne changerait donc rien ici.

Question 5. Quel réglage indique à l’EKF de prendre sa position horizontale de la caméra plutôt que du GPS ?
A. VISO_TYPE, en le réglant sur la valeur du GPS pour forcer la bascule.
B. EK3_POSNE_M_NSE, en l’augmentant jusqu’à ce que le GPS soit ignoré.
C. EK3_SRC1_POSXY, en le réglant sur ExternalNav pour désigner la source externe.
D. Aucun, l’EKF choisit seul la caméra dès que le GPS disparaît, sans réglage.
Bonne réponse : C
Explication : Dans ArduPilot, le paramètre EK3_SRC1_POSXY sélectionne la source principale de position horizontale pour l'EKF3. Le régler sur ExternalNav configure explicitement le filtre pour utiliser les coordonnées de navigation externe fournies par le système de vision (par exemple via VISION_POSITION_ESTIMATE) au lieu du GPS.

## CHAPITRE 6.7 : PLANIFICATION DE TRAJECTOIRE ET ÉVITEMENT D'OBSTACLES

Question 1. Quelle est la différence de portée entre planification globale et évitement local ?
A. La planification globale trace la route sur une carte connue, l’évitement local réagit aux obstacles imprévus.
B. La planification globale est toujours plus rapide, l’évitement local toujours plus précis.
C. Il n’y a aucune différence, les deux termes désignent le même algorithme sous deux noms.
D. La planification globale s’exécute au sol, l’évitement local uniquement dans la station de contrôle.
Bonne réponse : A
Explication : Décider où aller se décompose en deux problèmes complémentaires : la planification globale calcule une route optimale sur une carte globale connue à l'avance, tandis que l'évitement local réactif traite les obstacles imprévus détectés en vol en temps réel par les capteurs de proximité.

Question 2. Qu’apporte l’heuristique de l’algorithme A* par rapport à Dijkstra ?
A. Elle garantit une solution même quand aucun chemin n’existe entre le départ et le but.
B. Elle oriente l’exploration vers le but et accélère la recherche du plus court chemin.
C. Elle supprime le besoin de carte, A* explorant l’environnement au hasard.
D. Elle remplace la grille par un arbre d’échantillons tirés dans tout l’espace.
Bonne réponse : B
Explication : Dijkstra explore le graphe en aveugle dans toutes les directions de manière isotrope. A* ajoute une fonction heuristique h(n) qui estime (minorant) la distance restante vers le but, ce qui oriente et focalise l'exploration directement vers la cible, accélérant drastiquement la convergence vers le plus court chemin.

Question 3. Quel est le défaut structurel des méthodes d’évitement purement réactives comme les champs de potentiels ?
A. Elles consomment trop de mémoire, car elles stockent toute la carte de l’environnement.
B. Elles ne fonctionnent qu’avec un GPS, et échouent dès que le signal disparaît.
C. Elles peuvent figer l’appareil dans un minimum local, face à un obstacle concave ou une impasse.
D. Elles trouvent toujours le plus court chemin, mais trop lentement pour le temps réel.
Bonne réponse : C
Explication : Dans les méthodes réactives par champs de potentiels ou BendyRuler, le drone est attiré par le but et repoussé par les obstacles. Si les forces répulsives et attractives s'équilibrent exactement (notamment dans un cul-de-sac ou face à un obstacle concave en forme de U), la résultante s'annule : le drone se fige dans un minimum local dont seule une planification globale peut le sortir.

Question 4. Un drone vole à 5 m/s avec 0,2 s de latence et 3 m/s² de freinage. Quelle est sa distance d’arrêt, et que se passe-t-il si la vitesse double ?
A. Environ 5,2 m, et elle double simplement à 10,4 m quand la vitesse double.
B. Environ 1 m, car seule la distance de réaction compte dans un arrêt d’urgence.
C. Environ 5,2 m, et elle plus que triple quand la vitesse double, à cause du terme de freinage.
D. Elle est nulle, car un multirotor peut s’arrêter instantanément en inversant sa poussée.
Bonne réponse : C
Explication : La distance d'arrêt totale s'exprime par d = v × t_r + v² / (2a). À 5 m/s : d = 5 × 0,2 + 25 / (2 × 3) = 1,0 + 4,17 = 5,17 m ≈ 5,2 m. Si la vitesse double à 10 m/s : d = 10 × 0,2 + 100 / 6 = 2,0 + 16,67 = 18,67 m. La distance passe de 5,17 m à 18,67 m : elle fait plus que tripler (rapport ×3,6) en raison du terme quadratique de freinage v²/(2a).

Question 5. Quel paramètre choisit l’algorithme d’évitement d’obstacles d’ArduPilot, et quelles valeurs propose-t-il ?
A. OA_MARGIN_MAX, qui bascule entre évitement activé et désactivé selon sa valeur.
B. EK3_SRC1_POSXY, qui choisit entre évitement global et évitement local.
C. FS_GCS_ENABLE, qui déclenche l’évitement quand la liaison est perdue.
D. OA_TYPE, qui propose BendyRuler, Dijkstra, ou la combinaison des deux.
Bonne réponse : D
Explication : Dans ArduPilot, OA_TYPE configure l'algorithme d'évitement d'obstacles autonome : 0 = désactivé, 1 = BendyRuler (évitement local réactif rapide), 2 = Dijkstra (planification globale sur grille / base de polygones), 3 = Dijkstra avec BendyRuler (combinaison globale + locale). OA_MARGIN_MAX règle quant à lui la distance de sécurité minimale aux obstacles.

## CHAPITRE 6.8 : SUIVI DE TRAJECTOIRE ET VOL SANS GPS

Question 1. En quoi consiste le suivi de trajectoire par point mobile ?
A. À viser un point qui se déplace le long du chemin, un peu devant la position de l’appareil.
B. À téléporter l’appareil d’un point de passage au suivant dès qu’il est atteint.
C. À immobiliser l’appareil sur chaque point de passage avant de repartir vers le suivant.
D. À suivre le GPS d’un autre appareil qui montre le chemin en le parcourant d’abord.
Bonne réponse : A
Explication : Le suivi par point mobile (ou carrot-chasing / guidage L1) consiste à projeter un point cible virtuel sur le chemin prévu, situé à une distance d'anticipation donnée en avant du drone, et à commander l'appareil pour rallier en permanence ce point en mouvement continu le long de la trajectoire.

Question 2. Comment la distance du point mobile, ou la période L1, influe-t-elle sur le suivi ?
A. Elle n’a aucun effet, le suivi étant identique quelle que soit cette distance.
B. Une distance longue supprime toute coupe des angles, quelle que soit la vitesse.
C. Une distance courte adoucit le suivi, une distance longue le rend plus vif et précis.
D. Une distance courte donne un suivi serré et oscillant, une distance longue un suivi doux.
Bonne réponse : D
Explication : La distance d'anticipation (réglée par NAVL1_PERIOD ou la distance L1) agit comme un amortisseur : une distance courte force le drone à coller très agressivement au chemin, au risque d'induire des oscillations et des dépassements ; une distance longue lisse la trajectoire et produit un vol plus doux et fluide, mais coupe davantage les virages.

Question 3. Un multirotor vole à 8 m/s avec 35 degrés d’inclinaison maximale. Quel rayon de virage minimal peut-il tenir, et que devient-il à 16 m/s ?
A. Environ 9,3 m à 8 m/s, et il double à 18,6 m à 16 m/s.
B. Environ 9,3 m à 8 m/s, et il quadruple à environ 37 m à 16 m/s.
C. Le rayon est nul, un multirotor pouvant tourner sur place à toute vitesse.
D. Environ 37 m à 8 m/s, décroissant quand la vitesse augmente.
Bonne réponse : B
Explication : La dynamique de virage coordonné impose a_lat = v² / R = g × tan(φ_max). Donc R = v² / (g × tan(φ_max)). Pour v = 8 m/s, g = 9,81 m/s² et φ = 35° (tan 35° ≈ 0,7002) : R = 64 / (9,81 × 0,7002) = 64 / 6,869 ≈ 9,32 m. Comme le rayon de virage croît avec le carré de la vitesse (v²), si la vitesse double à 16 m/s, le rayon quadruple : (16/8)² × 9,32 m = 4 × 9,32 m ≈ 37,3 m.

Question 4. Que se passe-t-il si un chemin comporte un virage plus serré que le rayon minimal à la vitesse prévue ?
A. L’appareil suit le virage exactement, la dynamique n’imposant aucune contrainte de rayon.
B. L’appareil s’arrête définitivement, incapable de traiter un virage trop serré.
C. L’appareil inverse sa trajectoire et revient au point précédent pour recommencer.
D. L’appareil ralentit ou coupe le virage, la dynamique interdisant de le suivre exactement.
Bonne réponse : D
Explication : La physique impose une limite stricte à l'accélération centripète disponible liée à l'angle d'inclinaison maximal. Si la courbure du chemin exige un rayon inférieur au rayon dynamique minimal à la vitesse courante, le régulateur doit soit réduire la vitesse pour resserrer le virage, soit couper le virage (overshoot ou coupe d'angle avec WPNAV_RADIUS) afin de ne pas dépasser la poussée et l'inclinaison admissibles.

Question 5. De quoi se compose la chaîne d’un vol autonome sans GPS ?
A. Uniquement d’un GPS de secours qui prend le relais dès que le principal tombe.
B. D’une seule brique nouvelle, la caméra, remplaçant tout le reste de l’autopilote.
C. De la localisation, de l’estimation, de la planification, du suivi et de la commande.
D. D’un pilotage manuel permanent, aucune autonomie n’étant possible sans GPS.
Bonne réponse : C
Explication : Le vol autonome sans GPS n'ajoute pas une boîte noire unique : il chaîne les briques fondamentales du système : localisation visuelle (caméra/VIO chapitre 6.6), estimation d'état et fusion de capteurs (EKF3 chapitre 6.5), planification de route et évitement d'obstacles (chapitre 6.7), suivi de trajectoire (chapitre 6.8) et régulation bas niveau / commande moteurs (chapitres 6.4 et module 5).
`;


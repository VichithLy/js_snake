window.addEventListener("load", function() {

	//Gestion des niveaux
		//PS : le copier/coller c'est toujours mal
	document.getElementById("facile").addEventListener("click", function() {
		createLevel(1);
	});

	document.getElementById("moyen").addEventListener("click", function() {
		createLevel(2);
	});

	document.getElementById("difficile").addEventListener("click", function() {
		createLevel(3);
	});

	// -------------- LECTURE DES FICHIERS JSON ----------//
	function createLevel(num) {
		// Création de la requête
		var ourRequest = new XMLHttpRequest();
		var url = "levels/level" + num + ".json";
		// Accès à la requête
		ourRequest.open("GET", url);
		// Si requête échoue
		ourRequest.onerror = function() {
		  console.log("Echec de chargement " + url);
		};
		
		//Au chargement de la page
		ourRequest.onload = function() {
		  if(ourRequest.status === 200) {
			//Récupération du contenu du fichier JSON
			var ourData = JSON.parse(ourRequest.responseText);
			//Affichage des données JSON
			getData(ourData);
			
			//-- TOUT CREER ICI --//
				//Gestion de la vitesse du snake
			document.getElementById("game").style.display = "block";
			document.getElementById("home").style.display = "none";
			console.log(delay);

			setInterval(function(){
				console.log(delay);
				moveSnake();
			}, delay);
			
		} else {
		console.log("Erreur " + ourRequest.status);
		}
	
    };
    ourRequest.send();
  }

	function getData(data) {

		//Murs
		for (var i in data.walls) {
		  //var html = "<p>" + data.walls[i] + "</p>"
			//linksContainer.insertAdjacentHTML('beforeend', html);

		  for (var j = 0; j < 2; j++) {
				data.walls[i][j];
		  }
		}

		//Fruits
		for (var i in data.fruit) {
		  data.fruit[i];
		}

		//Dimensions
		data.dimensions;

		//Délai
		delay = data.delay;
		//console.log(delay);

	}

	// ------------------- CONSTANTES --------------- //
	const BOX = 20; //Une case du serpent
	const MUR = 0;
	const SOL = 1;
	const SERPENT = 2;
	const FRUIT = 3;
	const HEIGHT = 31; //lignes
	const WIDTH = 31; //colonnes
	//31 pour compter les parrois du monde

	// -------------- VARIABLES ------- //
	var delay;
	var canvas;
	var ctx;
	var d = "stop";
	var score = 0;

		//MONDE SNAKE
	var world = [];

			//Matrice remplie de 1
				//-1 pour compter les parrois du monde
	for (var y = -1; y < HEIGHT; y++) {
		world[y] = [];
		for (var x = -1; x < WIDTH; x++) {
			world[y][x] = SOL;
		}
	}

	// ------------ ELEMENTS DU MONDE ---------- //

		//SERPENT
			//Tableau à une dimension représentant le serpent
	var snake = [];
			//Coordonnées de la tête du serpent
	snake[0] = {
		x: 15,
		y: 15
	};

			//Position initiale du serpent
	world[snake[0].y][snake[0].x] = SERPENT;

		//FRUIT
	function createFruit() {
		var posFruitX;
		var posFruitY;
		//Position aléatoire
		do {
			posFruitX = Math.floor(Math.random()*30);
			posFruitY = Math.floor(Math.random()*30);
		} while (world[posFruitX][posFruitY] != SOL); //Vérfie que le fruit n'apparaisse pas sur le mur ou le serpent

		//Placement du fruit dans le monde
		world[posFruitX][posFruitY] = FRUIT;
	}

	createFruit();

	//MURS
	world[1][1] = MUR;
	world[5][5] = MUR;


	// ------------------------ CANVAS ------------------ //
	function createCanvas() {
		//console.log(delay);

		//console.log(world.join('\n'));
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');

		// ------------ SERPENT ----------- //

		//Parcours de la matrice du monde
		for (var y = 0; y < HEIGHT; y++) {
			for (var x = 0; x < WIDTH; x++) {

				switch (world[y][x]) {
					case SERPENT: //Si on tombe sur le serpent
						//Dessin de la case
						ctx.fillStyle = "red";
						ctx.fillRect(x*BOX, y*BOX, BOX, BOX);
						break;

					case FRUIT: //Si on tombe sur un fruit
						//Dessin de la case
						/*ctx.fillStyle = "orange";
						ctx.fillRect(x*BOX, y*BOX, BOX, BOX);*/

					  var img = document.getElementById("dragonball");
					  ctx.drawImage(img, x*BOX, y*BOX, BOX, BOX);

						break;

					case MUR: //Si on tombe sur un mur
						//Dessin de la case
						ctx.fillStyle = "black";
						ctx.fillRect(x*BOX, y*BOX, BOX, BOX);
						break;

					case SOL: //Si on tombe sur un mur
						//Dessin de la case
						ctx.fillStyle = "green";
						ctx.fillRect(x*BOX, y*BOX, BOX, BOX);
						break;

					default:

				}
			}
		}

		// -------------- DESSIN D'UN CADRILLAGE DANS LE CANVAS  ------------ //
		var w = ctx.canvas.width;
		var h = ctx.canvas.height;

		for (var x = 0; x <= w; x +=20) {
			//Dessin de la ligne
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
		}

		for (var x = 0; x <= h; x += 20) {
			//Dessin de la ligne
			ctx.moveTo(0, x);
			ctx.lineTo(w, x);
		}

		ctx.strokeStyle = "black";
		ctx.stroke();

		//Affichage de la matrice
		//console.log(world.join('\n'));

	}

	//------------ ALLOCATION DES TOUCHES DIRECTIONNELLES  ----------//
	window.addEventListener("keydown", function(event) {

	if(event.keyCode == 37 && d != "right") {
		d = "left";
	} else if (event.keyCode == 38 && d != "down") {
		d = "up";
	} else if (event.keyCode == 39 && d != "left") {
		d = "right";
	} else if (event.keyCode == 40 && d != "up") {
		d = "down";
	}
		//console.log(d);
	});

	//--------------------- DEPLACEMENTS DU SERPENT  ----------------//
	function moveSnake() {

		//SCORE
		if (score == 7) {
			console.log("afficher le dragon");
			/*document.getElementById("shenron").style.visibility = "visible";*/
			setInterval(function() {
						document.getElementById("shenron").style.visibility = (document.getElementById("shenron").style.visibility == 'hidden' ? 'visible' : 'hidden');
			}, 1000);
		}

		//Au début, quand on ne se déplace pas
		if (d != "stop") {

			//Coordonnées de la tête du serpent
			var snakeX = snake[snake.length-1].x;
			var snakeY = snake[snake.length-1].y;

			//Nouvelle tête du serpent
			var newHead;

			// -------------- DIRECTIONS DU SERPENT ------------- //
			switch (d) {
				case "right":
					newHead = {y: snakeY+1,x: snakeX};
					break;

				case "down":
					newHead = {y: snakeY,x: snakeX+1};
					break;

				case "left":
					newHead = {y: snakeY-1,x: snakeX};
					break;

				case "up":
					newHead = {y: snakeY,x: snakeX-1};
					break;

				default:
					console.log("rien");
					break;
			}

			// ----------- COMPORTEMENT DU SERPENTS SUIVANT CE QU'IL RENCONTRE ---------- //

			//Parcours du canvas pour supprimer le serpent à chaque fois qu'il bouge
			for(var ligne = 0; ligne < world.length; ligne++) {
				for(var pixel = 0; pixel < world.length; pixel++) {
					if(world[ligne][pixel] == SERPENT) {
						world[ligne][pixel] = SOL;
					}
				}
			}

				//Si le serpent rencontre un fruit
			if(world[newHead.x][newHead.y] == FRUIT) {
				console.log()
				score++; //On incrémente le score
				document.getElementById("number").textContent = score; //On affiche le score
				snake.push(newHead); //Le serpent grandit
				createFruit(); //On génère un nouveau fruit

				console.log("je mange un fruit");

			} else if(world[newHead.y][newHead.x] == MUR || newHead.x == -1 || newHead.x == 30 || newHead.y == -1 || newHead.y == 30) {
				//Dans l'ordre, si le serpent rencontre un mur, touche les parrois x, touche les parrois y
					d = "stop";
					alert("VOUS AVEZ PERDU !");

			} else { //Si le serpent ne rencontre rien

				//console.log("Se mange lui même ? " + newHead.x == SERPENT);
				//console.log("Se prend le mur ? " + newHead.y == -1);
				snake.push(newHead);
				snake.shift();
				//console.log(world[newHead.y][newHead.x]);
				//console.log(newHead.x);
				//console.log(newHead.y);
				//console.log(newHead);

			}
			
			// Si le serpent se mange lui-même : PROBLEME NON RESOLU
			if(world[newHead.y][newHead.x] == SERPENT) {
				//console.log("je me mange");
				//console.log(world.join('\n'));
			}

			//console.log(world[newHead.y][newHead.x]);
			//console.log(world.join('\n'));


			//Parcours du serpent pour l'ajouter dans le monde
			snake.forEach(function(ligne) {
				world[ligne.x][ligne.y] = SERPENT;
				//console.log(world.join('\n'));
			});

		}

		//Recréation du canvas
		createCanvas();

	}
	


});

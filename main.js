var player_a = {
	score: 0,
	direction: 1,
	x: 10,
	y: 225,
}

var player_b = {
	score: 0,
	direction: 3,
	x: 390,
	y: 225,
}

var game_state = "MENU";
var menu_state = 0;
var settingState = 0;
var vty_score = 10;
var paths = [];

var menuSound;
var gameSound;
var tronFont;
var musicOn = true;

function preload() {
	soundFormats('ogg');
	menuSound = loadSound('assets/Armory.ogg');
	gameSound = loadSound('assets/EndOfLine.ogg');
	tronFont = loadFont('assets/Tr2n.ttf');
	ralewayFont = loadFont('assets/Raleway-Light.ttf');
	
}

function setup() {
	createCanvas(500, 400);
	background(0);
	setup_race();
	menuSound.setVolume(1);
	gameSound.setVolume(0.5);
  	menuSound.play();
}

function draw() {
	switch (game_state) {
		case "MENU":
			background(0);
			fill(255);
			textAlign(CENTER);

			// TRON
			textSize(60);
			noStroke();
			fill(0, 168, 255);
			textFont(tronFont);
			text("TRON", width/2, height/5);
			// ARCADE
			textSize(20);
			noStroke();
			text("ARCADE", width/2, height/5 + 25);


			textSize(28);
			// textFont(msyiFont);
			textFont(ralewayFont);
			switch (menu_state) {
				case 0:
					fill(246, 106, 53);
					text("Play", width/2, 175);
					fill(255);
					text("Setting", width/2, 225);
					fill(255);
					text("About", width/2, 275);
					break;
				case 1:
					fill(255);
					text("Play", width/2, 175);
					fill(246, 106, 53);
					text("Setting", width/2, 225);
					fill(255);
					text("About", width/2, 275);
					break;
				case 2:
					fill(255);
					text("Play", width/2, 175);
					fill(255);
					text("Setting", width/2, 225);
					fill(246, 106, 53);
					text("About", width/2, 275);
					break;
			}


			break;
		case "RACE":
			move_players(); // Changes x an y of players
			draw_players(); // Draw dots
			check_crash();
			save_paths(); // Saves paths
			break;
		case "STOPPED_RACE":
			textSize(20);
			fill(255);
			noStroke();
			textAlign(CENTER);
			if(player_a.score == vty_score) {
				text("Blue won. (Press ESC)", width/2, height/3);
			} else if(player_b.score == vty_score) {
				text("Orange won. (Press ESC)", width/2, height/3);
			} else {
				text("Press SPACE to start race.", width/2, height/3);
			}
			break;
		case "SETTING":
			background(0);
			
			// TRON
			textSize(60);
			noStroke();
			fill(0, 168, 255);
			textFont(tronFont);
			text("TRON", width/2, height/5);
			// ARCADE
			textSize(20);
			noStroke();
			text("ARCADE", width/2, height/5 + 25);


			textSize(28);
			textFont(ralewayFont);
			switch(settingState){
				case 0:
					fill(246, 106, 53);
					(musicOn)? text("Music: -ON+", width/2, 175): text("Music: -OFF+", width/2, 175);
					fill(255);
					text("Winning score: -"+vty_score+"+", width/2, 225);
					break;
				case 1:
					fill(255);
					(musicOn)? text("Music: -ON+", width/2, 175): text("Music: -OFF+", width/2, 175);
					fill(246, 106, 53);
					text("Winning score: -"+vty_score+"+", width/2, 225);
					break;
			}
			fill(255);
			textSize(16);
			text("(Press ESC to get back)", width/2, 275);
			break;

		case "ABOUT":
			background(0);
			
			// TRON
			textSize(60);
			noStroke();
			fill(0, 168, 255);
			textFont(tronFont);
			text("TRON", width/2, height/5);
			// ARCADE
			textSize(20);
			noStroke();
			text("ARCADE", width/2, height/5 + 25);


			textSize(28);
			textFont(ralewayFont);
			fill(255);
			text("Created by Lukáš Juránek", width/2, 175);
			text("github.com/lukyjuranek/tron", width/2, 225);
			textSize(16);
			text("(Press ESC to get back)", width/2, 275);
		break;
	}
	

}

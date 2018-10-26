
// EVENTS
function keyPressed() {

	// About ESCAPE
	if (game_state == "ABOUT") {
		if (keyCode == ESCAPE) {
			game_state = "MENU";
		};
	}

	// Start next round
	if (game_state == "STOPPED_RACE") {
		if (key === ' ') {
			setup_race();
			game_state = "RACE";
		} else if (keyCode === ESCAPE){
			game_state = "MENU";
			gameSound.stop();
			if (musicOn){ menuSound.play() };
		}
	}

	// Menu ENTER
	if (game_state == "MENU") {
		
		switch (keyCode) {
		case ENTER:
			switch (menu_state) {
				case 0: //PLAY
					player_a.score = 0;
					player_b.score = 0;
					setup_race();
					game_state = "RACE";
					if (musicOn){ gameSound.play() };
					break;
				case 1: //SETTING
					game_state = "SETTING";
					break;
				case 2: //ABOUT
					game_state = "ABOUT";
					break;
			}
			break;
		case UP_ARROW:
			menu_state -= 1;
			if (menu_state < 0) {menu_state = 2};
			break;
		case DOWN_ARROW:
			menu_state += 1;
			if (menu_state > 2) {menu_state = 0};
			break;	
		}
	}

	// Setting ENTER
	if (game_state == "SETTING") {
		
		switch (keyCode) {
			case LEFT_ARROW:
				switch (settingState) {
					case 0: //music
						musicOn = !musicOn;
						console.log(musicOn);
						(musicOn)? menuSound.play() : menuSound.stop();
						break;
					case 1: //
						vty_score -= 1;
						if (vty_score < 5) {vty_score = 10};
						break;
				}
				break;
			case RIGHT_ARROW:
				switch (settingState) {
					case 0: //music
						musicOn = !musicOn;
						console.log(musicOn);
						(musicOn)? menuSound.play() : menuSound.stop();
						break;
					case 1:
						vty_score += 1;
						if (vty_score > 10) {vty_score = 5};
						break;
				}
				break;
			case ESCAPE:
				game_state = "MENU";
				break;
			case UP_ARROW:
				settingState -= 1;
				if (settingState < 0) {settingState = 1};
				break;
			case DOWN_ARROW:
				settingState += 1;
				if (settingState > 1) {settingState = 0};
				break;	
			
		};
	};
	

	// Menu navigation
	

	//Player_a controls
	if (key === 'd') {
		player_a.direction += 1;
		if (player_a.direction > 3) {
			player_a.direction = 0;
		}
	}	else if(key === 'a') {
		player_a.direction -= 1;
		if (player_a.direction < 0) {
			player_a.direction = 3;
		}
	};
	
	//Player_b controls
	if (key === 'ArrowLeft') {
		player_b.direction -= 1;
		if (player_b.direction < 0) {
			player_b.direction = 3;
		}
	}	else if(key === 'ArrowRight') {
		player_b.direction += 1;
		if (player_b.direction > 3) {
			player_b.direction = 0;
		}
	};
}

function setup_race(){
	menuSound.stop();

	background(0);
	player_a.x = 10;
	player_a.y = 200;
	player_b.x = width-10;
	player_b.y = 200;
	player_a.direction = 1;
	player_b.direction = 3;
	
	textSize(32);
	fill(255);
	noStroke();
	textAlign(LEFT);
	text(player_a.score, 25, 40);
	textAlign(RIGHT);
	text(player_b.score, width-25, 40);

	// RESET PATHS
	paths = [];
}

function save_paths(){
	paths.push([player_a.x, player_a.y]);
	paths.push([player_b.x, player_b.y]);
	// console.log([player_b.x, player_b.y]);
}

function move_players() {
	switch (player_a.direction) {
		case 0:
			player_a.y--;
			break;
		case 1:
			player_a.x++;
			break;
		case 2:
			player_a.y++;
			break;
		case 3:
			player_a.x--
			break;
	}
	switch (player_b.direction) {
		case 0:
			player_b.y--;
			break;
		case 1:
			player_b.x++;
			break;
		case 2:
			player_b.y++;
			break;
		case 3:
			player_b.x--
			break;
	}
}

function check_crash() {

	// Check lines
	for(var i = 0; i < paths.length; i++){
		if (paths[i][0] == player_b.x && paths[i][1] == player_b.y) {
			player_a.score++;
			game_state = "STOPPED_RACE";
		} else if (paths[i][0] == player_a.x && paths[i][1] == player_a.y) {
			player_b.score++;
			game_state = "STOPPED_RACE";
		}
	}

	// Check sides
	var sides_a = player_a.x < 0 || player_a.x > width || player_a.y < 0 || player_a.y > height
	var sides_b = player_b.x < 0 || player_b.x > width || player_b.y < 0 || player_b.y > height
	if (sides_a){
		player_b.score++;
		game_state = "STOPPED_RACE";
	} else if(sides_b){
		player_a.score++;
		game_state = "STOPPED_RACE";
	}
}

function draw_players() {
	stroke(0, 168, 255);
	point(player_a.x, player_a.y);
	stroke(246, 106, 53);
	point(player_b.x, player_b.y);
}
  
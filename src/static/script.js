// Script for TWOVECT

// Objects/interface
const canvas = document.getElementById("disp");
let gameState = new GameState();
let player = new Player();
// Input utilities
let keysDown = {}; // key: true if down
document.addEventListener('keydown', (event) => {
	keysDown[event.key] = true;
});
document.addEventListener('keyup', (event) => {
	keysDown[event.key] = false;
});
function isKeyDown(key) {
	return key in keysDown && keysDown[key];
}
function clearKey(key) {
	keysDown[key] = false;
}

// Game loop
function gameLoop() {
	// Update
	gameState.update(intervalMs);
	player.update(intervalMs);
	// Inputs
	if (isKeyDown('w')) {
		player.move(0, -1);
		clearKey('w');
	}
	if (isKeyDown('a')) {
		player.move(-1, 0);
		clearKey('a');
	}
	if (isKeyDown('s')) {
		player.move(0, 1);
		clearKey('s');
	}
	if (isKeyDown('d')) {
		player.move(1, 0);
		clearKey('d');
	}
	if (isKeyDown('n')) {
		// Place block
		gameState.buildColumn(player.locx, player.locy);
		clearKey('n');
	}
	if (isKeyDown('m')) {
		// Destroy block
		gameState.destroyColumn(player.locx, player.locy);
		clearKey('m');
	}
	if (isKeyDown('p')) {
		// Rotate forwards
		player.rotate(1);
	}
	if (isKeyDown('o')) {
		// Rotate backwards
		player.rotate(-1);
	}
	// Render
	render();
}

// Game loop interval
setInterval(gameLoop, intervalMs);

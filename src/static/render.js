// Renderer for TWOVECT

// Utilities for the renderer
function renw(z) {
	// Render width
	return Math.floor(20 + z);
}
function zoffsx(z) {
	return -1 * player.displocx * z;
}
function zoffsy(z) {
	return -1 * (player.displocy + 2) * z;
}

// Render the world
function render() {
	// Update and rendering variables
	canvas.width = window.innerWidth - 8;
	canvas.height = window.innerHeight - 8;
	let xoffset = canvas.width / 2 - 200;
	let yoffset = canvas.height / 2 - 200;
	// Clear
	const context = canvas.getContext('2d');
	context.fillStyle = 'rgb(0, 0, 0)';
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillRect(0, 0, canvas.width, canvas.height);
	// Display the world z layer by z layer (sort everything by z)
	for (let z = 0; z < gameState.worldlenZ; z++) {
		// This layer: render anything from z-level z..(z + 1), below if z = 0, and above if z = 19
		let renderWidth = renw(z);
		let zoffset = zoffsx(z);
		// Render blocks first (lowest down)
		for (let y = 0; y < gameState.worldlenY; y++) {
			for (let x = 0; x < gameState.worldlenX; x++) {
				// Render the block
				// TODO: do not render if not visible
				let thisBlock = gameState.worldgrid[z][y][x];
				if (thisBlock.type == 0) {
					// Air: not visible
				} else {
					context.fillStyle = 'rgb(' + thisBlock.r + ', ' + thisBlock.g + ', ' + thisBlock.b + ')';
					context.fillRect(
						x * renderWidth + zoffsx(z) + xoffset, y * renderWidth + zoffsy(z) + yoffset,
						renderWidth, renderWidth
					);
				}
			}
		}
	}
	// Display the player
	// TODO: render by layering in with the z loop above
	// TODO: player shadow
	let playerShadowZ = 0;
	for (let z = 0; z < gameState.worldlenZ; z++) {
		playerShadowZ = z;
		if (gameState.getBlock(player.locx, player.locy, z).type == 0) {
			break;
		}
	}
	let renderWidth_shadow = renw(playerShadowZ);
	console.log(playerShadowZ);
	context.fillStyle = 'rgba(0, 0, 0, 0.4)';
	context.fillRect(
		player.locx * renderWidth_shadow + zoffsx(playerShadowZ) + xoffset, player.locy * renderWidth_shadow + zoffsy(playerShadowZ) + yoffset,
		renderWidth_shadow * 0.5, renderWidth_shadow * 0.5
	);
	let renderWidth_player = renw(player.locz);
	context.fillStyle = 'rgb(255, 255, 255)';
	context.fillRect(
		player.locx * renderWidth_player + zoffsx(player.locz) + xoffset, player.locy * renderWidth_player + zoffsy(player.locz) + yoffset,
		renderWidth_player * 0.5, renderWidth_player * 0.5
	);
	// TODO: lighting engine
}

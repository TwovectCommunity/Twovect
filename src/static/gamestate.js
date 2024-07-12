// Game state for TWOVECT
class GameState {
	// Create a new game state object
	constructor() {
		// Variables
		this.worldlenZ = 20; // 20
		this.worldlenY = 30; // 10
		this.worldlenX = 30; // 10
		this.worldgrid = []; // 3D array of { type, r, g, b }
		this.msElapsed = 0;
		// Setup
		this.generateWorld();
	}

	// Update
	update(intervalMs) {
		this.msElapsed += intervalMs;
	}
	
	// Destroy the highest block at an x and y location
	destroyColumn(x, y) {
		for (let z = this.worldlenZ - 1; z >= 0; z--) {
			if (this.getBlock(x, y, z).type > 0) {
				this.worldgrid[z][y][x].type = 0;
				return;
			}
		}
	}

	// Add above the highest block at an x and y location
	buildColumn(x, y) {
		for (let z = 0; z < this.worldlenZ; z++) {
			if (this.getBlock(x, y, z).type == 0) {
				this.worldgrid[z][y][x].type = 1;
				return;
			}
		}
	}

	// Get the block at a position
	getBlock(x, y, z) {
		if (x < 0 || y < 0 || z < 0 || x >= this.worldlenX || y >= this.worldlenY || z >= this.worldlenZ) {
			return {
				type: -1,
				r: 0, g: 0, b: 0
			};
		} else {
			return this.worldgrid[z][y][x];
		}
	}

	// Generate the world
	generateWorld() {
		// TODO: refactor this into a separate class
		// Generate heights
		let heightMap = [];
		for (let y = 0; y < this.worldlenY; y++) {
			heightMap.push([]);
			for (let x = 0; x < this.worldlenX; x++) {
				let thisHeight = 10 + Math.floor(Math.random() * 3 - 1);
				if (y > 0 && x > 0) thisHeight = Math.floor((thisHeight + heightMap[y - 1][x - 1] * 2.0) / 3.0);
				heightMap[y].push(thisHeight);
			}
		}
		// Spawn into the world grid
		for (let z = 0; z < this.worldlenZ; z++) {
			this.worldgrid.push([]);
			for (let y = 0; y < this.worldlenY; y++) {
				this.worldgrid[z].push([]);
				for (let x = 0; x < this.worldlenX; x++) {
					// Determine block type
					let newtype = 0;
					// TODO: multiple types (grass, stone, etc.)
					if (z < heightMap[y][x]) newtype = 1;
					// Determine block colors/misc. data based on type
					// TODO: display different shadows in the renderer
					// Misc. Theme
					/*let newr = Math.floor(Math.random() * 255);
					let newg = Math.floor(Math.random() * 255);
					let newb = Math.floor(Math.random() * 255);*/
					// Orange Field Theme (default)
					/*let newr = z * 8 + Math.random() * 3 + (z - 10) * 3;
					let newb = (1 - z) * 8 + Math.random() * 3 + (z - 10) * 3;
					let newg = Math.random() * 25 + 80 + (z - 10) * 3;*/
					// Synthwave Theme
					let newr = z * 10 + Math.random() * 5;
					let newb = (20 - z) * 10 + Math.random() * 5;
					let newg = Math.random() * 25;
					// Add to the world grid
					this.worldgrid[z][y].push({
						type: newtype, r: newr, g: newg, b: newb
					});
				}
			}
		}
	}
}

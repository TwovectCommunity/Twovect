// Player for TWOVECT
class Player {
	// Create a new player
	constructor() {
		// Variables
		this.locx = 0;
		this.locy = 0;
		this.locz = 20;
		this.rot = 0; // Arbitrary units
		this.displocx = this.locx;
		this.displocy = this.locy;
		this.displocz = this.locz;
		this.msElapsed = 0;
	}

	// Update
	update(intervalMs) {
		this.msElapsed += intervalMs;
		// Display position easing
		let easingAlpha = 0.9;
		this.displocx = this.displocx * easingAlpha + this.locx * (1 - easingAlpha);
		this.displocy = this.displocy * easingAlpha + this.locy * (1 - easingAlpha);
		this.displocz = this.displocz * easingAlpha + this.locz * (1 - easingAlpha);
	}

	// Move
	move(deltax, deltay) {
		this.locx += deltax;
		this.locy += deltay;
	}

	// Rotate
	rotate(delta) {
		this.rot += delta;
	}
}

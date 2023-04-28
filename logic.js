function convert(input) {
	if (input.length < 12) return;
	const coordinates = (() => {
		if (input.trim().length == 12) {
			return convertGlyphs(input);
		} else {
			return convertCoords(input);
		}
	})().map(coordinate => parseInt(coordinate, 16));

	const x_glyphs = coordinates[0];
	const y_glyphs = coordinates[1]
	const z_glyphs = coordinates[2];
	const system_idx = coordinates[3];

	let VoxelX, VoxelY, VoxelZ;
	if (x_glyphs > 2047) {
		VoxelX = x_glyphs - 4096;
	} else {
		VoxelX = x_glyphs;
	}
	if (z_glyphs > 2047) {
		VoxelZ = z_glyphs - 4096;
	} else {
		VoxelZ = z_glyphs;
	}
	if (y_glyphs > 127) {
		VoxelY = y_glyphs - 256;
	} else {
		VoxelY = y_glyphs;
	}

	const coords = {
		VoxelX: VoxelX,
		VoxelY: VoxelY,
		VoxelZ: VoxelZ,
		SolarSystemIndex: system_idx,
	}
	const output = document.getElementById('output');
	output.innerHTML = '';
	for (const coord in coords) {
		const div = document.createElement('div');
		div.innerText = `"${coord}": ${coords[coord]},`;

		output.appendChild(div);
	}
}

function convertGlyphs(glyphs) {
	const x_glyphs = glyphs.substring(9, 12);
	const y_glyphs = glyphs.substring(4, 6);
	const z_glyphs = glyphs.substring(6, 9);
	const system_idx = glyphs.substring(1, 4);

	return [x_glyphs, y_glyphs, z_glyphs, system_idx]
}

function convertCoords(coords) {
	const glyphs = coords2Glyphs(coords);
	return convertGlyphs(glyphs);

	function coords2Glyphs(coords) {
		if (coords.length != 19) return;

		const X_Z_POS_SHIFT = 2049;
		const X_Z_NEG_SHIFT = 2047;
		const Y_POS_SHIFT = 129;
		const Y_NEG_SHIFT = 127;

		const x_coords = parseInt(coords.substring(0, 4), 16);
		const y_coords = parseInt(coords.substring(5, 9), 16);
		const z_coords = parseInt(coords.substring(10, 14), 16);
		const system_idx = parseInt(coords.substring(15, 19), 16);

		let portal_x = 0;
		let portal_y = 0;
		let portal_z = 0;
		if (x_coords < X_Z_NEG_SHIFT) {
			portal_x = x_coords + X_Z_POS_SHIFT;
		} else {
			portal_x = x_coords - X_Z_NEG_SHIFT;
		}
		if (z_coords < X_Z_NEG_SHIFT) {
			portal_z = z_coords + X_Z_POS_SHIFT;
		} else {
			portal_z = z_coords - X_Z_NEG_SHIFT;
		}
		if (y_coords < Y_NEG_SHIFT) {
			portal_y = y_coords + Y_POS_SHIFT;
		} else {
			portal_y = y_coords - Y_NEG_SHIFT;
		}

		const glyphs = new Array(5);
		glyphs[0] = '0';
		glyphs[1] = system_idx.toString(16).toUpperCase().padStart(3, '0');
		glyphs[2] = portal_y.toString(16).toUpperCase().padStart(2, '0');
		glyphs[3] = portal_z.toString(16).toUpperCase().padStart(3, '0');
		glyphs[4] = portal_x.toString(16).toUpperCase().padStart(3, '0');
		return glyphs.join('');
	}
}
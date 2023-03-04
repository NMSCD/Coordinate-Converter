function convert(input) {
	if (input.length < 12) return;
	const coordinates = (() => {
		if (input.length == 12) {
			return convertGlyphs(input);
		} else {
			return convertCoords(input);
		}
	})();

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
	const output = document.getElementById('out');
	output.innerHTML = '';
	for (const coord in coords) {
		const div = document.createElement('div');
		div.innerText = `"${coord}": ${coords[coord]},`;

		output.appendChild(div);
	}
}

function convertGlyphs(glyphs) {
	const x_glyphs = parseInt(glyphs.substring(9, 12), 16);
	const y_glyphs = parseInt(glyphs.substring(4, 6), 16);
	const z_glyphs = parseInt(glyphs.substring(6, 9), 16);
	const system_idx = parseInt(glyphs.substring(1, 4), 16);

	return [x_glyphs, y_glyphs, z_glyphs, system_idx]
}

function convertCoords(coords) {
	const coordArray = coords.split(':');
	const x_glyphs = parseInt(coordArray[0], 16);
	const y_glyphs = parseInt(coordArray[1], 16);
	const z_glyphs = parseInt(coordArray[2], 16);
	const system_idx = parseInt(coordArray[3], 16);

	return [x_glyphs, y_glyphs, z_glyphs, system_idx]
}
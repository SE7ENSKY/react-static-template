/*
 Source code is from https://stackoverflow.com/questions/13762864/image-dark-light-detection-client-sided-script
*/

export default (imageSrc, cb) => {
	const img = document.createElement('img');
	img.src = `${imageSrc}?s=sm`;
	img.style.display = 'none';
	img.crossOrigin = '';
	document.body.appendChild(img);

	let colorSum = 0;

	const getBrightness = (image, w, h, callback) => {
		const canvas = document.createElement('canvas');
		canvas.width = w;
		canvas.height = h;

		const ctx = canvas.getContext('2d');
		ctx.drawImage(image, 0, 0);

		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const { data } = imageData;
		let r,g,b,avg;

		for (let x = 0, len = data.length; x < len; x += 4) {
			r = data[x];
			g = data[x + 1];
			b = data[x + 2];

			avg = Math.floor((r + g + b) / 3);
			colorSum += avg;
		}

		const brightness = Math.floor(colorSum / (w * h));
		document.body.removeChild(img);
		callback(brightness);
	};

	img.onload = () => {
		getBrightness(img, img.width, img.height, cb);
	};
};

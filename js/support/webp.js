const supportWebp = new Promise((resolve, reject) => {
	const img = new Image()
	
	img.onload = function() {
		if(img.height > 0 && img.width > 0) {
			resolve()
		} else {
			reject()
		}
	}

	img.onerror = function() {
		reject()
	}

	img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=='
})
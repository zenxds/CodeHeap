(function() {
	var doc = document,
		body = document.body,
		scriptId = 'tbtx-admin',
		src = 'test.js',
		exports = window.zenxds,
		node = doc.getElementById(scriptId);

	// 页面已经存在该id的node了,移除原有的node
	if (node && typeof exports == 'undefined') {
		body.removeChild(node);
		node = null;
	}

	// 没有node
	if (!node) {
		node = doc.createElement('script');
		node.setAttribute('charset', 'utf-8');
		node.id = scriptId;
		node.src = src + '?' + (+new Date);
		body.appendChild(node);
	} else {	// node and exports exists
		exports.init();
	}
})();

function getImageKey(imageUrl) {
	return imageUrl.split("/").pop();
}

module.exports = getImageKey;

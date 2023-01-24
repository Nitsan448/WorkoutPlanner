import { useState, useEffect } from "react";

function useImageUpload() {
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);

	function onImageUpload(event) {
		setImage(event.target.files[0]);
	}

	useEffect(() => {
		if (image) {
			setImageUrl(URL.createObjectURL(image));
		}
	}, [image]);

	function getImageAsBlob() {}

	return {
		onImageUpload,
		imageUrl,
	};
}

export default useImageUpload;

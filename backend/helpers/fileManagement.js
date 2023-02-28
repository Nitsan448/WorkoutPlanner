const multerS3 = require("multer-s3");
var AWS = require("aws-sdk");

AWS.config.update({
	region: "eu-west-3",
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3({ httpOptions: { timeout: 3000 } });

const fileStorage = multerS3({
	s3: s3,
	bucket: process.env.AWS_BUCKET_NAME,
	acl: "public-read",
	metadata: function (req, file, cb) {
		cb(null, { fieldName: file.fieldname });
	},
	key: function (req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/svg" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const limits = { fileSize: 10 * 1024 * 1024 };
const multerSettings = { storage: fileStorage, fileFilter: fileFilter, limits: limits };

async function replaceImage(uploadedImages, oldImage) {
	let image;
	const imageUploaded = uploadedImages.length > 0;

	if (!imageUploaded) {
		image = oldImage;
	} else if (oldImage) {
		await deleteImage(oldImage);
		image = uploadedImages[0].location;
	} else {
		image = uploadedImages[0].location;
	}

	return image;
}

async function deleteImage(image) {
	const params = { Bucket: process.env.AWS_BUCKET_NAME, Key: getImageKey(image) };
	await s3.deleteObject(params).promise();
}

function getImageKey(imageUrl) {
	return imageUrl.split("/").pop();
}

module.exports = { replaceImage, deleteImage, multerSettings };

const fs = require("fs");

function deleteFile(filePath) {
	fs.unlink(filePath, (error) => {
		if (error) {
			console.log(error);
		}
	});
}

exports.deleteFile = deleteFile;

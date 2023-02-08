const express = require("express");
const { s3 } = require("../app");
const router = express.Router();

router.get("/:imageId", function (req, res, next) {
	var params = { Bucket: "elasticbeanstalk-eu-west-3-755771925782", Key: req.params.imageId };
	s3.getObject(params, function (err, data) {
		if (err) {
			return res.status(500).json("Error getting image: ${req.params.imageId}");
		}
		res.status(200).json(data.Body);
	});
});

module.exports = router;

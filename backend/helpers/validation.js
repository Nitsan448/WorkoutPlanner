function checkIfRowCanBeManipulated(row, userId) {
	if (row.length === 0) {
		throw (new Error("Row does not exist").statusCode = 500);
	}
	if (row[0].user_id !== userId) {
		throw (new Error("Not authorized").statusCode = 403);
	}
}

module.exports = { checkIfRowCanBeManipulated };

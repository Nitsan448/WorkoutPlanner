const expect = require("chai").expect;
const isAuth = require("../middleware/is-auth");
const jsonWebToken = require("jsonwebtoken");
const sinon = require("sinon");

describe("Auth middleware", function () {
	it("Should throw error if there is no token cookie in the request", function () {
		const req = {
			cookies: {},
		};

		expect(isAuth.bind(this, req, {}, () => {})).to.throw("Not authenticated");
	});

	it("Should throw error if the token was invalid", function () {
		const req = {
			cookies: { token: "dsdsds" },
		};

		expect(isAuth.bind(this, req, {}, () => {})).to.throw();
	});

	it("Should yield a user id after decoding the token", function () {
		const req = {
			cookies: { token: "dsdsds" },
		};

		sinon.stub(jsonWebToken, "verify");
		jsonWebToken.verify.returns({ userId: 12 });

		isAuth(req, {}, () => {});
		expect(req).to.have.property("userId");

		jsonWebToken.verify.restore();
	});
});

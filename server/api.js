import { Router } from "express";
import { PassThrough } from "stream";
require("dotenv").config();

const router = new Router();
router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

const { Pool } = require("pg");
const dbUrl = process.env.DATABASE_URL;

const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: { rejectUnauthorized: false },
});

router.get("/wholelist", function (req, res) {
	pool
		.query("SELECT * FROM energisers")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/id/:id", function (req, res) {
	const { id } = req.params;
	pool
		.query("SELECT * FROM energisers WHERE id = $1", [id])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/name/:title", function (req, res) {
	const title = req.params.title;
	pool
		.query("SELECT * FROM energisers WHERE name = $1", [title])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/easy", function (req, res) {
	pool
		.query("SELECT * FROM energisers WHERE tag = 'Easy'")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/medium", function (req, res) {
	pool
		.query("SELECT * FROM energisers WHERE tag = 'Medium'")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/difficult", function (req, res) {
	pool
		.query("SELECT * FROM energisers WHERE tag = 'Difficult'")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/5minutes", function (req, res) {
	pool
		.query("SELECT * FROM energisers WHERE time = '5 Minutes'")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/10minutes", function (req, res) {
	pool
		.query("SELECT * FROM energisers WHERE time = '10 Minutes'")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/15minutes", function (req, res) {
	pool
		.query("SELECT * FROM energisers WHERE time = '15 Minutes'")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/internal", function (req, res) {
	pool
		.query("SELECT * FROM energisers WHERE external = false")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/external", function (req, res) {
	pool
		.query("SELECT * FROM energisers WHERE external = true")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});
router.get("/topEnergisers", function (req, res) {
	pool
		.query(
			"SELECT *, (upvote + downvote) as OrderCondition FROM energisers ORDER BY OrderCondition DESC LIMIT 6"
		)
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});
router.put("/upvote/:id", function (req, res) {
	const { id } = req.params;
	pool
		.query("UPDATE energisers SET upvote = upvote + 1 WHERE id = $1", [id])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});
router.put("/downvote/:id", function (req, res) {
	const { id } = req.params;
	// const { upvote } = req.body;
	pool
		.query("UPDATE energisers SET downvote = downvote - 1 WHERE id = $1", [id])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.post("/new", function (req, res) {
	const energiser = req.body;
	// const { upvote } = req.body;
	pool
		.query("SELECT * FROM energisers WHERE name = $1", [energiser.name])
		.then((result) => {
			if (result.rows.length > 0) {
				return res
					.status(400)
					.send("An Energiser with the same name is already exists!");
			} else {
				pool
					.query(
						"Insert Into energisers (name, time, urls, description, external, tag, upvote, downvote) values ($1, $2, $3, $4, $5, $6, $7, $8)",
						[
							energiser.name,
							energiser.time,
							energiser.urls,
							energiser.description,
							"No",
							energiser.difficulty,
							0,
							0,
						]
					)
					.then((result) => res.json(result.rows))
					.catch((e) => console.error(e));
			}
		});
});
//////////////////////ENCRYPTION/////////////////////////////////

// Credits : https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/
// (A) REQUIRE CRYPTO LIBRARY
let crypto = require("crypto");

// (B) CREATE PASSWORD HASH
let creepy = function (clear) {
	// Generate random salt
	let length = 16;
	let salt = crypto
		.randomBytes(Math.ceil(length / 2))
		.toString("hex")
		.slice(0, length);

	// SHA512 at work
	let hash = crypto.createHmac("sha512", salt);
	hash.update(clear);
	return {
		salt: salt,
		hash: hash.digest("hex"),
	};
};


// (D) VALIDATE PASSWORD
let validate = function (userpass, hashedpass, salt) {
	let hash = crypto.createHmac("sha512", salt);
	hash.update(userpass);
	userpass = hash.digest("hex");
	return userpass == hashedpass;
};

////////////////////////////////////////////////////

router.post("/signup", function (req, res) {
	const user = req.body;
	let hashSalt = creepy(user.password);
	let date_ob = new Date();
	// const { upvote } = req.body;
	pool
		.query("SELECT * FROM profile_table WHERE email = $1", [user.email])
		.then((result) => {
			if (result.rows.length > 0) {
				return res
					.status(400)
					.send("A User Email with the same address is already exists!");
			} else {
				pool
					.query(
						"Insert Into profile_table (user_name, class, email, password, signup_Date, salt) values ($1, $2, $3, $4, $5, $6)",
						[
							user.name,
							user.class,
							user.email,
							hashSalt.hash,
							date_ob,
							hashSalt.salt,
						]
					)
					.then((result) => res.json(result.rows))
					.catch((e) => console.error(e));
			}
		});
});

router.put("/updateuser", function (req, res) {
	const user = req.body;
	let hashSalt = creepy(user.password);
	pool
		.query(
			"UPDATE profile_table SET user_name = $1, class = $2, email = $3, password = $4, salt = $6 WHERE id = $5",
			[
				user.name,
				user.class,
				user.email,
				hashSalt.hash,
				user.user_id,
				hashSalt.salt,
			]
		)
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.post("/userlogin", function (req, res) {
	const user = req.body;
	let date_ob = new Date();
	// const { upvote } = req.body;
	pool
		.query(
			"Insert Into Loggin_table (user_id, login_Date, is_Logging) values ($1, $2, $3)",
			[user.user_id, date_ob, true]
		)
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.post("/lastused", function (req, res) {
	const user = req.body;
	let date_ob = new Date();
	// date_ob.setDate(date_ob.getDate() + 1);
	pool
		.query(
			"Insert Into last_used (profile_id, date_used, energiser_id) values ($1, $2, $3)",
			[user.user_id, date_ob, user.energiser_id]
		)
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});


router.get("/lastused/:energiser", function (req, res) {
	const { energiser } = req.params;
	pool
		.query(
			"SELECT DISTINCT ON (profile_table.class) last_used.date_used, last_used.energiser_id, profile_table.class FROM last_used INNER JOIN profile_table ON last_used.profile_id=profile_table.id WHERE last_used.energiser_id = $1 ORDER BY profile_table.class, last_used.date_used DESC",
			[energiser]
		)
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.put("/userlogout", function (req, res) {
	const user = req.body;
	pool
		.query("UPDATE Loggin_table SET  is_Logging = $1 WHERE user_id = $2", [
			false,
			user.user_id,
		])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/user", function (req, res) {
	const email = req.query.email;
	const pass = req.query.pass;
	let hash;
	let salt;
	let rows;
	let status = true;
	pool
		.query(
			"SELECT id, user_name, password, salt FROM profile_table WHERE email = $1",
			[email]
		)
		.then((result) => {
			try {
				salt = result.rows[0].salt;
				hash = result.rows[0].password;
				rows = result.rows;
			} catch (err) {
				console.log(err);
				return res.json({ status: "Failed" });
			}
		})
		.then(() => {
			if (status === true) {
				if (validate(pass, hash, salt)) {
					console.log("PASSED VALIDATION");
				} else {
					return res.json({ status: "Failed" });
				}
			}
		})
		.then(() => {
			if (status === true) {
				if (validate(pass, hash, salt)) {
					res.json(rows);
				}
			} else {
				console.log("SENDING ERRORS");
			}
		})
		.catch((e) => console.error(e));
});

router.get("/profile/:userid", function (req, res) {
	const { userid } = req.params;
	pool
		.query("SELECT * FROM profile_table WHERE id = $1", [userid])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});


export default router;

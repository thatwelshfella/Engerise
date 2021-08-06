import { query, Router } from "express";
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

router.get("/name/:title", function (req, res) {
	const title = req.params.title;
	console.log(title);
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
	// const { upvote } = req.body;
	console.log(req.params);
	pool
		.query("UPDATE energisers SET upvote = upvote + 1 WHERE id = $1", [id])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});
router.put("/downvote/:id", function (req, res) {
	const { id } = req.params;
	// const { upvote } = req.body;
	console.log(req.params);
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
			.send('An Energiser with the same name is already exists!');
		} else {
			pool
				.query("Insert Into energisers (name, time, urls, description, external, tag, upvote, downvote) values ($1, $2, $3, $4, $5, $6, $7, $8)",
				[ energiser.name, energiser.time, energiser.urls, energiser.description, "No", energiser.difficulty, 0, 0])
				.then((result) => res.json(result.rows))
				.catch((e) => console.error(e));
		}
	});
});

router.post("/signup", function (req, res) {
	const user = req.body;
	let date_ob = new Date();
	// const { upvote } = req.body;
	pool
	.query("SELECT * FROM profile_table WHERE email = $1", [user.email])
	.then((result) => {
		if (result.rows.length > 0) {
			return res
			.status(400)
			.send('A User Email with the same address is already exists!');
		} else {
			pool
				.query("Insert Into profile_table (user_name, class, email, password, signup_Date) values ($1, $2, $3, $4, $5)",
				[ user.name, user.class, user.email, user.password, date_ob])
				.then((result) => res.json(result.rows))
				.catch((e) => console.error(e));
		}
	});
});

router.post("/userlogin", function (req, res) {
	const user = req.body;
	let date_ob = new Date();
	// const { upvote } = req.body;
		pool
			.query("Insert Into Loggin_table (user_id, login_Date, is_Logging) values ($1, $2, $3)",
			[ user.user_id, date_ob, true])
			.then((result) => res.json(result.rows))
			.catch((e) => console.error(e));

});

router.put("/userlogout", function (req, res) {
	const user = req.body;
	console.log(user.user_id);
		pool
			.query("UPDATE Loggin_table SET  is_Logging = $1 WHERE user_id = $2",[ false, user.user_id])
			.then((result) => res.json(result.rows))
			.catch((e) => console.error(e));
});

router.get("/user", function (req, res) {
	const email = req.query.email;
	const pass = req.query.pass;
	console.log(email);
	pool
		.query("SELECT id, user_name FROM profile_table WHERE email = $1 and password = $2", [email, pass])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});

router.get("/profile/:userid", function (req, res) {
	const { userid } = req.params;
	pool
		.query("SELECT * FROM profile_table WHERE id = $1," [userid])
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));

});

export default router;

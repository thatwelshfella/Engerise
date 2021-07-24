import { Router } from "express";
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
			"SELECT *, (upvote + downvote) as OrderCondition FROM energisers ORDER BY OrderCondition DESC LIMIT 10"
		)
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
});


export default router;

import { Router } from "express";

const router = new Router();
router.get("/", (_, res) => {
	res.json({ message: "Hello, world!" });
});

const { Pool } = require("pg");

const pool = new Pool({
	driver: "postgres",
	user: "eafodoyqputjhw",
	host: "ec2-79-125-30-28.eu-west-1.compute.amazonaws.com",
	database: "d14rss3o9u0mq7",
	password: "1a3340862ae23fb0dfba7f1eedca969c87ffd5cc2ededb00189d1ea503f8741c",
	port: 5432,
	sslmode: require
});

router.get("/wholelist", function (req, res) {
	pool
		.query("SELECT * FROM energisers")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));
		// res.json({ message: "Hello, LIST!" });

});


export default router;

import { Router } from "express";
import db from "./db";

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
	password: "PUT_PASSWORD_HERE",
	port: 5432,
	ssl: { rejectUnauthorized: false },
});

router.get("/wholelist", function (req, res) {
	pool
		.query("SELECT * FROM energisers")
		.then((result) => res.json(result.rows))
		.catch((e) => console.error(e));

});


export default router;

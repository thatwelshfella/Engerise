import { Pool } from "pg";

const dbUrl = "postgres://eafodoyqputjhw:1a3340862ae23fb0dfba7f1eedca969c87ffd5cc2ededb00189d1ea503f8741c@ec2-79-125-30-28.eu-west-1.compute.amazonaws.com:5432/d14rss3o9u0mq7"
 || "postgres://localhost:5432/cyf";

const pool = new Pool({
	connectionString: dbUrl,
	connectionTimeoutMillis: 5000,
	ssl: dbUrl.includes("localhost") ? false : { rejectUnauthorized: false },
});

export const connectDb = async () => {
	let client;
	try {
		client = await pool.connect();
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
	console.log("Postgres connected to", client.database);
	client.release();
};

export const disconnectDb = () => pool.close();

export default { query: pool.query.bind(pool) };

"use strict"

var knex = require("knex")({
	client: "pg",
	connection: process.env.DATABASE_URL,
});
var fs = require('fs');
var accounts = JSON.parse(fs.readFileSync("./public/accounts.json", "utf8"));

console.log("Starting Database Migration...")
knex.schema.hasTable("accounts").then(function(exists) {
	if (!exists) {
		return knex.schema.createTable("accounts", function(t) {
			t.increments("id").primary();
			t.string("name", 100);
			t.text("description");
		}).then(() => {
			return knex("accounts").insert(accounts);
		});
	}
	console.log("Accounts table already exists, skipping migration.");
}).then(() => {
	console.log("Release stage finished successfully.");
	process.exit();
}).catch(err => {
	console.log("Release stage failed. Maybe no database was provisioned?");
	console.log(err);
	process.exit(1);
});


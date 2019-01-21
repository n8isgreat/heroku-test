"use strict"

var knex = require("knex")({
	client: "pg",
	connection: process.env.DATABASE_URL,
});
var fs = require('fs');
var accounts = JSON.parse(fs.readFileSync("./public/accounts.json", "utf8"));

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
}).then(() => {
	process.exit();
}).catch(err => {
	console.log(err);
	process.exit(1);
});


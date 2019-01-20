"use strict"

var knex = require("knex")({
	client: "pg",
	connection: process.env.DATABASE_URL,
});

knex.schema.hasTable("accounts").then(function(exists) {
	if (!exists) {
		return knex.schema.createTable("accounts", function(t) {
			t.increments("id").primary();
			t.string("name", 100);
			t.text("description");
		}).then(() => {
			return knex("accounts").insert([{
				name: "Account 1",
				description: "Description 1",
			},{
				name: "Account 2",
				description: "Description 2",
			}]);
		});
	}
}).then(() => {
	process.exit();
}).catch(err => {
	console.log(err);
	process.exit(1);
});


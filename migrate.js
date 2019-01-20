"use strict"

var knex = require("knex")({
	client: "pg",
	connection: process.env.DATABASE_URL || "postgres://ebaujsbvecjlzi:12edc63ce7e4c9ec49b6b97c6321fb42c0c1f2651f364bf61cbfad275222799b@ec2-23-21-171-25.compute-1.amazonaws.com:5432/dutnhmhd1tnph",
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


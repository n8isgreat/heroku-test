'use strict';

const Hapi=require('hapi');

const port = +process.env.PORT || 5000;
const host = "0.0.0.0";
const knex = require("knex");

// Create a server with a host and port
const server = Hapi.server({
	host,
	port,
});



// Start the server
const start = async function() {
	try {
		await server.register(require('inert'));

		// Add the index route
		server.route({
			method:'GET',
			path:'/',
			handler: (request,h) => {
				return h.file('./index.html');
			}
		});

		// Add the accounts getter
		server.route({
			method:'GET',
			path:'/accounts',
			handler: (request,h) => {
				var pg = knex({
					client: "pg",
					connection: process.env.DATABASE_URL,
				});
				return pg("accounts").then(results => {
					return results;
				});
			}
		});

		// Add the favicon route
		server.route({
			method:'GET',
			path:'/favicon.ico',
			handler: (request,h) => {
				return h.file('./public/favicon.ico');
			}
		});

		server.route({
			method: 'GET',
			path: '/public/{param*}',
			handler: {
				directory: {
					path: './public'
				}
			}
		});

		await server.start();
	}
	catch (err) {
		console.log(err);
		process.exit(1);
	}

	console.log('Server running at:', server.info.uri);
};

start();
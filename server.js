'use strict';

const Hapi=require('hapi');

const port = +process.env.PORT || 5000;
const host = "0.0.0.0";

// Create a server with a host and port
const server = Hapi.server({
	host,
	port,
});



// Start the server
const start = async function() {
	try {
		await server.register(require('inert'));

		// Add the route
		server.route({
			method:'GET',
			path:'/',
			handler: (request,h) => {
				return h.file('./index.html');
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
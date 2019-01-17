'use strict';

const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'0.0.0.0',
    port:+process.env.PORT
});

// Add the route
server.route({
    method:'GET',
    path:'/{path*}',
    handler:function(request,h) {

        return"Nate's app";
    }
});

// Start the server
const start =  async function() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
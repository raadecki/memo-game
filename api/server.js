const hapi = require('hapi');
const hapiSwagger = require('hapi-swagger');
const _ = require('lodash/fp');
const rp = require('request-promise');
const config = require('./config.json');
const inert = require('inert');
const vision = require('vision');
const fs = require('fs');
const joi = require('joi');

let highscores = [];

// Create a server with a host and port
const server = new hapi.Server();
server.connection({
	host: '127.0.0.1',
	port: 8000,
	routes: { 
		cors: true 
	},
	labels: ['api']
});

// Add the route
server.route({
	method: 'GET',
	path: '/',
	handler: (request, reply) => reply('test')
});

server.route({
	method: 'GET',
	path:'/init',
	handler: (request, reply) => {
		// since taken cards not vcomming back to deck then I've decided to generate new deck each time
		rp({
			uri: config.deckIdUrl,
			json: true
		}).then((resp) => resp.deck_id)
		.then((deckId) => rp({
			uri: config.deckCardsUrl.replace(/deckId/g, deckId),
			json: true
		}))
		.then((deck) => reply(Object.assign({
			highscores
		}, deck)))
	},
	config: {
        tags: ['api'],
        description: 'Returns cards deck',
        notes: 'uses external api'
    }
});

server.route({
	method: 'POST',
	path: '/highscore/save',
	handler: (request, reply) => {
		highscores = _.sortBy(['turns'], highscores.concat([request.payload]));
		reply(highscores);
	},
	config: {
        tags: ['api'],
        description: 'Saves player score',
        validate: {
            payload: {
                turns: joi.number().required().description('how many tries had player before he finished'),
                player: joi.string().required().description('player name')
            }
        }
    }
});

server.route({
	method: 'POST',
	path: '/highscore/reset',
	handler: (request, reply) => {
		highscores = [];
		reply([]);
	},
	config: {
        tags: ['api'],
        description: 'Resets highscore'
    }
});

server.register([
        inert,
        vision,
        {
            register: hapiSwagger,
            options: {
                info: {
                    title: 'Memo Game API',
                    description: 'API documentation Memo Game API',
                    version: '1.0',
                },
            },
        }
], (err) => {
    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
    })
});

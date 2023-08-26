import express from 'express';
import cors from 'cors';

import pgPromise from 'pg-promise';
const pgp = pgPromise();
const db = pgp('postgres://scott_stapp_user:your_password@localhost/scott_stapp');

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		email: { type: GraphQLString },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString }
	}
});

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			hello: {
				type: GraphQLString,
				resolve: () => 'world'
			},
			user: {
				type: UserType,
				args: {
					id: { type: GraphQLString }
				},
				resolve: async (parent, args) => {
					const user = await db.one('SELECT * FROM users WHERE id = $1', [args.id]);
					return user;
				}
			}
		}
	})
});

import { createHandler } from 'graphql-http/lib/use/express';

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

const app = express();

if (isDevelopment) {
	app.use(cors());
}

if (isProduction) {
	app.use(express.static('public'));
}

// all our api routes
app.get('/api/hello', (req, res) => {
	res.json({ message: 'World' });
});

app.all('/graphql', createHandler({ schema }));

// 404 fallback for client side routing
if (isProduction) {
	app.get('*', (req, res) => {
		res.sendFile('index.html', { root: 'public' });
	});
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

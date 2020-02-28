const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = graphql;

const movies = [
    { id: '1', name: 'Plup', genre: 'Crime', directorId: '1', },
    { id: '11', name: 'The Hateful Eight', genre: 'Crime', directorId: '1', },
    { id: '12', name: 'Inglourious Bastards', genre: 'Crime', directorId: '1', },
    { id: '13', name: 'Quentin Film Test', genre: 'Crime', directorId: '1', },
    { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2', },
    { id: '3', name: 'V for vendetta', genre: 'Triller', directorId: '3', },
    { id: '3', name: 'Revolver', genre: 'Triller', directorId: '3', },
    { id: '4', name: 'Harry Potter', genre: 'Fantasy', directorId: '4', },
];

const directors = [
    { id: '1', name: 'Quentin Tarantino', age: 55 },
    { id: '2', name: 'Martin Sh', age: 43 },
    { id: '3', name: 'Guy Ritchie', age: 77 },
    { id: '4', name: 'Some director', age: 131 },
];

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (parent, args) => {
                return movies.filter(movie => movie.directorId === parent.id);
            },
        },
    }),
});

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve: (parent, args) => {
                return directors.find(director => director.id === parent.id);
            },
        },
    }),
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return movies.find(movie => movie.id === args.id);
            },
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                return directors.find(director => director.id === args.id);
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve: () => movies,
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve: () => directors,
        },
    },
});

module.exports = new GraphQLSchema({
    query: Query,
});

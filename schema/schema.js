const graphql = require('graphql');
const _ = require('lodash');

// dummy data
var books = [
    { name: 'book-a', genre: 'gen-a', id: '1', authorID: '2' },
    { name: 'book-b', genre: 'gen-b', id: '2', authorID: '3' },
    { name: 'book-c', genre: 'gen-c', id: '4', authorID: '1' },
    { name: 'book-d', genre: 'gen-d', id: '3', authorID: '4' },
    { name: 'book-e', genre: 'gen-d', id: '5', authorID: '2' },
    { name: 'book-g', genre: 'gen-d', id: '6', authorID: '3' },
    { name: 'book-k', genre: 'gen-d', id: '7', authorID: '2' }
]
var authors = [
    { name: 'author-name-a', age: 11, id: '1' },
    { name: 'author-name-b', age: 12, id: '2' },
    { name: 'author-name-c', age: 13, id: '3' },
    { name: 'author-name-d', age: 14, id: '4' }

]

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type:AuthorType,
            resolve(parent, args) {
                // console.log(parent);
                return _.find(authors, { id: parent.authorID })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorID:parent.id});
            }
        }   
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // args.id;
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },

        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});
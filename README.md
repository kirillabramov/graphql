# graphql

For server running
npm run server
localhost:1313/

Check GraphQL docs. 
Little example below

Without params
```
query {
  movies {
    id
    name
    genre
  }
}
```
With params
```
{
  movie(id: "3") {
    id
    name
    genre
  }
}
```
or we can create id in variables below and do:
```
query($id: ID) {
  movie(id: $id) {
    id
    name
    genre
  }
}
```

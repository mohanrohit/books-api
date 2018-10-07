# Step 1

OK, so you have NodeJS installed and working, you have Express installed and working, you also have a working database. With these preliminaries out of the way, you can actually start writing the application. But hold on, let's take it in bite-sized pieces.

For this very first iteration, all we want to do is manage a list of books. Nothing more &mdash; no authors, no users, no reading lists, nothing. All we want to do are the four CRUD operations on a collection of `Book` objects. And all each `Book` will have is a `title`.

## The database

That's simple, you say. If that's indeed all we're doing, let's jump right in and create the `books` table in the database, and call it a day. Yes, creating a `books` table is indeed what you want to do &mdash; except you also want to keep an eye on the future.

### Databases and ORMs

Your database structure will change &mdash; that's a given. You'll add more tables; you'll add or remove columns from tables; you'll define relationships between tables &mdash; it's a dynamic, evolving system. You need a tool to manage that evolution; doing it manually will become cumbersome, fast.

Besides, in the application, we'll be using JavaScript objects for the data, but in the database, the data will be organized in rows and columns, *very* unlike an object. We'll need to manage the difference in representation of the data that the application sees versus that which the database sees. Let's take a look at an example (this will be a little taste of the future).

Say, in our application, a `Book` object has a list of `Author`s indicating which authors wrote that book. The `Author` object, similarly, has a list of *`Book`s* that author wrote. The application might model it like this:

```js
// The Book model

const book = {
  title: "Head First Design Patterns",
  authors: [
    "Eric Freeman",
    "Elisabeth Robson"
  ]
};
```

```js
// The Author model

const author = {
  name: "Eric Freeman",
  books: [
    "Head First Design Patterns",
    "Head First JavaScript Programming",
    "Head First HTML and CSS"
  ]
};
```

In the database, however, this information is represented differently, in rows and columns:

The `authors` table:

| id | name            |
|---:|-----------------|
|5   |Eric Freeman     |
|8   |J. K. Rowling    |
|9   |Elisabeth Robson |
|10  |E. R. Braithwaite|

The `books` table:

| id | title           |
|---:|-----------------|
|3   |Head First Design Patterns     |
|6   |To Sir, With Love    |
|8   |Harry Potter and the Prisoner of Azkaban |
|11  |Head First JavaScript Programming|
|12  |Head First HTML and CSS |


The `authors_books` association table (defines the many-to-many *associations* between `books` and `authors`):

| book_id | author_id |
|--------:|----------:|
|3        |5          |
|3        |9          |
|6        |10         |
|8        |8          |
|11       |5          |
|12       |5          |

As you might gather from these two drastically different data representations, translating the application’s data model to the database’s data model is a tedious task. Automation is the best remedy for tedium, and in this case, the remedy is called an Object Relational Mapper, or ORM. You tell the ORM how your data looks, how the relationships between the different objects in your application look, and the ORM will figure out how to map the application’s data to the database and back. 

But that’s not all an ORM is good for. Where it really shines is in managing the incremental modifications the database goes through as it changes and evolves. That's called data migration, and let’s get to that a bit later.

The most popular ORM for Postgres for NodeJS is `Sequelize`, and that's what we'll be using here.

### The `Sequelize` ORM

The first step, as you know by now, is to install the `sequelize` package, and have it added to `package.json`:

```bash
$ npm install sequelize --save
```

At this point, you can define your tables using `Sequelize`, but, again, with an eye to the future, let's not only *define* our tables using `Sequelize`, but also set up to *migrate* the data when the time comes.


### Database migrations

- Describe database migrations
- start a new migration
- install sequelize-cli --save-dev (reqd for dev only)
- sequelize init
  - creates config/ config/config.json models/ seeders/ migrations/
- rename config/config.json to config/config.js so that dynamic properties can be loaded
- set database specific values from process.env
- use .sequelizerc to change settings
- 
- sequelize model:create --name Book --attributes "title:string"
- creates a definition of the Book model and associated migration
- tweak fields, don't have to specify id, created_at, updated_at (they are expected)
- update config.json to include database credentials

## the api

### write the api

### test the api with curl

### test the api with postman

### switch to web application

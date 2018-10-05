# Step 1

## Requirements
- Manage a list of books
- CRUD operations on books
- Book contains only title

## the database layer

### ORM

- What is an ORM
- Why is it required
- Star application -- database migrations
- Which ORM are we using -- Sequelize

### The `Sequelize` ORM

```bash
$ npm install sequelize --save
```

Updates `package.json` to include `sequelize` as a dependency of this project.

### Database migrations

- Describe database migrations
- start a new migration
- install sequelize-cli --save-dev (reqd for dev only)
- sequelize init
  - creates config/ config/config.json models/ seeders/ migrations/
- sequelize model:create --name Book --attributes "title:string"
- creates a definition of the Book model and associated migration
- tweak fields, don't have to specify id, created_at, updated_at (they are expected)
- update config.json to include database credentials

## the api

### write the api

### test the api with curl

### test the api with postman

### switch to web application

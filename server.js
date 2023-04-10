const Sequelize = require('sequelize');
const connection_string = process.env.DATABASE_URL || 'postgres://localhost/mydb';
const conn = new Sequelize(connection_string)

const Thing = conn.define('thing', {
    name: {
        type: Sequelize.STRING,
        unique: true,   
    },
    stars: {
        type: Sequelize.INTEGER,
    }
});

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, async() => {
    try{
        console.log(`listening on port ${port}`);
        await conn.sync({ force: true });
        await Promise.all(['name1', 'name2', 'name3'].map( name => {
            return Thing.create({ name, stars:3 })
        }));
    }
    catch(ex) {
        console.log(ex);
    }
});



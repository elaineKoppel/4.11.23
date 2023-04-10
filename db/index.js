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

const Person = conn.define('person', {
    name: {
        type: Sequelize.STRING,
    }
})

module.exports = {
    conn, 
    Thing,
    Person,
}

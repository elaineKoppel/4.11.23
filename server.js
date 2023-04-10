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

const express = require('express');
const app = express();

app.get('/api/things', async(req, res, next) => {
    try {
        const things = await Thing.findAll({
        
        })
        res.send(things)
    } 
    catch(ex) {
        next(ex)
    } 
    
})
// app.get takes a path and a function with 3 inputs
// Thing.findAll() is a promise and needs await bc reference db 

app.get('/api/things/:id', async(req, res, next) => {
    try {
        const things = await Thing.findByPk(req.params.id)
                                        //findByPk searches by the :id provided 
        res.send(things)
    } 
    catch(ex) {
        next(ex)
    } 
    
})

app.get('/api/people', async(req, res, next) => {
    try {
        const people = await Person.findAll({
        
        })
        res.send(people)
    } 
    catch(ex) {
        next(ex)
    } 
    
})

app.get('/api/people/:id', async(req, res, next) => {
    try {
        const people = await Person.findByPk(req.params.id)
        res.send(people)
    } 
    catch(ex) {
        next(ex)
    } 
    
})

const port = process.env.PORT || 3000;

app.listen(port, async() => {
    try{
        console.log(`listening on port ${port}`);
        await conn.sync({ force: true });
        await Promise.all(['name1', 'name2', 'name3'].map( name => {
            return Thing.create({ name, stars:3 })
        }));
        await Promise.all(['name1', 'Elaine', 'name3'].map( name => {
            return Person.create({ name, stars:3 })
        }));
    }
    catch(ex) {
        console.log(ex);
    }
});




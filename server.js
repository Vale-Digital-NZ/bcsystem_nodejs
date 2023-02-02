const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    userNewUrlParser: true,
    useCreateIndex: true,
    userFindAndModify: false
}).then(con => {
    console.log(con.connections);
    console.log('DB connection suncessful!');
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on post ${port}!`));
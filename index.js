const fs = require ('fs');
const http = require ('http');
const url = require ('url');
const request = require('request');
const express = require('express')
const superagent = require ('superagent');;
const app = express();
const port = 3000;

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const homePage = fs.readFileSync(`${__dirname}/templates/home.html`, 'utf-8');
const dataObj = JSON.parse(data);

const readFilePro = file => {
    return new Promise( (resolve, reject) => {
        fs.readFile(file, (err,data) => {
            if(err) reject('I cound not find that file');
            resolve(data);
        })
    }) 
};

const writeFilePro = (file, data) => {
    return new Promise( (resolve, reject) => {
        fs.writeFile(file, data, err => {
            if(err) reject('I cound not write file');
            resolve('sucess');
        })
    }) 
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/txt/dog.txt`);
        console.log(`Breed: ${data}`);
        const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message);
        console.log(imgs);
        await writeFilePro(`${__dirname}/txt/dog-img.txt`, imgs.join('\n'));
        console.log('Random dog image saved to files!');
    } catch (err) {
        console.log(err);
    }
};
getDogPic();

app.get('/', function(req, res) {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(homePage);
});

app.listen(port, () => console.log(`Example app listening on post ${port}!`));
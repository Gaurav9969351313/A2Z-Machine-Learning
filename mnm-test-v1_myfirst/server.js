const fs = require('fs')
const csv = require('csvtojson');
const csvFilePath = "./BankFAQs.csv";

const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

var bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/getAnswer', (req, res) => { 
    console.log(req.body);
var ip = "may i know what is RTGS";
//"How will the online store know that I have Verified by Visa/ MasterCard SecureCode"
//"Can I continue using the Verified by Visa/MasterCard SecureCode/Protectbuy password for online transactions";

function getStemedSentence(ip) {
    var tokenArray = tokenizer.tokenize(ip);
    var stemArr = [];
    for (let i = 0; i < tokenArray.length; i++) {
        stemArr.push(natural.PorterStemmer.stem(tokenArray[i]));
    }
    return stemArr.join(' ');
}

csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        return jsonObj;
    })
    .then((dsArr) => {
        for (let i = 0; i < dsArr.length; i++) {
            // console.log(dsArr[i].Question + " == "+ getStemedSentence(dsArr[i].Question));
            tfidf.addDocument(getStemedSentence(dsArr[i].Question));
        }
        return dsArr;
    })
    .then((dsArr) => {
        var temp = [];
        tfidf.tfidfs(getStemedSentence(req.body.query), function (i, measure) {
            temp.push({ "index": i, "score": measure })
        });

        const maxScore = Math.max(...temp.map(o => o.score), 0);

        console.log("maxScore:- ", maxScore);

        for (let k = 0; k < temp.length; k++) {
            if (maxScore == temp[k].score) {
                console.log("Answer:- ", dsArr[k]);
                res.send( dsArr[k].Answer);
                break;
            }
        }
    });
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

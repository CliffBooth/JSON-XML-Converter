import express from 'express';
import * as dotenv from 'dotenv';
import * as parser from 'xml2json';

const app = express();
dotenv.config();

const port = process.env.PORT ?? 8080;

app.use(express.raw({ type: '*/*' }));

app.post('/xml-to-json', (req, res) => {
    const content: string = req.body.toString();
    try {
        const result = parser.toJson(content, {sanitize: false});
        console.log(`/xml-to-json body:\n${content}`);
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).end(`${result}`);
    } catch (err) {
        res.status(500).send('Input is not in XML format!')
    }
});

app.post('/json-to-xml', (req, res) => {
    const content: string = req.body.toString();
    try {
        const result = parser.toXml(content);
        console.log(`/json-to-xml body:\n${content}`);
        res.setHeader('Content-Type', 'text/plain');
        res.status(200).end(`${result}`);
    } catch (err) {
        res.status(500).end("Input is not in JSON format!");
    }
});

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});

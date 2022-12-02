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

app.all('/help', (_, res) => {
    res.status(200).end(`
        Welcome to JSON-XML-Converter service!
        use HTTP POST request to /json-to-xml endpoint to convert json to xml, json must be passed inside request body.
        use HTTP POST request to /xml-to-json endpoint to convert xml to json, xml must be passed inside request body.

        If you are using xml tag parameters, tag value will be corresponding to "$t" element in json.

        Examples:
        1)  input: "<foo attr=\"value\">bar</foo>"
            output: "{"foo":{"attr":"value","$t":"bar"}}"

        2)  input "{"foo":{"attr":"value","$t":"bar"}}"
            output: "<foo attr="value">bar</foo>"
    `.replace(/^ +/gm, '')
    );
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});

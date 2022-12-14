import { app } from '../src/app';
import request from 'supertest';

describe('testing /help', () => {
    test('The response status code must be 200, body must contain a string', async () => {
        const response = await request(app).get('/help');
        expect(response.status).toBe(200);
        expect(response.text).not.toBe(undefined);
        expect(response.text).not.toBe(''); //not empty
    });
});

describe('testing /xml-to-json', () => {
    test('The response status code must be 200, resulting json must be correct', async () => {
        const correctResponse = '{"foo":{"attr":"value","$t":"bar"}}';
        const { status, text } = await request(app)
            .post('/xml-to-json')
            .send('<foo attr="value">bar</foo>');
        expect(status).toBe(200);
        expect(text).toBe(correctResponse);
    });

    test('With incorrect input data, response status code should be 500 and result should be error string', async () => {
        const correctResponse = 'Input is not in XML format!';
        const { status, text } = await request(app)
            .post('/xml-to-json')
            .send('wrong input');
        expect(status).toBe(500);
        expect(text).toBe(correctResponse);
    });
});

describe('testing /json-to-xml', () => {
    test('The response status code must be 200, resulting json must be correct', async () => {
        const correctResponse = '<foo attr="value">bar</foo>';
        const { status, text } = await request(app)
            .post('/json-to-xml')
            .send('{"foo":{"attr":"value","$t":"bar"}}');
        expect(status).toBe(200);
        expect(text).toBe(correctResponse);
    });

    test('With incorrect input data, response status code should be 500 and result should be error string', async () => {
        const correctResponse = 'Input is not in JSON format!';
        const { status, text } = await request(app)
            .post('/json-to-xml')
            .send('wrong input');
        expect(status).toBe(500);
        expect(text).toBe(correctResponse);
    });
});

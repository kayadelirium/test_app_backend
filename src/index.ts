require('dotenv').config();

import express from 'express';

import cors from 'cors';
import { getChildrenHandler } from './controllers/node/getChildrenHandler';
import { getRootChildrenHandler } from './controllers/node/getRootChildrenHandler';
import { postChildHandler } from './controllers/node/postChildHandler';
import { putNodeHandler } from './controllers/node/putNodeHandler';
import { deleteNodeHandler } from './controllers/node/deleteNodeHandler';
import { getNodesHandler } from './controllers/node/getNodesHandler';
import WebSocket from 'ws';
import { IMessage } from './types/messages';

const app: express.Express = express();
const port = process.env.BACKEND_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//app.get('/nodes/:id', getNodeHandler);
app.get('/nodes/:id/children', getChildrenHandler);
app.get('/nodes/children', getRootChildrenHandler);
app.get('/nodes', getNodesHandler);
app.post('/nodes', postChildHandler);
app.delete('/nodes/:id', deleteNodeHandler);
app.put('/nodes/:id', putNodeHandler);

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => console.log(`listening on the ${port} port`));

let lastValue: number = 50;
const wsSliderServer = new WebSocket.Server({
    port: process.env.WS_SLIDER_PORT,
});

wsSliderServer.on('connection', (ws) => {
    console.log('client has been connected');
    ws.send(lastValue);
    ws.on('message', (msg) => {
        lastValue = msg;
        wsSliderServer.clients.forEach((client) => {
            if (ws !== client && client.readyState === WebSocket.OPEN)
                client.send(msg);
        });
    });
    ws.on('close', () => {
        console.log('client has been disconnected');
    });
});

const messages = [] as IMessage[];

const wsChatServer = new WebSocket.Server({ port: process.env.WS_CHAT_PORT });
wsChatServer.on('connection', (ws) => {
    console.log('client has been connected');
    messages.forEach((msg) => {
        ws.send(JSON.stringify(msg));
    });
    ws.on('message', (msg) => {
        messages.push(JSON.parse(msg) as IMessage);
        wsChatServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) client.send(msg);
        });
    });
    ws.on('close', () => {
        console.log('client has been disconnected');
    });
});

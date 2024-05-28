import express from 'express';
import bodyParser from 'body-parser';
import JSONS from './JSONS.js';  // Ensure this file contains the JSONS class defined earlier
import BaseResponse from './BaseResponse.js';  // Ensure this file contains the BaseResponse class defined earlier
import cors from 'cors';
const app = express();

const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,OPTIONS', // Allowed methods
    preflightContinue: false,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.options('/', cors(corsOptions)); 

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json())

function handleException(err, req, res, next) {
    const response = new BaseResponse();
    response.setStatus(400);
    res.status(400);
    response.setError(err.message);
    response.send(res);
}



app.use((err, req, res, next) => handleException(err, req, res, next));

app.all('/', async (req, res, next) => {
    try {
        const uid = req.query.uid;
        const updated = req.query.updated;  // assuming this might be used elsewhere

        if (!uid) {
            throw new Error("UUID is empty");
        }

        const json = new JSONS();
        const response = new BaseResponse();
        let data = await json.getByUId(uid);

        if (!data) {

            if (req.method === 'POST') {

                const post = req.body;

                if (!post || Object.keys(post).length === 0) {
                    throw new Error("POST body is empty");
                }

                await json.insert({
                    uuid: post.uid,
                    name: post.name,
                    data: post.data,
                    type: post.type
                });

                data = await json.getById(post.uid);
                response.setData(data).setStatus(201);
            } else if (req.method === 'GET') {
                throw new Error("Not found");
            } else {
                throw new Error("Unreachable");
            }
        } else if (req.method === 'PUT') {
            const post = req.body;

            if (!post || Object.keys(post).length === 0) {
                throw new Error("PUT body is empty");
            }

            await json.update(post.uid, {
                name: post.name,
                data: post.data,
                type: post.type
            });
            response.setStatus(200);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(data.data);
            return;
        }
        response.send(res);
    } catch (err) {
        next(err);
    }
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(handleException);

const port = 21098;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

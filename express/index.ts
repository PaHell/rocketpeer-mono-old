import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import Gun from 'gun';
import 'gun/axe';
import fs from 'fs';
import dotenv from 'dotenv';

// config
dotenv.config();
var protocol = 'http';
const port = process.env.PORT;
var corsOptions = {
    origin: 'http://localhost',
    //optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
// create app
const app: Express = express();
// use
app.options('*', cors());
app.use(cors(corsOptions));
app.use(Gun.serve);
app.use(express.static('/gun'));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

//var gunDev = Gun({web: server, file: 'testingDB'});
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8001;

import mailer from "./modules/mailer/index.js";


//middleware
app.use(express.json());
app.use(cors());


app.use("/mailer",mailer);

//endpoints

app.get('/', (req, res) => res.status(200).send('HELLO THIS IS WORKING API...'));


//listners
app.listen(port, () => console.log(`THE SERVER IS UP AND RUNNING ON: ${port}`));
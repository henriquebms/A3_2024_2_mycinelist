import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import 'reflect-metadata';
import express from 'express';
import GeminiService from './gemini.service.js';


const gemini = new GeminiService();
const app = express()
const port = 3001;

app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");

  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");

  res.header("Access-Control-Allow-Headers", "Content-Type");

  app.use(cors());

  next();
});
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.get('/hello-world-', (req, res) => {
  res.send('Hello World!')
})

app.get('/consultar', async (req, res) => {
  return res.send(await gemini.ask(req.body.question))
})

app.post('/recomendations', async (req, res) => {
  return res.send(await gemini.recomendations(req.body.question))
})

app.post('/recomendation', async (req, res) => {
  return res.send(await gemini.recomendation(req.body.question))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
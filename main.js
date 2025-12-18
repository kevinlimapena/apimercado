import { Client } from 'pg';
import express, { json } from 'express';

const app = express();
app.use(json());

const con = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false }
});

con.connect()
    .then(() => console.log("PostgreSQL conectado"))
    .catch(err => console.error("Erro ao conectar:", err));


app.get('/produtos', async (req, res) => {
    try {
        const result = await con.query('SELECT * FROM cliente');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.listen(3000, () => {
    console.log('API rodando em http://localhost:3000');
});

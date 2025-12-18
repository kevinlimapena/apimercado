import { Client } from 'pg';
import express from 'express';

const app = express();
app.use(express.json());

const con = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
    ssl: { rejectUnauthorized: false }
});

con.connect()
    .then(() => console.log("PostgreSQL conectado"))
    .catch(err => console.error("Erro ao conectar:", err.message));

app.get('/produtos', async (req, res) => {
    try {
        const result = await con.query('SELECT * FROM cliente');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});

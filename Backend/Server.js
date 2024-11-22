const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com o Banco de Dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '', // Substitua pela sua senha do MySQL
    database: 'restaurant_db' // Substitua pelo nome do seu banco de dados
});

// Conectando ao Banco de Dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.message);
        process.exit(1);
    } else {
        console.log('Conectado ao MySQL com sucesso!');
        // Criação da tabela, se não existir
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                table_number VARCHAR(50),
                items TEXT,
                total_price DECIMAL(10, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        db.query(createTableQuery, (err) => {
            if (err) {
                console.error('Erro ao criar tabela:', err.message);
            } else {
                console.log('Tabela orders verificada/criada com sucesso.');
            }
        });
    }
});

// Rota para receber pedidos
app.post('/orders', (req, res) => {
    const { tableNumber, items, totalPrice } = req.body;

    if (!tableNumber || !items || totalPrice === undefined) {
        return res.status(400).json({ error: 'Dados incompletos!' });
    }

    const query = `
        INSERT INTO orders (table_number, items, total_price)
        VALUES (?, ?, ?)
    `;
    db.query(query, [tableNumber, JSON.stringify(items), totalPrice], (err, results) => {
        if (err) {
            console.error('Erro ao inserir pedido:', err.message);
            return res.status(500).json({ error: 'Erro ao salvar o pedido.' });
        }

        res.status(201).json({ message: 'Pedido salvo com sucesso!', orderId: results.insertId });
    });
});

// Rota para listar todos os pedidos
app.get('/orders', (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar pedidos:', err.message);
            return res.status(500).json({ error: 'Erro ao buscar os pedidos.' });
        }

        res.status(200).json(results);
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

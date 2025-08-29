const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>API Status</title>
            <style>
                body { font-family: sans-serif; text-align: center; padding: 50px; background-color: #f8f9fa; }
                h1 { color: #2E7D32; }
                p { color: #333; font-size: 1.1em;}
                code { background-color: #e9ecef; padding: 4px 8px; border-radius: 4px; font-family: monospace; }
            </style>
        </head>
        <body>
            <h1>✅ VIT API is Live</h1>
            <p>This API is running correctly. The main functionality is at the <code>/bfhl</code> endpoint, which requires a <code>POST</code> request.</p>
        </body>
        </html>
    `);
});

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;

        const userId = "duggana_palli_29082003";
        const email = "reddy.dineshd09@gmail.com";
        const rollNumber = "22BKT0041";

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach(item => {
            if (!isNaN(item)) {
                const number = parseInt(item, 10);
                if (number % 2 === 0) {
                    even_numbers.push(String(number));
                } else {
                    odd_numbers.push(String(number));
                }
                sum += number;
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } else {
                special_characters.push(item);
            }
        });

        let reversed_string = alphabet_string.split('').reverse().join('');
        
        let concat_string = "";
        for (let i = 0; i < reversed_string.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_string[i].toUpperCase();
            } else {
                concat_string += reversed_string[i].toLowerCase();
            }
        }

        const response = {
            "is_success": true,
            "user_id": userId,
            "email": email,
            "roll_number": rollNumber,
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": String(sum),
            "concat_string": concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({
            "is_success": false,
            "error_message": error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
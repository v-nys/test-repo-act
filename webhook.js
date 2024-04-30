import express from 'express';

const app = express();
const PORT = 80;
app.use(express.json());
const VALID_SECRET = 'my-secret-pw';

app.post('/webhook', (req, res) => {
    const auth_header = req.headers.authorization;
    if (auth_header && auth_header.startsWith("Bearer ")) {
        const token = auth_header.substring(7);
        if (token === VALID_SECRET) {
            console.log('Received valid webhook:');
            res.status(200).send('Webhook processed successfully!');
        } else {
            console.log('Invalid token:', token);
            res.status(403).send('Forbidden: Invalid token');
        }
    }
    else {
        res.status(403).send('Forbidden: Missing authentication info');
    }

});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

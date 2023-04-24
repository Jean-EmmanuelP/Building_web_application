const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const port = process.env.port || 4001;

server.listen(port,() => {
    console.log(`Server is listening on http://localhost:${port}`);
});
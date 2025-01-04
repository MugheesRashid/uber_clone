const http = require("http")
const app = require("./app")
const PORT = process.env.PORT || 3000;
const { initialization } = require('./socket');

const server = http.createServer(app)

initialization(server);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

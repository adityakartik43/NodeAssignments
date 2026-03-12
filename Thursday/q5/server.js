import http from "http";

const port = 3010;

const server = http.createServer((req, res) => {

    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({
        message: "Success server",
        author: "Aditya"
    }));

});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
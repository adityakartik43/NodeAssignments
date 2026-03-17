import app from "./src/app.js";

const port = process.env.PORT || 4030;

app.listen(port, ()=>{console.log(`Server is running on ${port}`)});
import fs from 'fs';

//Async code

fs.readFile("data.txt", "utf-8", (error, content) => {
    if(error){
        console.log(error);
        return;
    }

    console.log(content);
})


//Sync code

const myData = fs.readFileSync("data.txt", "utf-8");

console.log(myData);
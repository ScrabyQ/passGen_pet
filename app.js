const Passwd = require("./modules/passgen");
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})

app.post('/get_password' ,(req, res) => {
    const pass = new Passwd();
    pass.length = +req.body.length
    let arr = []
    for (let i = 0; i < 10; i++){

        arr.push(pass.generate(req.body))
    }

    res.status(200).json(JSON.stringify(arr))

})



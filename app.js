const Passwd = require("./modules/passgen")

const pass = new Passwd(3);

for (let i = 0; i <= 9; i++){
    console.log(pass.generate({ LC_EN: true}))
}


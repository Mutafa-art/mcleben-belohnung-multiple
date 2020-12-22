const mineflayer = require('mineflayer');
const join = require("./join");

const accounts = [
    {
        username: "User Email 1",
        password: "User Password 1"
    }, 
    {
        username: "User Email 2",
        passowrd: "User Password 2"
    }
]

async function process () {
    for (let i = 0; i < accounts.length; i++) {
        var spawned = false
        var p = new Promise((resolve) => {
            var bot = mineflayer.createBot({
                host: "mcleben.net",
                port: 25565,
                username: accounts[i].username,
                password: accounts[i].password,
                version: "1.16.4"
            })
            
            
            bot.on("spawn", () => {
                if (spawned == false) {
                    spawned = true;
                    var options = {
                        mob: "Creeper"
                    }  
                    join(bot, options)
                } else {
                    setTimeout(() => {
                        bot.chat("/belohnung")
                    }, 100)
                }
            })

            bot.on('windowOpen', () => {
                console.log("a window opend")
                setTimeout(() => {
                    bot.clickWindow(22, 1, 0)
                    bot.quit()
                    resolve()
                }, 1000) 
            })
        })
        await p
        await Sleep(2000)  
    }
}

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

process()




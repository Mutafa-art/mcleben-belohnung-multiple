module.exports = async function (bot, options, cb) {
    cb = cb || noop
    var options = options
    var walking = false
    function diff (num1, num2) {
        if (num1 > num2) {
          return num1 - num2
        } else {
          return num2 - num1
        }
    }
    
    function Sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
    mtype = options.mob || "Creeper"
    const filter = e => e.type === 'mob' && e.mobType == mtype
    const mob = bot.nearestEntity(filter)
    if (!mob) {
        console.error("specified mob not found");
    } else {
        setTimeout(async () => {
            bot.lookAt(mob.position, true, async () => {
                bot.setControlState("forward", true)
                walking = true
                for (let i = 0; i < 200; i++) {
                    if (diff(bot.entity.position.x, mob.position.x) < 3 && diff(bot.entity.position.z, mob.position.z) < 3) {
                        bot.setControlState("forward", false)
                        walking = false
                        break;
                    }
                    await Sleep(100)
                }
                bot.lookAt(mob.position, true, () => {
                    setTimeout(() => {
                        console.log("Join: Bot clicked towards entity, hopefully hitting it!")
                        bot.activateEntity(mob)
                        cb()
                    }, 200)
                })
            })
        }, 500)
    }
}
function noop () {}

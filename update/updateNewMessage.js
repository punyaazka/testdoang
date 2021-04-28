const { plugins } = require('../module/plugins');
const helper = require('../module/helper');
const { Util } = require('../module/util');
const APP = require('../app.js');
require('console-stamp')(console, 'HH:MM:ss.l');

const DEBUG_LEVEL = process.env.DEBUG_LEVEL || 0
const ADMIN_ID = process.env.ADMIN_ID
const BOT_TOKEN = process.env.BOT_TOKEN
const SKIPME = true

var userbot_id = false

if (BOT_TOKEN) {
    let split = BOT_TOKEN.split(':')
    if (split.length < 2) {
        console.log('❌ TOKEN BOT Keliru!')
        process.exit(1)
    }
    userbot_id = split[0]
}

module.exports = function (tg, update) {
    if (SKIPME) {
        if (!userbot_id) {
            if (DEBUG_LEVEL > 0) console.log('🔖 FYI, userbot_id belum dapet - tidak perlu khawatir.')
            tg.getMe().then(result => userbot_id = result.id)
        }
    }

    let message = update.message

    if (SKIPME) {
        if (message.sender.user_id == userbot_id)
            return (DEBUG_LEVEL > 0) ? console.log('👟 skip me') : true
    }

    if (ADMIN_ID)
        if (!Util.punyaAkses(ADMIN_ID, message.sender.user_id)) {
            if (DEBUG_LEVEL > 0) {
                if (DEBUG_LEVEL > 0) console.log('❌ Dia tidak ada akses', message.sender.user_id)
            }
            return false
        }

    if (!message.content) return false
    let content = message.content


    // Mari kita deteksi event TEKS 

    if (!content.text) return false
    if (!content.text.text) return false

    let ketemu = false

    plugins.forEach(plugin => {
        if (!plugin.status) return false
        if (ketemu) return true
        let result = plugin.run(tg, update)
        if (result) {
            ketemu = true
            if (DEBUG_LEVEL > 0) console.log('-> 🥅 Terdeteksi:', { name: plugin.name, regex: plugin.regex })
        }
    })

    // modul helper
    if (!ketemu)
        Util.forEach(helper, help => help.run(tg, update, plugins))

}
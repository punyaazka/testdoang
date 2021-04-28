const { client_bot, client_user } = require('./module/client')
const { auth_user, auth_bot, get_auth_state, set_auth_state, type_auth_state } = require('./module/auth')
const { Telegram } = require('./Library/telegram')
const updateNewMessage = require('./update/updateNewMessage')
//const axios = require('axios')
//const { exec } = require('child_process');
require('console-stamp')(console, 'HH:MM:ss.l')

/*
HSUbot

Hasanudin H Syafaat
@hasanudinhs
banghasan@gmail.com

Support Grup Telegram @botindonesia
*/

const CONFIG = process.env
const WEBHOOK = CONFIG.WEBHOOK || false
const DEBUG_LEVEL = CONFIG.DEBUG_LEVEL || 0
const PESAN_TERBACA = true

//const client_bot = new MyClient('data_userbot').getClient()
//const client_user = new MyClient('data_botapi').getClient()

// variable tg aku samakan dengan library di GAS
const tg_bot = new Telegram(client_bot)
const tg_user = new Telegram(client_user)

function sendAuthClientUser(param) {
    try {
        client_user.invoke(param)
    } catch (e) {
        console.log(e)
    }
}

/*
function sendMessageBot(chat_id, text, parse_mode = false) {
    try {
        if (parse_mode) {
            tg_bot.sendMessage(chat_id, text, parse_mode)
        } else {
            tg_bot.sendMessage(chat_id, text)
        }
    } catch (e) {
        console.log(e)
    }
}

function sendPost(url, data) {
    try {
        axios.post(url, data)
    } catch (e) {
        console.log(e)
    }
}

function sendGet(url, data) {
    try {
        axios.get(url, data)
    } catch (e) {
        console.log(e)
    }
}
*/

let curAuthState = {}
let curAuthData = {}

client_bot
    .on('error', err => {
        console.error('Got error:', JSON.stringify(err, null, 2))
    })
    .on('destroy', () => {
        console.log('Destroy event')
    })

let cur_bot_id

client_bot.on('update', update => {

    try {
        // handle debugging
        let debugLog = ''
        if (DEBUG_LEVEL == 0) {
            // none
        } else if (DEBUG_LEVEL == 1) {
            debugLog = '📥 ' + update['_']
        } else if (DEBUG_LEVEL == 2) {
            debugLog = update
        } else {
            // nope
        }

        if (debugLog != '') {
            console.log(JSON.stringify(debugLog, null, 1))
        }

        // tangkap event
        let type, msg
        type = update._
        msg = update.message
        if (type == 'updateNewMessage' && update.message.sender.user_id != cur_bot_id) {
            let user_id, chat_id, text, tanda
            user_id = update.message.sender.user_id
            chat_id = update.message.chat_id
            text = msg.content.text.text
            tanda = text.substring(0, 1)
            if (CONFIG.ADMIN_ID == user_id) {
                if (/^([!\.\/]start)$/gi.exec(text)) {
                    let isClientUserStart = startClientUser(user_id)
                    if (isClientUserStart) {
                        var photo = "https://github.com/insaneazka/insaneazka/blob/main/insaneazka1.jpg?raw=true";
                        var data = {
    "chat_id": chat_id,
    "reply_markup": {
        "_": "replyMarkupInlineKeyboard",
        "rows": [
            [
                {
                    "_": "inlineKeyboardButton",
                    "text": "Donate Me",
                    "type": {
                        "_": "inlineKeyboardButtonTypeUrl",
                        "url": "http://saweria.co/insaneazka"
                    }
                }
            ],
            [
                {
                    "_": "inlineKeyboardButton",
                    "text": "Github",
                    "type": {
                        "_": "inlineKeyboardButtonTypeUrl",
                        "url": "http://github.com/insaneazka"
                    }
                },
                {
                    "_": "inlineKeyboardButton",
                    "text": "Telegram",
                    "type": {
                        "_": "inlineKeyboardButtonTypeUrl",
                        "url": "http://t.me/insaneazka"
                    }
                },
                {
                    "_": "inlineKeyboardButton",
                    "text": "Youtube",
                    "type": {
                        "_": "inlineKeyboardButtonTypeUrl",
                        "url": "http://saweria.co/insaneazka"
                    }
                }
            ]
        ]
    },
    "input_message_content": {
        '_': "inputMessagePhoto",
        "photo" :  tg_bot.typeFile(photo),
        "caption": tg_bot.parseMode("Hay Perkenalkan saya bot tolong gunakan saya degan bijak yah", false, false),
    }
}
tg_bot.invoke("sendMessage", data).catch(e => console.log(e))
                    } else {
                        tg_bot.sendMessage(user_id, "Start Client UserBot Gagal!")
                    }
                }

                if (tanda == "-" && text.includes(" ")) {
                    let input = text.split(" ")
                    let ada = false
                    let param = {}
                    if (input.length == 2) {
                        for (let x in type_auth_state) {
                            if ("-" + type_auth_state[x] == input[0]) {
                                curAuthData[type_auth_state[x]] = input[1]
                                param["_"] = set_auth_state[x]
                                param[type_auth_state[x]] = curAuthData[type_auth_state[x]]
                                ada = true
                                break
                            }
                        }
                    }
                    if (ada) {
                        sendAuthClientUser(param)
                    } else {
                        tg_bot.sendMessage(chat_id, "ulangi lagi!")
                    }
                }   
                if (/([!\.\/]exec)/gi.exec(text)) {
                     return eval(text.replace(/([!\.\/]exec)/ig,"")).catch(e => console.log(e))
           
               }
            } 
            if (/(\/json)/ig.exec(text)){
                try {
                        tg_bot.sendMessage(chat_id, JSON.stringify(update,null,2))
                } catch (e){
                        tg_bot.sendMessage(chat_id, e.message)
                }
            }
        } else if (type == 'updateOption' && update.name == 'my_id' && update.value && update.value['_'] == 'optionValueInteger' && update.value.value) {
            cur_bot_id = update.value.value;
            //console.log(cur_bot_id)
        }
    } catch (e) {
        console.log(e)
    }
})

client_user
    .on('error', err => {
        console.error('Got error:', JSON.stringify(err, null, 2))
    })
    .on('destroy', () => {
        console.log('Destroy event')
    })

let cur_user_id;

client_user.on('update', update => {

    try {
        // handle debugging
        let debugLog = ''
        if (DEBUG_LEVEL == 0) {
            // none
        } else if (DEBUG_LEVEL == 1) {
            debugLog = '📥 ' + update['_']
        } else if (DEBUG_LEVEL == 2) {
            debugLog = update
        } else {
            // nope
        }

        if (debugLog != '') {
            console.log(JSON.stringify(debugLog, null, 1))
        }

        if (WEBHOOK && curAuthState[cur_user_id] == get_auth_state[3]) {
            //sendPost(WEBHOOK, JSON.stringify(update))
        }

        // tangkap event
        switch (update['_']) {

            case 'updateNewMessage':
                if (PESAN_TERBACA) tg_user.viewMessages(update.message.chat_id, update.message.id)
                updateNewMessage(tg_user, update)
                break;

            case 'updateMessageSendSucceeded':
                break;

            case 'updateConnectionState':
                break;

            case 'updateOption':
                break;

            case 'updateAuthorizationState':

                /*
                    if (update.authorization_state['_'] == get_auth_state[3]) {
                        console.log("sleep")
                        setTimeout(function () {
                            console.log("done")
                            let pesan
                            exec("tar cfz ubot.tgz data_userbot/*", (error, stdout, stderr) => {
                                if (error) {
                                    pesan = `🚫 error: ${error.message}`
                                } else
                                    if (stderr) {
                                        pesan = `🚫 stderr: ${stderr}`
                                    } else {
                                        pesan = stdout
                                    }
                                console.log(pesan)
                            });
                            tg_user.sendDocument(445372887, "./ubot.tgz").catch(e => console.log(e))
                        }, 5000)
                    }
                */

                if (cur_user_id == CONFIG.ADMIN_ID) {
                    if (update.authorization_state['_'] == get_auth_state[0]) {
                        curAuthState[cur_user_id] = get_auth_state[0]
                        tg_bot.sendMessage(cur_user_id, "Silakan ketik <b>Nomor Ponsel</b>\nformat <code>-phone_number NOMOR</code>\nContoh <code>-phone_number 0123456789</code>", "HTML")
                    }

                    if (update.authorization_state['_'] == get_auth_state[1]) {
                        curAuthState[cur_user_id] = get_auth_state[1]
                        tg_bot.sendMessage(cur_user_id, "Silakan ketik <b>Auth Code</b>\nformat <code>-code NOMOR</code>\nContoh <code>-code 12345</code>", "HTML")
                    }

                    if (update.authorization_state['_'] == get_auth_state[2]) {
                        curAuthState[cur_user_id] = get_auth_state[2]
                        tg_bot.sendMessage(cur_user_id, "Silakan ketik <b>Password</b>\nformat <code>-password TEXT</code>\nContoh <code>-password qwerty123</code>", "HTML")
                    }

                    if (update.authorization_state['_'] == get_auth_state[3]) {
                        curAuthState[cur_user_id] = get_auth_state[3]
                        tg_bot.sendMessage(cur_user_id, "UserBot Client Authentication Berhasil!", "HTML")
                        tg_user.invoke("getActiveSessions").then(result => {
                            let pesan = "📥 Event: " + result._
                            for (var x in result.sessions) {
                                pesan += '\n\n🔑 Api_Id: ' + result.sessions[x].api_id
                                pesan += '\n📱 Model: ' + result.sessions[x].device_model
                                pesan += '\n📲 Device: ' + result.sessions[x].platform
                                pesan += '\n🔧 System: ' + result.sessions[x].system_version
                                pesan += '\n💻 Ip: ' + result.sessions[x].ip
                                pesan += '\n🚪 Location: ' + result.sessions[x].country
                            }
                            tg_bot.sendMessage(cur_user_id, pesan)
                            //console.log(result)
                        });
                        tg_user.getMe().then(result => {
                            let pesan = "📥 Event: " + result._
                            pesan += '\n\n👤 First Name: ' + result.first_name
                            if (result.last_name) pesan += '\n👤 Last Name: ' + result.last_name
                            if (result.username) pesan += '\n🔰 Username: @' + result.username
                            if (result.phone_number) pesan += '\n☎️ Phone: ' + result.phone_number
                            pesan += "\n"
                            pesan += `\n- contact ${result.is_contact}`
                            pesan += `\n- mutual_contact ${result.is_mutual_contact}`
                            pesan += `\n- support ${result.is_support}`
                            tg_bot.sendMessage(cur_user_id, pesan)
                        });
                    }
                } else {
                    if (update.authorization_state['_'] == get_auth_state[0] || update.authorization_state['_'] == get_auth_state[1] || update.authorization_state['_'] == get_auth_state[2] || update.authorization_state['_'] == get_auth_state[3])
                        tg_bot.sendMessage(cur_user_id, 'Kamu tidak punya akses!')
                }
                break;

            default:
                break;
        }
    } catch (e) {
        console.log(e);
    }
})

let hasClientUser = false
function startClientUser(user_id) {
    try {
        if (!hasClientUser) {
            cur_user_id = user_id
            client_user.connect()
            client_user.login(() => auth_user)
            hasClientUser = true
        }
    } catch (e) {
        console.log(e)
    }
    return hasClientUser;
}

/*
process.on('uncaughtException', function(err) {
    console.log('Caught exception: ' + err);
});
*/

async function main() {
    await client_bot.connect()
    await client_bot.login(() => auth_bot)
}

main()

var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
const { Util } = require('../module/util');

let getuser = {
    name: 'getUser',
    status: true,
    regex: /^[!\/\.]getuser (\d+)$/i,
    clue: ['Mengecek User berdasarkan ID', 'Format: <code>.getuser ID</code>', '', 'contoh: <code>.getuser 213567634</code>'],
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            return tg.getUser(Number(cocok[1])).then(result => {
                // console.log(result)
                let pesan = `🆔 ID: ${result.id}\n\n👤 First Name: ${result.first_name}`
                if (result.last_name) pesan += '\n  └ Last Name: ' + result.last_name
                if (result.username) pesan += '\n🔰 Username: @' + result.username
                if (result.phone_number) pesan += '\n☎️ Phone: ' + result.phone_number
                pesan += `\n\n ⚜️ ${result.type._}`
                if (result.is_contact) pesan += `\n📱 ada dalam kontak`
                if (result.is_mutual_contact) pesan += `\n♾ mutual kontak`
                if (result.is_support) pesan += `\n♿️ support`
                if (result.is_verified) pesan += `\n✅ verified`

                if (result.is_scam) pesan += `\n👻 scam`
                if (result.is_fake) pesan += `\n👻 fake`
                if (result.have_access) pesan += `\n📑 punya akses`

                // console.log(result)
                return tg.sendMessage(message.chat_id, pesan)

            })
                .catch(result => tg.sendMessage(message.chat_id, `❌ <code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    }
}

let setBio = {
    name: 'setUsername   ',
    status: true,
    clue: ['Fungsi: keluar group', 'Format:<code>\n .sticker</code>'],
    regex: /^[!\/\.]setBio (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)
            tg.sendMessage(message.chat_id, "Bio Di atur").catch(e => console.log(e))
            return tg.setBio(cocok[1]).catch(e => console.log(e))
        }
    }
}

let setUsername  = {
    name: 'setUsername',
    status: true,
    clue: ['Fungsi: keluar group', 'Format:<code>\n .sticker</code>'],
    regex: /^[!\/\.]setusername (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)
            tg.sendMessage(message.chat_id, "username Di atur").catch(e => console.log(e))
            return tg.setUsername(cocok[1]).catch(e => console.log(e))
        }
    }
}

let deleteChatHistory  = {
    name: 'deleteChatHistory',
    status: true,
    clue: ['Fungsi: keluar group', 'Format:<code>\n .sticker</code>'],
    regex: /^[!\/\.](deleteChatHistory)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.deleteChatHistory(message.chat_id, true, true).catch(e => console.log(e))
            tg.sendChatAction(message.chat_id)
            return tg.sendMessage(message.chat_id, "chat dihapus").catch(e => console.log(e))
        }
    }
}

let broadcast  = {
    name: 'broadcast',
    status: true,
    clue: ['Fungsi: broadcast ke semuagroup', 'Format:<code>\n .bc</code>'],
    regex: /[!\/\.](bc)/gi,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            var data = low(new FileSync("./db/group.json")).getState().save.data.chat_ids;
           
            for (var row = 0; row < data.length; row++) {
                
                     tg.sendChatAction(message.chat_id)
                     tg.forwardMessage(data[row], message.chat_id, message.id, true).catch(result => tg.sendMessage(message.chat_id, `error\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
                
            }
            tg.sendChatAction(message.chat_id)
            return tg.sendMessage(message.chat_id, "selesai broadcast").catch(e => console.log(e))
        }
    }
}

let broadcastgroup  = {
    name: 'broadcastgroup',
    status: true,
    clue: ['Fungsi: broadcast ke semuagroup', 'Format:<code>\n .broadcastgroup</code>'],
    regex: /^[!\/\.](broadcastgroup)$/gi,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            
            if (!message.reply_to_message_id) return tg.sendMessage(message.chat_id, `❌ <code>Reply pesannya.</code>`, 'html', false, false, false, message.id)
            var data = low(new FileSync("./db/group.json")).getState().save.data.chat_ids;
           
            for (var row = 0; row < data.length; row++) {
                if (/(-.*)/ig.exec(data[row])) {
              
                     tg.forwardMessage(data[row], message.chat_id, message.reply_to_message_id, true).catch(result => tg.sendMessage(message.chat_id, `error\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
                }
            }
            tg.sendChatAction(message.chat_id)
            return tg.sendMessage(message.chat_id, "selesai broadcast").catch(e => console.log(e))
        }
    }
}

let broadcastprivate  = {
    name: 'broadcastprivate',
    status: true,
    clue: ['Fungsi: broadcast ke semuagroup', 'Format:<code>\n .broadcastprivate</code>'],
    regex: /^[!\/\.](broadcastprivate)$/gi,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            
            if (!message.reply_to_message_id) return tg.sendMessage(message.chat_id, `❌ <code>Reply pesannya.</code>`, 'html', false, false, false, message.id)
            var data = low(new FileSync("./db/group.json")).getState().save.data.chat_ids;
           
            for (var row = 0; row < data.length; row++) {
                if (! /(-.*)/ig.exec(data[row])) {
              
                     tg.forwardMessage(data[row], message.chat_id, message.reply_to_message_id, true).catch(result => tg.sendMessage(message.chat_id, `error\n<code>${result.message}</code>`, 'html', false, false, false, message.id))
                }
            }
            tg.sendChatAction(message.chat_id)
            return tg.sendMessage(message.chat_id, "selesai broadcast").catch(e => console.log(e))
        }
    }
}
let saveChats  = {
    name: 'saveChats',
    status: true,
    clue: ['Fungsi: save semua idchat', 'Format:<code>\n .saveChats</code>'],
    regex: /^[!\/\.](saveChats)$/gi,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            var db = low(new FileSync("./db/group.json"))
            db.defaults({save:{data:[]}}).write();
            tg.getChats(1000)
                .then(result => db.set('save.data', result).write())
                .catch(result => tg.sendMessage(message.chat_id, `❌ \n<code>${result.message}</code>`, 'html', false, false, false, message.id))
            
            tg.sendChatAction(message.chat_id)
            return tg.sendMessage(message.chat_id, "selesai broadcast").catch(e => console.log(e))
        }
    }
}

let chatList = {
    name: 'chatList',
    status: true,
    clue: ['Fungsi: melihat daftar chat pada userbot', 'Format:\n <code>.chatlist</code>'],
    regex: /^[!\/\.]chatlist$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            return tg.getChatList().then( result => {
                let pesan = '🗂 Daftar Chat:\n'
                Util.forEach(result, data => {
                    pesan += `\n 🔗 ${data.id} 👉🏼 ${data.title}`
                })
                return tg.sendMessage(message.chat_id, pesan, 'html', false, false, false, message.id)
            })
            .catch(result => tg.sendMessage(message.chat_id, `❌ <code>${result.message}</code>`, 'html', false, false, false, message.id))
            
        }
    }
}

let whois = {
    name: 'whois',
    status: true,
    clue: ['Fungsi: melihat detail user', 'Format:\n <code>.whois</code> reply pesannya'],
    regex: /^[!\/\.]whois$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {

            if (!message.reply_to_message_id) return tg.sendMessage(message.chat_id, `❌ <code>Reply pesannya.</code>`, 'html', false, false, false, message.id)

            return tg.getMessage(message.reply_in_chat_id, message.reply_to_message_id).then( async function (result) {
                // return console.log(result)
                let user_id = result.sender.user_id
                let user = {}
                user.info = await tg.getUser(user_id)
                user.detail = await tg.getUserFullInfo(user_id)
                console.log(user)
                // console.log(JSON.stringify(user.detail.photo, null, 2))

                let nama = user.info.first_name
                if (user.info.last_name) nama += ' ' + user.info.last_name

                let pesan = `🔰 ID : <code>${user.info.id}</code>`
                if (user.info.username) pesan += `\n  ├👤 @${user.info.username}`
                pesan += `\n  └🙋🏽 ${Util.clearHTML(nama)}`

                pesan += `\n\n🗒 Informasi`

                if (user.info.is_support) pesan += `\n  ├♿️ support`
                if (user.info.is_verified) pesan += `\n  ├✅ verified`
                if (user.info.is_scam) pesan += `\n  ├👻 scam`
                if (user.info.is_fake) pesan += `\n  ├👻 fake`

                if (user.detail.group_in_common_count) pesan+= `\n  ├👥 grup yang sama: <code>${user.detail.group_in_common_count}</code>`

                let lastSeen = false
                if (user.info.status) {
                    if (user.info.status.expires) lastSeen = user.info.status.expires
                    if (user.info.status.was_online) lastSeen = user.info.status.was_online
                }

                let waktuRelatif = lastSeen ? Util.timeDifference((lastSeen * 1000), new Date()) : '-'
                if (user.info.status._ == 'userStatusRecently' || user.info.type == 'userTypeBot' ) waktuRelatif = 'baru-baru ini.'
                pesan += `\n  └⏰ diketahui ${waktuRelatif}`

                if (user.detail.bio) pesan += `\n\n🎶 <i>${Util.clearHTML(user.detail.bio)}</i> 🎶`


                return tg.sendMessage(message.chat_id, pesan, 'html', false, false, false, message.id)
            })
            .catch(result => tg.sendMessage(message.chat_id, `❌ <code>${result.message}</code>`, 'html', false, false, false, message.id))
            
        }
    }
}
module.exports = {
    getuser, setBio, setUsername, deleteChatHistory, broadcast, saveChats, chatList, whois, broadcastgroup, broadcastprivate
}



    /*  sisa migrasi
            
        if (cocok = /^[!\/\.]getuserfull (\d+)$/i.exec(msg.text)) {
            return tg.getUser(cocok[1]).then(result => console.log(result)).catch(e => console.log(e))
        }
    
        if (cocok = /^[!\/\.](cari|cariUser) ([\w\d_]+)$/i.exec(msg.text)) {
            return tg.searchPublicChat(cocok[2]).then(result => {
                console.log(result)
            }).catch(e => console.log(e))
        }
    
        if (cocok = /^[!\/\.](searchAll|cariGlobal) (.+)$/i.exec(msg.text)) {
            // if (BOT_API) return tg.sendMessage(message.chat_id, '❌ Hanya untuk userbot.', 'html', false, false, false, message.id)
            return tg.searchPublicChats(cocok[2]).then(result => console.log(result))
                .catch(result => tg.sendMessage(message.chat_id, `<code>${result.message}</code>`, 'html', false, false, false, message.id))
        }
    
         */

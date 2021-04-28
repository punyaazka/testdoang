let grouphelp = {
    name: 'grouphelp',
    status: true,
    clue: ['Fungsi: keluar group', 'Format:<code>\n .sticker</code>'],
    regex: /^[!\/\.](leavechat)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id)
            tg.sendMessage(message.chat_id, "oke saya akan keluar").catch(e => console.log(e))
            return tg.leaveChat(message.chat_id).catch(e => console.log(e))
        }
    }
}
/*
let deleteallmessage = {
    name: 'deleteallmessage',
    status: true,
    clue: ['Fungsi: haous semua pesan', 'Format:<code>\n .delall</code>'],
    regex: /^[!\/\.](delall )/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (this.regex.exec(text)) {
            for(let i = text.replace(/[!\/\.](delall )/ig,""); i >= 0; i--) {
                try {
                    tg.deleteMessage(message.chat_id, i, true)
                } catch (e) {
                    console.error(e);
                }
        }
            
           return  tg.sendMessage(message.chat_id, "berhasil mengahapus pesan").catch(e => console.log(e))
        }
    }
}
*/
module.exports = {
    grouphelp
}

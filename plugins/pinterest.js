const { fetchJson } = require('../module/util');
const { Util } = require('../module/util');

let pinterest = {
    name: 'Pinterest',
    status: true,
    clue: ['Fungsi: Pinterest online', 'Format:\n<code>\n .pinterest kata\n .wikipedia bts</code>'],
    regex: /^[!\/\.]pinterest (.+)$/i,
    run: function (tg, update) {
        let message = update.message
        let text = message.content.text.text

        if (cocok = this.regex.exec(text)) {
            tg.sendChatAction(message.chat_id, 'photo')
            let url = 'https://insaneazka-freeapi.herokuapp.com/api/pinterest?text=' + cocok[1]

            let data = {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            }

            fetchJson(url, data).then(res => {
                var caption = "hay kamu ini hasilnya";
                return tg.sendPhoto(message.chat_id,  Util.random(res), caption, 'html').catch(e => console.log(e))
            })

        }
    }
}

module.exports = {
    pinterest
}

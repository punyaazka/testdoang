/*
HSTgLib

Library Telegram
(untuk TDLib/MTProto)

Sedang dibuat / disusun ulang dari awal, masih acakadul.

Hasanudin H Syafaat
Telegram/Twitter/IG: @hasanudinhs
Email: bangHasan@gmail.com
Support Grup: @botindonesia

*/

const { Util } = require('../module/util');

var insaneazka = class Insaneazka {

    constructor(token) {
        this.token = token;
    }

    request(method, parameters = false) {
        let data = {
            '_': method
        }

        if (parameters) {
            Util.forEach(parameters, (nilai, index) => {
                data[index] = nilai
            })
        }

        return this.token.request(data)
    }

    

}

module.exports = {
    insaneazka
}

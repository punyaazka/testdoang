const { Client } = require('tdl')
const { TDLib } = require('tdl-tdlib-addon')
const APP = require('../app.js')
// add timestamps in front of log messages
require('console-stamp')(console, 'HH:MM:ss.l')

const API_ID = process.env.API_ID;
const API_HASH = process.env.API_HASH;
const DEBUG_LEVEL = process.env.DEBUG_LEVEL || 0

const tdlib = new TDLib('./tdlib/libtdjson.so')

/*
// klass client support multi akun
class MyClient {
    constructor (name, index = 0) {
        this.index = index
        this.client = new Client(tdlib, {
            apiId: API_ID,
            apiHash: API_HASH,
            databaseDirectory: './' + name + '/_td_database' + (index > 0) ? index.toString() : '',
            filesDirectory: './' + name + '/_td_files' + (index > 0) ? index.toString() : '',

            skipOldUpdates: true,
            verbosityLevel: DEBUG_LEVEL,

            tdlibParameters: {
                enable_storage_optimizer: true,
                system_language_code: 'en',
                application_version: APP.versi,
                device_model: APP.nama,
                system_version: APP.system,
            }
        })
    }

    // instance client
    getClient() {
        return this.client
    }
}
*/

const client_user = new Client(tdlib, {
    apiId: API_ID,
    apiHash: API_HASH,
    databaseDirectory: './data_userbot/_td_database',
    filesDirectory: './data_userbot/_td_files',

    skipOldUpdates: true,
    verbosityLevel: DEBUG_LEVEL,

    tdlibParameters: {
        enable_storage_optimizer: true,
        system_language_code: 'en',
        application_version: APP.versi,
        device_model: APP.nama,
        system_version: APP.system,
    }
})

const client_bot = new Client(tdlib, {
    apiId: API_ID,
    apiHash: API_HASH,
    databaseDirectory: './data_botapi/_td_database',
    filesDirectory: './data_botapi/_td_files',

    skipOldUpdates: true,
    verbosityLevel: DEBUG_LEVEL,

    tdlibParameters: {
        enable_storage_optimizer: true,
        system_language_code: 'en',
        application_version: APP.versi,
        device_model: APP.nama,
        system_version: APP.system,
    }
})

module.exports = {
    //MyClient,
    client_user,
    client_bot
}

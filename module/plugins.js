const { Util } = require('./util');
require('console-stamp')(console, 'HH:MM:ss.l');

const DEBUG_LEVEL = process.env.DEBUG_LEVEL || 0
const PLUGINS = {
    bash: true,
    debugJSON: true, parseMode: true,
    foto: true, dokumen: true, video: true, audio: true, voice: true, sticker: true,
    getMe: true, invoke: true,
    pin: true, unpin: true, ping: true, pong: true,
    quotes: true, wikipedia: true,
    uploadFoto: true, uploadDokumen: true, uploadVideo: true,
    uploadAudio: true, uploadVoice: true, uploadSticker: true,
    getUser: true
}

let folder = "../plugins/"
let pathPlugins = require("path").join(__dirname, folder);

let plugins = []

if (DEBUG_LEVEL > 0) {
    console.log('🔎 Pengecekkan file plugins')
    console.log('     '.padEnd(25, '-'))
}

let i = 0
require("fs").readdirSync(pathPlugins).forEach(file => {
    let data = require(folder + file);
    let pesan = `[ ${file.padEnd(20, ' ')}] `
    let list = []
    Util.forEach(data, plugin => {
        i++
        if (!plugin.name || !plugin.regex || !plugin.run) {
            console.log('- ❌ Gagal load:', file)
            process.exit(1)
        }

        if (PLUGINS) {
            if (PLUGINS.hasOwnProperty(plugin.name))
                plugin.status = PLUGINS[plugin.name]
        }

        listName = DEBUG_LEVEL > 0 ? `[${plugin.status ? 'v' : 'x'}] ${plugin.name}` : plugin.name
        list.push(listName)
        plugins.push(plugin)
    })
    pesan += list.join(', ') + `... ✔️`
    if (DEBUG_LEVEL > 0) console.log(' 🔖 ', pesan)
});

if (DEBUG_LEVEL > 0) {
    console.log('     '.padEnd(25, '-'))
    console.log(`✅ Pengecekkan plugins selesai, total ${i} fungsi.\n`)
}

module.exports = { plugins }

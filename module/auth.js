
const auth_bot = {
	type: 'bot',
	token: process.env.BOT_TOKEN,			// in document say write this line but
	getToken: () => process.env.BOT_TOKEN	// if this line dont set pakase get error and dont work
}

const auth_user = {
	type: 'user'
}

//autentikasi nomor, code, password(two step auth)
const get_auth_state = ['authorizationStateWaitPhoneNumber', 'authorizationStateWaitCode', 'authorizationStateWaitPassword', 'authorizationStateReady']
const set_auth_state = ['setAuthenticationPhoneNumber', 'checkAuthenticationCode', 'checkAuthenticationPassword']
const type_auth_state = ['phone_number', 'code', 'password']

module.exports = {
	auth_user,
	auth_bot,
	get_auth_state,
	set_auth_state,
	type_auth_state
}
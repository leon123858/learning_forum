const aes = require('js-crypto-aes');
const { GetAes } = require('./database_url');

const enc = new TextDecoder('utf-8');
const ent = new TextEncoder('utf-8');
const key = GetAes('aesKey'); // 16 bytes or 32 bytes key in Uint8Array
const iv = GetAes('aesIv'); // 12 bytes IV in Uint8Array for AES-GCM mode
const additionalData = ent.encode('1234'); // optional AAD

// aes
// 	.encrypt(msg, key, { name: 'AES-GCM', iv, additionalData, tagLength: 16 })
// 	.then((encrypted) => {
// 		// now you get an Uint8Array of encrypted message
// 	});

// aes
// 	.decrypt(data, key, { name: 'AES-GCM', iv, additionalData, tagLength: 16 })
// 	.then((decrypted) => {
// 		// now you get an Uint8Array of decrypted message
// 	});

function bytesToString(bytes) {
	var chars = [];
	for (var i = 0, n = bytes.length; i < n; ) {
		chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
	}
	return String.fromCharCode.apply(null, chars);
}

function stringToBytes(str) {
	var bytes = [];
	for (var i = 0, n = str.length; i < n; i++) {
		var char = str.charCodeAt(i);
		bytes.push(char >>> 8, char & 0xff);
	}
	return new Uint8Array(bytes);
}

const decryptRoute = async (req, res, next) => {
	try {
		if (
			req.body.password != undefined ||
			req.body.personal_password != undefined
		) {
			const data = req.body.password || req.body.personal_password;
			const bytes = new Uint8Array(JSON.parse('[' + data.trim() + ']'));
			const decryptedArr = await aes.decrypt(bytes, key, {
				name: 'AES-GCM',
				iv,
				additionalData,
				tagLength: 16,
			});
			const decryptedStr = bytesToString(decryptedArr);
			const msg = decryptedStr.split('_');
			const dateBegin = new Date(parseInt(msg[2])); //将-转化为/，使用new Date
			const dateEnd = new Date(); //获取当前时间
			const dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
			const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
			if (dayDiff > 1) {
				res.render('alarm', {});
				return;
			}
			if (req.body.personal_password != undefined)
				req.body.personal_password = msg[1];
			req.body.password = msg[1];
		}
	} catch (err) {}
	next();
	return;
};

const encrypt = async (id, password) => {
	const date = new Date();
	const str = id + '_' + password + '_' + date.getTime().toString();
	const passwordArr = stringToBytes(str);
	const result = await aes.encrypt(passwordArr, key, {
		name: 'AES-GCM',
		iv,
		additionalData,
		tagLength: 16,
	});
	return result.toString();
};

module.exports.decryptRoute = decryptRoute;
module.exports.encrypt = encrypt;

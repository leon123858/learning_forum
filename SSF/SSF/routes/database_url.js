require('dotenv').config();

function GetUrl(database_name) {
	if (database_name == 'supServer') return process.env.supportServer;
	else return process.env.mongodbPlace;
}
function GetSAN(type) {
	switch (type) {
		case 'local_uri':
			return process.env.local_uri + '/SAN/activate/';
		case 'sendMailer':
			return process.env.sendMailer;
		case 'Gmail_ID':
			return process.env.sendMailer;
		case 'Gmail_password':
			return process.env.Gmail_password;
		case 'managePage':
			return process.env.managePage;
		default:
			return '';
	}
}

function GetAes(type) {
	const ent = new TextEncoder();
	switch (type) {
		case 'aesKey':
			return ent.encode(process.env.aesKey);
		case 'aesIv':
			return ent.encode(process.env.aesIv);
		default:
			return '';
	}
}

module.exports.GetAes = GetAes;
module.exports.GetUrl = GetUrl;
module.exports.GetSAN = GetSAN;

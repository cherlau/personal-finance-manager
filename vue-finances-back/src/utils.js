const jwt = require('jsonwebtoken')

function getUserId (context) {
	// "Authorization": "Bearer <token_jwt>"
	const Authorization = context.request.get('Authorization')
	if(!Authorization) throw new Error('Not authenticated!')

	const token = Authorization.replace('Bearer ', '')
	const { userId } = jwt.verify(token, process.env.JWT_SECRET)
	return userId
}

module.exports = {
	getUserId
}
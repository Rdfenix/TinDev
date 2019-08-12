const Dev = require('../models/Dev')

const LikeController = {
    async store(req, res) {

        const {
            devId
        } = req.params;
        const {
            user
        } = req.headers

        const loggedDev = await Dev.findById(user)
        const targetDev = await Dev.findById(devId)

        if (!targetDev) {
            return res.status(400).json({
                error: 'Dev not exists'
            })
        }

        if (targetDev.likes.includes(loggedDev._id)) {
            const loggedSocket = req.connectedUsers[user]
            const targetSocket = req.connectedUsers[devId]

            if (loggedSocket) {
                req.socket.to(loggedSocket).emit('match', targetDev)
            }

            if (targetSocket) {
                req.socket.to(targetSocket).emit('match', loggedDev)
            }
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save()

        return res.json(loggedDev)
    }
}

module.exports = LikeController
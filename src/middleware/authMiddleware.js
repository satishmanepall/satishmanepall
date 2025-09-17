const axios = require('axios')
const sauth0API = process.env.SAUTH0_URI
exports.authMiddleware = async (req, res, next) => {
    try {
        const apiKey = req.query.apiKey;
        const sender = req.query.sender;
        if (!apiKey) {
            return res.status(400).json({ error: "API Key Missing" })
        }
        const response = await axios.post(sauth0API + '/key/check',
            {
                apikey: apiKey
            }
        )
        if (response.data.statusCode === 1) {
            next()
        }
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err.message });
    }
}
const router = require('express').Router()
const User = require('../models/UserModel')

router.post('/home', async (req, res) => {
    const { userId } = req.body
    // console.log("Inside Home userId: ", userId)

    try {
        if (userId !== undefined && userId !== null) {
            const user = await User.findById(userId)
            
            if (user !== undefined || user !== null) { 
                return res.status(200).json({user : user})
            }
        }
        else {
            return res.status(400).json({msg : 'User Do not Exists'})
        }
    }
    catch (err) {
        return res.status(500).json({msg : "Internal Server Error"})
    }
})

module.exports = router
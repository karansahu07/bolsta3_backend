const utils = require('../../utils');
const userRoutes = require('./UserRoute');

const router = require('express').Router();
router.get('/admin', async(req, res, next)=>{
    try {
        res.apiResponse(200, 'working', [1,2,3])
    //    throw new utils.ApiError('this route is working', 400)
    } catch (error) {
        next(error);
    }
})

router.use('/user', userRoutes)

module.exports=router;
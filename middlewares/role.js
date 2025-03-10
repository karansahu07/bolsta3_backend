const isAdmin=(req, res, next)=>{
    if(req.auth.role!=="adm"){
        return res.send(401,null,"Only For Admin Route")
    }
    next()
}

module.exports = isAdmin
export default (req:ExpressRequest, res:ExpressResponse, next:ExpressNext) => {
    if(req.session && req.sessionID){
        next();
    }else{
        res.status(401).json("Unauthorized");
    }
    
}
export default (req:ExpressRequest, res:ExpressResponse, next:ExpressNext) => {
    if(req.session && req.session.sessionId){
        next();
    }
    res.status(401).json("Unauthorized");
}
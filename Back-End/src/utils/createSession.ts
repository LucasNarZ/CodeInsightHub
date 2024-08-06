export default (req:ExpressRequest, userId:string) => {
    if(!req.session.userId){
        req.session.userId = userId;
    }
    
}
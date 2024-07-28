export default (req:ExpressRequest, userId:string) => {
    req.session.userId = userId;
}
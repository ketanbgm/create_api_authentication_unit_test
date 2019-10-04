module.exports =  {
    authentication : () => {
        return (req, res, next) => {
            const token = req.header("Authorization");
            if(!token || token != "ketan")
                return res.status(401).json({"status" : false, "message" : "Missing or invalid token."})
            next();
        }
    }
}
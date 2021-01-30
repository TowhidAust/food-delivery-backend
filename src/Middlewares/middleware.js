exports.ensureToken = (req, res, next) => {
    console.log("checking middleware jwt token.")
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.send("your token is not verified. Try login again.")
    }
}
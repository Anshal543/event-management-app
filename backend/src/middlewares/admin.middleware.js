

// verify if user is admin or not
export const verifyAdmin = async (req, res, next) => {
    if (!req.user.isAdmin) return next(customError(401, "you are not authorized!"))
    next();
}


// // verify if user is admin or not
// export const verifyAdmin = (req, res, next) => {
//     if (!req.user.isAdmin && req.user._id !== req.params.userId) {
//         return next(customError(403, "You don't have permission to modify this resource!"));
//     }
//     next();
// };

export const verifyAdmin = (req, res, next) => {
    console.log(req.user)
    if (req.user && req.user.isAdmin === true) {
      next()
    } else {
      res.status(400).send({ message: 'You are not authorized as an admin!'})
    }
  }
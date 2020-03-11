// isAuthorizedToEditProfile
module.exports = (req, res, next) => {
  try {
    if (req.user && req.user._id.equals(req.params.userId)) {
      next();
    } else {
      return res.status(401).send({ error: "You are not authorized!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

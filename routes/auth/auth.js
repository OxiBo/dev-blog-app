module.exports = app => {
  app.get("/api/current_user", (req, res) => {
    // console.log(req.user)
    res.send(req.user);
  });
  
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};

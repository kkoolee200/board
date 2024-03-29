exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.status(403).send({
        result:'fail',
        error:('로그인 필요')
    })
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) next();
    else res.redirect(`/`);
};
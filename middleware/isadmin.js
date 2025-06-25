const isAdmin= (req, res, next) => { 
    console.log(req.user)
    if (req.user && req.user.role === 'admin') {
        return next();
    }

    return res.status(403).json({success: false, 
        message: "Access deined: Admins only"
    });
};

module.exports = isAdmin;

// same as authguard



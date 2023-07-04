export const session_validation = (req, res, next) => {
    if(!req.session.loged){
        res.redirect('/login')

    }else{ 
        next();
    }
}
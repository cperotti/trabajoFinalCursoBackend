export function auth(req, res, next) {
    console.log('auth',req.session)
    if(!req.session?.user){
        return res.status(401).send('Debe logearse para ingresar a esta vista')
    }
    next()
}

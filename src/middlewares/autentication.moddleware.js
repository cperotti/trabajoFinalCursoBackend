export function auth(req, res, next) {
    console.log('auth',req.session)
    // if(!req.session?.user?.role === 'admin'){
    //     return res.status(401).send('Error de autenticación')
    // }
    next()
}

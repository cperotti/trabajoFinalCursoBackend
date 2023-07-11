import winston from "winston";

const customLevels = {
    levels:{
        fatal:0,
        error:1, 
        warning:2,
        info:3,
        http:4, 
        debug:5, 
    },
    colors:{
        fatal:'red',
        error:'orange', 
        warning:'orange',
        info:'blue',
        http:'violet', 
        debug:'white',
    }
}

const loggerDev = winston.createLogger({
    levels: customLevels.levels,
    transports:[
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({
                    colors: customLevels.colors,
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename:'./errors.log', 
            level:'error'
        })
    ]
})

const loggerProd = winston.createLogger({
    levels: customLevels.levels,
    transports:[
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            filename:'./errors.log', 
            level:'error'
        })
    ]
})

const addLoggerDev = (req, res, next)=>{
    console.log(req)
    req.logger = loggerDev
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

const addLoggerProd = (req, res, next)=>{
    console.log(req)
    req.logger = loggerProd
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

export {
    loggerDev,
    loggerProd,
    addLoggerDev,
    addLoggerProd,
}



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
        error:'red', 
        warning:'yellow',
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
        /*new winston.transports.File({
            filename:'./errors.log', 
            level:'error',
            format: winston.format.simple()
        })*/
    ]
})

const loggerProd = winston.createLogger({
    levels: customLevels.levels,
    transports:[
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({
                    colors: customLevels.colors,
                }),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            filename:'./errors.log', 
            level:'error',
            format: winston.format.simple()
        })
    ]
})

const addLoggerDev = (req, res, next)=>{
    req.logger = loggerDev
    req.logger.debug(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

const addLoggerProd = (req, res, next)=>{
    req.logger = loggerProd
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}

export {
    loggerDev,
    loggerProd,
    addLoggerDev,
    addLoggerProd,
}



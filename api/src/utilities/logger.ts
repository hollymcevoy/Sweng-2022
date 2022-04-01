import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, prettyPrint, printf } = format

export class APILogger{
    public static format = printf(info =>{
        return `[${info.timestamp}] [${info.level}] => ${info.message}`
    })
    
    public static logger = createLogger({
        format: combine(
            label({label:'api errors'}),
            timestamp(),
            APILogger.format
        ),
        level:'info',
        transports:[
            new transports.File({filename:'apilogs.log'}),
            new transports.Console()
        ],

    })

}
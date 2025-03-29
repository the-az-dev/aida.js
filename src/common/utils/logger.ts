import {LoggerHistory} from "../globals";

export default function log(...args: any[]) {
    const current_date = new Date();
    LoggerHistory.push({ date: current_date, log: args.toString() });
    console.log(`[${current_date.toLocaleDateString()} | ${current_date.toLocaleTimeString()}] :: ${args.toString()}`);
}

log.asTrace = (...args: any[]) => {
    const current_date = new Date();
    LoggerHistory.push({ date: current_date, log: args.toString() });
    console.trace(`[${current_date.toLocaleDateString()} | ${current_date.toLocaleTimeString()}] :: ${args.toString()}`);
}
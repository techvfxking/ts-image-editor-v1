export class HelperService {

    public static logData = (data: any, logType: TLogType): void => {
        const timeStamp: string = this.returnTimeStamp();
        if (logType === "Info")
            console.log(timeStamp, data);
        else if (logType === "Error")
            console.error(timeStamp, data);
    };

    public static returnTimeStamp = (): string => {
        const timeStamp: Date = new Date();
        const formatString: string = "yyyy-MM-dd hh:mm:ss:zz tt";
        const formatttedDate = this.formatDate(timeStamp, formatString);
        return formatttedDate;
    };

    public static formatDate = (date: TDateStringNumber, format: string): string => {
        const dateObj: Date = new Date(date);

        const pad = (num = 0): string => num.toString().padStart(2, '0');

        const date_: number = dateObj.getDate();
        const dateDouble_: string = pad(date_);

        const month_: number = dateObj.getMonth() + 1;
        const monthDouble_: string = pad(month_);

        const year_: string = dateObj.getFullYear().toString();

        const hours_: number = dateObj.getHours();
        const smallHours_: string = pad(hours_ % 12 === 0 ? 12 : hours_ % 12);
        const largeHours_: string = pad(hours_);
        const isAM: boolean = hours_ < 12;

        const minutes_: string = pad(dateObj.getMinutes());
        const seconds_: string = pad(dateObj.getSeconds());
        const milliSeconds_: string = pad(dateObj.getMilliseconds());

        const tt_: TTimeZoneString = isAM ? "AM" : "PM";

        const monthStrings: TMonthDateNumberMapping = {
            "01": "Jan",
            "02": "Feb",
            "03": "Mar",
            "04": "Apr",
            "05": "May",
            "06": "Jun",
            "07": "Jul",
            "08": "Aug",
            "09": "Sep",
            "10": "Oct",
            "11": "Nov",
            "12": "Dec",
        };

        const map: TDateFormatMapping = {
            yyyy: year_,
            MMM: monthStrings[monthDouble_ as TMonthDates],
            dd: dateDouble_,
            DD: dateDouble_,
            d: date_,
            D: date_,
            MM: monthDouble_,
            M: month_,
            hh: smallHours_,
            HH: largeHours_,
            mm: minutes_,
            ss: seconds_,
            zz: milliSeconds_,
            tt: tt_,
        };

        // Sort the keys by length in descending order
        const sortedKeys: Array<string> = Object.keys(map).sort((a, b) => b.length - a.length);
        const pattern: RegExp = new RegExp(sortedKeys.join("|"), "g");

        format = format.replace(pattern, (match) => map[match as keyof TDateFormatMapping].toString());

        return format;
    };

    public static isNullOrEmpty = (data: unknown) => {
        if (data === undefined || data === null || (typeof (data) === "string" && data.trim() === ""))
            return true;
        else
            return false;
    };

    public static getNodeElements = (identifire: string, type: TQuerySelector, allowNull: boolean): TElementType => {
        try {
            let element: TElementType = undefined;
            if (type === "All")
                element = document.querySelectorAll(identifire);
            else
                element = document.querySelector(identifire);

            if (!allowNull && this.isNullOrEmpty(element))
                throw new Error(`The element we are trying to find for ${identifire}, that is 'Null' or 'Undefined'`);

            return element;
        } catch (error: unknown) {
            HelperService.logData(error, "Error");
            throw error;
        }
    }

    public static convertToString = (value: unknown) => {
        try {
            if (value === undefined || value === null)
                return "";
            else if (typeof value === "boolean")
                return String(value);
            else if (typeof value === "bigint" || typeof value === "number")
                return String(value);
            else if (typeof value === "string" && String(value).trim() === "")
                return "";
            else if (typeof value === "string" || typeof value === "symbol")
                return String(value);
            else if (typeof value === "object" || Array.isArray(value))
                return JSON.stringify(value);
            else
                return value;
        } catch (error) {
            this.logData(`Error converting object to string: ${error}`, "Error");
            return value;
        }

    }
}

export declare type TDateStringNumber = Date | string | number;
export declare type TQuerySelector = "All" | "Single";
export declare type TElementTypeBase = Element | null | undefined;
export declare type TElementType = TElementTypeBase | NodeListOf<Element>;
export declare type TLogType = "Info" | "Error";
export declare type TMonthDates = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";
export declare type TMonthValues = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";
export declare type TTimeZoneString = "AM" | "PM";
export declare type TMonthDateNumberMapping = {
    [key in TMonthDates]: TMonthValues;
}
export declare type TDateFormatMapping = {
    yyyy: string;
    MMM: TMonthValues;
    dd: string;
    DD: string;
    d: number;
    D: number;
    MM: string;
    M: number;
    hh: string;
    HH: string;
    mm: string;
    ss: string;
    zz: string;
    tt: TTimeZoneString;
}
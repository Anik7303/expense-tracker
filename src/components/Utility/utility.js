import * as databaseKeys from "../../database/keys";

export const addLeadingZero = (value) => {
    return value < 10 ? `0${value}` : value.toString();
};

export const addTrailingZeros = (value, count = 2) => {
    return Number.parseInt(value).toFixed(count);
};

export const formatDate = (date, month, year) => {
    return `${year}-${addLeadingZero(month)}-${addLeadingZero(date)}`;
};

export const getCurrentDate = () => {
    const x = new Date();
    return formatDate(x.getDate(), x.getMonth() + 1, x.getFullYear());
};

export const toList = (obj) =>
    Object.keys(obj).map((key) => {
        return {
            key: key,
            value: obj[key],
        };
    });

export const toCapitalize = (value) => value[0].toUpperCase() + value.substr(1);

export const toAbs = (value) => {
    return value > 0 ? value : value * -1;
};

export const formatColInfoData = (data) => {
    const temp = {
        ...data,
        income: toAbs(Number.parseInt(data.income)),
        expense: toAbs(Number.parseInt(data.expense)),
    };
    return { ...temp };
};

export const addEntryToColInfo = (info, entry) => {
    const updatedInfo = formatColInfoData(info);
    const value = toAbs(Number.parseInt(entry.amount));
    switch (entry.type) {
        case databaseKeys.INCOME:
            updatedInfo.income = updatedInfo.income + value;
            break;
        case databaseKeys.EXPENSE:
            updatedInfo.expense = updatedInfo.expense + value;
            break;
        default:
            throw new Error("wrong entry type used");
    }
    return { ...updatedInfo, updatedAt: new Date().getTime() };
};

export const addNumbers = (...numbers) => {
    return numbers.reduce((sum, val) => sum + Number.parseInt(val), 0);
};

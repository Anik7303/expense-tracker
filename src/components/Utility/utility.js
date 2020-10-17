import * as databaseKeys from "../../database/keys";

export const getCurrentDate = () => {
    const x = new Date();

    const addLeadingZero = (value) => {
        return value < 10 ? `0${value}` : value.toString();
    };

    const formatDate = (date, month, year) => {
        return `${year}-${addLeadingZero(month)}-${addLeadingZero(date)}`;
    };

    return formatDate(x.getDate(), x.getMonth(), x.getFullYear());
};

export const toList = (obj) =>
    Object.keys(obj).map((key) => {
        return {
            key: key,
            value: obj[key],
        };
    });

export const toCapitalize = (value) => value[0].toUpperCase() + value.substr(1);

export const formatColInfoData = (data) => {
    const temp = {
        ...data,
        income: Number.parseFloat(data.income),
        expense: Number.parseFloat(data.expense),
    };
    console.log({ temp });
    return { ...temp };
};

export const addEntryToColInfo = (info, entry) => {
    const updatedInfo = formatColInfoData(info);
    const value = Number.parseFloat(entry.amount);
    switch (entry.type) {
        case databaseKeys.INCOME:
            updatedInfo.income = (updatedInfo.income + value).toFixed(2);
            break;
        case databaseKeys.EXPENSE:
            updatedInfo.expense = (updatedInfo.expense + value).toFixed(2);
            break;
        default:
            throw new Error("wrong entry type used");
    }
    return { ...updatedInfo };
};

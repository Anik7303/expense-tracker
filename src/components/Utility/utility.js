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

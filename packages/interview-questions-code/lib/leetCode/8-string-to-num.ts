function stringToNumber(s: string) {
    const number = parseInt(s, 10);

    if(isNaN(number)) {
        return 0;
    } else if (number < Math.pow(-2, 31) || number > Math.pow(2, 31) - 1) {
        return number < Math.pow(-2, 31) ? Math.pow(-2, 31) : Math.pow(2, 31) - 1;
    } else {
        return number;
    }
}
console.log(stringToNumber(" -042"));
console.log(stringToNumber("1337c0d3"));
console.log(stringToNumber("0-1"));
console.log(stringToNumber("words and 987"));
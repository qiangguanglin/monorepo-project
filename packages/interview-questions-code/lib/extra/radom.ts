/**
 * 获取随机颜色
 * @returns
 */
function getRadomColor() {
    return "#" + Math.random().toString(16).substring(2, 8).padEnd(6, "0");
}
console.log("color", getRadomColor());

function getRadomString(len = 6) {
    if (len <= 11) {
        return Math.random()
            .toString(36)
            .substring(2, 2 + len)
            .padEnd(len, "0");
    } else {
        return getRadomString(11) + getRadomString(len - 11);
    }
}
console.log("string", getRadomString(12));

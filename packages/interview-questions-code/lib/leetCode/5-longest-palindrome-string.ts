/**
 * 最长回文子串
 *
 * 给你一个字符串 s，找到 s 中最长的回文子串。如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
 *
 * 示例 1：
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 *
 * 示例 2：
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 * 提示：
 * 1 <= s.length <= 1000
 * s仅由数字和英文字母组成
 */

/**
 * @abstract 暴力法
 */
function junglePalindromeString(s: string) {
    const reverseS = s.split("").reverse().join("");
    return s === reverseS;
}

function getLongestPalindromeString(s: string) {
    let res = "";
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length; j++) {
            const tempS = s.substring(i, j + 1);
            const jungleBo = junglePalindromeString(tempS);
            // console.log("0-====5555", tempS);
            if (jungleBo) {
                res = res.length >= tempS.length ? res : tempS;
            }
        }
    }
    return res;
}
console.log("func1", getLongestPalindromeString("babad"));
console.log("func1", getLongestPalindromeString("cbbd"));
console.log("func1", getLongestPalindromeString("a"));
console.log("func1", getLongestPalindromeString("abcba"));

/**
 * @abstract 固定窗口大小
 */
// 头尾对比，相对于全部反转可以少一半对比
function isPalindrome(s: string, start: number, end: number) {
    while (start < end) {
        if (s[start] !== s[end]) {
            return false;
        }
        start++;
        end--;
    }
    return true;
}
function getLongestPalindromeStringFixWindow(s: string) {
    let resString = "";
    for (let size = 1; size <= s.length; size++) {
        for (let i = 0; i <= s.length - size; i++) {
            const jungleBo = isPalindrome(s, i, i + size - 1);
            if (jungleBo) {
                const tempS = s.substring(i, i + size);
                if (tempS.length > resString.length) {
                    resString = tempS;
                    break;
                }
            }
        }
    }
    return resString;
}

console.log("func2", getLongestPalindromeStringFixWindow("babad"));
console.log("func2", getLongestPalindromeStringFixWindow("cbbd"));
console.log("func2", getLongestPalindromeStringFixWindow("a"));
console.log("func2", getLongestPalindromeStringFixWindow("abcba"));

/**
 * @abstract 固定窗口+动态规划
 */
// 头尾对比，相对于全部反转可以少一半对比
function isPalindromeNew(
    s: string,
    start: number,
    end: number,
    stringSet: Set<string>
): boolean {
    if (s[start] === s[end]) {
        if (stringSet.has(`${start + 1}-${end - 1}`)) {
            stringSet.add(`${start}-${end}`);
            return true;
        }
        if (end - 1 >= start + 1) {
            return isPalindromeNew(s, start + 1, end - 1, stringSet);
        }
        stringSet.add(`${start}-${end}`);
        return true;
    }
    return false;
}
function getLongestPalindromeStringDynamicProgram(s: string) {
    let stringSet: Set<string> = new Set();
    let resString = s[0];
    for (let size = 2; size <= s.length; size++) {
        for (let i = 0; i <= s.length - size; i++) {
            const jungleBo = isPalindromeNew(s, i, i + size - 1, stringSet);
            if (jungleBo && size > resString.length) {
                resString = s.substring(i, i + size);
                break;
            }
        }
    }
    return resString;
}
console.log("func3", getLongestPalindromeStringDynamicProgram("babad"));
console.log("func3", getLongestPalindromeStringDynamicProgram("cbbd"));
console.log("func3", getLongestPalindromeStringDynamicProgram("a"));
console.log("func3", getLongestPalindromeStringDynamicProgram("abcba"));
console.log(
    "func3",
    getLongestPalindromeStringDynamicProgram(
        "vbpgvehmsdocuqfnpzsqqsjbjkvzpqsubqbpjhzojdtkjcambviauhsxqvejgehzrhhvrgulubmirbppvbkftvazscxifsxtoarrdeyuihzcenqendvnthfdpotgpegdlaildigloesnfxkjichsxygazrvgbecuzkcdrgextmysxqerrueecpneynciasevytmatvqgleipwlaxwgajijkuceezmbtiigc"
    )
);

/**
 * @abstract 动态规划
 */
function getLongestString(s: string): string {
    let n = s.length;
    // 存储对应位置是否为回文字符串
    let dp = Array.from(new Array(n), () => new Array(n).fill(false));
    let ans = "";
    for (let len = 0; len < n; len++) {
        for (let i = 0; i + len < n; i++) {
            let j = i + len;
            if (len == 0) {
                dp[i][j] = true;
            } else if (len == 1) {
                dp[i][j] = s[i] == s[j];
            } else {
                dp[i][j] = s[i] == s[j] && dp[i + 1][j - 1];
            }
            if (dp[i][j] && len + 1 > ans.length) {
                ans = s.substring(i, i + len + 1);
            }
        }
    }
    return ans;
}
console.log("func4", getLongestString("babad"));
console.log("func4", getLongestString("cbbd"));
console.log("func4", getLongestString("a"));
console.log("func4", getLongestString("abcba"));
console.log(
    "func4",
    getLongestString(
        "vthbaypbzzfrgeqkfsazhvocumiiblrrcxprqhpdkifncwazfrhmimewubfxmgehebepiuhkvghnbtvyckioxavjcezgbpztkimjmugprtwhsbthytmznfdihgtiuogiixshdqhczbkhswgfqfeaxajozaazczvfbnhzgazmcvplwutfdoatytwxpoxyzggjysobgdkurqdocpakcaxzvfcpagipbqfdfwhzitlezfpdhayrroztwgfqmcfkrphzehxbyioqxxvusvhqktmdovrwlijwjdxccylqqhbfbsmmjpgknxpivysnvedjmnasjtaufzdopjmzfubyxcrfqwaulbqnhezmtaygstdtldkqeeeeqkdltdtsgyatmzehnqbluawqfrcxybufzmjpodzfuatjsanmjdevnsyvipxnkgpjmmsbfbhqqlyccxdjwjilwrvodmtkqhvsuvxxqoiybxhezhprkfcmqfgwtzorryahdpfzeltizhwfdfqbpigapcfvzxackapcodqrukdgbosyjggzyxopxwtytaodftuwlpvcmzagzhnbfvzczaazojaxaefqfgwshkbzchqdhsxiigouitghidfnzmtyhtbshwtrpgumjmiktzpbgzecjvaxoikcyvtbnhgvkhuipebehegmxfbuwemimhrfzawcnfikdphqrpxcrrlbiimucovhzasfkqegrfzzbpyabhtv"
    )
);

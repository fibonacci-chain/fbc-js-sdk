// 引入bech32和Buffer模块
const {bech32} = require('bech32'); //2.0.0
const {Buffer} = require('buffer');  //4.9.1

/**
 * 地址转化成Fibonacci地址
 * @param {Evm地址} evmAddress
 * @returns {*|string}
 */
function addressConvert(evmAddress) {
    if (validateETHAddress(evmAddress)) {
        // 0x开头,转换为bech32
        let hexAddr = evmAddress.slice(2);
        let words = bech32.toWords(Buffer.from(hexAddr, 'hex'));
        let fbAddress = bech32.encode('fb', words);
        return fbAddress;
    }
    return evmAddress;
}

/**
 * 地址恢复成EVM地址
 * @param {FibonacciChain 地址} FibonacciAddress
 * @returns {*|string}
 */
function addressRecover(FibonacciAddress) {
    if (validateFibonacciAddress(FibonacciAddress)) {
        let words = bech32.decode(FibonacciAddress).words;
        let addrBuf = Buffer.from(bech32.fromWords(words));
        return "0x" + Array.prototype.map.call(new Uint8Array(addrBuf), x => ('00' + x.toString(16)).slice(-2)).join('');
    }
    return FibonacciAddress;
}


/**
 * 验证FibonacciChain地址
 * @param {地址} addr
 * @returns
 */
function validateFibonacciAddress(addr) {
    try {
        const decodeAddress = bech32.decode(addr);
        return decodeAddress.prefix === "fb";
    } catch (err) {
        return false;
    }
};

/**
 * 验证是否是以太坊地址
 *
 * eth的地址，就是把公钥用sha256hash之后，取其后160位生成的16进制字符串（40个字符）再加上前缀“0x”（总共42位）
 *
 * @param {地址} addr
 */
function validateETHAddress(addr) {
    try {
        //判空 判开头
        if (!addr || addr.substring(0, 2) !== '0x') {
            return false
        }

        //判长度
        if (addr.substring(2, addr.length).length !== 40) {
            return false
        }

        //判能否转10进制
        ex16hex(addr)

        return true
    } catch (error) {
        console.debug(error, '----')
        return false
    }
}

// 16进制数转10进制
var ex16hex = function (value) {
    value = value.replace("0x", "");
    var arr = value.split("");
    arr = arr.reverse();
    var res = 0;

    for (let i = 0; i < arr.length; i++) {
        var num = hex_change(arr[i]);
        res += muti16(num, i);
    }

    return res;
}

// 字符转16进制数字
var hex_change = function (v) {
    var res;
    switch (v) {
        case "a":
            res = 10;
            break;
        case "b":
            res = 11;
            break;
        case "c":
            res = 12;
            break;
        case "d":
            res = 13;
            break;
        case "e":
            res = 14;
            break;
        case "f":
            res = 15;
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            res = Number(v);
            break;
        default:
            res = 0;
            break;
    }
    return res;
}

// 返回 v 乘以 n 个 16 的积
var muti16 = function (v, n) {
    var temp = v;
    for (var i = 0; i < n; i++) {
        temp *= 16;
    }
    return temp;
}


module.exports = {
    addressConvert,
    addressRecover
}


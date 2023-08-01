// 引入bech32和Buffer模块
const {bech32} = require('bech32'); //2.0.0
const {Buffer} = require('buffer');  //4.9.1

/**
 * 地址转化成Fibonacci地址
 * @param address
 * @returns {*|string}
 */
export function addressConvert(address) {

    if (address.substring(0, 2) === '0x') {
        // 0x开头,转换为bech32
        let hexAddr = address.slice(2);
        let words = bech32.toWords(Buffer.from(hexAddr, 'hex'));
        let fbAddress = bech32.encode('fb', words);

        return fbAddress;

    }

    return address;

}

/**
 * 地址恢复成EVM地址
 * @param address
 * @returns {*|string}
 */
export function addressRecover(address) {
    if (address.substring(0, 2) !== '0x') {
        let words = bech32.decode(address).words;
        let addrBuf = Buffer.from(bech32.fromWords(words));
        let hexAddr = '0x' + Buffer.prototype.map.call(new Uint8Array(addrBuf), x => ('00' + x.toString(16)).slice(-2)).join('');
        return hexAddr;
    }
    return address;
}
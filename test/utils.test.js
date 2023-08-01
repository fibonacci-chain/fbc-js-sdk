const {
    addressConvert,
    addressRecover,
} = require('../src/utils/index'); // 替换为你的地址处理模块路径

describe('addressConvert', () => {
    it('should convert valid EVM address to Fibonacci address', () => {
        const evmAddress = ''; // 替换为有效的 EVM 地址
        const expectedFibonacciAddress = ''; // 替换为预期的 Fibonacci 地址
        const result = addressConvert(evmAddress);
        expect(result).toBe(expectedFibonacciAddress);
    });

    it('should return the input address for invalid EVM address', () => {
        const invalidEvmAddress = '0xinvalid'; // 替换为无效的 EVM 地址
        const result = addressConvert(invalidEvmAddress);
        expect(result).toBe(invalidEvmAddress);
    });
});

describe('addressRecover', () => {
    it('should recover valid Fibonacci address to EVM address', () => {
        const fibonacciAddress = ''; // 替换为有效的 Fibonacci 地址
        const expectedEvmAddress = ''; // 替换为预期的 EVM 地址
        const result = addressRecover(fibonacciAddress);
        expect(result).toBe(expectedEvmAddress);
    });

    it('should return the input address for invalid Fibonacci address', () => {
        const invalidFibonacciAddress = 'fb1invalid'; // 替换为无效的 Fibonacci 地址
        const result = addressRecover(invalidFibonacciAddress);
        expect(result).toBe(invalidFibonacciAddress);
    });
});


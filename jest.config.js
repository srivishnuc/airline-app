module.exports = {
 testEnvironment: 'jsdom',
 testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
 moduleFileExtensions: ['js', 'jsx'],
 moduleNameMapper: {
  '^axios$': '<rootDir>/__mocks__/axios.js',
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
   '<rootDir>/__mocks__/fileMock.js',
  '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
 }
};

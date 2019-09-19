module.exports = {
    root: true,
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
      
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        parser: 'babel-eslint',
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
       
    ],
    "rules": {
        "quotes":["error", "single"],
        "no-console":[0]
    }
};
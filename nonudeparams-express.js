const traverse = require('./traverse')

module.exports = (
  request,
  expectedParameterSource,
  parameterKeys
) => {
  const params = request[expectedParameterSource];
  let emptyKeys = [];
  for (let i = 0; i < parameterKeys.length; i++) {
    const keyString = parameterKeys[i]
    const subKeys = expectedParameterSource == 'body' ? parseSubKeysIfDoesNotExist(keyString, params) : ''

    if (subKeys.length > 0) {
      emptyKeys.push(subKeys)
    }

    if (!params[keyString] || params[keyString].length === 0) {
        if (expectedParameterSource != 'body' || !keyString.includes('.')) {
            emptyKeys.push(keyString);
        }
    }
  }

  if (emptyKeys.length === 0) {
    return { isNude: false, keys: [] };
  } else {
    return { isNude: true, keys: emptyKeys };
  }
};



function parseSubKeysIfDoesNotExist(keyString, params) {
    if (keyString.includes('.')) {
        let keysArray = keyString.split('.');

        let isMissingKeys = false
        let missingKey = '';

        const traversedParams = traverse(params)
        const allParamKeys = traversedParams.nodes()

        if (keysArray.length > 2) {
          for (let i = 0; i < keysArray.length; i++) {
            const currentKey = keysArray[i]
            const currentParam = allParamKeys[i]

            if (!currentParam[currentKey]) {
              isMissingKeys = true
              missingKey = currentKey
              break
            }
          }
        } else if (!params[keysArray[0]] 
            || !params[keysArray[0]][keysArray[1]]
            || params[keysArray[0]][keysArray[1]].length === 0) {
              isMissingKeys = true
              return keyString
        }
        

        return isMissingKeys === true ? `${missingKey} in ${keyString}` : ''
    } else {
      return ''
    }
}
/**
 * An object handling HTTP request's nude parameters
 * @param {*} request the Express HTTP Request instance
 * @returns a new object instance handling the given HTTP request
 */
module.exports = function(request) {
  return new Nude(request)
};

function Nude(request) {
  this.request = request
}
/**
 * A method scanning the HTTP request for any missing required keys. 
 * @param {string[]} requiredKeys an array of strings defining the required keys in the request's headers
 * @returns `isNude`: boolean and `missingKeys`: string[]
 */
Nude.prototype.headers = function (requiredKeys) {
  return nudeHandler('headers', requiredKeys)
}

/**
 * A method scanning the HTTP request for any missing required keys in the `body`. 
 * @param {string[]} requiredKeys an array of strings defining the required keys in the request's body
 * @returns `isNude`: boolean and `missingKeys`: string[]
 */
Nude.prototype.body = function (requiredKeys) {
  return nudeHandler('body', requiredKeys)
}

/**
 * A method scanning the HTTP request for any missing required keys in the `query`. 
 * @param {string[]} requiredKeys an array of strings defining the required keys in the request's `query`
 * @returns `isNude`: boolean and `missingKeys`: string[]
 */
Nude.prototype.query = function (requiredKeys) {
  return nudeHandler('query', requiredKeys)
}

/**
 * Private methods
 */
const traverse = require('./traverse')
function nudeHandler(expectedParameterSource, parameterKeys) {
  const request = this.request

  const params = request[expectedParameterSource]
  let emptyKeys = []

  for (let i = 0; i < parameterKeys.length; i++) {
    const keyString = parameterKeys[i]
    const subKeys = expectedParameterSource == 'body' ? parseSubKeysIfDoesNotExist(keyString, params) : ''

    if (subKeys.length > 0) {
      emptyKeys.push(subKeys)
    }

    if (!params[keyString] || params[keyString].length === 0) {
        if (expectedParameterSource != 'body' || !keyString.includes('.')) {
            emptyKeys.push(keyString)
        }
    }
  }

  if (emptyKeys.length === 0) {
    return { isNude: false, missingKeys: [] }
  } else {
    return { isNude: true, missingKeys: emptyKeys }
  }
};



function parseSubKeysIfDoesNotExist(keyString, params) {
    if (keyString.includes('.')) {
        let keysArray = keyString.split('.')

        let isMissingKeys = false
        let missingKey = ''

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
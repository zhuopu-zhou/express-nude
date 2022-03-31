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
  return nudeHandler(this.request, 'headers', requiredKeys)
}

/**
 * A method scanning the HTTP request for any missing required keys in the `body`. 
 * @param {string[]} requiredKeys an array of strings defining the required keys in the request's body
 * @returns `isNude`: boolean and `missingKeys`: string[]
 */
Nude.prototype.body = function (requiredKeys) {
  return nudeHandler(this.request, 'body', requiredKeys)
}

/**
 * A method scanning the HTTP request for any missing required keys in the `query`. 
 * @param {string[]} requiredKeys an array of strings defining the required keys in the request's `query`
 * @returns `isNude`: boolean and `missingKeys`: string[]
 */
Nude.prototype.query = function (requiredKeys) {
  return nudeHandler(this.request, 'query', requiredKeys)
}

/**
 * Private methods
 */
const traverse = require('./traverse')
function nudeHandler(request, expectedParameterSource, parameterKeys) {
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

        // O(NM); where `N` = keysArray.length and `M` is `allParamKeys`
        if (keysArray.length > 2) {
          const traversedParams = traverse(params)
          const allParamKeys = traversedParams.nodes()  
          
          let keysArrayCopy = keysArray

          for (let i = 0; i < keysArray.length; i++) {
            const currentKey = keysArray[i]

            // Finds a matching key in the client's params.
            // Once found, removes the matching key from the keys array copy
            // TODO: - performance can be slightly more efficient by representing the `keysArrayCopy` as a stack
            for (let j = 0; j < allParamKeys.length; j++) {
              const currentParam = allParamKeys[j]
              if (currentParam[currentKey]) {
                keysArrayCopy = arrayRemove(keysArrayCopy, currentKey)
              }
            }
          }

          return keysArrayCopy.length == 0 ? '' : keyString
        } else if (!params[keysArray[0]] 
            || !params[keysArray[0]][keysArray[1]]
            || params[keysArray[0]][keysArray[1]].length === 0) {
              return keyString
        }
        

        return ''
    } else {
      return ''
    }
}

function arrayRemove(arr, value) { 
  return arr.filter(function(element) { 
      return element != value; 
  });
}
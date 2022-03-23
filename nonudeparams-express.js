const { request, response } = require("express");

module.exports = (
  request,
  response,
  expectedParameterSource,
  parameterKeys
) => {
  // if(expectedParameterSource.includes("body","params","query")===false){
  //     return("invalid request type")
  // }
  const params = request[expectedParameterSource];
  let emptyKeys = [];
  for (let i = 0; i < parameterKeys.length; i++) {
    const keyString = parameterKeys[i]
    const subKeys = parseSubKeysIfDoesNotExists(keyString, params)
    if (subKeys.length > 0) {
        emptyKeys.push(subKeys)

    }

    if (!params[keyString] || params[keyString].length === 0) {
        if (!keyString.includes(".")) {
            emptyKeys.push(keyString);
        }
    }
  }

  console.log(emptyKeys)
  if (emptyKeys.length === 0) {
    return true;
  } else {
    return emptyKeys;
  }
};



function parseSubKeysIfDoesNotExists(keyString, params) {
    if (keyString.includes(".")) {
        let substr = keyString.split(".");
        if (
          !params[substr[0]][substr[1]] ||
          params[substr[0]][substr[1]].length === 0
        ) {
          return [substr[0]+"."+substr[1]];
        } else {
          return [];
        }
      } else {
        return [];
      }
}
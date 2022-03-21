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
    if (parameterKeys[i].includes(".")) {
      substr = parameterKeys[i].split(".");

      if (
        !params[substr[0]][substr[1]] ||
        params[substr[0]][substr[1]].length === 0
      ) {
        emptyKeys = emptyKeys.push(substr[0], substr[1]);
      }
    }

    if (!params[parameterKeys[i]] || params[parameterKeys[i]].length === 0) {
      emptyKeys = emptyKeys.push(parameterKeys[i]);
    }
  }
  if (emptyKeys.length === 0) {
    return true;
  } else {
    return false;
  }
};

["fafs", "fsfs,gdfsgs,gfdsg,gfd"];

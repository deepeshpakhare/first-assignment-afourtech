


function createSuccessResponseData(dataPayLoad) {
    return {
      "meta" : {
        "code":0,
        "message" :"ok"
      },
      "data": {
        ...dataPayLoad
      }
    }
  }

 module.exports = {
    "createSuccessResponseData":createSuccessResponseData
  }
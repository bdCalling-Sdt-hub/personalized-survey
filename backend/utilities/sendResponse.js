const sendResponse = (res, status, message, result = null) => {
  const response = { success: false, message: "" };
  if (status >= 400) {
    response.success = false;
    response.error = result;
    response.message = "Internal server error";
  } else {
    response.success = true;
    response.data = result;
    response.message = "Successfully completed operations";
  }

  if (message) {
    response.message = message;
  }
  return res.status(status).send(response);
};

module.exports = sendResponse;

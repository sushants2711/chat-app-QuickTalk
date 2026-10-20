export const successResponse = (res, message = "Success", data = null) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const createdResponse = (
  res,
  message = "Created successfully",
  data = null,
) => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const badRequestResponse = (res, message = "Bad Request") => {
  return res.status(400).json({
    success: false,
    message,
  });
};

export const unauthorizedResponse = (res, message = "Unauthorized") => {
  return res.status(401).json({
    success: false,
    message,
  });
};

export const forbiddenResponse = (res, message = "Forbidden") => {
  return res.status(403).json({
    success: false,
    message,
  });
};

export const notFoundResponse = (res, message = "Resource not found") => {
  return res.status(404).json({
    success: false,
    message,
  });
};

export const validationErrorResponse = (res, message = "Validation failed") => {
  return res.status(422).json({
    success: false,
    message,
  });
};

export const internalServerErrorResponse = (
  res,
  message = "Internal Server Error",
) => {
  return res.status(500).json({
    success: false,
    message,
  });
};

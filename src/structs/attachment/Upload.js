const { object, string, number } = require("superstruct");

const Upload = object({
  file_name: string(),
  // TODO: add enum of accepted types
  file_type: string(),
  content_length: number(),
});

module.exports = Upload;

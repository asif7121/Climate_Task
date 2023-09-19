

const requestValidator = (schema, data = {}) => {
  const { error } = schema.validate(data);
  if (error) {
    return error.details[0].message.replace(/"/g, "") + ".";
  }
};
export default requestValidator;

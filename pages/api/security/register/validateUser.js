export function validateUser(err) {
  let errors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    email: "",
    username: "",
    password: "",
    confirm : ""
  };
  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};


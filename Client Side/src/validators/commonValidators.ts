// check if the email is empty or only whitespace
export const emailValidator = (email: string) => {
  if (!email || email.trim() === "") {
    return {
      type: "required",
      message: "Email is required",
    }; // verify that the email has the correct format
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      type: "pattern",
      message: "Invalid email format",
    };
  }
  return null;
};

// Check if the password is empty.
export const passwordValidator = (password: string) => {
  if (!password || password.length === 0) {
    return {
      type: "required",
      message: "Password is required",
    };
  }

  return null;
};

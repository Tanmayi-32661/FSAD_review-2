export const isBlank = (value: string) => value.trim().length === 0;

export const validateRequired = (label: string, value: string) =>
  isBlank(value) ? `${label} is required` : "";

export const validateEmail = (value: string) => {
  if (isBlank(value)) {
    return "Email is required";
  }
  return /\S+@\S+\.\S+/.test(value) ? "" : "Enter a valid email address";
};

export const validatePassword = (value: string) => {
  if (isBlank(value)) {
    return "Password is required";
  }
  if (value.length < 6) {
    return "Password must be at least 6 characters";
  }
  return "";
};

export const validatePhone = (value: string) => {
  if (isBlank(value)) {
    return "";
  }
  return /^[0-9]{10}$/.test(value.trim()) ? "" : "Phone number must be 10 digits";
};

export const validateCgpa = (value: string) => {
  if (isBlank(value)) {
    return "";
  }
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    return "CGPA must be a number";
  }
  return numeric >= 0 && numeric <= 10 ? "" : "CGPA must be between 0 and 10";
};

export const validatePositiveInteger = (label: string, value: number) =>
  Number.isInteger(value) && value > 0 ? "" : `${label} must be greater than 0`;

export const validateFutureOrTodayDate = (value: string) => {
  if (isBlank(value)) {
    return "";
  }
  const selected = new Date(value);
  if (Number.isNaN(selected.getTime())) {
    return "Enter a valid date";
  }
  return "";
};

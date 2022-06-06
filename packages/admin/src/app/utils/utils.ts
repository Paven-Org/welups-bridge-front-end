const sanitizeObject = (input: any) => {
  for (const key in input) {
    if (input.hasOwnProperty(key) && typeof input[key] == "string") {
      input[key] = input[key].trim();
    }
  }

  return input;
};

export { sanitizeObject };

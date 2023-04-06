function string(
  varName: string,
  defaultValue: string = ""
): string | undefined {
  const value = process.env[varName];
  return value === undefined ? defaultValue : value;
}

const env = {
  string,
};

export default env;

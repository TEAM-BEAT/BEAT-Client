export const numericFilter = (value: string) => {
  return value.replace(/\D/g, "");
};

export const phoneNumberFilter = (value: string) => {
  const numericValue = numericFilter(value);

  if (numericValue.length <= 3) {
    return numericValue;
  } else if (numericValue.length <= 7) {
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
  }
  return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7)}`;
};

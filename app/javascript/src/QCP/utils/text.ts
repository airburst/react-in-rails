export const titleCase = (text: string): string => {
  const transformed = text.toLowerCase().split(" ");
  for (let i = 0; i < transformed.length; i++) {
    transformed[i] =
      transformed[i].charAt(0).toUpperCase() + transformed[i].slice(1);
  }
  return transformed.join(" ");
};

export const snakeCase = (text = ""): string => {
  return text.toLowerCase().replace(/ /g, "_");
};

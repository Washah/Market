// function to capitalize first letter of each word
export const capitalizeWords = (str: string) => {
  if (typeof str === "string") {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
};

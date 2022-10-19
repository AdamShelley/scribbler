export const updateTitle = (rawMD) => {
  if (rawMD.length === 0) return "";

  const reg = /([^\n]+)/g;
  const firstLine = rawMD.match(reg)[0];
  return firstLine.replace(/[!@#$%^&*]/g, "");
};

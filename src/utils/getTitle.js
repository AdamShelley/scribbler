export const updateTitle = (rawMD) => {
  const reg = /([^\n]+)/g;
  const firstLine = rawMD.match(reg)[0];
  return firstLine.replace(/[!@#$%^&*]/g, "");
};

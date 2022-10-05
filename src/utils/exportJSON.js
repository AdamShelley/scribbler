export const exportTxtFile = () => {
  const scribbles = sessionStorage.getItem("scribbles");
  const scribblesJSON = JSON.stringify(scribbles, null, 2);
  const removedSpecial = scribblesJSON.replaceAll("\\", "");

  const filename = "scribbles.json";
  const contentType = "application/json;charset=utf-8";

  let a = document.createElement("a");
  a.download = filename;
  a.href = "data:" + contentType + "," + encodeURIComponent(removedSpecial);

  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

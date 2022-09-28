export const filterOrder = (currentOrder) => {
  console.log("Changing filter order");

  const options = ["Newest", "Oldest", "A-Z", "Z-A"];

  const currentScribbleOrder = currentOrder;
  const currentOrderIndex = options.indexOf(currentScribbleOrder);
  let newIndex = currentOrderIndex;

  if (newIndex === options.length - 1) {
    newIndex = 0;
  } else {
    newIndex++;
  }

  return { scribbleOrder: options[newIndex] };
};

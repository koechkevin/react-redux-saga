export default (array, currentPosition, newPosition) => {
  if (newPosition >= array.length) {
    let i = newPosition - array.length + 1;
    while (i--) {
      array.push(undefined);
    }
  }
  array.splice(newPosition,0,array.splice(currentPosition, 1)[0]);
  return array;
};

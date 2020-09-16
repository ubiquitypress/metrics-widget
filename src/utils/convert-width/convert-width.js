const convertWidth = width => {
  if (typeof width === 'number') return `${width}%`;
  if (typeof width !== 'string') return '0%';
  return width[width.length - 1] === '%' ? width : `${width}%`;
};

export default convertWidth;

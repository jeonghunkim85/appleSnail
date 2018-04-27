export const map = (from, to)  => {
    return Object.keys(to).reduce((obj, key) => {
      obj[key] = from[key]
      return obj;
    }, {});
};




export const addressGenerator = () => {
  return new Date().toISOString();
};

export const amountGenerator = () => {
  return Number((Math.random() * Math.random() * 10).toPrecision(4));
};

export const txHashGenerator = () => {
  return (new Date().getMilliseconds() * Math.random() * 100).toFixed();
};

export const idGenerator = () => {
  return new Date().getMilliseconds();
};

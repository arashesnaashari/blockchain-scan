export const dec2hex = (dec: number) => {
  return dec.toString(16).padStart(2, '0');
};

export const generateId = (len: number) => {
  const arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join('');
};

export const addressGenerator = () => {
  return `0x${generateId(40)}`;
};

export const amountGenerator = () => {
  return Number((Math.random() * Math.random() * 10).toPrecision(4));
};

export const txHashGenerator = () => {
  return `0x${generateId(45)}`;
};

export const idGenerator = () => {
  return generateId(8);
};

export const randomArrSelect = <T>(arr: Array<T>): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const fitString = (val: string, step = 6): string => {
  return `${val?.slice(0, step)}...${val?.slice(-step)}`;
};

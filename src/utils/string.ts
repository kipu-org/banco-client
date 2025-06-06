export const shorten = (
  text: string | null | undefined,
  length = 6
): string => {
  if (!text) return '';

  const textLength = text.length;

  if (textLength < length * 2) {
    return text;
  }

  let amount = length;

  if (textLength <= 12) {
    amount = Math.min(2, length);
  } else if (textLength <= 24) {
    amount = Math.min(4, length);
  }

  const beginning = text.slice(0, amount);
  const end = text.slice(text.length - amount);

  return `${beginning}...${end}`;
};

export const addEllipsis = (
  text: string | null | undefined,
  length = 16
): string => {
  if (!text) return '';

  const textLength = text.length;

  if (textLength <= length) {
    return text;
  }

  const beginning = text.slice(0, length);

  return `${beginning}...`;
};

export const getAddressFromBip21 = (str: string) => {
  if (!str.includes(':')) return str;

  const prefix = str.split(':');
  const params = prefix[1].split('?');
  const address = params[0];

  return address;
};

export const getAmountFromBip21 = (str: string) => {
  if (!str.includes('?')) return '-';

  const params = str.split('?');
  const paramsDecoded = new URLSearchParams(params[1]);
  const amount = Number(paramsDecoded.get('amount'));
  const amountInSats = amount * 100_000_000;
  return amountInSats.toFixed(0);
};

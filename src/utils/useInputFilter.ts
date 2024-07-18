export const numericFilter = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

export const phoneNumberFilter = (value: string) => {
  const numericValue = numericFilter(value);

  if (numericValue.length <= 3) {
    return numericValue;
  } else if (numericValue.length <= 7) {
    return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
  }
  return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7)}`;
};

export const priceFilter = (value: string) => {
  const numericValue = numericFilter(value);
  if (!numericValue) {
    return "";
  }

  let result = "";
  let count = 0;

  for (let i = numericValue.length - 1; i >= 0; i--) {
    if (count !== 0 && count % 3 === 0) {
      result = `,${result}`;
    }
    result = numericValue[i] + result;
    count++;
  }

  return result;
};

export const nameFilter = (value: string) => {
  return value.replace(/[^A-Za-zㄱ-힣]/gi, "");
};

// 이모지 및 이모지 조합을 올바르게 인식하는 함수
export const splitGraphemes = (str: string): string[] => {
  const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
  const segments = segmenter.segment(str);
  return Array.from(segments, (segment) => segment.segment);
};

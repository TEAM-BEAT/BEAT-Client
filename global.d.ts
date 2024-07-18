declare namespace Intl {
  class Segmenter {
    constructor(locales?: string | string[], options?: SegmenterOptions);
    segment(input: string): Iterable<SegmentData>;

    static supportedLocalesOf(locales: string | string[], options?: SegmenterOptions): string[];
  }

  interface SegmenterOptions {
    granularity?: "grapheme" | "word" | "sentence";
  }

  interface SegmentData {
    segment: string;
    index: number;
    input: string;
    isWordLike?: boolean;
  }
}

export type ImageType = "landscape" | "portrait";

interface GridItem {
  rowStart: number,
  rowEnd: number,
  colStart: number,
  colEnd: number,
}
interface LayoutSizes {
  [size: number]: Layout[],
};
interface Layout {
  order: ImageType[],
  grid: GridItem[],
};

export const longAspect = "8 / 3";
export const landscapeAspect = "4 / 3";
export const portraitAspect = "4 / 6";

export const layouts: LayoutSizes = {
  5: [
    {
      order: ["landscape", "landscape", "landscape", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 3 },
        { rowStart: 3, rowEnd: 3, colStart: 1, colEnd: 1},
        { rowStart: 3, rowEnd: 3, colStart: 2, colEnd: 2},
      ]
    },
    {
      order: ["portrait", "landscape", "landscape", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 3, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
        { rowStart: 3, rowEnd: 3, colStart: 1, colEnd: 1 },
        { rowStart: 3, rowEnd: 3, colStart: 2, colEnd: 2 },
      ]
    },
    {
      order: ["landscape", "landscape", "portrait", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 4, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
        { rowStart: 3, rowEnd: 3, colStart: 2, colEnd: 2 },
      ]
    },
    {
      order: ["landscape", "landscape", "landscape", "landscape", "portrait"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1 },
        { rowStart: 3, rowEnd: 3, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 4, colStart: 2, colEnd: 2 },
      ]
    }
  ],
  4: [
    {
      order: ["landscape", "landscape", "landscape", "portrait"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 3 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1 },
        { rowStart: 3, rowEnd: 3, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 4, colStart: 2, colEnd: 2 },
      ],
    },
    {
      order: ["landscape", "portrait", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 3 },
        { rowStart: 2, rowEnd: 4, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
        { rowStart: 3, rowEnd: 3, colStart: 2, colEnd: 2 },
      ]
    },
    {
      order: ["landscape", "landscape", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1, },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2, },
      ]
    },
    {
      order: ["portrait", "portrait", "portrait", "portrait"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1, },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2, },
      ]
    },
    {
      order: ["landscape", "landscape", "portrait", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 3, colStart: 2, colEnd: 2 },
        { rowStart: 3, rowEnd: 3, colStart: 1, colEnd: 3 },
      ]
    },
    {
      order: ["portrait", "landscape", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 3, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
        { rowStart: 3, rowEnd: 3, colStart: 1, colEnd: 3 },
      ]
    },
    {
      order: ["landscape", "landscape", "portrait", "portrait"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
      ]
    },
    {
      order: ["portrait", "portrait", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
      ]
    },
    {
      order: ["landscape", "portrait", "portrait", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 3 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
        { rowStart: 3, rowEnd: 3, colStart: 1, colEnd: 3 },
      ]
    },
  ],
  3: [
    {
      order: ["landscape", "landscape", "portrait"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 3, colStart: 2, colEnd: 3 },
      ]
    },
    {
      order: ["portrait", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 3, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
      ]
    },
    {
      order: ["landscape", "landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 3 },
      ]
    },
    {
      order: ["landscape", "portrait", "portrait"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 3 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 1 },
        { rowStart: 2, rowEnd: 2, colStart: 2, colEnd: 2 },
      ]
    },
    {
      order: ["portrait", "portrait", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
        { rowStart: 2, rowEnd: 2, colStart: 1, colEnd: 3 },
      ]
    }
  ],
  2: [
    {
      order: ["landscape", "landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
      ]
    },
    {
      order: ["portrait", "portrait"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
        { rowStart: 1, rowEnd: 1, colStart: 2, colEnd: 2 },
      ]
    }
  ],
  1: /* Single landscape by itself */ [
    {
      order: ["landscape"],
      grid: [
        { rowStart: 1, rowEnd: 1, colStart: 1, colEnd: 1 },
      ]
    }
  ],
};

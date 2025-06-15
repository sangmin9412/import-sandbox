export const basePath = "/";

export const publicImages = {
  cards: ["/images/cards/1.webp", "/images/cards/2.webp", "/images/cards/3.webp", "/images/cards/4.webp"],
  photos: ["/images/photos/1.webp", "/images/photos/2.webp", "/images/photos/3.webp"]
};

export const DEFAULT_CARD_FILTER_OPTIONS = {
  region: [
    {
      label: "All",
      value: ""
    },
    {
      label: "Asia",
      value: "asia"
    },
    {
      label: "Europe",
      value: "europe"
    },
    {
      label: "America",
      value: "america"
    },
    {
      label: "Oceania",
      value: "oceania"
    }
  ],
  year: [
    {
      label: "1000",
      value: 1000
    },
    {
      label: "1300",
      value: 1300
    },
    {
      label: "1700",
      value: 1700
    },
    {
      label: "2000",
      value: 2000
    }
  ]
};

export const DEFAULT_CARD_FILTER = {
  region: DEFAULT_CARD_FILTER_OPTIONS.region[0].value,
  year: DEFAULT_CARD_FILTER_OPTIONS.year.at(-1)?.value
};

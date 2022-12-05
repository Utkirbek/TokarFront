const config: any = {
  margin: { top: 40, right: 80, bottom: 80, left: 30 },
  defs: [
    {
      id: "dots",
      type: "patternDots",
      background: "inherit",
      color: "rgba(255, 255, 255, 0.3)",
      size: 4,
      padding: 1,
      stagger: true,
    },
    {
      id: "lines",
      type: "patternLines",
      background: "inherit",
      color: "rgba(255, 255, 25)",
      rotation: -45,
      lineWidth: 6,
      spacing: 10,
    },
  ],
  fill: [
    {
      match: {
        id: "ruby",
      },
      id: "dots",
    },
    {
      match: {
        id: "c",
      },
      id: "dots",
    },
    {
      match: {
        id: "go",
      },
      id: "dots",
    },
    {
      match: {
        id: "python",
      },
      id: "dots",
    },
    {
      match: {
        id: "scala",
      },
      id: "lines",
    },
    {
      match: {
        id: "lisp",
      },
      id: "lines",
    },
    {
      match: {
        id: "elixir",
      },
      id: "lines",
    },
    {
      match: {
        id: "javascript",
      },
      id: "lines",
    },
  ],
  legends: [
    {
      anchor: "bottom",
      direction: "row",
      justify: false,
      translateX: 0,
      translateY: 60,
      itemsSpacing: 35,
      itemWidth: 50,
      itemHeight: 18,
      itemDirection: "left-to-right",
      itemOpacity: 1,
      symbolSize: 19,
      symbolShape: "circle",
      itemTextColor: "rgb(38, 217, 187)",
      effects: [
        {
          on: "hover",
          style: {
            itemTextColor: "#fff",
          },
        },
      ],
    },
  ],
};
export default config;

const config: any = {
  margin: { top: 50, right: 130, bottom: 50, left: 60 },

  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Foyda jadvali",
    legendPosition: "middle",
    legendOffset: 32,
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "Foyda jadvali",
    legendPosition: "middle",
    legendOffset: -40,
  },
  labelTextColor: {
    from: "color",
    modifiers: [["darker", 1.6]],
  },
  borderColor: {
    from: "color",
    modifiers: [["darker", 1.6]],
  },
  legends: [
    {
      dataFrom: "keys",
      anchor: "bottom-right",
      direction: "column",
      justify: false,
      translateX: 120,
      translateY: 0,
      itemsSpacing: 2,
      itemWidth: 100,
      itemHeight: 20,
      itemDirection: "left-to-right",
      itemOpacity: 0.85,
      symbolSize: 20,
      itemTextColor: "#1972C2",
      effects: [
        {
          on: "hover",
          style: {
            itemOpacity: 1,
            itemTextColor: "red",
          },
        },
      ],
    },
  ],
  colors: [
    "rgb(151, 227, 213)",
    "rgb(181, 227, 151)",
    "rgb(227, 151, 151)",
    "rgb(227, 151, 227)",
    "rgb(151, 227, 227)",
    "rgb(151, 151, 227)",
    "rgb(227, 227, 151)",
    "rgb(227, 227, 227)",
    "rgb(151, 227, 213)",
    "rgb(181, 227, 151)",
    "rgb(227, 151, 151)",
    "rgb(227, 151, 227)",
    "rgb(151, 227, 227)",
    "rgb(151, 151, 227)",
    "rgb(227, 227, 151)",
    "rgb(227, 227, 227)",
  ],
};
export default config;

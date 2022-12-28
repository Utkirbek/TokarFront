const config: any = {
  keys: ["foyda"],
  colorBy: "indexValue",
  indexBy: "kun",
  minValue: 0,
  enableGridX: true,
  enableGridY: false,
  labelTextColor: "inherit:darker(1.2)",
  axisTop: null,
  axisLeft: null,
  axisRight: null,
  colors: ["#61cdbb", "#97e3d5", "#f47560", "#e25c3b"],
  defs: [
    {
      id: "dots",
      type: "patternDots",
      background: "inherit",
      color: "#38bcb2",
      size: 4,
      padding: 1,
      stagger: true,
    },
    {
      id: "lines",
      type: "patternLines",
      background: "inherit",
      color: "#eed312",
      rotation: -45,
      lineWidth: 6,
      spacing: 10,
    },
  ],
};
export default config;

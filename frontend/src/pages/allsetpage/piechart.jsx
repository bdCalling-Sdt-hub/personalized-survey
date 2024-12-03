import { PieChart, Pie, Cell } from "recharts";
import { useState, useEffect } from "react";

const PieChartComponent = ({ data }) => {
  const [chartDimensions, setChartDimensions] = useState({
    width: 500,
    cx: 340,
  });

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    // console.log("screenWidth", screenWidth);

    if (screenWidth <= 417) {
      // Mobile (M)
      setChartDimensions({ width: 320, cx: 160 });
    } else if (screenWidth <= 500) {
      // Mobile (L)
      setChartDimensions({ width: 320, cx: 210 });
    } else {
      // Default
      setChartDimensions({ width: 500, cx: 340 });
    }
  };

  useEffect(() => {
    handleResize(); // Set initial dimensions
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //   const data = [
  //     { name: "Global", value: 90 },
  //     { name: "My percentage", value: 10 },
  //   ];
  // const COLORS = ["#20042b", "#7b1fa2"];
  const COLORS = ["#7b1fa2", "#20042b"];

  return (
    <PieChart width={chartDimensions.width} height={200}>
      <Pie
        data={data}
        cx={chartDimensions.cx}
        cy={200}
        startAngle={180}
        endAngle={0}
        innerRadius={60}
        outerRadius={90}
        fill="#8018a0"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartComponent;

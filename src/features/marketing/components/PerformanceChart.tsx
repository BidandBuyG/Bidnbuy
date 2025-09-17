"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Total",
    color: "#ffb100",
  },
} satisfies ChartConfig;

export function PerformanceChart({
  chartData,
}: {
  chartData: { day: string; total: number }[];
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="p-0 h-[100px] w-full">
          <BarChart accessibilityLayer data={chartData} className="p-0">
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="total"
              fill="#ffb100"
              radius={4}
              barSize={20}
              className="p-0"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

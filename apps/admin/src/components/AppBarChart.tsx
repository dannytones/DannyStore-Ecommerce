"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { OrderChartType } from "@repo/types";
import { use } from "react";

export const description = "A total and sucessful transactions";

// const chartData = [
//   { month: "January", total: 186, sucessful: 80 },
//   { month: "February", total: 305, sucessful: 200 },
//   { month: "March", total: 237, sucessful: 120 },
//   { month: "April", total: 73, sucessful: 190 },
//   { month: "May", total: 209, sucessful: 110 },
//   { month: "June", total: 214, sucessful: 140 },
// ];

const chartConfig = {
  desktop: {
    label: "total",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "sucessful",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const AppBarChart = ({
  dataPromise,
}: {
  dataPromise: Promise<OrderChartType[]>;
}) => {
  const chartData = use(dataPromise);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total transactions</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickFormatter={(v) => v.slice(0, 3)} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="total" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="successful" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total transactions for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppBarChart;

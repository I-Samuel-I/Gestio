import { finances } from "@/mock/finance";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type FinanceData = {
  date: string;
  inflow: number;
  outflow: number;
  balance: number;
};

const formatDay = (isoDate: string) => isoDate.split("-")[2];

const formatCompactBRL = (value: number) => {
  const abs = Math.abs(value);

  if (abs >= 1e15) return `R$${(value / 1e15).toFixed(1).replace(".0", "")}Q`;
  if (abs >= 1e12) return `R$${(value / 1e12).toFixed(1).replace(".0", "")}T`;
  if (abs >= 1e9) return `R$${(value / 1e9).toFixed(1).replace(".0", "")}B`;
  if (abs >= 1e6) return `R$${(value / 1e6).toFixed(1).replace(".0", "")}M`;
  if (abs >= 1e3) return `R$${(value / 1e3).toFixed(1).replace(".0", "")}K`;

  return `R$ ${value.toLocaleString("pt-BR")}`;
};

const buildGraphFinance = () => {
  const byDate = new Map<string, { inflow: number; outflow: number }>();

  for (const item of finances.cashFlow.inflow) {
    const prev = byDate.get(item.date) ?? { inflow: 0, outflow: 0 };
    byDate.set(item.date, { ...prev, inflow: prev.inflow + item.value });
  }

  for (const item of finances.cashFlow.outflow) {
    const prev = byDate.get(item.date) ?? { inflow: 0, outflow: 0 };
    byDate.set(item.date, { ...prev, outflow: prev.outflow + item.value });
  }

  const dates = [...byDate.keys()].sort();
  let running = 0;

  const data: FinanceData[] = dates.map((date) => {
    const day = byDate.get(date)!;
    running += day.inflow - day.outflow;

    return {
      date,
      inflow: day.inflow,
      outflow: day.outflow,
      balance: running,
    };
  });

  return data;
};

export default function LineGraph() {
  const data = buildGraphFinance();

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        width: "100%",
        borderRadius: "12px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <h3  className="text-xl font-bold text-slate-800">
        Fluxo de Caixa
      </h3>
      <p className="text-slate-500 font-light" >Entradas e saídas do mês</p>

      <div style={{ width: "100%", height: 340, marginTop: "20px" }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe3ed" />

            <XAxis
              dataKey="date"
              tickFormatter={formatDay}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              width={72}
              tickMargin={10}
              tickFormatter={(v) => formatCompactBRL(v).replace("R$", "R$")} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              labelFormatter={(label) => `Dia ${formatDay(String(label))}`}
              formatter={(value: number, key: string) => [formatCompactBRL(Number(value)), key]}
              contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0" }}
            />
            <defs>
              <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#21C45D" stopOpacity={1} />
                <stop offset="95%" stopColor="#21C45D" stopOpacity={0.30} />
              </linearGradient>

              <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2828" stopOpacity={1} />
                <stop offset="95%" stopColor="#DC2828" stopOpacity={0.30} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="inflow"
              stroke="#21C45D"
              fill="url(#inflowGradient)"
              fillOpacity={0.08}
              strokeWidth={2}
              legendType="none"
              tooltipType="none"
            />
            <Line type="monotone" dataKey="inflow" name="Entradas" stroke="#21C45D" strokeWidth={2} dot={false} />

            <Area
              type="monotone"
              dataKey="outflow"
              stroke="#DC2828"
              fill="url(#outflowGradient)"
              fillOpacity={0.08}
              strokeWidth={2}
              legendType="none"
              tooltipType="none"
            />
            <Line type="monotone" dataKey="outflow" name="Saidas" stroke="#DC2828" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import StatCard from "./statCard";
import { dashboard } from "@/mock/dashboard";

type DashboardData = {
  month: string;
  income: number;
  expense: number;
};

const toMonthShort = (month: string) => month.trim().slice(0, 3);

const buildGraphDashboard = () => {
  const data: DashboardData[] = dashboard.IncomexExpense.map((item) => ({
    month:item.month,
    income: item.income,
    expense: item.expense,
  }));
  return data;
};

const formatCompactBRL = (value: number) => {
  const abs = Math.abs(value);

  if (abs >= 1e15) return `R$${(value / 1e15).toFixed(1).replace(".0", "")}Q`;
  if (abs >= 1e12) return `R$${(value / 1e12).toFixed(1).replace(".0", "")}T`;
  if (abs >= 1e9) return `R$${(value / 1e9).toFixed(1).replace(".0", "")}B`;
  if (abs >= 1e6) return `R$${(value / 1e6).toFixed(1).replace(".0", "")}M`;
  if (abs >= 1e3) return `R$${(value / 1e3).toFixed(1).replace(".0", "")}K`;

  return `R$ ${value.toLocaleString("pt-BR")}`;
};

export default function AreaGraph() {
  const data = buildGraphDashboard();
  return (
    <StatCard>
      <h3 className="text-2xl font-bold text-slate-900">Receita vs Despesas</h3>
      <p className="text-slate-500">Ultimos {data.length} meses</p>

      <div style={{ width: "100%", height: 340, marginTop: 20 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe3ed" />
            <XAxis
              dataKey="month"
              tickFormatter={toMonthShort}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              width={72}
              tickFormatter={formatCompactBRL}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number, key: string) => [
                `R$ ${Number(value).toLocaleString("pt-BR")}`,
                key === "income" ? "Receita" : "Despesas",
              ]}
              contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0" }}
            />
            <Legend
              verticalAlign="bottom"
              iconType="circle"
              formatter={(value) => (value === "income" ? "Receita" : "Despesas")}
            />
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="income"
              stroke="#0ea5e9"
              fill="url(#incomeGradient)"
              strokeWidth={2}
              legendType="none"
              tooltipType="none"
            />
            <Line type="monotone" dataKey="income" name="income" stroke="#0ea5e9" strokeWidth={2} dot={false} />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#f59e0b"
              fill="url(#expenseGradient)"
              strokeWidth={2}
              legendType="none"
              tooltipType="none"
            />
            <Line type="monotone" dataKey="expense" name="expense" stroke="#f59e0b" strokeWidth={2} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </StatCard>
  );
}

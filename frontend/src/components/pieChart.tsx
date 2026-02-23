import { finances } from "@/mock/finance";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0EA5E9", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function PieGraph() {
    const data = finances.categoryDistribution.map((item) => ({
        name: item.category,
        value: item.value,
        percentage: item.percentage,
    }));

    return (
        <div
            style={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: "20px",
                width: "50%",
                borderRadius: "12px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
            }}
        >
            <h3 className="text-xl font-bold text-slate-800">Receita por categoria</h3>
            <p className="text-slate-500 font-light">Distribuição por mês</p>

            <div style={{ width: "100%", height: 280, marginTop: 50, }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={95}
                            label={({ name,percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                            paddingAngle={3}
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString("pt-BR")}`}
                            contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0" }}
                        />
                        <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        iconType="circle"
                        iconSize={10}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

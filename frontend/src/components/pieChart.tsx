import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0EA5E9", "#22C55E", "#F59E0B", "#EF4444", "#8B5CF6"];

type PieGraphProps = {
    data?: {
        name: string;
        revenue: number;
        percentage: number;
    }[];
};

export default function PieGraph({ data = [] }: PieGraphProps) {

    return (
        <div
            className="bg-white  flex justify-center flex-col p-5 w-full  lg:w-2/3 xl:w-1/2 rounded-xl border border-slate-100 shadow-sm"
        >
            <h3 className="text-xl font-bold text-slate-800">Receita por categoria</h3>
            <p className="text-slate-500 font-light">Distribuição por mês</p>

            <div style={{ width: "100%", height: 280, marginTop: 50, }}>
                <ResponsiveContainer> 
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="revenue"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={95}
                            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                            paddingAngle={3}
                        >
                            {data.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number | undefined) => `R$ ${Number(value ?? 0).toLocaleString("pt-BR")}`}
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

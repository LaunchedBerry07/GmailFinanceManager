import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";

// Mock data for charts - in production this would come from your API
const expensesByCategory = [
  { name: "Invoices", amount: 2400, color: "#FF6B9D" },
  { name: "Receipts", amount: 1398, color: "#54C6EB" },
  { name: "Bills", amount: 9800, color: "#A663CC" },
  { name: "Tax Documents", amount: 3908, color: "#06FFA5" },
  { name: "Subscriptions", amount: 4800, color: "#FFBE0B" },
];

const transactionVolume = [
  { name: "Jan", emails: 65, amount: 12400 },
  { name: "Feb", emails: 78, amount: 15600 },
  { name: "Mar", emails: 90, amount: 18200 },
  { name: "Apr", emails: 81, amount: 16800 },
  { name: "May", emails: 95, amount: 19500 },
  { name: "Jun", emails: 108, amount: 22100 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-primary-800 border border-primary-600/50 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-purple-300">
            {entry.dataKey === 'amount' && '$'}{entry.value}{entry.dataKey === 'emails' && ' emails'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function ExpensesByCategoryChart() {
  return (
    <div className="gradient-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Expenses by Category</h3>
        <div className="text-sm text-purple-300">This Month</div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={expensesByCategory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#6366f1" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#c4b5fd', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#c4b5fd', fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            fill="url(#expenseGradient)" 
            radius={[8, 8, 0, 0]}
          />
          <defs>
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF6B9D" />
              <stop offset="100%" stopColor="#A663CC" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TransactionVolumeChart() {
  return (
    <div className="gradient-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Transaction Volume Over Time</h3>
        <div className="text-sm text-purple-300">Last 6 Months</div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={transactionVolume}>
          <CartesianGrid strokeDasharray="3 3" stroke="#6366f1" opacity={0.2} />
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#c4b5fd', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#c4b5fd', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="emails" 
            stroke="#54C6EB" 
            strokeWidth={3}
            dot={{ fill: '#54C6EB', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#54C6EB', strokeWidth: 2, fill: '#1e1b4b' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data to simulate viral growth sales
const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 5500 },
    { name: 'Mar', sales: 4800 },
    { name: 'Apr', sales: 9000 },
    { name: 'May', sales: 15000 },
    { name: 'Jun', sales: 22000 },
    { name: 'Jul', sales: 38000 },
    { name: 'Aug', sales: 42000 },
    { name: 'Sep', sales: 45000 },
    { name: 'Oct', sales: 41000 },
    { name: 'Nov', sales: 52000 },
    { name: 'Dec', sales: 68000 },
];

export const SalesProof: React.FC = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 w-full relative overflow-hidden">
            {/* Fake Browser/Dashboard Header to enhance "screenshot" feel */}
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="h-4 w-32 bg-gray-100 rounded-md"></div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 font-lato uppercase tracking-wider">Total Revenue</p>
                    <p className="text-xl sm:text-2xl font-anton text-gray-800">$346,300.00</p>
                </div>
            </div>

            <div className="h-[190px] sm:h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#059669', fontWeight: 600, fontFamily: 'Lato' }}
                            formatter={(value: any) => [`$${value.toLocaleString()}`, 'Sales']}
                            cursor={{ stroke: '#10B981', strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#10B981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSales)"
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#059669' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Fake Legend/Footer */}
            <div className="flex gap-6 mt-3 justify-center sm:justify-start pl-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs text-gray-500 font-lato">Gross Volume</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <span className="text-xs text-gray-400 font-lato">Previous Period</span>
                </div>
            </div>
        </div>
    );
};

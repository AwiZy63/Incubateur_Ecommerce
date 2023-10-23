import React, { useEffect, useState } from 'react'
import {
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area,
} from 'recharts';

import { apiHandler } from '../../../App';

export default function SalesGraph() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSales = async () => {
            const sales = await apiHandler.sale.GetAllSales();
            setData(sales.sales);
            setLoading(false);
        }

        fetchSales();
    }, [])

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const formattedDate = new Date(payload[0].payload.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' });
            return (
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            <div className="custom-tooltip">
                                <p className="label">{`Total: ${payload[0].value} €`}</p>
                                <p className='desc'>Date: {formattedDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            <h2 className='subtitle'>Statistiques des commandes (unique)</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <AreaChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                    style={{ margin: 'auto' }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis dataKey="total" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend payload={[{ value: 'Total (en €)', type: 'line', id: 'ID01' }]} />
                    <Area type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            )}
        </div>
    )
}

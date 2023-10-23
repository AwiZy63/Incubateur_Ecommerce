import React, { useEffect, useState } from 'react'
import {
    XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area,
} from 'recharts';

import { apiHandler } from '../../../App';

export default function SalesWeeklyGraph() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedData, setSelectedData] = useState(false);

    useEffect(() => {
        const fetchSalesWeekly = async () => {
            // Récupérer les ventes de la semaine
            const sales = await apiHandler.sale.GetAtDate({ startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), endDate: new Date() });
            setData(sales.sales);
            setLoading(false);
        }

        fetchSalesWeekly();
    }, [])

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const formattedDate = new Date(payload[0].payload.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
            return (
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            <div className="custom-tooltip">
                                <p className="label">{`Total de ventes: ${payload[0].value}`}</p>
                                <p className="label">{`Prix total: ${payload[1].value} €`}</p>
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
            <div className='columns'>
                <div className="column is-10">
                    <h2 className='subtitle'>Statistiques des commandes (semaine)</h2>
                </div>
                <div className="column">
                    <button className={`button is-small ${selectedData ? 'is-primary' : 'is-info'}`} onClick={() => setSelectedData(!selectedData)}>{selectedData ? 'Total' : 'Ventes'}</button>
                </div>
            </div>
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
                    {
                        selectedData ?
                            <YAxis dataKey="total" />
                            :
                            <YAxis dataKey="sales" />
                    }
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="total" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
            )}
        </div>
    )
}

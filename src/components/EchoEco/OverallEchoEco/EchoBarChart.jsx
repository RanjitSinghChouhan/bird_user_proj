import React from 'react'
import { Bar, BarChart, Tooltip, XAxis } from 'recharts'
import { useWindowSize } from "../../../hooks/useWindowSize";


function EchoBarChart({ heading, count, data }) {
    const windowSize = useWindowSize();

    return (
        <>
            <div className="py-2 w-[100px]">
                <div className="text-[#404040] text-sm">
                    {heading}
                </div>
                <div className="text-[#000000] font-bold text-2xl">
                    {count}
                </div>
            </div>
            <BarChart
                width={windowSize.width > 1520 ? 550 :windowSize.width > 1440 ? 540 : windowSize.width > 1400 ? 520 : windowSize.width > 1300 ? 500 : windowSize.width > 1250 ? 480 : 470}
                height={220}
                data={data}
                radius={20}
            >
                <XAxis
                    dataKey="monthName"
                    style={{ fontSize: "9px" }}
                    padding={{ left: 10, right: 10 }}
                    axisLine={false}
                    tickLine={false}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                    dataKey="totalMonthlyCall"
                    fill="#6DB935"
                    background={{ fill: "#F2F7FF" }}
                    barSize={8}
                    radius={20}
                />
            </BarChart>
        </>
    )
}

export default EchoBarChart
import React, { useEffect, useState } from 'react'
import { supabase } from '@/config/supabaseClient';
import { FieldSchedule } from '@/types/FieldSchedule';
import { Field } from '@/types/Field';
import { checkAvailable } from '@/utils/checkAvailable';

interface ScheduleTableProps {
    selectedDate: Date | null;
    field: Field;
    startHour: number
    endHour: number
}

function ScheduleTable(props: ScheduleTableProps) {
    const { selectedDate, field, startHour, endHour } = props
    const hoursArray: string[] = [];

    for (let i = 0; i < 24; i++) {
        const hour = `${i.toString().padStart(2, '0')}:00:00`;
        hoursArray.push(hour);
    }

    const [fetchData, setFetchData] = useState<FieldSchedule[]>([]);

    useEffect(() => {
        if (selectedDate) {
            const fetchData = async () => {
                const { data, error } = await supabase
                    .from('field_schedule')
                    .select('*')
                    .eq('field_id', field?.id)
                    .eq('date', selectedDate.toISOString().split('T')[0])
                if (data) {
                    setFetchData(data);
                }
                if (error) {
                    console.log(error)
                }
            }
            fetchData()
        }
    }, [selectedDate])


    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary text-white">
                <tr>
                    {["time", "availability"].map((column) => (
                        <th
                            key={column}
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium uppercase"
                        >
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {hoursArray.slice(startHour, endHour).map((data, id) => (
                    <tr key={id}>
                        <td className='text-center py-3 px-6'>{data.slice(0, 5)} WIB</td>
                        <td className='text-center py-3 px-6'>{checkAvailable(fetchData, data) ? <span className='text-[#2cc956]'>Yes</span> : <span className='text-[#c9392c]'>No</span>}</td>
                    </tr>
                ))}
            </tbody>
            {/* {fetchData.map((data) => (
                        <div key={data.field_id}>
                            <p>Time: {data.time}</p>
                            <p>Available: {data.available ? 'Yes' : 'No'}</p>
                        </div>
                    ))} */}
        </table>
    )
}

export default ScheduleTable
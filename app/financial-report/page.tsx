"use client"

import 'tailwindcss/tailwind.css';
import { useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import Dropdown from '@/components/Dropdown';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import { supabase } from '../../config/supabaseClient';
import AuthRoute from '@/components/AuthRoute';

const FinancialReport = () => {

    type ChartData = {
        date: Date;
        day: string; // Add day property
        month: string;
        income: number; // Update this type based on the actual type of total_price
        booking_code: any;
    };

    const options = ["Monthly", "Daily"]
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>()
    const [selectedOption, setSelectedOption] = useState<string>('Daily')
    const [data, setData] = useState<ChartData[]>([]); // Explicitly type the state
    const [monthlyData, setMonthlyData] = useState<{ month: string; total: number }[]>([])
    const [dailyData, setDailyData] = useState<{ day: string; total: number }[]>([]);
    const [totalIncomeThisMonth, setTotalIncomeThisMonth] = useState<number | null>(null);
    const [totalIncomeToday, setTotalIncomeToday] = useState<number | null>(null);
    const [totalIncomeAllTime, setTotalIncomeAllTime] = useState<number | null>(null);


    const handleSelect = (selectedOption: string) => {
        // Handle selected option here
        setSelectedOption(selectedOption);
        console.log('Selected:', selectedOption);
    };

    useEffect(() => {
        // Define a function to fetch data from Supabase
        const fetchData = async () => {
            setLoading(true)
            try {
                // Replace 'reservations' with your actual table name
                const { data, error } = await supabase
                    .from('reservations')
                    .select('total_price, payment_date, booking_code')
                    .order('payment_date', { ascending: true });

                setLoading(false);
                if (error) {
                    throw error;
                }

                // Melakukan formatting data
                const formattedData: ChartData[] = data.map((item: { payment_date: Date; total_price: any; booking_code: any }) => ({
                    date: new Date(item.payment_date),
                    day: new Date(item.payment_date).toLocaleString('en-US', { day: 'numeric' }),
                    month: new Date(item.payment_date).toLocaleString('en-US', { month: 'short' }),
                    income: item.total_price,
                    booking_code: item.booking_code,
                }));

                setData(formattedData);
                // Menghitung total income pada seluruh waktu
                const incomeAllTime = data.reduce((total: any, item: { total_price: any; }) => total + item.total_price, 0);

                setTotalIncomeAllTime(incomeAllTime);

                const currentDate = new Date();
                const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

                const incomeThisMonth = data
                    .filter(item => new Date(item.payment_date) >= startOfMonth && new Date(item.payment_date) <= endOfMonth)
                    .reduce((total, item) => total + item.total_price, 0);

                setTotalIncomeThisMonth(incomeThisMonth);

                // Menghitung total income pada hari ini
                // const currentDate = new Date();
                const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);

                const incomeToday = data
                    .filter(item => new Date(item.payment_date) >= startOfDay && new Date(item.payment_date) < endOfDay)
                    .reduce((total, item) => total + item.total_price, 0);

                setTotalIncomeToday(incomeToday);

                // Mengelompokkan data berdasarkan bulan
                const groupedByMonth: { [key: string]: number } = {};
                formattedData.forEach((item) => {
                    const monthKey = `${item.date.getFullYear()}-${item.date.getMonth() + 1}`;
                    if (!groupedByMonth[monthKey]) {
                        groupedByMonth[monthKey] = 0;
                    }
                    groupedByMonth[monthKey] += item.income;
                    console.log(Date())
                });


                // Create a new dataframe for monthly sums
                const monthlyData: { month: string; total: number }[] = Object.entries(groupedByMonth).map(([monthKey, total]) => ({
                    month: ((new Date(monthKey)).toLocaleString('default', { month: 'long' })),
                    total,
                }));

                setMonthlyData(monthlyData)

                // Mengelompokkan data berdasarkan hari
                const groupedByDay: { [key: string]: number } = {};
                formattedData.forEach((item) => {
                    const dayKey = `${item.date.getFullYear()}-${item.date.getMonth() + 1}-${item.date.getDate()}`;
                    if (!groupedByDay[dayKey]) {
                        groupedByDay[dayKey] = 0;
                    }
                    groupedByDay[dayKey] += item.income;
                });

                // Create a new dataframe for daily sums
                const dailyData: { day: string; total: number }[] = Object.entries(groupedByDay).map(([dayKey, total]) => ({
                    day: dayKey,
                    total,
                }));

                setDailyData(dailyData)

            } catch (error) {
                console.error('Error fetching data:', (error as Error).message);
                setFetchError('Error fetching data');
            }
        };

        // Call the fetchData function
        fetchData();
    }, [selectedOption]);

    return (
        <>
            <AuthRoute role='field owner' />
            {loading ? (
                <Loading />
            ) : (
                <div>
                    <Navbar />
                    <div className="flex h-screen">

                        <div className="items-center flex-grow flex flex-col ml-4 relative mt-20">
                            <div className="w-4/6">
                                <p className="text-2xl justify-start text-black font-bold mt-3">Laporan Keuangan</p>
                            </div>
                            <div className="flex flex-row w-4/6 h-5/6">
                                <div className="my-4 flex flex-col px-4 gap-3 w-full pt-4 h-full bg-white border-solid border-2 border-black-500 rounded-2xl">
                                    <div className="flex flex-row my-4">
                                        <p className="text-black px-4 text-lg font-bold">Overview</p>
                                        <div className='ml-auto'>
                                            <Dropdown variant="primary-outline" options={options} onSelect={handleSelect} placeholder={selectedOption} />
                                        </div>
                                    </div>
                                    <ResponsiveContainer width="100%" height="80%" className="mt-2">
                                        {selectedOption === 'Daily' ? (
                                            <LineChart
                                                width={500}
                                                height={200}
                                                data={dailyData}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="day" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                                            </LineChart>
                                        ) : (
                                            <LineChart
                                                width={500}
                                                height={200}
                                                data={monthlyData}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
                                            </LineChart>
                                        )}
                                    </ResponsiveContainer>
                                </div>
                                <div className="flex flex-col m-4 gap-2 w-7/12 h-full mb-20">
                                    <div className="w-full p-4 pb-0 border-solid border-2 bg-primary rounded-2xl">
                                        <p className="text-white font-bold">Income Total</p>
                                        <p className="text-white text-3xl py-4">{totalIncomeAllTime !== null ? `Rp${totalIncomeAllTime.toLocaleString()}` : '0...'} </p>
                                    </div>
                                    <div className="justify-center flex flex-row gap-2 w-full">
                                        <div className="w-full p-4 border-solid border-2 bg-primary rounded-2xl">
                                            <p className="text-white text-sm">Income Bulan Ini</p>
                                            <p className="text-white text-2xl py-2"> {totalIncomeThisMonth !== null ? `Rp${totalIncomeThisMonth.toLocaleString()}` : '0...'}</p>
                                            {/* <p className="text-green-300">+34.5%</p> */}
                                        </div>
                                        <div className="w-full p-4 border-solid border-2 bg-primary rounded-2xl">
                                            <p className="text-white text-sm">Income Hari Ini</p>
                                            <p className="text-white text-2xl py-2"> {totalIncomeToday !== null ? `Rp${totalIncomeToday.toLocaleString()}` : '0...'} </p>
                                            {/* <p className="text-green-300">+34.5%</p> */}
                                        </div>
                                    </div>

                                    <div className="flex flex-col h-full overflow-hidden bg-white border-solid border-2 border-black-500 rounded-2xl">
                                        <div className="border-b border-solid border-black pl-4 pt-3 pb-1">
                                            <p className="text-black font-bold">Recent Transaction</p>
                                        </div>
                                        <div className='p-4 h-full overflow-y-scroll'>
                                            {data.slice(0, 10).map((reservation, index) => (
                                                <div key={index} className="text-black text-lg py-2 flex flex-row">
                                                    <div>
                                                        <p className='text-sm'>{`#${reservation.booking_code}`}</p>
                                                        <p className='text-xs'>{`Tanggal: ${new Date(reservation.date).toLocaleDateString()}`}</p>
                                                    </div>
                                                    <div className='ml-auto pt-1'>
                                                        <p className='text-green-600'>{`+Rp${reservation.income.toLocaleString()}`}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer />
                </div>
            )}
        </>
    )
}

export default FinancialReport
import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'




function App() {
  const [customers, setCutomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [amount, setAmount] = useState("");


  const [customerId, setCustomerId] = useState(null)

  
  const handleCustomerChange = (e) => {
    setCustomerId(e.target.value === "" ? null : Number(e.target.value));
    };


const filteredTransData = customerId
? transactions.filter((data) => data.customer_id === customerId)
:transactions;


  const filteredTransactions = transactions.filter((trans) => {
    return trans.amount.toString().includes(amount);
  });

  function getCustomers() {
    axios
      .get("https://raw.githubusercontent.com/1mo2/task/main/db.json")
      .then(({ data }) => setCutomers(data.customers))
      .catch((err) => console.log(err));
  }
  function getTransactions() {
    axios
      .get("https://raw.githubusercontent.com/1mo2/task/main/db.json")
      .then(({ data }) => setTransactions(data.transactions))
      .catch((err) => console.log(err));
  }




  useEffect(() => {
    getCustomers();
    getTransactions();
  }, []);


  const chartData = {
    labels: transactions.map((data) => data.date),
    datasets: [
        {
            label: 'Transactions Amount',
            data: filteredTransData.map((data) => data.amount),
            borderColor: '#85bb65', 
            backgroundColor: '#85bb65',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7
        }
    ]
  }
   const chartOptions = {
    scales: {
        x: {
            ticks: {
                color: '#FFF' 
            }
        },
        y: {
            ticks: {
                color: '#FFF' 
            }
        }
    }
  }
  return (
    <>


      <form className="max-w-md mx-auto w-full">   
  
  <div className="relative mb-[13px] mt-[13px] w-full">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
      </svg>
    </div>
    <input
         placeholder="Search By Name"
         onChange={(e) => setSearch(e.target.value)}
         type="search"
         
     id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
  </div>
</form>

    <div>

      <div className="relative overflow-x-auto h-100vh">
        <table className="border-separate border-spacing-2 border border-slate-400 w-75 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Data
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
            </tr>
          </thead>

  
          {customers
            .filter((customer) => {
              return search.toLowerCase() === ""
                ? customer
                : customer.name.toLowerCase().includes(search) 
            })
            .map((customer) => {
              const customerTransactions = transactions.filter((trans) => trans.customer_id === +customer.id);
              return (
                transactions.map((trans) => 
                
                          <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {customer.name}
                    </th>
                    <td className="px-6 py-4">{trans.date}</td>
                    <td className="px-6 py-4">${trans.amount}</td>
                  </tr>
                </tbody>
                )
      
              );
            })}
        </table>
      </div>
    </div>


    
<form className="max-w-sm mx-auto mt-[10px]">
  
  <select  onChange={handleCustomerChange}
  value={customerId === null ? "" : customerId}
   id="countries"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option value="" selected>Choose a customer</option>
    {customers.map((customer) => {
      return <option value={customer.id} key={customer.id}>{customer.name}</option>

    })}

  </select>
</form>


<div className="w-full">
            <Line className="w-100" data={chartData}  options={chartOptions}/>
        </div>       

    </>
  )
}

export default App

import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + '/api/transactions';
    axios.get(url).then((response) => {
      setTransactions(response.data);
    });
  })

  //  useEffect(() => { 
  //   getTransaction().then(transactions => {
  //        setTransactions(transactions);
  //   }); 
  //  } ,[])

  // async function getTransaction(){
  //   const url = process.env.REACT_APP_API_URL+'/api/transactions';
  //   const response = await fetch(url);
  //   return await response.json();  
  // }

  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/api/transaction';
    const price = name.split(' ')[0];
    axios.post(url, {
      price, name: name.substring(price.length + 1), datetime, description
    })
      .then((response) => {
        setName('');
        setDatetime('');
        setDescription('');
        console.log(response.data);
      });
  }

  let balance = 0;
  for (let transaction of transactions) {
    balance = balance + transaction.price
  }
  balance = balance.toFixed(2)
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];
  return (
    <main>
      <h1> ${balance}<span>{fraction}</span></h1>

      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
            placeholder={"+200 new samsung tv"} />
          <input value={datetime}
            onChange={ev => setDatetime(ev.target.value)}
            type="datetime-local" />
        </div>

        <div className="description">
          <input type="text" value={description}
            onChange={ev => setDescription(ev.target.value)}
            placeholder={"description"} />
        </div>

        <button type="submit"> Add new transaction </button>
      </form>

      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (
          <div className="transaction" key={transaction._id}>
            <div className="left">
              <div className="name" key="transaction1">{transaction.name}</div>
              <div className="description" key="transaction2"> {transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>
                {transaction.price}
              </div>

              <div className="datetime"> {transaction.datetime} </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;

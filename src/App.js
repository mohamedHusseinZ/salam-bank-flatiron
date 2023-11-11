

import React, { useState, useEffect } from 'react';
import TransactionTable from './Components/TransactionTable';
import TransactionForm from './Components/TransactionForm';
import SearchBar from './Components/SearchBar';
import './Components/Mian.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch data from your endpoints
      const postsResponse = await fetch('http://localhost:3000/posts');
      const commentsResponse = await fetch('http://localhost:3000/comments');
      const profileResponse = await fetch('http://localhost:3000/profile');

      // Convert responses to JSON
      const posts = await postsResponse.json();
      const comments = await commentsResponse.json();
      const profile = await profileResponse.json();

      // Combine the data or process it as needed
      const combinedData = {
        posts,
        comments,
        profile,
      };

      // Update the state with the fetched data
      setTransactions([...transactions, combinedData]);
      
      // Initially set filtered transactions to all transactions
      setFilteredTransactions([...transactions, combinedData]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
    // Update filtered transactions based on the search term
    filterTransactions([...transactions, newTransaction], newTransaction.description);
  };

  const deleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    // Update filtered transactions based on the search term
    filterTransactions(updatedTransactions);
  };

  const filterTransactions = (transactionsToFilter, searchTerm) => {
    const filtered = transactionsToFilter.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div>
      <h1>Transaction App</h1>
      <TransactionForm onSubmit={addTransaction} />
      <SearchBar onSearch={(term) => filterTransactions(transactions, term)} />
      <TransactionTable transactions={filteredTransactions} onDelete={deleteTransaction} />
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

const Home = () => {
    
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/transections");
        setTransactions(response.data);
      } catch (error) {
        toast.error("Failed to fetch transactions. Please try again.");
        return;
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div className="transactions-container">
        <h2>Office Transactions</h2>
        <button className="add-button" onClick={() => navigate("/add")}>
          + Add Transaction
        </button>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Running Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td>{moment(txn.date).format("DD/MM/YYYY")}</td>
              <td>{txn.description}</td>
              <td>{txn.type === "credit" ? txn.amount : "-"}</td>
              <td>{txn.type === "debit" ? txn.amount : "-"}</td>
              <td>{txn.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

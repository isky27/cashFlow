import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTransection = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      type: formData.get("type"),
      amount: formData.get("amount"),
      description: formData.get("description"),
    };

    try {
        await axios.post("http://localhost:8000/transections", data);
        toast.success("Transaction added successfully!");
        navigate("/");
        e.target.reset();  
        return;
    } catch (error) {
      toast.error("Failed to add transaction. Please try again.");
      return;
    }
  };

  return (
    <div>
      <h1>Add New Transaction</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="type">Transaction Type:</label>
          <select id="type" name="type" required>
            <option value="" disabled defaultValue>
              Select Type
            </option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input type="number" id="amount" name="amount" required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" required />
        </div>
        <div
          className="form-group"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <button type="submit" className="submit-button">
            Save
          </button>
          <button className="cancel-button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransection;

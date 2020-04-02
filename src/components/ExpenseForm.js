import React from "react";
import { MdSend } from "react-icons/md";

export const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input
            type="text"
            name="charge"
            id="charge"
            className="form-control"
            placeholder="e.g rent"
            value={charge}
            onChange={handleCharge}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">amount</label>
          <input
            type="text"
            name="amount"
            id="amount"
            className="form-control"
            placeholder="e.g 200"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {!edit ? "submit" : "edit"} <MdSend />
      </button>
    </form>
  );
};

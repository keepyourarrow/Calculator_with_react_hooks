import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
  const { id, charge, amount } = expense;
  console.log("id :" + id);
  return (
    <li className="item">
      <div className="info">
        <span className="expense"> {charge}</span>
        <span className="amount"> $ {amount}</span>
      </div>
      <div>
        <button
          className="edit-btn"
          aria-label="edit-button"
          onClick={() => handleEdit(id)}
        >
          <MdEdit />
        </button>
        <button
          className="delete-btn"
          aria-label="delete-button"
          onClick={() => handleDelete(id)}
        >
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

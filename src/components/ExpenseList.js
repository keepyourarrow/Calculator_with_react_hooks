import React from "react";
import { ExpenseItem } from "./ExpenseItem";
import { MdDelete } from "react-icons/md";

export const ExpenseList = ({
  expenses,
  handleEdit,
  handleDelete,
  clearAll
}) => {
  console.log(expenses);
  return (
    <>
      {expenses && (
        <ul className="list">
          {expenses.map((expense) => {
            return (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            );
          })}
        </ul>
      )}
      {expenses && expenses.length > 0 ? (
        <button className="btn" onClick={clearAll}>
          clear expenses
          <MdDelete className="btn-icon" />
        </button>
      ) : expenses !== null ? (
        ""
      ) : (
        ""
      )}
    </>
  );
};

import React from "react";

export const TotalSpending = ({ expenses }) => {
  return (
    <>
      {expenses ? (
        <h1>
          total spending :
          <span className="total">
            ${" "}
            {expenses.reduce((acc, curr) => {
              return (acc += +curr.amount); // CHANGED FROM +=
            }, 0)}
          </span>
        </h1>
      ) : (
        <h1>
          Total spending: <span className="total">0</span>
        </h1>
      )}
    </>
  );
};

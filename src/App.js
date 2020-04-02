import React, { useState, useEffect } from "react";
import "./App.css";
import { ExpenseForm } from "./components/ExpenseForm";
import { ExpenseList } from "./components/ExpenseList";
import { Alert } from "./components/Alert";
import { TotalSpending } from "./components/TotalSpending";
import uuid from "uuid/v4";

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "tax", amount: 330 },
  { id: uuid(), charge: "water", amount: 30 }
];

function App() {
  // ******************** state values ************************
  // ******************** expenses state, setExpenses function ************************
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses"))
  );
  // ******************** storing in Local Storage ************************
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]); //if we have something to do with expenses only then we call useeffect

  // ******************** state expense ************************
  const [charge, setCharge] = useState("");
  // ******************** state amount ************************
  const [amount, setAmount] = useState("");
  // ******************** EDIT ************************
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  // ******************** state alert ************************
  const [alert, setAlert] = useState({ show: false });

  // ******************** functionality functions ************************
  // ******************** set the Charge form input ************************
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  // ******************** set the Amount form input ************************
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  // ******************** submit button function ************************
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      // FIRST IF
      charge !== "" &&
      amount > 0 &&
      charge.length > 2 &&
      !Number.isInteger(+charge)
    ) {
      if (!edit) {
        // NESTED IF within FIRST IF
        // If the button is submit
        const tempExpense = { id: uuid(), charge, amount };
        if (expenses) {
          // NESTED IF WITHIN NESTED IF
          setExpenses([...expenses, tempExpense]);
        } else {
          // ELSE for the NESTED WITH NESTED IF
          setExpenses([tempExpense]);
        }
        setCharge("");
        setAmount("");
        handleAlert({ type: "success", text: "item added" });
      } else {
        // ELSE FOR NESTED IF WITHIN FIRST IF
        // If the button is EDIT
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        setCharge("");
        setAmount("");
        handleAlert({ type: "success", text: "item succesfully edited" });
      }
    } else if (
      // ELSE IF FOR FIRST IF
      Number.isInteger(+charge) ||
      (charge.length < 3 && amount > 0)
    ) {
      console.log("Else if called: \tValue is: " + Number.isInteger(charge));
      handleAlert({
        type: "danger",
        text: "Charge can't be a number or less than 3 characters"
      });
    } else {
      // ELSE FOR FIRST IF
      // alert
      handleAlert({
        type: "danger",
        text:
          "Charge can't be empty value and amount has to be bigger than zero"
      });
    }
  };
  // ******************** clear single field function ************************
  const handleDelete = (id) => {
    console.log("item deleted " + id);
    console.log(expenses);
    const tempExpense = expenses.filter((val) => val.id !== id);
    setExpenses(tempExpense);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // ******************** edit single field function ************************
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    console.log("item edited" + id);
  };

  // ******************** clear all fields function ************************
  const clearAll = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "Cleared" });
  };
  // ******************** Alert function ************************
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => setAlert({ show: false }), 5000);
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Calculating Expenses</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />

        <ExpenseList
          expenses={expenses}
          clearAll={clearAll}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>

      <TotalSpending expenses={expenses} />
    </>
  );
}

export default App;

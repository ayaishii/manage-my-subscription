import { useState } from "react";
import "./App.css";

const App = () => {
  const [subsName, setSubsName] = useState("");
  const [subsCost, setSubsCost] = useState("");
  const [subsBillingDate, setBillingDate] = useState("");
  const [subsList, setSubsList] = useState([]);

  const handleNameChange = (e) => {
    setSubsName(e.target.value);
  };

  const handleSubsCostChange = (e) => {
    setSubsCost(e.target.value);
  };

  const handleBillingDateChange = (e) => {
    setBillingDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubsList([
      ...subsList,
      {
        subsName,
        subsCost,
        subsBillingDate,
      },
    ]);
    setSubsName("");
    setSubsCost("");
    setBillingDate("");
  };

  return (
    <div>
      <h1>サブスク</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={subsName}
          onChange={handleNameChange}
          type="text"
          placeholder="名前を入力"
        />
        <input
          value={subsCost}
          onChange={handleSubsCostChange}
          type="number"
          placeholder="金額を入力"
        />
        <input
          value={subsBillingDate}
          onChange={handleBillingDateChange}
          type="date"
          placeholder="請求日を入力"
        />
        <button type="submit">追加</button>
      </form>
      <ul className="subs-list">
        {subsList.map((subs, index) => (
          <li key={index}>
            <p>名前:{subs.subsName}</p>
            <p>金額:{subs.subsCost}円/月</p>
            <p>請求日:{subs.subsBillingDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

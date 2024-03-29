import { useState } from "react";
import "./App.css";

const App = () => {
  // const [subsName, setSubsName] = useState("");
  // const [subsCost, setSubsCost] = useState("");
  // const [subsBillingDate, setBillingDate] = useState("");
  const [subsList, setSubsList] = useState([]);
  const [newSub, setNewSub] = useState({
    subscription: "",
    cost: "",
    billingDate: "",
  });

  // const handleNameChange = (e) => {
  //   setSubsName(e.target.value);
  // };

  // const handleSubsCostChange = (e) => {
  //   setSubsCost(e.target.value);
  // };

  // const handleBillingDateChange = (e) => {
  //   setBillingDate(e.target.value);
  // };

  const handleChange = (e) => {
    setNewSub((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewSub({
  //     ...newSub,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newSub.subscription.trim() ||
      !newSub.cost.trim() ||
      !newSub.billingDate.trim()
    ) {
      alert("すべてのフィールドを入力してください");
      return;
    }
    setSubsList((prevList) => [...prevList, newSub]);
    setNewSub({ subscription: "", cost: "", billingDate: "" });
  };

  return (
    <div>
      <h1>サブスク</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="subscription"
          value={newSub.subscription}
          onChange={handleChange}
          type="text"
          placeholder="名前を入力"
        />
        <input
          name="cost"
          value={newSub.cost}
          onChange={handleChange}
          type="number"
          placeholder="金額を入力"
        />
        <input
          name="billingDate"
          value={newSub.billingDate}
          onChange={handleChange}
          type="date"
          placeholder="請求日を入力"
        />
        <button type="submit">追加</button>
      </form>
      <ul className="subs-list">
        {subsList.map((sub, index) => (
          <li key={index}>
            <p>名前:{sub.subscription}</p>
            <p>金額:{sub.cost}円/月</p>
            <p>請求日:{sub.billingDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import { useState } from "react";
import { SubscriptionList } from "./Components/SubscriptionList";
import { SubscriptionForm } from "./Components/SubscriptionForm";
import "./scss/reset.scss";
import "./scss/App.scss";

export const App = () => {
  const [subs, setSubs] = useState([]);

  const handleDelete = (id) => {
    const updatedSubs = subs.filter((sub) => sub.id !== id);
    setSubs(updatedSubs);
  };

  const handleAddSubscription = (newSub) => {
    setSubs([...subs, { ...newSub, id: Date.now() }]);
  };

  return (
    <div className="container">
      <h1>サブスク</h1>
      <SubscriptionForm onAddSubscription={handleAddSubscription} />
      <SubscriptionList subs={subs} onDelete={handleDelete} />
    </div>
  );
};

export default App;

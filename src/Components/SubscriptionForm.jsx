import { useState } from "react";
import { BillingDateCalculator } from "./BillingDateCalculator";

export const SubscriptionForm = ({ onAddSubscription }) => {
  const [newSub, setNewSub] = useState({
    subscription: "",
    cost: "",
    billingDay: "",
  });
  const [resetTrigger, setResetTrigger] = useState(false);

  // 請求日を基に次回請求日を計算する関数
  const calculateNextBillingDate = (billingDay) => {
    const today = new Date();
    const currentDay = today.getDate(); //今日の日付
    let nextBillingDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      billingDay
    );

    // 今月の請求日をすでに過ぎている場合、次の月の請求日を設定
    if (currentDay > billingDay) {
      nextBillingDate = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        billingDay
      );
    }
    // YYYY-MM-DD 形式で返す
    return nextBillingDate.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    setNewSub({ ...newSub, [e.target.name]: e.target.value });
  };

  const handleBillingDayChange = (day) => {
    setNewSub((prev) => ({
      ...prev,
      billingDay: day,
    }));
  };

  // フォームを送信
  const handleSubmit = (e) => {
    e.preventDefault();
    // 全てのフィールドが入力されているかを確認
    if (
      !newSub.subscription.trim() ||
      !newSub.cost.trim() ||
      !newSub.billingDay.trim()
    ) {
      alert("すべてのフィールドを入力してください");
      return; // 一つでも入力されていないフィールドがあれば、ここで処理を停止
    }

    // nextBillingDateをオブジェクトに追加
    const nextBillingDate = calculateNextBillingDate(newSub.billingDay);
    const subscriptionWithNextBilling = {
      ...newSub,
      nextBillingDate, // 次回請求日を追加
      id: Date.now(), // 一意のIDを追加
    };

    onAddSubscription(subscriptionWithNextBilling);

    // フォームをリセット
    setNewSub({
      subscription: "",
      cost: "",
      billingDay: "",
    });
    setResetTrigger(!resetTrigger);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="subscription"
        value={newSub.subscription}
        onChange={handleChange}
        placeholder="ネットフリックス"
      />
      <div className="input-price">
        <input
          name="cost"
          value={newSub.cost}
          onChange={handleChange}
          type="number"
          placeholder="500"
        />
        <span>円</span>
      </div>
      <div className="input-price">
        <BillingDateCalculator
          onBillingDayChange={handleBillingDayChange}
          resetTrigger={resetTrigger}
        />
      </div>
      <button type="submit">追加</button>
    </form>
  );
};

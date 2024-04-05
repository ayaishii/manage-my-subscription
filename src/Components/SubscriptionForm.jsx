import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { BillingDateCalculator } from "./BillingDateCalculator";

export const SubscriptionForm = ({
  initialData = {},
  onAddSubscription,
  onEditSubscription,
  onClose,
}) => {
  const [subscriptionData, setSubscriptionData] = useState({
    subscription: "",
    cost: "",
    billingDay: "",
    id: null, // 編集の際に使用するID
  });

  // リセットトリガー
  const [resetTrigger, setResetTrigger] = useState(false);

  // 初期データが与えられた場合（編集モード）、そのデータでフォームを初期化
  useEffect(() => {
    // 初期データが与えられた場合、そのデータでフォームを初期化
    // initialDataが変更された（例えば編集ボタンがクリックされた）時に、フォームのステートをinitialDataで更新する
    setSubscriptionData({
      subscription: initialData.subscription || "",
      cost: initialData.cost || "",
      billingDay: initialData.billingDay || "",
      nextBillingDate: initialData.nextBillingDate || "",
      id: initialData.id || null,
    });
  }, [initialData]);

  // 請求日を基に次回請求日を計算する関数
  const calculateNextBillingDate = (billingDay) => {
    const today = new Date();
    const currentDay = today.getUTCDate();
    let nextBillingDate = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), billingDay)
    );

    // 今月の請求日をすでに過ぎている場合、次の月の請求日を設定
    if (currentDay > billingDay) {
      nextBillingDate = new Date(
        Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + 1, billingDay)
      );
    }

    // YYYY-MM-DD 形式で返す
    return nextBillingDate.toISOString().substring(0, 10);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBillingDayChange = (day) => {
    setSubscriptionData((prevData) => ({
      ...prevData,
      billingDay: day,
    }));
  };

  // フォームを送信
  const handleSubmit = (e) => {
    e.preventDefault();

    // 全てのフィールドが入力されているか確認
    if (
      !subscriptionData.subscription.trim() ||
      !subscriptionData.cost.trim() ||
      !subscriptionData.billingDay.trim()
    ) {
      alert("すべてのフィールドを入力してください");
      return;
    }

    const nextBillingDate = calculateNextBillingDate(
      subscriptionData.billingDay
    );
    const submissionDataWithDate = { ...subscriptionData, nextBillingDate };

    if (subscriptionData.id) {
      // 編集処理
      onEditSubscription({ ...submissionDataWithDate });
    } else {
      // 新規追加処理
      onAddSubscription({ ...submissionDataWithDate, id: uuidv4() });
    }

    // フォームとモーダルをリセット
    setSubscriptionData({
      subscription: "",
      cost: "",
      billingDay: "",
      id: null, // IDをリセット
    });

    setResetTrigger(!resetTrigger);
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="subscription"
          value={subscriptionData.subscription}
          onChange={handleChange}
          placeholder="ネットフリックス"
        />
        <div className="input-price">
          <input
            name="cost"
            value={subscriptionData.cost}
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
            selectedDay={subscriptionData.billingDay}
          />
        </div>
        <button type="submit">{subscriptionData.id ? "更新" : "追加"}</button>
      </form>
    </>
  );
};

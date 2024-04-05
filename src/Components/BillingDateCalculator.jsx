import { useEffect, useState } from "react";

export const BillingDateCalculator = ({
  onBillingDayChange,
  resetTrigger,
  selectedDay,
}) => {
  const [day, setDay] = useState("");

  useEffect(() => {
    // resetTriggerが変更された時、またはselectedDayが更新された時に選択状態を更新する
    setDay(selectedDay || "");
  }, [resetTrigger, selectedDay]);

  const handleChange = (e) => {
    setDay(e.target.value);
    onBillingDayChange(e.target.value);
  };

  return (
    <>
      <select name="billingDay" value={day} onChange={handleChange}>
        <option value="">請求日を選択</option>
        {[...Array(31).keys()].map((day) => (
          <option key={day + 1} value={day + 1}>
            {day + 1}
          </option>
        ))}
      </select>
      <span>日</span>
      {/* 次の請求日を表示する必要がある場合はここに追加 */}
    </>
  );
};

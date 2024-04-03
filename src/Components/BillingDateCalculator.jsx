import { useEffect, useState } from "react";

export const BillingDateCalculator = ({ onBillingDayChange, resetTrigger }) => {
  const [selectedDay, setSelectedDay] = useState("");

  useEffect(() => {
    setSelectedDay("");
  }, [resetTrigger]);

  const handleChange = (e) => {
    setSelectedDay(e.target.value);
    onBillingDayChange(e.target.value);
  };

  return (
    <>
      <select name="billingDay" value={selectedDay} onChange={handleChange}>
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

export const BillingDateCalculator = ({ onBillingDayChange }) => {
  return (
    <>
      <select
        name="billingDay"
        id="billingDay"
        onChange={(e) => onBillingDayChange(e.target.value)}
      >
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

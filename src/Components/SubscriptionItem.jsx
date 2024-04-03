export const SubscriptionItem = ({ sub, onDelete }) => {
  const handleEdit = (params) => {};
  return (
    <li className="sub-item">
      <div className="item-group">
        <p className="item-title">{sub.subscription}</p>
        <div className="item-info">
          <p>
            <span>￥</span>
            <span>{sub.cost}</span>/月
          </p>
          <p>次回支払日：{sub.nextBillingDate}</p>
        </div>
      </div>
      <button onClick={() => onDelete(sub.id)}>削除</button>
    </li>
  );
};

import { DropdownMenu } from "./DropdownMenu";

export const SubscriptionItem = ({ sub, onDelete, onEdit }) => {
  const getCategoryClass = (category) => {
    switch (category) {
      case "仕事":
        return "business"; // 仕事の場合は 'business' クラスを返す
      case "勉強":
        return "learn"; // 勉強の場合は 'learn' クラスを返す
      case "娯楽":
        return "entertainment"; // 娯楽の場合は 'entertainment' クラスを返す
      default:
        return ""; // デフォルトの場合はクラスなし
    }
  };

  const categoryClass = getCategoryClass(sub.category); // カテゴリに基づくクラスを取得

  return (
    <li className="sub-item">
      <div className="item-header">
        <p className={`item-category ${categoryClass}`}>{sub.category}</p>
        <DropdownMenu sub={sub} onDelete={onDelete} onEdit={onEdit} />
      </div>
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
    </li>
  );
};

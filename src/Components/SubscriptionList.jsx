import { SubscriptionItem } from "./SubscriptionItem";

export const SubscriptionList = ({ subs, onDelete, onEdit }) => {
  return (
    <>
      <h3 className="content-title">契約中のサブスク</h3>
      <ul>
        {subs.map((sub) => (
          <SubscriptionItem
            key={sub.id}
            sub={sub}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </>
  );
};

import { SubscriptionItem } from "./SubscriptionItem";

export const SubscriptionList = ({ subs, onDelete, onEdit }) => {
  return (
    <>
      <h2>契約中のサブスク</h2>
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

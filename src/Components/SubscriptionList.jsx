import { SubscriptionItem } from "./SubscriptionItem";

export const SubscriptionList = ({ subs, onDelete }) => {
  return (
    <ul>
      {subs.map((sub) => (
        <SubscriptionItem key={sub.id} sub={sub} onDelete={onDelete} />
      ))}
    </ul>
  );
};

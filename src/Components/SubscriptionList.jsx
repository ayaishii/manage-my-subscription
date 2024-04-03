import { SubscriptionItem } from "./SubscriptionItem";

export const SubscriptionList = ({ subs, onDelete }) => {
  console.log(subs);
  return (
    <ul>
      {subs.map((sub) => (
        <SubscriptionItem key={sub.id} sub={sub} onDelete={onDelete} />
      ))}
    </ul>
  );
};

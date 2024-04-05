import { useState } from "react";
import { SubscriptionList } from "./Components/SubscriptionList";
import { SubscriptionForm } from "./Components/SubscriptionForm";
import "./scss/reset.scss";
import "./scss/App.scss";
import { Modal } from "./Components/Modal/Modal";

export const App = () => {
  const [subs, setSubs] = useState([]); // サブスクリプションのリストを保持
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示状態
  const [editingSub, setEditingSub] = useState(null); // 編集中のサブスクリプション

  const handleDelete = (id) => {
    const updatedSubs = subs.filter((sub) => sub.id !== id);
    setSubs(updatedSubs);
  };

  // サブスクリプションの追加処理
  const handleAddSubscription = (newSub) => {
    setSubs([...subs, newSub]);
  };

  // サブスクリプションの編集処理
  const handleEditSubscription = (editedSub) => {
    setSubs(subs.map((sub) => (sub.id === editedSub.id ? editedSub : sub)));
  };

  const openModal = (sub = {}) => {
    setEditingSub(sub); // 編集するサブスクリプションをセット（新規追加の場合は空オブジェクト）
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>サブスク</h1>
      <button className="add" onClick={() => openModal()}>
        サブスクを追加
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SubscriptionForm
          initialData={editingSub}
          onAddSubscription={handleAddSubscription}
          onEditSubscription={handleEditSubscription}
          onClose={closeModal}
        />
      </Modal>
      <SubscriptionList
        subs={subs}
        onDelete={handleDelete}
        onEdit={openModal}
      />
    </div>
  );
};

export default App;

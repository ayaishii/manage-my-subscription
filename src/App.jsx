import { useState, useEffect } from "react";
import { SubscriptionList } from "./Components/SubscriptionList";
import { SubscriptionForm } from "./Components/SubscriptionForm";
import "./scss/reset.scss";
import "./scss/App.scss";
import { Modal } from "./Components/Modal/Modal";

export const App = () => {
  const [subs, setSubs] = useState([]); // サブスクリプションのリストを保持
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示状態
  const [editingSub, setEditingSub] = useState(null); // 編集中のサブスクリプション
  const [totalMoCost, setTotalMoCost] = useState(0); // 毎月の合計金額

  // コンポーネントがマウントされた後にローカルストレージからデータを読み込む
  useEffect(() => {
    const storedSubs = localStorage.getItem("subs");
    if (storedSubs) {
      setSubs(JSON.parse(storedSubs));
    }
  }, []);

  // subs ステートが更新されたらローカルストレージにデータを保存する
  useEffect(() => {
    localStorage.setItem("subs", JSON.stringify(subs));
  }, [subs]);

  useEffect(() => {
    const totalCost = subs.reduce(
      (total, sub) => total + parseInt(sub.cost, 10),
      0
    );
    setTotalMoCost(totalCost);
  }, [subs]);

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
      <div className="sub-summary">
        <p>毎月の合計</p>
        <p className="total-cost">
          <span>￥</span>
          <span>{totalMoCost}</span>
        </p>
      </div>
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

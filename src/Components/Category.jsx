import { useEffect, useState } from "react";

export const Category = ({
  onCategoryChange,
  resetTrigger,
  selectedCategory,
}) => {
  const [category, setCategory] = useState("");

  useEffect(() => {
    // resetTriggerが変更された時、またはselectedDayが更新された時に選択状態を更新する
    setCategory(selectedCategory || "");
  }, [resetTrigger, selectedCategory]);

  const handleChange = (e) => {
    setCategory(e.target.value);
    onCategoryChange(e.target.value);
  };

  return (
    <>
      <div className="select-wrapper">
        <select name="category select" value={category} onChange={handleChange}>
          <option className="gray" value="">
            カテゴリを選択
          </option>
          <option value="仕事">仕事</option>
          <option value="勉強">勉強</option>
          <option value="娯楽">娯楽</option>
        </select>
      </div>
    </>
  );
};

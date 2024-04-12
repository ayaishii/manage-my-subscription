import { GoKebabHorizontal, GoTrash, GoPencil } from "react-icons/go";
import { useEffect, useState } from "react";
import { useRef } from "react";

export const DropdownMenu = ({ sub, onDelete, onEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button onClick={toggleMenu} className="kebab">
        <GoKebabHorizontal className="icon" />
      </button>
      {isOpen && (
        <ul>
          <li>
            <button onClick={() => onDelete(sub.id)}>
              <GoTrash className="icon" />
              削除
            </button>
          </li>
          <li>
            <button onClick={() => onEdit(sub)}>
              <GoPencil className="icon" />
              編集
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

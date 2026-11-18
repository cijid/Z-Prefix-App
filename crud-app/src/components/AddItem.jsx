import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddItem = ({ currentUser }) => {
  const [newItem, setNewItem] = useState({
    item_name: "",
    description: "",
    quantity: "",
    UserId: currentUser?.id || 1,
  });
  const navigate = useNavigate();

  //create a new item - fix the api backend
  const createItem = (makeNewItem) => {
    makeNewItem.preventDefault();

    fetch("http://localhost:8080/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error("Error creating item:", err));
  };

  return (
    <>
      <div className="add-item-container">
        <form onSubmit={createItem}>
          <div>
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(makeNewItem) =>
                setNewItem({ ...newItem, item_name: makeNewItem.target.value })
              }
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Description"
              value={newItem.description}
              onChange={(makeNewItem) =>
                setNewItem({
                  ...newItem,
                  description: makeNewItem.target.value,
                })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Quantity"
              value={newItem.quantity}
              onChange={(makeNewItem) =>
                setNewItem({
                  ...newItem,
                  quantity: makeNewItem.target.value,
                })
              }
            />
          </div>
          <div>
            <button type="submit">Add Item</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddItem;

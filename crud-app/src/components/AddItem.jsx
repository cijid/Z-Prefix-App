import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AddItem.css";
const RENDER_API_URL = import.meta.env.API_URL;

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

    fetch(`${RENDER_API_URL}/item`, {
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
      <div className="add-item-header">
        <h1>Add Item</h1>
        <div className="add-item-container">
          <form onSubmit={createItem}>
            <div className="add-item-inputs">
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(makeNewItem) =>
                  setNewItem({
                    ...newItem,
                    item_name: makeNewItem.target.value,
                  })
                }
                required
              />
            </div>
            <div className="add-item-inputs">
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
            <div className="add-item-inputs">
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
            <div className="add-item-button-container">
              <div className="add-item-button">
                <button type="submit">Submit</button>
              </div>
              <div className="add-item-button">
                <button type="submit" onClick={() => navigate("/")}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;

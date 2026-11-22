import { useState, useEffect } from "react";
import "../styles/App.css";

function CrudApp({ currentUser }) {
  const [allItems, setAllItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState(
    currentUser ? String(currentUser.id) : "all",
  );
  const [selectedItem, setSelectedItem] = useState(null);

  //After login, default to current user's items
  useEffect(() => {
    if (currentUser) {
      setSelectedUser(String(currentUser.id));
    } else {
      setSelectedUser("all");
    }
  }, [currentUser]);

  // Fetch list of items from API
  useEffect(() => {
    fetch("http://localhost:8080/item")
      .then((res) => res.json())
      .then((data) => {
        setAllItems(data);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
      });
  }, []);

  //Filter Items by Users
  const userIds = [];

  for (let i = 0; i < allItems.length; i++) {
    const userId = allItems[i].UserId;

    if (!userIds.includes(userId)) {
      userIds.push(userId);
    }
  }

  const filteredItems = allItems.filter((item) => {
    return selectedUser === "all" || item.UserId === Number(selectedUser);
  });

  // If description is greater than 100 characters shrink and add ...
  function reduceDescription(description) {
    if (description && description.length > 100) {
      return description.slice(0, 100) + "...";
    } else {
      return description;
    }
  }

  // Add Item
  // Moved to component AddItem.jsx

  // Show list of items added by user
  // Filterable with dropdown

  // Edit an item - In edit mode, page remains the same and the fields become editable.
  const [editMode, setEditMode] = useState(false);
  const [editItem, setEditItem] = useState({
    item_name: "",
    description: "",
    quantity: 0,
  });

  const startEditMode = () => {
    //Stop being dumb and crashing
    if (selectedItem === null) {
      return;
    }

    setEditItem({
      item_name: selectedItem.item_name,
      description: selectedItem.description,
      quantity: selectedItem.quantity,
    });
    setEditMode(true);
  };

  async function deleteItem() {
    if (selectedItem === null) {
      console.log("No item selected");
      return;
    }

    const response = await fetch(
      `http://localhost:8080/item/${selectedItem.id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Could not delete item");
    }

    setAllItems((prevItems) =>
      prevItems.filter((item) => item.id !== selectedItem.id),
    );

    setSelectedItem(null);
    setEditMode(false);
  }

  const updateEditedItem = async (itemEdits) => {
    itemEdits.preventDefault();

    const updatedFields = {
      item_name: editItem.item_name,
      description: editItem.description,
      quantity: Number(editItem.quantity),
    };

    fetch(`http://localhost:8080/item/${selectedItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    })
      .then((res) => res.json())
      .then((data) => {
        var updatedItem = [];

        if (Array.isArray(data)) {
          updatedItem = data[0];
        }

        setAllItems((prevItems) =>
          prevItems.map((item) =>
            item.id === selectedItem.id ? updatedItem : item,
          ),
        );

        setSelectedItem(updatedItem);

        setEditMode(false);
      });
  };

  const isOwner =
    currentUser && selectedItem && currentUser.id === selectedItem.UserId;

  console.log("Current User:", currentUser);
  console.log("Selected Item:", selectedItem);
  console.log("Edit Mode:", editMode);

  return (
    <>
      <section className="filter-by-item">
        <div className="filter-by-item-container">
          <h2>Filter by User</h2>

          <div>
            <label htmlFor="user-filter">Select User:</label>

            <select
              id="user-filter"
              value={selectedUser}
              onChange={(userFilter) =>
                setSelectedUser(userFilter.target.value)
              }
            >
              <option value="all">All Users</option>

              {userIds.map((userId) => (
                <option key={userId} value={userId}>
                  {currentUser && userId === currentUser.id
                    ? `User ${userId} (${currentUser.First_Name} - You)`
                    : `User ${userId}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <table className="item-table">
        <thead className="item-table-head">
          <tr>
            <th>Item ID</th>
            <th>User ID</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody className="item-table-body">
          {filteredItems.map((item) => (
            <tr key={item.id} onClick={() => setSelectedItem(item)}>
              <td>{item.id}</td>
              <td>{item.UserId}</td>
              <td>{item.item_name}</td>
              <td>{reduceDescription(item.description)}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section id="spacer"></section>

      {selectedItem && (
        <div className="item-details">
          <h2>Item Details</h2>
          {editMode ? (
            <form onSubmit={updateEditedItem}>
              <div>
                <label>Item Name: </label>
                <input
                  type="text"
                  value={editItem.item_name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, item_name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label>Description: </label>
                <textarea
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label>Quantity: </label>
                <input
                  type="number"
                  value={editItem.quantity}
                  onChange={(e) =>
                    setEditItem({ ...editItem, quantity: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit">Save Changes</button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={deleteItem}
              >
                Delete
              </button>
            </form>
          ) : (
            <div>
              <p>ID: {selectedItem.id}</p>
              <p>User ID: {selectedItem.UserId}</p>
              <p>Item Name: {selectedItem.item_name}</p>
              <p>Description: {selectedItem.description}</p>
              <p>Quantity: {selectedItem.quantity}</p>

              {isOwner && (
                <button onClick={startEditMode}>Edit or Delete Item</button>
              )}

              <button onClick={() => setSelectedItem(null)}>Close</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CrudApp;

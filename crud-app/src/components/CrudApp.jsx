import { useState, useEffect } from "react";
import "../styles/App.css";

function MainPage({ currentUser }) {
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

  // Show list of items added by user

  // Edit an item - In edit mode, page remains the same and the fields become editable.

  // Delete an item

  //Click an item - see card for specific item

  return (
    <>
      <section id="filter-by-item">
        <div>
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
            <th>ID</th>
            <th>User Id</th>
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th></th>
            <th></th>
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

      <div className="ticks"></div>

      <section id="spacer"></section>

      {selectedItem && (
        <div>
          <h2>Item Details</h2>

          <p>ID: {selectedItem.id}</p>
          <p>User ID: {selectedItem.UserId}</p>
          <p>Item Name: {selectedItem.item_name}</p>
          <p>Description: {selectedItem.description}</p>
          <p>Quantity: {selectedItem.quantity}</p>
          <button onClick={() => setSelectedItem(null)}>Close</button>
        </div>
      )}
    </>
  );
}

export default MainPage;

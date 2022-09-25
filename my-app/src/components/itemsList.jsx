import React, { useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import { getDespensaCall, deleteItemCall } from "../services/api_calls";

function ItemsList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  async function loadData() {
    const res = await getDespensaCall();
    console.log(res.data.Items);
    setItems(res.data.Items);
    setLoading(false);
  }

  async function deleteItem(id) {
    console.log(id);
    const res = await deleteItemCall(id);
    if (res) {
      console.log(res);

      await loadData();
    }
  }

  function formatDate(dateString = "") {
    let formattedDate = "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    formattedDate += month < 10 ? `0${month}` : `${month}`;
    formattedDate += day < 10 ? `/0${day}` : `/${day}`;
    formattedDate += `/${year}`;

    return formattedDate;
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      {loading ? (
        <div
          style={{
            marginTop: 200,
          }}
        >
          <CircularProgress size={200} />
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                margin: "20px 20px 10px 20px",
                border: "3px solid #0E9D3B",
                padding: "5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                textAlign: "left",
                borderRadius: "5px",
              }}
            >
              <div>
                <div style={{ fontSize: 20, fontWeight: 600, font: "Roboto" }}>
                  {item.Articulo}
                </div>
                <div style={{ fontSize: 10 }}>
                  Exp: {formatDate(item.FechaExpiracion)}
                </div>
              </div>
              <div
                style={{
                  cursor: "pointer",
                  marginRight: "5px",
                  color: "black",
                }}
                onClick={() => deleteItem(item.id)}
              >
                X
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default ItemsList;

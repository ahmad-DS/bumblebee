import { useEffect } from "react";
import "./billing.css";
import { Outlet, useNavigate } from "react-router";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit.hooks";
import { fetchAllTablesAsync, fetchTableAllOrdersAsync } from "./async-thunk";
import { chooseTable } from "./billingSlice";

function BillingLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tables = useAppSelector((state) => state.billing.tables);

  useEffect(() => {
    dispatch(fetchAllTablesAsync());
  }, [dispatch]);
  return (
    <div className="billing-dashboard">
      <header className="billing-header">
        <h1>Billing Dashboard</h1>
      </header>
      <div className="billing-container">
        <aside className="billing-sidebar">
          <h3>Occupied Tables</h3>
          {/* Your list of tables would go here */}
          {tables.map((table) => (
            <nav key={table.tableNumber}>
              {" "}
              <button
                className={`table-item ${table.status === "OCCUPIED" ? "active" : ""}`}
                onClick={() => {
                  dispatch(chooseTable(table));
                  navigate(`/billing/${table.tableNumber}`);
                }}
              >
                Table {table.tableNumber}
              </button>
            </nav>
          ))}
        </aside>
        <main className="billing-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


function Billing() {
  const { table_number: tableNumber } = useParams();
  const dispatch = useAppDispatch();
  
  // const selectedTable = useAppSelector((state) => state.billing.selectedTable);
  const orders = useAppSelector((state) => state.billing.selectedTableOrdersInfo);

  useEffect(() => {
    if (tableNumber) {
      dispatch(fetchTableAllOrdersAsync(+tableNumber));
    }
  }, [dispatch, tableNumber]);

  const handlePrint = () => {
    window.print();
  };

  if (!tableNumber) {
    return <div className="placeholder">Select a table to view details</div>;
  }

  // Calculate the sum of all orders for this table
  const grandTotal = orders?.reduce((acc, order) => acc + order.totalPrice, 0) || 0;

  return (
    <div className="billing-details-container">
      <div className="bill-header">
        <h2>Table {tableNumber} Details</h2>
        <button className="checkout-btn" onClick={handlePrint}>
          Print Receipt
        </button>
      </div>

      {orders && orders.length > 0 ? (
        <div className="orders-wrapper">
          {orders.map((order) => (
            <div key={order.orderId} className="order-section">
              <div className="order-subheader">
                <small>Order ID: {order.orderId}</small>
                {order.customerName && <span>User: {order.customerName}</span>}
              </div>
              
              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={item.itemId} className="item-row">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-qty">x {item.quantity}</span>
                    </div>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bill-footer">
            <div className="grand-total-row">
              <strong>Grand Total</strong>
              <strong className="total-amount">${grandTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      ) : (
        <p>No active orders for this table.</p>
      )}
    </div>
  );
}

export { BillingLayout, Billing };

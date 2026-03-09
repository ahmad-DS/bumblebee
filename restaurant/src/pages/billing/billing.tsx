import { Outlet } from "react-router";

function BillingLayout() {
  return (
    <div className="billing-layout">
      <h1>Blling Dashboard</h1>
      {/* to show list of occupied tables */}
      <div> Sidebar</div>
      <Outlet />
    </div>
  );
}

function Billing() {
  return <div>Table Number 1</div>;
}

export { BillingLayout, Billing };

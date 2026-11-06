import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function CreateReservation() {
  const { apiRequest } = useAuth();
  const nav = useNavigate();
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [inventoryId, setInventoryId] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [durationMinutes, setDurationMinutes] = useState("30");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([apiRequest("/orders"), apiRequest("/inventory")])
      .then(([ordersResponse, inventoryResponse]) => {
        const availableOrders = ordersResponse.data.filter((order) => order.reservationStatus !== "Active");
        setOrders(availableOrders);
        setInventory(inventoryResponse.data);
        if (availableOrders[0]) setOrderId(availableOrders[0]._id);
        if (inventoryResponse.data[0]) setInventoryId(inventoryResponse.data[0]._id);
      })
      .catch((e) => setError(e.message));
  }, [apiRequest]);

  async function submit(e) {
    e.preventDefault();
    setError("");

    const parsedQuantity = Number(quantity);
    const parsedDuration = Number(durationMinutes);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      setError("Enter a whole-number quantity of at least 1.");
      return;
    }
    if (!Number.isInteger(parsedDuration) || parsedDuration < 1) {
      setError("Enter a whole-number hold duration of at least 1 minute.");
      return;
    }
    if (!orderId || !inventoryId) {
      setError("Please select an order and an inventory item.");
      return;
    }

    setSaving(true);
    try {
      const body = await apiRequest("/reservations", {
        method: "POST",
        body: JSON.stringify({
          orderId,
          items: [{ inventoryId, quantity: parsedQuantity }],
          durationMinutes: parsedDuration
        })
      });
      nav(`/reservations/${body.data._id}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/reservations" className="text-sm font-semibold text-slate-600">← Back to Reservations</Link>
      <div>
        <h1 className="text-3xl font-bold">Create Reservation</h1>
        <p className="text-slate-500">Hold available inventory for an order.</p>
      </div>

      <form onSubmit={submit} className="card space-y-5 p-6">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <label className="block text-sm font-medium">
          Order
          <select className="input mt-1" value={orderId} onChange={(e) => setOrderId(e.target.value)} required>
            {orders.map((order) => <option key={order._id} value={order._id}>{order.orderNumber} — {order.customer?.name}</option>)}
          </select>
        </label>

        <label className="block text-sm font-medium">
          Inventory
          <select className="input mt-1" value={inventoryId} onChange={(e) => setInventoryId(e.target.value)} required>
            {inventory.map((product) => <option key={product._id} value={product._id}>{product.name} — {product.totalStock - product.reservedStock} available</option>)}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium">
            Quantity
            <input
              className="input mt-1"
              type="text"
              inputMode="numeric"
              pattern="[0-9]+"
              autoComplete="off"
              placeholder="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </label>
          <label className="block text-sm font-medium">
            Hold duration (minutes)
            <input
              className="input mt-1"
              type="text"
              inputMode="numeric"
              pattern="[0-9]+"
              autoComplete="off"
              placeholder="30"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              required
            />
          </label>
        </div>

        <button className="btn-primary w-full" disabled={saving || !orders.length || !inventory.length}>
          {saving ? "Creating reservation…" : "Create reservation"}
        </button>
      </form>
    </div>
  );
}

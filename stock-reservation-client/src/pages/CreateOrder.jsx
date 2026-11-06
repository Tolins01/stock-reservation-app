import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function CreateOrder() {
  const { apiRequest } = useAuth();
  const nav = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [item, setItem] = useState({ inventoryId: "", quantity: "1", unitPrice: "0.00" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiRequest("/inventory")
      .then((body) => {
        setInventory(body.data);
        if (body.data[0]) setItem((current) => ({ ...current, inventoryId: body.data[0]._id }));
      })
      .catch((e) => setError(e.message));
  }, [apiRequest]);

  async function submit(e) {
    e.preventDefault();
    setError("");

    const quantity = Number(item.quantity);
    // Accept both a dot and a comma as the decimal separator.
    const unitPrice = Number(String(item.unitPrice).trim().replace(",", "."));

    if (!Number.isInteger(quantity) || quantity < 1) {
      setError("Enter a whole-number quantity of at least 1.");
      return;
    }
    if (item.unitPrice.trim() === "" || !Number.isFinite(unitPrice) || unitPrice < 0) {
      setError("Enter a valid unit price (for example, 12.50).");
      return;
    }

    setSaving(true);
    try {
      const body = await apiRequest("/orders", {
        method: "POST",
        body: JSON.stringify({
          customer,
          items: [{ inventoryId: item.inventoryId, quantity, unitPrice }]
        })
      });
      nav(`/orders?created=${body.data.orderNumber}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link to="/orders" className="text-sm font-semibold text-slate-600">← Back to Orders</Link>
      <div>
        <h1 className="text-3xl font-bold">Create Order</h1>
        <p className="text-slate-500">Create a new order from your available inventories.</p>
      </div>

      <form onSubmit={submit} className="card space-y-5 p-6">
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        <label className="block text-sm font-medium">
          Customer name
          <input className="input mt-1" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} required />
        </label>

        <label className="block text-sm font-medium">
          Customer email
          <input className="input mt-1" type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
        </label>

        <label className="block text-sm font-medium">
          Product
          <select className="input mt-1" value={item.inventoryId} onChange={(e) => setItem({ ...item, inventoryId: e.target.value })} required>
            {inventory.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} — {product.sku} ({product.totalStock - product.reservedStock} available)
              </option>
            ))}
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
              value={item.quantity}
              onChange={(e) => setItem({ ...item, quantity: e.target.value })}
              required
            />
          </label>

          <label className="block text-sm font-medium">
            Unit price
            <input
              className="input mt-1"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0.00"
              value={item.unitPrice}
              onChange={(e) => setItem({ ...item, unitPrice: e.target.value })}
              required
              aria-describedby="unit-price-hint"
            />
            <span id="unit-price-hint" className="mt-1 block text-xs font-normal text-slate-500">
              Type the price directly. Decimals can use a dot or comma.
            </span>
          </label>
        </div>

        <button className="btn-primary w-full" disabled={saving || !inventory.length}>
          {saving ? "Creating order…" : "Create order"}
        </button>
      </form>
    </div>
  );
}

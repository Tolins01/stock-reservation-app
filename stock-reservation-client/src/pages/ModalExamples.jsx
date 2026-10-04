import { useState } from 'react';
import Modal from '../components/Modal';
import { products } from '../data/mockData';

export default function ModalExamples() {
  const [m, setM] = useState(null);
  const close = () => setM(null);

  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-3xl font-bold">Modal Examples (MVP)</h1>
        <p className="text-slate-500">Core actions for the stock reservation lifecycle.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {[
          ['create', 'Create Reservation', 'Reserve stock for an order before checkout.'],
          ['release', 'Release Reservation', 'Return reserved stock to inventory.'],
          ['confirm', 'Confirm Order', 'Confirm the order and deduct reserved stock.'],
          ['expired', 'Release Expired Reservations', 'Release all reservations past their expiry.'],
        ].map(([id, t, d]) => (
          <div className="card p-5" key={id}>
            <h2 className="font-bold">{t}</h2>
            <p className="mt-1 text-sm text-slate-500">{d}</p>
            <button className="btn-primary mt-6 w-full" onClick={() => setM(id)}>
              Open {t} Modal
            </button>
          </div>
        ))}
      </div>

      <Create open={m === 'create'} close={close} />
      <Release open={m === 'release'} close={close} />
      <Confirm open={m === 'confirm'} close={close} />
      <Expired open={m === 'expired'} close={close} />
    </div>
  );
}

const Foot = ({ close, red = false, label }) => (
  <>
    <button className="btn-secondary" onClick={close}>
      Cancel
    </button>
    <button
      onClick={close}
      className={red ? 'rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white' : 'btn-primary'}
    >
      {label}
    </button>
  </>
);

function Create({ open, close }) {
  return (
    <Modal
      open={open}
      onClose={close}
      title="Create Reservation"
      description="Hold inventory for a limited time."
      footer={<Foot close={close} label="Create Reservation" />}
    >
      <div className="space-y-4">
        <label className="block text-sm font-medium">
          Order ID
          <select className="input mt-1">
            <option>ORD-1005</option>
          </select>
        </label>

        <label className="block text-sm font-medium">
          Product
          <select className="input mt-1">
            {products.map((p) => (
              <option key={p.id}>
                {p.id} — {p.name}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <input className="input" type="number" defaultValue="1" />
          <select className="input">
            <option>24 hours</option>
            <option>1 hour</option>
          </select>
        </div>
      </div>
    </Modal>
  );
}

function Release({ open, close }) {
  return (
    <Modal
      open={open}
      onClose={close}
      title="Release Reservation"
      description="Are you sure you want to release this reservation?"
      footer={<Foot close={close} red label="Release" />}
    >
      <div className="rounded-xl bg-slate-50 p-4 text-sm space-y-2">
        <p>
          Reservation ID: <b>RES-0006</b>
        </p>
        <p>
          Product: <b>USB-C Cable</b>
        </p>
        <p>
          Quantity: <b>20</b>
        </p>
      </div>
    </Modal>
  );
}

function Confirm({ open, close }) {
  return (
    <Modal
      open={open}
      onClose={close}
      title="Confirm Order"
      description="This will confirm the order and deduct reserved stock."
      footer={<Foot close={close} label="Confirm" />}
    >
      <div className="rounded-xl bg-slate-50 p-4 text-sm">
        <p>
          Order ID: <b>ORD-1005</b>
        </p>
        <p>
          Products: <b>Laptop Sleeve, Wireless Mouse</b>
        </p>
        <p>
          Total items: <b>8</b>
        </p>
      </div>
    </Modal>
  );
}

function Expired({ open, close }) {
  return (
    <Modal
      open={open}
      onClose={close}
      title="Release Expired Reservations"
      description="Release all reservations whose expiry time has passed."
      footer={<Foot close={close} red label="Release All" />}
    >
      <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
        <b>3 expired reservations found.</b>
        <p className="mt-1">Their stock will return to available inventory.</p>
      </div>

      <label className="mt-4 flex gap-2 text-sm">
        <input type="checkbox" defaultChecked />
        I understand this action cannot be reversed.
      </label>
    </Modal>
  );
}

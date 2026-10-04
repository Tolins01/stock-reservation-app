import { products } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory</h1>
        <p className="text-slate-500">Track your stock levels and availability.</p>
      </div>

      <div className="card overflow-hidden">
        <div className="border-b p-4">
          <input className="input max-w-md" placeholder="Search products or SKU..." />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500">
              <tr>
                {['Product', 'SKU', 'Total Stock', 'Reserved', 'Available', 'Status'].map((x) => (
                  <th className="px-5 py-3" key={x}>
                    {x}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="px-5 py-4 font-semibold">{p.name}</td>
                  <td className="px-5 py-4">{p.sku}</td>
                  <td className="px-5 py-4">{p.total}</td>
                  <td className="px-5 py-4">{p.reserved}</td>
                  <td className="px-5 py-4 font-semibold">{p.total - p.reserved}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status="In Stock" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import{X}from'lucide-react';
export default function Modal({open,title,description,children,onClose,footer})
{if(!open)return null;return <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4">
    <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b p-5">
            <div>
                <h2 className="text-lg font-bold">{title}</h2>
                {description&&<p className="mt-1 text-sm text-slate-500">{description}</p>}
            </div>
            <button onClick={onClose}><X/></button>
            </div>
            <div className="p-5">{children}</div>{footer&&<div className="flex justify-end gap-3 border-t p-5">{footer}</div>}</div>
            </div>
            }

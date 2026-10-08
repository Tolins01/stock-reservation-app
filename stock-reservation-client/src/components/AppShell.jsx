import { useState } from "react";
import Toast from "./Toast";
export default function AppShell({children}){const [toast,setToast]=useState(null);return <>{children}<Toast toast={toast} onClose={()=>setToast(null)}/></>}

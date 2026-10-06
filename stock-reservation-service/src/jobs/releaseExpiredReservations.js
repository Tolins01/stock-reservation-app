import {releaseExpiredReservations} from "../services/reservationService.js";

export function startExpirationJob(){
    const interval=Number(process.env.EXPIRATION_INTERVAL_MS||60000);
    const run=async()=>{try{const n=await releaseExpiredReservations();
        if(n)console.log(`Expiration job released ${n} reservation(s)`); 
    }catch(e){
        console.error("Expiration job failed:",e.message);}};
        setTimeout(run,2000);
        return setInterval(run,interval);
    }

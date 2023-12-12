import { Button } from "@/components/ui/button";
import firebaseConfig from "@/lib/firebaseConfig";


export default function Deposit() {
    return (
      <>
        <div>
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Esta es la pagina de Deposit
            </h2>
          </div> 
        </div>

        <input type="number" />
        <Button>Deposit</Button>
      </>
    )
}
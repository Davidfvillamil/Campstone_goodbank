'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebaseConfig from "@/lib/firebaseConfig";
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default function Withdraw() {

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorWithdrawGreaterThanBalance, setErrorWithdrawGreaterThanBalance] = useState('')
  const { user } = useUser();

  const handleWithdraw = async () => {
    try{
      if (!user) {
        console.error('Usuario no autenticado.');
        return;
      }
      const userDocRef = doc(firestore, 'Users', user.id);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        // Sumar el valor del depósito al balance actual
        const currentBalance = userData.Balance || 0;
        const withdrawValue = parseFloat(withdrawAmount);

        if (!isNaN(withdrawValue) && withdrawValue > 0 && withdrawValue < userData.Balance) {
          setErrorWithdrawGreaterThanBalance('')

          const newBalance = currentBalance - withdrawValue;
          // Actualizar el documento del usuario en Firestore con el nuevo balance
          await updateDoc(userDocRef, { Balance: newBalance });

          // Actualizar el estado local para reflejar el nuevo balance en la interfaz
          setWithdrawAmount('');
          
        } else if(!isNaN(withdrawValue) && withdrawValue > userData.Balance){
          setErrorWithdrawGreaterThanBalance('The amount exceds the money in your account')
        }else{
          setErrorWithdrawGreaterThanBalance("You can't input negative values")

        }
      } else {
        console.error('El documento del usuario no existe.');
      }

    }catch{

    }
  }

    return (
      <>
        <div>
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Esta es la pagina de Withdraw
            </h2>
          </div> 
        </div>

       <input 
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(e.target.value)}
       /> 

        <Button onClick={handleWithdraw}>Deposit</Button>
        <h2>{errorWithdrawGreaterThanBalance}</h2>
      </>
    )
  }
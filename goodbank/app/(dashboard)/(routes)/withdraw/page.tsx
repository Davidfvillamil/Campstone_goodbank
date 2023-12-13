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
        const currentTransaccions = userData.allData || []

        if (!isNaN(withdrawValue) && withdrawValue > 0 && withdrawValue < userData.Balance) {
          setErrorWithdrawGreaterThanBalance('')

          const newBalance = currentBalance - withdrawValue;
          const newTransaction = {
            Type:'Withdraw',
            Amount:withdrawValue, 
            Balance_update: newBalance
          }

          //Estrucutra de la actualización de los datos de firebase
          const updatedUserData = {
            ...userData,
            Balance: newBalance,
            allData: [...currentTransaccions, newTransaction],
          };
          // Actualizar el documento del usuario en Firestore con el nuevo balance
          await updateDoc(userDocRef, updatedUserData);

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
    <div className="max-w-screen-md mx-auto p-4">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Esta es la página de Retiro
        </h2>
      </div>

      <input
        className="w-full p-2 border rounded-md mb-4"
        type="number"
        placeholder="Ingrese el monto del retiro"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />

      <Button
        className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-md"
        onClick={handleWithdraw}
      >
        Retirar
      </Button>
      <h2 className="text-red-500 mt-2">{errorWithdrawGreaterThanBalance}</h2>
    </div>
  );
}
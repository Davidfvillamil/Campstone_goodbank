'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebaseConfig from "@/lib/firebaseConfig";
import { initializeApp } from 'firebase/app';


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default function Deposit() {
  const [depositAmount, setDepositAmount] = useState('');
  const [errorMessageNegativeValue,setErrorMessageNegativeValue] = useState('')
  const { user } = useUser();

  const handleDeposit = async () => {
    try {
      // Verifica si el usuario está autenticado antes de continuar
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
        const depositValue = parseFloat(depositAmount);
        const currentTransaccions = userData.allData || []

        if (!isNaN(depositValue) && depositValue > 0) {
          const newBalance = currentBalance + depositValue;
          const newTransaction = {
            Type:'Deposit',
            Amount:depositValue, 
            Balance_update: newBalance
          }

          const updatedUserData = {
            ...userData,
            Balance: newBalance,
            allData: [...currentTransaccions, newTransaction],
          };
          
          setErrorMessageNegativeValue('')
          // Actualizar el documento del usuario en Firestore con el nuevo balance
          await updateDoc(userDocRef, updatedUserData);
          
          // Actualizar el estado local para reflejar el nuevo balance en la interfaz
          setDepositAmount('');
          
        } else {
          console.error('Ingresa un valor de depósito válido.');
          setErrorMessageNegativeValue("You can't deposit negative values")
        }
      } else {
        console.error('El documento del usuario no existe.');
      }
    } catch (error) {
      console.error('Error al realizar el depósito:', error);
    }
  };

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Esta es la página de Depósito
        </h2>
      </div>

      {/* Campo de entrada para el monto del depósito */}
      <input
        className="w-full p-2 border rounded-md mb-4"
        type="number"
        placeholder="Ingrese el monto del depósito"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
      />

      {/* Botón para realizar el depósito */}
      <Button
        className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-md"
        onClick={handleDeposit}
      >
        Depositar
      </Button>
      <h2 className="text-red-500 mt-2">{errorMessageNegativeValue}</h2>
      
    </div>
  );
}

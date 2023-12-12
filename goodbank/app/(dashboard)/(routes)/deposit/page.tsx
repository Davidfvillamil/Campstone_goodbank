'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebaseConfig from "@/lib/firebaseConfig";
import { initializeApp } from 'firebase/app';

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

        if (!isNaN(depositValue) && depositValue > 0) {
          const newBalance = currentBalance + depositValue;
          setErrorMessageNegativeValue('')
          // Actualizar el documento del usuario en Firestore con el nuevo balance
          await updateDoc(userDocRef, { Balance: newBalance });

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

  return (
    <>
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Esta es la página de Depósito
          </h2>
        </div>
      </div>

      {/* Campo de entrada para el monto del depósito */}
      <input
        type="number"
        value={depositAmount}
        onChange={(e) => setDepositAmount(e.target.value)}
      />

      {/* Botón para realizar el depósito */}
      <Button onClick={handleDeposit}>Deposit</Button>
      <h2>{errorMessageNegativeValue}</h2>
    </>
  );
}

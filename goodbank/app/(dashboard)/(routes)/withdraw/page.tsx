'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import firebaseConfig from "@/lib/firebaseConfig";
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

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

export default function Withdraw() {

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [errorWithdrawGreaterThanBalance, setErrorWithdrawGreaterThanBalance] = useState('')
  const [successMessage,setSuccessMessage] = useState('')
  const [showAlertMessage,setShowAlertMessage] = useState('')
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

          setSuccessMessage('Withdraw Succed')
          setShowAlertMessage('success')
          setTimeout(() => {
            setSuccessMessage('')
          },3000)
          // Actualizar el documento del usuario en Firestore con el nuevo balance
          await updateDoc(userDocRef, updatedUserData);

          // Actualizar el estado local para reflejar el nuevo balance en la interfaz
          setWithdrawAmount('');
          
        } else if(!isNaN(withdrawValue) && withdrawValue > userData.Balance){
          setErrorWithdrawGreaterThanBalance('The amount exceds the money in your account')
          setSuccessMessage('')
          setShowAlertMessage('Withdraw exced')
        }else{
          setErrorWithdrawGreaterThanBalance("You can't input negative values")
          setShowAlertMessage('error')
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
          Withdraw Money with only one click
        </h2>
      </div>

      <input
        className="w-full p-2 border rounded-md mb-4"
        type="number"
        placeholder="Ingrese el monto del retiro"
        value={withdrawAmount}
        onChange={(e) => setWithdrawAmount(e.target.value)}
      />

      

      <AlertDialog>
          <AlertDialogTrigger className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-md">
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-md"
              onClick={handleWithdraw}
            >
              Withdraw
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {showAlertMessage === 'success'
                  ? 'Withdraw Success!'
                  : showAlertMessage === 'Withdraw exced'
                  ? 'Error: Withdraw error!'
                  : showAlertMessage === 'error'
                  ? 'Withdraw Error!'
                  : ''
                }
              </AlertDialogTitle>
              <AlertDialogDescription>
                {showAlertMessage === 'success'
                  ? 'You have successfully withdraw money. Click continue to keep using your app'
                  : showAlertMessage === 'Withdraw exced'
                  ? 'The seleceted amount exceds the total amount in account. Select a fewer value to continue this transaction'
                  : showAlertMessage === 'error'
                  ? 'Remeber to no include negative numbers on the input field'
                  : ''
                }
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>
              <Button
                  onClick={() => {
                    setShowAlertMessage(''); // Limpiar el estado aquí
                  }}
                >
                  Continue
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
      
    </div>
  );
}
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

export default function SendMoney() {
    const [recipientId, setRecipientId] = useState('');
    const [amountToSend, setAmountToSend] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showAlertMessage,setShowAlertMessage] = useState('')
    const { user } = useUser();
  
    const handleSendMoney = async () => {
      try {
        // Verifica si el usuario está autenticado antes de continuar
        if (!user) {
          console.error('Usuario no autenticado.');
          return;
        }
  
        // Verifica que se haya ingresado un ID de destinatario válido
        if (!recipientId) {
          setErrorMessage('Ingresa un ID de destinatario válido.');
          return;
        }
  
        // Verifica que se haya ingresado un monto válido
        const amount = parseFloat(amountToSend);
        if (isNaN(amount) || amount <= 0) {
          setErrorMessage('Ingresa un monto válido.');
          setShowAlertMessage('error_valor_invalido')
          return;
        }
  
        // Obtén la información del usuario actual
        const userDocRef = doc(firestore, 'Users', user.id);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
  
          // Verifica si el usuario tiene fondos suficientes para enviar
          const currentBalance = userData.Balance || 0;
          if (amount > currentBalance) {
            setErrorMessage('Fondos insuficientes para realizar la transferencia.');
            setShowAlertMessage('fondos_insuficientes')
            return;
          }
  
          // Realiza la transferencia
          const recipientDocRef = doc(firestore, 'Users', recipientId);
          const recipientDocSnapshot = await getDoc(recipientDocRef);
  
          if (recipientDocSnapshot.exists()) {
            const recipientData = recipientDocSnapshot.data();
  
            // Actualiza el balance del remitente y el destinatario
            const senderNewBalance = currentBalance - amount;
            const recipientNewBalance = (recipientData.Balance || 0) + amount;
  
            const senderTransaction = {
              Type: 'Transfered Money',
              Amount: -amount,
              Balance_update: senderNewBalance,
              Recipient: recipientId,
            };
  
            const recipientTransaction = {
              Type: 'Received Money',
              Amount: amount,
              Balance_update: recipientNewBalance,
              Sender: user.id,
            };
  
            const senderUpdatedData = {
              ...userData,
              Balance: senderNewBalance,
              allData: [...(userData.allData || []), senderTransaction],
            };
  
            const recipientUpdatedData = {
              ...recipientData,
              Balance: recipientNewBalance,
              allData: [...(recipientData.allData || []), recipientTransaction],
            };
  
            // Actualiza los documentos del remitente y el destinatario en Firestore
            await updateDoc(userDocRef, senderUpdatedData);
            await updateDoc(recipientDocRef, recipientUpdatedData);
  
            // Actualiza los estados locales
            setRecipientId('');
            setAmountToSend('');
            setErrorMessage('');
            setShowAlertMessage('success')
            } else {
            setErrorMessage('El destinatario no existe.');
            setShowAlertMessage('error_destinatario')
          }
        } else {
          console.error('El documento del usuario no existe.');
        }
      } catch (error) {
        console.error('Error al realizar la transferencia:', error);
      }
    };
  
    return (
      <div className="max-w-screen-md mx-auto p-4">
        {/* Renderiza los elementos de la interfaz para enviar dinero */}
        {/* ... (similar al componente Deposit) */}

        <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Send money instantly with one click!
            </h2>
        </div>
  
        {/* Campo de entrada para el ID del destinatario */}
        <input
          className="w-full p-2 border rounded-md mb-4"
          type="text"
          placeholder="Enter the recipient's account number"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        />
  
        {/* Campo de entrada para el monto a enviar */}
        <input
          className="w-full p-2 border rounded-md mb-4"
          type="number"
          placeholder="Enter the amount to be sent"
          value={amountToSend}
          onChange={(e) => setAmountToSend(e.target.value)}
        />
  
        {/* Botón para enviar dinero */}
        
  
        {/* Mensaje de error en caso de problemas 
        <h2 className="text-red-500 mt-2">{errorMessage}</h2>
        */}

        <AlertDialog>
          <AlertDialogTrigger className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-md"
              onClick={handleSendMoney}
              >
              Send Money
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {showAlertMessage === 'success'
                  ? 'Money Successfully transfered!'
                  : showAlertMessage === 'fondos_insuficientes'
                  ? 'Transaction Error!'
                  : showAlertMessage === 'error_valor_invalido'
                  ? 'Transaction Error!'
                  : showAlertMessage === 'error_destinatario'
                  ? 'Transaction Error!'
                  : 'Enter values to continue transaction'
                }
              </AlertDialogTitle>
              <AlertDialogDescription>
                {showAlertMessage === 'success'
                  ? ' You have successfully transfered the amount. Click continue to make another transaction'
                  : showAlertMessage === 'fondos_insuficientes'
                  ? 'The amount exceds the amount of money in your account. tranfer a smaller amount'
                  : showAlertMessage === 'error_valor_invalido'
                  ? 'Rember not include negative numbers and fill in the input field with a number before you hit click'
                  : showAlertMessage === 'error_destinatario'
                  ? 'This account number does not exit. Make sure you input an existing account number'
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
  
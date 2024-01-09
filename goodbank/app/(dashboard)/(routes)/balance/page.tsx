'use client'
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from "@/lib/firebaseConfig";
import { initializeApp } from 'firebase/app';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default function Balance() {

  const { user, isSignedIn, isLoaded } = useUser();
  const [userBalance, setUserBalance] = useState<number | 0>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (isLoaded && isSignedIn) {
          // Verifica si el usuario ya está en Firestore
          const userDocRef = doc(firestore, 'Users', user.id);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            // Si el usuario existe, obtén el balance del documento y actualiza el estado local
            const userData = userDocSnapshot.data();
            setUserBalance(userData?.Balance || 0);
          } else {
            console.error('El documento del usuario no existe.');
          }
        }
      } catch (error) {
        console.error('Error al obtener el balance del usuario:', error);
      }
    };

    fetchBalance(); // Llama a la función para obtener el balance del usuario
  }, [isLoaded, isSignedIn, user]);
  
  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Your Balance is: 
        </h2>
        <h1 className="text-green-500 text-4xl font-bold text-center">
           $US {userBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </h1>
      </div>
    </div>
  );
}
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
  const [userBalance, setUserBalance] = useState<number | null>(null);

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
      <>
        <div>
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Esta es la pagina de Balance
            </h2>
            <h1>Tu balance es de {userBalance}</h1>
          </div> 
        </div>
      </>
    )
  }
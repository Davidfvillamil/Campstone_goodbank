'use client'

import { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../../../lib/firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { collection, setDoc } from "firebase/firestore"; 

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);


export default function DashboardPage() {
  const db = getFirestore(app);
  const usersCollection = collection(db, "Users");

  const { isSignedIn, user, isLoaded } = useUser();
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userBalance, setUserBalance] = useState<number | null>(null);

  useEffect(() => {
    const addUserToFirestore = async () => {
      try {
        if (isLoaded && isSignedIn) {
          // Setea el nombre y el ID desde la información de Clerk
          setUserName(user.fullName);
          setUserId(user.id);

          // Verifica si el usuario ya está en Firestore
          const userDocRef = doc(usersCollection, user.id);
          const userDocSnapshot = await getDoc(userDocRef);

          if (!userDocSnapshot.exists()) {
            // Si el usuario no existe, agrégalo a Firestore
            await setDoc(userDocRef, {
              Name: user.fullName,
              Id: user.id,
              Balance: 0,
              allData: [] 
            });
            console.log(`Usuario ${user.fullName} agregado a Firestore.`);
          } else {
            console.log(`Usuario ${user.fullName} ya existe en Firestore.`);
            const userData = userDocSnapshot.data();
            setUserBalance(userData?.Balance || 0);
          }
        }
      } catch (error) {
        console.error('Error al agregar usuario a Firestore:', error);
      }
    };

    addUserToFirestore(); // Llama a la función para agregar usuario a Firestore
  }, [isLoaded, isSignedIn, user, userBalance]);


  return (
    <>
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Welcome {userName}
          </h2>
          <h3>
            tu correo es {userId}
          </h3>
          <h3>
            Tu balance es: {userBalance}
          </h3>
        </div> 
      </div>
    </>
  )
}


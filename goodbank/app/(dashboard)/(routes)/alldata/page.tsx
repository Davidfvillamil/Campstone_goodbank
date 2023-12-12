'use client'
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import firebaseConfig from "@/lib/firebaseConfig";
import { initializeApp } from 'firebase/app';

//Importación de componentes para la tabla

import { Transaction, columns } from "./columns"
import { DataTable } from "./data-table"

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default function AllData() {

  const { user, isSignedIn, isLoaded } = useUser();
  const [userTransactions, setUserTransactions] = useState([]);

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
            setUserTransactions(userData?.allData || []);
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

  // Imprime directamente en el cuerpo del componente para ver el valor actualizado
  console.log(userTransactions);

  
  

  return (
    <>
      <div>
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center">
            Esta es la pagina del historial de transacciones
          </h2>
          
        </div>
        
        <DataTable columns={columns} data={userTransactions} />
      </div>
    </>
  )
}

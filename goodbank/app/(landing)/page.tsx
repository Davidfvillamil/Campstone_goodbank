'use client'

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import firebaseConfig from '../../lib/firebaseConfig';

// Inicializa la aplicación de Firebase
initializeApp(firebaseConfig);

export default function LandingPage() {
  

  return (
    <>
      <h1>Esta es la Landing Page (unprotected)</h1>
      <div>
        <Link href='/create-account'>
          <Button variant='destructive' size='lg'>
            Create an account
          </Button>
        </Link>

        <Link href='/sign-in'>
          <Button variant='destructive' size='lg'>
            Login
          </Button>
        </Link>
      </div>
    </>
  );
}


/* 
export default function LandingPage() {
  const { getToken } = useAuth();

  useEffect(() => {
    const signInWithClerk = async () => {
      const auth = getAuth();

      try {
        // Obtiene el token de autenticación de Clerk para Firebase
        const token = await getToken({ template: 'integration_firebase' });
        console.log('Token de Clerk:', token);

        
        // Verifica si el token es null antes de intentar iniciar sesión
        if (token !== null) {
          // Inicia sesión en Firebase con el token de autenticación de Clerk
          await signInWithCustomToken(auth, token);
        } else {
          console.error('El token de autenticación de Clerk es nulo.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión con Clerk y Firebase', error);
      }
    };

    signInWithClerk();
  }, []); // Asegúrate de que esta dependencia esté vacía para que se ejecute solo una vez al montar la página

  return (
    <>
      <h1>Esta es la Landing Page (unprotected)</h1>
      <div>
        <Link href='/create-account'>
          <Button variant='destructive' size='lg'>
            Create an account
          </Button>
        </Link>

        <Link href='/sign-in'>
          <Button variant='destructive' size='lg'>
            Login
          </Button>
        </Link>
      </div>
    </>
  );
}

*/


'use client'
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";



// Componente MyAccount
export default function MyAccount() {
  // Obtiene la información del usuario actual
  const { user, isSignedIn, isLoaded } = useUser();

  // Renderiza el componente
  return (
    <div className="max-w-screen-md mx-auto p-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-40">
          Account information
        </h2>
      <div className="text-center">
        {isLoaded && isSignedIn && (
          <div className="bg-white rounded-md shadow-md p-4">
            <p className="text-gray-500 mb-2">User name:</p>
            <p className="text-blue-500 text-xl font-semibold mb-4">{user.fullName}</p>

            <p className="text-gray-500 mb-2">Account number (ID):</p>
            <p className="text-blue-500 text-xl font-semibold">{user.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}


'use client'

import { useEffect, useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../../../lib/firebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { collection, setDoc } from "firebase/firestore"; 
import {LayoutDashboard, Wallet, Banknote,Receipt, FolderSync, ArrowRight, SendHorizontal} from 'lucide-react'
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

//arreglo re rutas
const tools = [
  {
    label: "I want to make a Deposit",
    icon: Banknote,
    color: 'text-green-500',
    bgColor: 'text-green-500/10',
    href: '/deposit'
  },
  {
    label: "I want to Withdraw some money",
    icon: Receipt,
    color: 'text-orange-500',
    bgColor: 'text-orange-500/10',
    href: '/withdraw'
  },
  {
    label: "I want to see my Balance",
    icon: Wallet,
    color: 'text-emerald-500',
    bgColor: 'text-emerald-500/10',
    href: '/balance'
  },
  {
    label: "I want to send money",
    icon: SendHorizontal,
    color: 'text-blue-500',
    bgColor: 'text-blue-500',
    href: '/sendmoney'
  },
  {
    label: "See all my transactions",
    icon: FolderSync,
    color: 'text-pink-500',
    bgColor: 'text-pink-500/10',
    href: '/alldata'
  }
]


export default function DashboardPage() {

  const router = useRouter()

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
    <div className="mb-8 space-y-4">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Welcome {userName}
      </h2>

      <div className="px-2 md:px-15 lg:px-32 space-y-4 flex flex-col lg:flex-row lg:space-x-4">
        {/* Account Summary */}
        <div className="lg:flex lg:items-center lg:justify-center">
          <div className="lg:w-[300px] flex flex-col justify-center items-center">
            <div className="border rounded-lg p-6 bg-white shadow-md w-full lg:w-[300px]">
              <h1 className="text-xl font-semibold mb-4 text-center lg:text-left">
                Account Summary
              </h1>
              <div className="mb-3">
                <span className="text-gray-500">Tu balance es:</span>{" "}
                <span className="text-emerald-600 text-2xl font-bold">
                  {userBalance}
                </span>
              </div>
              
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="lg:w-[500px]">
          {tools.map((tool) => (
            <Card
              key={tool.href}
              className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer mb-8"
              onClick={() => router.push(tool.href)}
            >
              <div className="flex items-center gap-x-4">
                <div
                  className={cn("p-2 w-fit rounded-md", tool.bgColor)}
                >
                  <tool.icon className={cn('w-8 h-8', tool.color)} />
                </div>
                <div className='font-semibold'>
                  {tool.label}
                </div>
              </div>
              <ArrowRight className='w-5 h-5' />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}


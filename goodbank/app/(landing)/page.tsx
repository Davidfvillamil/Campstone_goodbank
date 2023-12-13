'use client'

import LandingContent from "@/components/landing-content";
import LandingHero from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";


export default function LandingPage() {
  

  return (
      <div className='h-full'>
        <LandingNavbar/>
        <LandingHero></LandingHero>
        <LandingContent></LandingContent>
      </div>
  );
}


/*
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

*/
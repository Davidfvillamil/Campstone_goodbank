import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function LandingPage() {
  return (
    <>
      <h1>Esta es la Landing Page (unprotected)</h1>
      <div>
        <Link href='/create-account'>
          <Button variant='destructive' size='lg'>Create an account</Button>
        </Link>

        <Link href='sign-in'>
          <Button variant='destructive' size='lg'>Login</Button>
        </Link>
      </div>
    </>
  )
}
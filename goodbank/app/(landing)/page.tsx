import { Button } from '@/components/ui/button'


export default function LandingPage() {
  return (
    <>
      <h1>Esta es la Landing Page (unprotected)</h1>
      <Button variant='destructive' size='lg'>Create an account</Button>
      <Button variant='destructive' size='lg'>Login</Button>
    </>
  )
}
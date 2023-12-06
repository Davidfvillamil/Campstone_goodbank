import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'


export default function DashboardPage() {
  return (
    <>
      <div>
        <h1>Esta pagina es la protegida (protected)</h1>
        <UserButton afterSignOutUrl='/'/>
      </div>
    </>
  )
}


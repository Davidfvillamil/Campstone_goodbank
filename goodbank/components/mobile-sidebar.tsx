'use client'
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "./sidebar"

const MobileSidebar = () => {
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant='ghost' size='icon' className="md:hidden">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className="p-0" suppressHydrationWarning>
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar
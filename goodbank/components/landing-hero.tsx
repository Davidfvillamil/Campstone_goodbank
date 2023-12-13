'use client'
import { useAuth } from "@clerk/nextjs"
import TypewriterComponent from "typewriter-effect"
import { Montserrat } from "next/font/google"
import Link from "next/link"
import { Button } from "./ui/button"

const font = Montserrat({
    weight:'600',
    subsets: ['latin']
})

const LandingHero = () => {
    const {isSignedIn} = useAuth()
    return(
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Good bank for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent
                        options={{
                            strings: [
                                'MIT students.',
                                'Teenagers.',
                                'Young adults.',
                                'people.',
                                'carolina Berreiro'
                            ], 
                            autoStart: true,
                            loop: true
                        }}
                    />
                </div>
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
                Manage your money easyly anytime and anywhere
            </div>
            <div>
                <Link href = {isSignedIn ? '/dashboard' : '/create-account'}>
                    <Button variant='premium' className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                        Create account
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-sm md:text-sm font-normal">
                Start managing your money
            </div>
        </div>
    )
}

export default LandingHero
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials = [
    {
        name:'Solange Suarezl',
        avatar: 'A',
        title: 'Sales manager',
        description: 'Support my boyfiend with the last project of the MIT certificate'
    },
    {
        name:'David Villamil',
        avatar: 'D',
        title: 'Product Manager',
        description: 'i created this so please signup'
    },
    {
        name:'Jose Villamil',
        avatar: 'J',
        title: 'Engeneeir',
        description: 'My son created this, so please sign-up'
    },
    {
        name:'Felipe GomeF',
        avatar: 'A',
        title: 'Accountant',
        description: 'My boddy created this! so please signup'
    }
]


const LandingContent = () => {
    return(
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default LandingContent
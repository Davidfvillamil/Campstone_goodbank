const LandingLaout = ({
    children
}:{
    children: React.ReactNode
}) => {
    return (
        <main className="h-full bg-[#111827] overflow-auto">
            <div className="mx-auto max-w-screen-xl f-full w-full">
                {children}
            </div>
        </main>
    )
}

export default LandingLaout
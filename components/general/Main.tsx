import { ReactNode } from 'react'

interface MainProps {
    children: ReactNode
}

export default function Main(props: MainProps) {
    const { children } = props
    return (
        <main className="flex-1 bg-stone-100 p-4">
            {children}
        </main>
    )
}
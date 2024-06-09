'use client'

// import "./globals.css"
import ChakraUIProvider from "@/providers/ChakraProvider"
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import Sidebar from "@/components/sidebar/SideBar"
import { usePathname } from 'next/navigation'
import { DrawerProvider } from "@/context/drawerContext"

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()
  return (
    <html lang="en">
      <body>
        <ChakraUIProvider>
          <ReactQueryProvider>
            <DrawerProvider>
            <header>
              {/* {
                path.includes("/merchant") ? null : */}
                  <Sidebar />

              {/* } */}
              {children}
            </header>
            </DrawerProvider>
          </ReactQueryProvider>
        </ChakraUIProvider>
      </body>
    </html>
  )
}

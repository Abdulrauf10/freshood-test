"use client"
import ChakraUIProvider from "@/providers/ChakraProvider"
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import Sidebar from "@/components/sidebar/SideBar"
import { usePathname } from "next/navigation"
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
              {path.includes("/merchant") ? <Sidebar /> : null}

              {children}
            </DrawerProvider>
          </ReactQueryProvider>
        </ChakraUIProvider>
      </body>
    </html>
  )
}

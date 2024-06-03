'use client'

import type { Metadata } from "next"
// import "./globals.css"
import ChakraUIProvider from "@/providers/ChakraProvider"
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import Sidebar from "@/components/sidebar/SideBar"
import { usePathname } from 'next/navigation'

// export const metadata: Metadata = {
//   title: "Freshood",
//   description: "All in One Farm to Table Products"
// }

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
            <header>
              {
                path.includes("/merchant") ? null :
                  <Sidebar />

              }
              {children}
            </header>
          </ReactQueryProvider>
        </ChakraUIProvider>
      </body>
    </html>
  )
}

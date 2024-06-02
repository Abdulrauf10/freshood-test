"use client"

import Cookies from "js-cookie"
import useSessionStore from "@/store/useSessionStore"
import { useRouter } from "next/navigation"
import { logoutService } from "@/services/api/auth"
import { useEffect } from "react"
import { LOGOUT_API_URL } from "@/config/endpoint"
import useGetMe from "@/features/login/api/useGetMe"
import { Button, VStack } from "@chakra-ui/react"
import { useActiveMenu } from "@/store/useActiveMenu"

export default function Home() {
  const { replace } = useRouter()

  const { dataMe } = useGetMe()
  const { removeActiveMenu } = useActiveMenu()

  const logout = () => {
    logoutService().then(() => {
      replace("/login")
    })
  }

  return (
    <main>
      <VStack>
        <text>welcome, {dataMe?.data?.first_name}</text>
        <Button onClick={removeActiveMenu}>Logout</Button>
      </VStack>
    </main>
  )
}

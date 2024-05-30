"use client"

import Cookies from "js-cookie"
import useSessionStore from "@/store/useSessionStore"
import { useRouter } from "next/navigation"
import { logoutService } from "@/services/api/auth"
import { useEffect } from "react"
import { LOGOUT_API_URL } from "@/config/endpoint"

export default function Home() {
  const { replace } = useRouter()
  const { setSessionId, sessionId } = useSessionStore()
  const logout = () => {
    fetch(LOGOUT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((data) => {
      console.log(data)
    })

    // logoutService().then(() => {
    setSessionId("")

    replace("/login")
    // })
  }
  console.log("ids", sessionId)

  useEffect(() => {
    fetch("https://doge41732.twilightparadox.com/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    }).then((data) => {
      console.log(data)
    })
  })
  return (
    <main>
      <button onClick={logout}>Logout</button>
    </main>
  )
}

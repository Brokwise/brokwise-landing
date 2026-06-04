'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      cross_subdomain_cookie: true,
      person_profiles: 'identified_only',
      capture_pageview: false,
      capture_pageleave: true
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (pathname && posthog?.__loaded) {
      let url = window.origin + pathname
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams, posthog])

  return null
}

import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom'
import { EarthoOneProvider } from '@eartho/one-client-react'

import router from './router.tsx'

const queryClient = new QueryClient()

interface AppState {
  returnTo?: string
}

const onRedirectCallback = (appState: AppState | undefined) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname,
  )
}

const clientId = import.meta.env.VITE_EARTHO_CLIENT_ID
console.log(clientId)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <EarthoOneProvider
      clientId={import.meta.env.VITE_EARTHO_CLIENT_ID!}
      domain="your-eartho-domain"
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </EarthoOneProvider>,
  )
})

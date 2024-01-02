import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

function QueryProvider({children}: {children: ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider
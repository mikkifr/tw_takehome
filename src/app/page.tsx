'use client'

import { Stack, Box } from '@grafana/ui'
import { useState } from 'react'
import { useStockData } from '@/hooks'
import { StockViewToggle } from '@/components/StockViewToggle'
import { StockDataViewer } from '@/components/StockDataViewer'
import dynamic from 'next/dynamic'

function Home() {
  const [viewMode, setViewMode] = useState('Grid')
  const { data, error, isLoading } = useStockData()

  return (
    <Box paddingTop={8} style={{ margin: 'auto' }} width={'1280px'}>
      <Stack direction="column" gap={4} grow={1}>
        <StockViewToggle
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <StockDataViewer
          viewMode={viewMode}
          data={data}
          error={error}
          isLoading={isLoading}
        />
      </Stack>
    </Box>
  )
}

const HomeNoSSR = dynamic(() => Promise.resolve(Home), {
  ssr: false,
})

export default HomeNoSSR


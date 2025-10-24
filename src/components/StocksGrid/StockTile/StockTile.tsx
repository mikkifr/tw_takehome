'use client'

import {
  BigValue,
  BigValueJustifyMode,
  Box,
  useTheme2,
  Stack,
  Text,
} from '@grafana/ui'
import type React from 'react'
import { createSparkline } from '@/components/utils'

interface StockTileProps {
  symbol: string
  price: number
  change: number
  priceHistory: number[]
  logoUrl?: string
}

const StockTile: React.FC<StockTileProps> = ({
  symbol,
  price,
  change,
  priceHistory,
  logoUrl,
}) => {
  const isPositive = change >= 0
  const theme = useTheme2()
  const sparkline = createSparkline(priceHistory, price, change)

  return (
    <Box borderColor={'medium'} backgroundColor={'primary'} width={'100%'}>
      <Stack direction="column" gap={0} style={{ position: 'relative' }}>
        <Stack direction="row" gap={2} alignItems="center" style={{ padding: '16px 16px 0', position: 'absolute', top: 0, left: 0 }}>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${symbol} logo`}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                objectFit: 'contain',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          )}
          <Text variant="h6" weight="bold">{symbol}</Text>
        </Stack>
        <BigValue
          colorMode="value"
          graphMode="line"
          height={200}
          justifyMode={BigValueJustifyMode.Auto}
          sparkline={sparkline}
          textMode="value"
          theme={theme}
          value={{
            text: `$${price.toFixed(2)}`,
            numeric: price,
            color: isPositive ? 'green' : 'red',
            suffix: ` (${isPositive ? '+' : ''}${change.toFixed(2)})`,
          }}
          width={298}
          disableWideLayout
        />
      </Stack >
    </Box >
  )
}

export default StockTile
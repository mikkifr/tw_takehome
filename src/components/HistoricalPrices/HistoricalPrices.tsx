'use client'

import useSWR from 'swr'
import { Stack, Text, Table as GrafanaTable, Box, useTheme2 } from '@grafana/ui'
import { MutableDataFrame, applyFieldOverrides } from '@grafana/data'
import { Loader } from '@/components/Loader'
import { addColorTextToCol } from '../StocksTable/utils'

interface HistoricalPricesProps {
  symbol: string
}

export function HistoricalPrices({ symbol }: HistoricalPricesProps) {
  const theme = useTheme2()

  const { data, error, isLoading } = useSWR(
    symbol ? `/api/stock-data/historical-prices?symbol=${symbol}` : null
  )

  if (isLoading) return <Loader />
  if (error) return <Text color="error">Error loading historical data</Text>

  if (!data || !data.data || !data.data[0]) {
    return <Text>No historical price data found</Text>
  }

  const frame = new MutableDataFrame({
    name: data.data[0].name,
    fields: data.data[0].fields,
  })

  addColorTextToCol(frame.fields, 'Change %')

  const displayData = applyFieldOverrides({
    data: [frame],
    fieldConfig: {
      overrides: [],
      defaults: {
        decimals: 2,
      },
    },
    theme,
    replaceVariables: (value: string) => value,
  })[0]

  return (
    <Stack direction="column" gap={2}>
      <Text element="h3" variant="h3">
        Historical Prices
      </Text>
      <Box height={400}>
        <GrafanaTable
          data={displayData}
          width={1216}
          height={500}
          columnMinWidth={50}
        />
      </Box>
    </Stack>
  )
}
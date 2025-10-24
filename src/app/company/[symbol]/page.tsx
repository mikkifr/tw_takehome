'use client'

import useSWR from 'swr'
import { Stack, Text, Field, Box } from '@grafana/ui'
import { useParams } from 'next/navigation'
import { formatMarketCap, getLogoFromStockData } from '@/utils'
import { StockChart } from '@/components/StockChart'
import { Loader } from '@/components/Loader'

interface CompanyOverview {
  Symbol: string
  AssetType: string
  Name: string
  Description: string
  Exchange: string
  Sector: string
  Industry: string
  MarketCapitalization: string
}

export default function CompanyDetailPage() {
  const params = useParams()
  const symbol = params.symbol as string

  const $companyOverview = useSWR<CompanyOverview>(
    symbol ? `/api/stock-data/company-overview?symbol=${symbol}` : null,
  )

  const $stockData = useSWR(
    symbol ? `/api/stock-data/time-series-data?symbols=${symbol}` : null,
  )

  if ($companyOverview.isLoading) return <Loader />
  if ($companyOverview.error) return <Text color="error">Error loading company data</Text>
  if (!$companyOverview.data) return <Text>No company data found</Text>

  const logoUrl = getLogoFromStockData($stockData.data)

  return (
    <Box maxWidth="1280px" width="100%" style={{ margin: "auto" }} minHeight="100vh">
      <Stack direction="column" gap={4}>
        <Stack direction="row" gap={3} alignItems="center">
          {logoUrl && (
            <Box borderColor="medium" padding={2} borderRadius="default">
              <img
                src={logoUrl}
                alt={`${$companyOverview.data.Name} logo`}
                style={{ width: '64px', height: '64px', borderRadius: '4px', display: 'block' }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </Box>
          )}
          <Stack direction="column" gap={0}>
            <Text element="h1" variant="h1">
              {$companyOverview.data.Symbol}
            </Text>
            <Text variant="body" color="secondary">
              {$companyOverview.data.AssetType}
            </Text>
          </Stack>
        </Stack>

        <Stack direction="row" gap={8} alignItems="flex-start">
          <Stack direction="column" gap={2} grow={1}>
            <Text element="h2" variant="h2">
              {$companyOverview.data.Name}
            </Text>
            <Text variant="body">
              {$companyOverview.data.Description}
            </Text>
          </Stack>

          <Stack direction="column" gap={0} minWidth={'300px'}>
            <Field label="Exchange">
              <Text>{$companyOverview.data.Exchange}</Text>
            </Field>
            <Field label="Sector">
              <Text>{$companyOverview.data.Sector}</Text>
            </Field>
            <Field label="Industry">
              <Text>{$companyOverview.data.Industry}</Text>
            </Field>
            <Field label="Market Cap">
              <Text>{formatMarketCap($companyOverview.data.MarketCapitalization)}</Text>
            </Field>
          </Stack>
        </Stack>

        {!$stockData.isLoading && !$stockData.error && $stockData.data && (
          <Stack direction="column" gap={2}>
            <Text element="h3" variant="h3">Stock Price History</Text>
            <StockChart
              stockData={$stockData.data}
              symbol={symbol}
              width={1216}
              height={400}
            />
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
import Link from 'next/link'
import { Box, Text } from '@grafana/ui'
import StockTile from './StockTile/StockTile'
import { Loader } from '@/components/Loader'

interface StocksGridProps {
  data: any
  isLoading: boolean
  error: any
}

const StocksGrid: React.FC<StocksGridProps> = ({
  data,
  isLoading,
  error,
}) => {
  if (isLoading) return <Loader />
  if (error) return <Text color="error">Error loading data</Text>
  if (!data) return <Text>No data</Text>

  const series = data.data[0]
  const priceHistoryField = series.fields.find(f => f.name === 'Price History')
  const logoField = series.fields.find(f => f.name === '\u00A0')

  return (
    <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 300px)' }} gap={3.25} width="100%">
      {series.fields.find(f => f.name === 'Symbol')?.values.map((symbol, i) => (
        <Link key={symbol} href={`/company/${symbol}`} style={{ textDecoration: 'none' }}>
          <StockTile
            symbol={symbol}
            price={series.fields.find(f => f.name === 'Close')?.values[i] || 0}
            change={series.fields.find(f => f.name === 'Change')?.values[i] || 0}
            priceHistory={priceHistoryField?.values[i]}
            logoUrl={logoField?.values[i]}
          />
        </Link>
      ))}
    </Box>
  )
}

export default StocksGrid
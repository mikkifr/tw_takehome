import { useTheme2 } from '@grafana/ui'
import StocksGrid from '@/components/StocksGrid'
import StocksTable from '@/components/StocksTable'

interface StockDataViewerProps {
  viewMode: string
  data: any
  error: any
  isLoading: boolean
}

export const StockDataViewer: React.FC<StockDataViewerProps> = ({
  viewMode,
  data,
  error,
  isLoading,
}) => {
  const theme = useTheme2()

  if (viewMode === 'Table') {
    return (
      <StocksTable
        data={data}
        error={error}
        isLoading={isLoading}
        theme={theme}
        title="Stock Data"
      />
    )
  }

  if (viewMode === 'Grid') {
    return (
      <StocksGrid
        data={data}
        error={error}
        isLoading={isLoading}
      />
    )
  }

  return null
}
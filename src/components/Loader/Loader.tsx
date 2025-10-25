import { Box, LoadingPlaceholder } from '@grafana/ui'

interface LoaderProps {
  width?: number | string
  height?: number | string
  marginTop?: number | string
}

export const Loader: React.FC<LoaderProps> = ({
  width = '400px',
  height = '400px',
  marginTop = 16,
}) => {
  return (
    <Box
      width={width}
      height={height}
      padding={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={'auto'}
    >
      <LoadingPlaceholder text="Loading..." />
    </Box>
  )
}
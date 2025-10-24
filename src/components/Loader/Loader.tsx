import { Box, LoadingPlaceholder, useTheme2 } from '@grafana/ui'

interface LoaderProps {
  width?: number | string
  height?: number | string
  marginTop?: number | string
}

export const Loader: React.FC<LoaderProps> = ({
  width = 400,
  height = 400,
  marginTop = 16,
}) => {
  const theme = useTheme2()

  return (
    <Box
      width={width}
      height={height}
      style={{ margin: marginTop + ' auto' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LoadingPlaceholder
        text="Loading..."
        style={{ color: 'white' }}
      />
    </Box>
  )
}
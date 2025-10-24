import { Box } from '@grafana/ui'

interface LogoProps {
  symbol: string
  logoUrl?: string
  size?: number
  bordered?: boolean
  alt?: string
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void
}

export const Logo: React.FC<LogoProps> = ({
  symbol,
  logoUrl,
  size = 32,
  bordered = false,
  alt,
  onError,
}) => {
  if (!logoUrl) return null

  const defaultOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none'
  }

  const imageElement = (
    <img
      src={logoUrl}
      alt={alt || `${symbol} logo`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '4px',
        display: 'block',
        objectFit: 'contain',
      }}
      onError={onError || defaultOnError}
    />
  )

  if (bordered) {
    return (
      <Box borderColor="medium" padding={2} borderRadius="default">
        {imageElement}
      </Box>
    )
  }

  return imageElement
}
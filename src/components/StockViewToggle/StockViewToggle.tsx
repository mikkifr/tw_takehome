import { RadioButtonGroup, Stack } from '@grafana/ui'

interface StockViewToggleProps {
  viewMode: string
  onViewModeChange: (mode: string) => void
}

export const StockViewToggle: React.FC<StockViewToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <Stack direction="row" justifyContent="flex-end">
      <RadioButtonGroup
        options={[
          { label: 'Grid', value: 'Grid' },
          { label: 'Table', value: 'Table' },
        ]}
        value={viewMode}
        onChange={onViewModeChange}
      />
    </Stack>
  )
}
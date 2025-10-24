'use client'

import { Table as GrafanaTable, PanelChrome, Text } from '@grafana/ui'
import { applyFieldOverrides, GrafanaTheme2, MutableDataFrame } from '@grafana/data'
import { addColorTextToCol, addSparkLineToCol } from './utils'
import { Loader } from '@/components/Loader'

interface TableProps {
  title: string,
  error: any,
  data: any,
  isLoading: boolean,
  theme: GrafanaTheme2
}

const StocksTable: React.FC<TableProps> = ({
  title,
  error,
  data,
  isLoading,
  theme,
}) => {
  if (isLoading) return <Loader />
  if (error) return <Text color="error">Error loading data</Text>
  if (!data) return <Text>No data</Text>

  // Using deprecated MutableDataFrame since method
  // provided in official docs doesn't seem to work
  const frame = new MutableDataFrame({
    name: data.data[0].name,
    fields: data.data[0].fields,
  })

  addSparkLineToCol(frame.fields, 'Price History')
  addColorTextToCol(frame.fields, '%')
  addColorTextToCol(frame.fields, 'Change')

  const displayData = applyFieldOverrides({
    data: [frame],
    fieldConfig: {
      overrides: [
        {
          matcher: { id: 'byName', options: '\u00A0' },
          properties: [
            {
              id: 'custom.displayMode',
              value: 'image',
            },
            {
              id: 'custom.width',
              value: 50,
            },
          ],
        },
      ],
      defaults: {
        decimals: 2,
      },
    },
    theme,
    replaceVariables: (value: string) => value,
  })[0]

  return (
    <PanelChrome
      title={title}
      width={1280}
      height={600}
    >
      {(innerWidth, innerHeight) => (
        <GrafanaTable
          data={displayData}
          width={innerWidth}
          height={innerHeight}
          columnMinWidth={50}
        />
      )}
    </PanelChrome>
  )
}

export default StocksTable

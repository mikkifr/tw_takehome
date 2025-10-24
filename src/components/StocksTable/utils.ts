import { Field, ThresholdsMode } from '@grafana/data'
import { merge } from 'lodash'

export const addColorTextToCol = (fields: Field[], fieldName: string) => {
  const targetCol = fields.find(f => f.name === fieldName)

  if (targetCol) {
    targetCol.config = merge(targetCol.config, {
      custom: {
        cellOptions: {
          type: 'color-text',
        },
      },
      thresholds: {
        steps: [
          {
            color: 'red',
            value: -Infinity,
          },
          {
            color: 'green',
            value: 0,
          },
        ],
        mode: ThresholdsMode.Absolute,
      },
    })
  }
}

export const addSparkLineToCol = (fields: Field[], fieldName: string) => {
  const targetCol = fields.find(f => f.name === fieldName)

  if (targetCol) {
    targetCol.config = merge(targetCol.config, {
      custom: {
        cellOptions: {
          type: 'sparkline',
        },
      },
    })
  }
}


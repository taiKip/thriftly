import { ISortConfig } from '../../interfaces'
export function sortArray<T>(array: T[], config: ISortConfig<T>): T[] {
  const { key, direction } = config

  return array.sort((a, b) => {
    if (a[key] > b[key]) {
      return direction === 'asc' ? 1 : -1
    }
    if (a[key] < b[key]) {
      return direction === 'asc' ? -1 : 1
    }
    return 0
  })
}

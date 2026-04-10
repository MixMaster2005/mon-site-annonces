import { useEffect, useMemo, useState } from 'react'

export const FILTER_CONSTANTS = {
  allCategories: 'Alle kategorier',
  allLocations: 'Alle steder',
  allDates: 'Når som helst',
}

export const DATE_FILTERS = [
  { value: FILTER_CONSTANTS.allDates, label: 'Når som helst' },
  { value: '24h', label: 'Siste 24 timer' },
  { value: '7d', label: 'Siste 7 dager' },
  { value: '30d', label: 'Siste 30 dager' },
]

const DAY_IN_MS = 24 * 60 * 60 * 1000

export function getFilterOptions(annonces) {
  const categories = [...new Set(annonces.map((annonce) => annonce.category))]
  const locations = [...new Set(annonces.map((annonce) => annonce.location))]

  return {
    categories: [FILTER_CONSTANTS.allCategories, ...categories],
    locations: [FILTER_CONSTANTS.allLocations, ...locations],
    dateFilters: DATE_FILTERS,
  }
}

export function filterAnnonces(annonces, filters) {
  const {
    query = '',
    category = FILTER_CONSTANTS.allCategories,
    location = FILTER_CONSTANTS.allLocations,
    dateRange = FILTER_CONSTANTS.allDates,
  } = filters

  const normalizedQuery = query.toLowerCase().trim()
  const now = new Date('2026-04-09T12:00:00Z').getTime()

  return annonces
    .filter((item) => {
      const publishedAt = new Date(item.publishedAt).getTime()
      const ageInDays = (now - publishedAt) / DAY_IN_MS

      const matchesCategory = category === FILTER_CONSTANTS.allCategories || item.category === category
      const matchesLocation = location === FILTER_CONSTANTS.allLocations || item.location === location
      const matchesDate =
        dateRange === FILTER_CONSTANTS.allDates ||
        (dateRange === '24h' && ageInDays <= 1) ||
        (dateRange === '7d' && ageInDays <= 7) ||
        (dateRange === '30d' && ageInDays <= 30)
      const matchesQuery =
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.location.toLowerCase().includes(normalizedQuery) ||
        item.district.toLowerCase().includes(normalizedQuery) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))

      return matchesCategory && matchesLocation && matchesDate && matchesQuery
    })
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
}

export function useFilters(annonces, initialValues = {}) {
  const [query, setQuery] = useState(initialValues.query ?? '')
  const [category, setCategory] = useState(initialValues.category ?? FILTER_CONSTANTS.allCategories)
  const [location, setLocation] = useState(initialValues.location ?? FILTER_CONSTANTS.allLocations)
  const [dateRange, setDateRange] = useState(initialValues.dateRange ?? FILTER_CONSTANTS.allDates)

  useEffect(() => {
    if (initialValues.query !== undefined) {
      setQuery(initialValues.query)
    }
  }, [initialValues.query])

  useEffect(() => {
    if (initialValues.category !== undefined) {
      setCategory(initialValues.category)
    }
  }, [initialValues.category])

  useEffect(() => {
    if (initialValues.location !== undefined) {
      setLocation(initialValues.location)
    }
  }, [initialValues.location])

  useEffect(() => {
    if (initialValues.dateRange !== undefined) {
      setDateRange(initialValues.dateRange)
    }
  }, [initialValues.dateRange])

  const { categories, locations, dateFilters } = useMemo(() => getFilterOptions(annonces), [annonces])

  const filteredAnnonces = useMemo(() => {
    return filterAnnonces(annonces, { query, category, location, dateRange })
  }, [annonces, category, dateRange, location, query])

  const resetFilters = () => {
    setQuery('')
    setCategory(FILTER_CONSTANTS.allCategories)
    setLocation(FILTER_CONSTANTS.allLocations)
    setDateRange(FILTER_CONSTANTS.allDates)
  }

  return {
    query,
    category,
    location,
    dateRange,
    categories,
    locations,
    dateFilters,
    filteredAnnonces,
    setQuery,
    setCategory,
    setLocation,
    setDateRange,
    resetFilters,
    constants: {
      ...FILTER_CONSTANTS,
    },
  }
}

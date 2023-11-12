export const useDate = () => useState<{from: null|string, to: null|string}>('date', () => ({from: null, to: null}))

const baseApiUrl = import.meta.env.VITE_BASE_API_URL as string

if (!baseApiUrl) {
  throw new Error('VITE_BASE_API_URL is not defined in environment variables')
}

export { baseApiUrl }

export const defaultOptions = {
  hideProgressBar: true,
}
export const previewOptions = (options) => {
  return {
    ...options,
    pauseOnHover: false,
    pauseOnFocusLoss: false
  }
}
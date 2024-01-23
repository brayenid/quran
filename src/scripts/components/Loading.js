const loading = document.querySelector('.loading')
export const starLoading = () => {
  loading.classList.remove('hide')
}
export const stopLoading = () => {
  loading.classList.add('hide')
}

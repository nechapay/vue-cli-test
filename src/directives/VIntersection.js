export default {
  name: 'intersection',
  mounted(el, binding) {
    console.log(el)
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const cb = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value()
      }
    }

    const observer = new IntersectionObserver(cb, options)
    observer.observe(el)
  }
}

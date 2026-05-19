import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // 80px ≈ sticky header height (varies 65–73px by breakpoint; 80 gives a safe margin)
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0, left: 0, behavior: 'instant' }
  },
}

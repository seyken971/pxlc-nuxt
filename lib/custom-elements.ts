import { defineCustomElement } from 'vue'
import '../app/assets/css/tokens.css'
import '../app/assets/css/styles.css'

import PxlcMarkComp from '../app/components/PxlcMark.vue'
import PxlcInputComp from '../app/components/PxlcInput.vue'
import PxlcMarkSeparatorComp from '../app/components/PxlcMarkSeparator.vue'
import PxlcPixelCornerComp from '../app/components/PxlcPixelCorner.vue'
import PxlcPixelStripComp from '../app/components/PxlcPixelStrip.vue'
import PxlcLinkoutComp from './PxlcLinkout.vue'
import PxlcLockupComp from './PxlcLockup.vue'

// Light DOM (shadowRoot: false) so elements inherit CSS tokens from the page
const ceOpts = { shadowRoot: false } as const

export const PxlcMark = defineCustomElement(PxlcMarkComp, ceOpts)
export const PxlcInput = defineCustomElement(PxlcInputComp, ceOpts)
export const PxlcMarkSeparator = defineCustomElement(PxlcMarkSeparatorComp, ceOpts)
export const PxlcPixelCorner = defineCustomElement(PxlcPixelCornerComp, ceOpts)
export const PxlcPixelStrip = defineCustomElement(PxlcPixelStripComp, ceOpts)
export const PxlcLinkout = defineCustomElement(PxlcLinkoutComp, ceOpts)
export const PxlcLockup = defineCustomElement(PxlcLockupComp, ceOpts)

const registry: [string, CustomElementConstructor][] = [
  ['pxlc-mark', PxlcMark],
  ['pxlc-input', PxlcInput],
  ['pxlc-mark-separator', PxlcMarkSeparator],
  ['pxlc-pixel-corner', PxlcPixelCorner],
  ['pxlc-pixel-strip', PxlcPixelStrip],
  ['pxlc-linkout', PxlcLinkout],
  ['pxlc-lockup', PxlcLockup],
]

if (typeof customElements !== 'undefined') {
  registry.forEach(([name, cls]) => {
    if (!customElements.get(name)) customElements.define(name, cls)
  })
}

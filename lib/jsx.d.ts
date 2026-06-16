// JSX intrinsic element declarations for PXLC custom elements
// Used in design-sync .tsx preview files

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'pxlc-mark': { size?: number | string; decorative?: boolean | '' }
      'pxlc-input': {
        id: string
        label: string
        value?: string
        type?: string
        placeholder?: string
        rows?: number | string
        required?: boolean | ''
        autocomplete?: string
      }
      'pxlc-mark-separator': Record<string, never>
      'pxlc-pixel-corner': Record<string, never>
      'pxlc-pixel-strip': { count?: number | string; 'accent-at'?: number | string }
      'pxlc-linkout': { to?: string; href?: string }
      'pxlc-lockup': { size?: 'sm' | 'md' | 'lg'; to?: string; href?: string }
    }
  }
}

export {}

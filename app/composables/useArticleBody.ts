/**
 * Helpers for traversing a @nuxt/content document body (AST).
 *
 * The body shape is roughly:
 *   { type: 'root', children: [{ type: 'element', tag: 'h2', props: { id: 'foo' }, children: [...] }, ...] }
 * — text nodes are { type: 'text', value: '...' }.
 *
 * Two needs:
 *  - estimate reading time from the rendered text
 *  - extract h2/h3 entries (slug + label) for a table of contents
 */

type AstNode = {
  type?: string
  tag?: string
  value?: string
  props?: Record<string, unknown>
  children?: AstNode[]
}

const WORDS_PER_MINUTE = 200

const collectText = (node: AstNode | undefined | null): string => {
  if (!node) return ''
  if (node.type === 'text') return node.value || ''
  if (!node.children) return ''
  return node.children.map(collectText).join(' ')
}

const collectHeadings = (
  node: AstNode | undefined | null,
  tags: ReadonlyArray<string>,
  acc: { tag: string, id: string, label: string }[] = [],
): { tag: string, id: string, label: string }[] => {
  if (!node) return acc
  if (node.type === 'element' && node.tag && tags.includes(node.tag)) {
    const id = (node.props?.id as string | undefined) || ''
    const label = collectText(node).trim()
    if (id && label) acc.push({ tag: node.tag, id, label })
  }
  node.children?.forEach(child => collectHeadings(child, tags, acc))
  return acc
}

export const useArticleBody = () => {
  const wordCount = (body: AstNode | undefined | null): number => {
    const text = collectText(body)
    if (!text) return 0
    return text.split(/\s+/).filter(Boolean).length
  }

  const readingMinutes = (body: AstNode | undefined | null): number => {
    const words = wordCount(body)
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  }

  /**
   * "8 min de lecture" — French wording matching the existing copy.
   * Returns null when the body is empty (no point pretending).
   */
  const readingTimeLabel = (body: AstNode | undefined | null): string | null => {
    if (wordCount(body) === 0) return null
    return `${readingMinutes(body)} min`
  }

  const tableOfContents = (
    body: AstNode | undefined | null,
    tags: ReadonlyArray<string> = ['h2'],
  ) => collectHeadings(body, tags)

  return { wordCount, readingMinutes, readingTimeLabel, tableOfContents }
}

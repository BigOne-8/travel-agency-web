"use client"

interface SimpleMarkdownRendererProps {
  content: string
}

export function SimpleMarkdownRenderer({ content }: SimpleMarkdownRendererProps) {
  // Simple markdown rendering without external dependencies
  const renderMarkdown = () => {
    // Process the markdown content
    const html = content
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')

      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal">$1</li>')

      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 p-4 rounded my-4 overflow-x-auto"><code>$1</code></pre>')

      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded">$1</code>')

      // Bold and italic
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")

      // Links
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')

      // Paragraphs (lines that aren't headers or list items)
      .replace(/^(?!<h|<li|<pre|<code)(.*$)/gim, '<p class="my-2">$1</p>')

      // Empty lines
      .replace(/^\s*$/gm, "<br />")

    return { __html: html }
  }

  return <div dangerouslySetInnerHTML={renderMarkdown()} />
}

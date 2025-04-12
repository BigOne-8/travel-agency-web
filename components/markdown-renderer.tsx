"use client"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [SyntaxHighlighter, setSyntaxHighlighter] = useState<any>(null)
  const [highlighterStyle, setHighlighterStyle] = useState<any>(null)

  useEffect(() => {
    // Dynamically import the syntax highlighter on the client side
    const loadSyntaxHighlighter = async () => {
      try {
        const syntaxHighlighter = await import("react-syntax-highlighter")
        const styles = await import("react-syntax-highlighter/dist/cjs/styles/prism")
        setSyntaxHighlighter(() => syntaxHighlighter.Prism)
        setHighlighterStyle(styles.vscDarkPlus)
      } catch (error) {
        console.error("Failed to load syntax highlighter:", error)
      }
    }

    loadSyntaxHighlighter()
  }, [])

  return (
    <div className={`prose prose-slate max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
          h4: ({ node, ...props }) => <h4 className="text-base font-bold mt-3 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="my-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="my-2 list-disc pl-6" {...props} />,
          ol: ({ node, ordered, ...props }) => <ol className="my-2 list-decimal pl-6" {...props} />,
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          a: ({ node, ...props }) => (
            <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "")

            if (!inline && match && SyntaxHighlighter) {
              return (
                <SyntaxHighlighter
                  style={highlighterStyle}
                  language={match[1]}
                  PreTag="div"
                  className="rounded-md my-4"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              )
            }

            return (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props}>
                {children}
              </code>
            )
          },
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-300 border" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-gray-800" {...props} />,
          tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-200" {...props} />,
          tr: ({ node, ...props }) => <tr className="hover:bg-gray-50" {...props} />,
          tr: ({ node, ...props }) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-700" {...props} />,
          th: ({ node, ...props }) => (
            <th className="px-3 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100" {...props} />
          ),
          td: ({ node, ...props }) => <td className="px-3 py-2 text-sm" {...props} />,
          hr: ({ node, ...props }) => <hr className="my-4 border-gray-300 dark:border-gray-700" {...props} />,
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded-md my-4" alt={props.alt || ""} {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

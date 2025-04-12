"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface PdfRendererProps {
  content: string
}

export function PdfRenderer({ content }: PdfRendererProps) {
  return (
    <div className="pdf-container bg-white p-10 max-w-[800px] mx-auto">
      <style jsx global>{`
        .pdf-container {
          font-family: 'Arial', sans-serif;
          color: #333;
          line-height: 1.6;
        }
        .pdf-container h1 {
          font-size: 28px;
          font-weight: bold;
          margin: 25px 0 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eaeaea;
          color: #111;
        }
        .pdf-container h2 {
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0 10px;
          color: #222;
        }
        .pdf-container h3 {
          font-size: 20px;
          font-weight: bold;
          margin: 15px 0 10px;
          color: #333;
        }
        .pdf-container p {
          margin: 0 0 16px;
        }
        .pdf-container ul, .pdf-container ol {
          margin: 0 0 16px 20px;
          padding-left: 20px;
        }
        .pdf-container li {
          margin-bottom: 8px;
        }
        .pdf-container code {
          background-color: #f5f5f5;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 90%;
        }
        .pdf-container pre {
          background-color: #f5f5f5;
          padding: 16px;
          border-radius: 4px;
          overflow-x: auto;
          margin: 0 0 16px;
        }
        .pdf-container pre code {
          background-color: transparent;
          padding: 0;
          border-radius: 0;
          font-size: 90%;
        }
        .pdf-container blockquote {
          border-left: 4px solid #ddd;
          padding-left: 16px;
          margin: 0 0 16px;
          color: #666;
        }
        .pdf-container table {
          width: 100%;
          border-collapse: collapse;
          margin: 0 0 16px;
        }
        .pdf-container th {
          background-color: #f5f5f5;
          font-weight: bold;
          text-align: left;
          padding: 8px;
          border: 1px solid #ddd;
        }
        .pdf-container td {
          padding: 8px;
          border: 1px solid #ddd;
        }
        .pdf-container img {
          max-width: 100%;
          height: auto;
        }
        .pdf-container hr {
          border: 0;
          height: 1px;
          background-color: #eaeaea;
          margin: 24px 0;
        }
        .pdf-container a {
          color: #0070f3;
          text-decoration: none;
        }
        .pdf-container a:hover {
          text-decoration: underline;
        }
      `}</style>
      <div className="pdf-header">
        <h1 className="text-center mb-6">Business Report</h1>
        <div className="text-center text-gray-500 mb-8">Generated on {new Date().toLocaleDateString()}</div>
        <hr className="mb-8" />
      </div>
      <div className="pdf-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
      <div className="pdf-footer mt-8 pt-4 border-t border-gray-200 text-center text-gray-500">
        <p>© {new Date().getFullYear()} Bus Booking System - All Rights Reserved</p>
      </div>
    </div>
  )
}

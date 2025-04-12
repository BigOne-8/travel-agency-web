"use client"

import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface OpenRouterResponse {
  id: string
  choices: {
    message: {
      content: string
      role: string
    }
    index: number
    finish_reason: string
  }[]
}

export async function generateReport(
  prompt: string,
  apiKey: string,
  reportType: "daily" | "weekly" | "monthly",
  data: Record<string, any>,
): Promise<string> {
  const systemPrompt = `You are an expert business analyst for a bus booking company. 
Generate a professional ${reportType} report based on the following data. 
Format the report with markdown headings, bullet points, and include insights and recommendations.
Focus on key metrics, trends, and actionable insights.`

  const messages: OpenRouterMessage[] = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `Generate a ${reportType} report for our bus booking business with the following data:\n\n${JSON.stringify(
        data,
        null,
        2,
      )}\n\n${prompt}`,
    },
  ]

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "Bus Booking Reports",
      },
      body: JSON.stringify({
        model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
        messages,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error?.message || "Failed to generate report")
    }

    const data: OpenRouterResponse = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.error("Error generating report:", error)
    throw error
  }
}

// Function to save API key to localStorage
export function saveApiKey(apiKey: string): void {
  localStorage.setItem("openrouter_api_key", apiKey)
}

// Function to get API key from localStorage
export function getApiKey(): string | null {
  return localStorage.getItem("openrouter_api_key")
}

// Function to check if API key exists
export function hasApiKey(): boolean {
  return !!getApiKey()
}

// Function to remove API key
export function removeApiKey(): void {
  localStorage.removeItem("openrouter_api_key")
}

// Function to generate PDF from HTML element with high quality
export async function generatePDF(content: string, filename: string): Promise<void> {
  try {
    // Create a temporary container for rendering
    const container = document.createElement("div")
    container.style.position = "absolute"
    container.style.left = "-9999px"
    container.style.top = "0"
    container.style.width = "800px" // Fixed width for better PDF quality
    document.body.appendChild(container)

    // Import the PdfRenderer dynamically to avoid SSR issues
    const { PdfRenderer } = await import("@/components/pdf-renderer")

    // Render the component to the DOM
    const root = document.createElement("div")
    container.appendChild(root)

    // Use ReactDOM to render the component
    const ReactDOM = await import("react-dom/client")
    const reactRoot = ReactDOM.createRoot(root)
    reactRoot.render(<PdfRenderer content={content} />)

    // Wait for rendering to complete
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generate PDF with high quality
    const pdfOptions = {
      margin: [10, 10, 10, 10],
      filename: `${filename}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: true,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }

    // Use html2pdf library for better PDF generation
    const html2pdf = (await import("html2pdf.js")).default

    // Generate the PDF
    await html2pdf().from(root).set(pdfOptions).save()

    // Clean up
    document.body.removeChild(container)
  } catch (error) {
    console.error("Error generating PDF:", error)

    // Fallback to simpler PDF generation if the advanced method fails
    try {
      await generateSimplePDF(content, filename)
    } catch (fallbackError) {
      console.error("Fallback PDF generation also failed:", fallbackError)
      throw new Error("Failed to generate PDF")
    }
  }
}

// Fallback PDF generation method
async function generateSimplePDF(markdownContent: string, filename: string): Promise<void> {
  // Create a temporary div to render the markdown
  const tempDiv = document.createElement("div")
  tempDiv.className = "pdf-container"
  tempDiv.style.width = "800px"
  tempDiv.style.padding = "40px"
  tempDiv.style.backgroundColor = "white"
  tempDiv.style.color = "black"
  tempDiv.style.fontFamily = "Arial, sans-serif"
  tempDiv.style.position = "absolute"
  tempDiv.style.left = "-9999px"
  tempDiv.style.top = "0"
  document.body.appendChild(tempDiv)

  // Add title and date
  const titleDiv = document.createElement("div")
  titleDiv.innerHTML = `
    <h1 style="font-size: 28px; text-align: center; margin-bottom: 10px;">${filename.charAt(0).toUpperCase() + filename.slice(1)} Report</h1>
    <p style="text-align: center; color: #666; margin-bottom: 20px;">Generated on ${new Date().toLocaleDateString()}</p>
    <hr style="margin-bottom: 30px;">
  `
  tempDiv.appendChild(titleDiv)

  // Convert markdown to HTML
  const contentDiv = document.createElement("div")
  contentDiv.innerHTML = markdownToHTML(markdownContent)
  tempDiv.appendChild(contentDiv)

  try {
    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    // Capture the rendered HTML as an image
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: true,
    })

    // Convert to image and add to PDF
    const imgData = canvas.toDataURL("image/jpeg", 1.0)

    // Calculate dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 297 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Add image to PDF, potentially across multiple pages
    let heightLeft = imgHeight
    let position = 0
    let pageCount = 0

    // First page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    pageCount++

    // Add additional pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      pageCount++
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  } finally {
    // Clean up
    document.body.removeChild(tempDiv)
  }
}

// Helper function to convert markdown to HTML
function markdownToHTML(markdown: string): string {
  // Process headings
  let html = markdown
    .replace(
      /^### (.*$)/gim,
      '<h3 style="font-size: 20px; font-weight: bold; margin-top: 20px; margin-bottom: 10px; color: #333;">$1</h3>',
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 style="font-size: 24px; font-weight: bold; margin-top: 25px; margin-bottom: 15px; color: #222;">$1</h2>',
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 style="font-size: 28px; font-weight: bold; margin-top: 30px; margin-bottom: 20px; color: #111; border-bottom: 1px solid #eee; padding-bottom: 10px;">$1</h1>',
    )

  // Process lists
  html = html
    .replace(/^\s*\* (.*$)/gim, '<li style="margin-bottom: 8px;">$1</li>')
    .replace(/^\s*- (.*$)/gim, '<li style="margin-bottom: 8px;">$1</li>')
    .replace(/^\s*\+ (.*$)/gim, '<li style="margin-bottom: 8px;">$1</li>')
    .replace(/^\s*\d+\. (.*$)/gim, '<li style="margin-bottom: 8px;">$1</li>')

  // Wrap lists
  html = html
    .replace(/(<li[^>]*>.*<\/li>)\s*(<li[^>]*>)/g, "$1$2")
    .replace(/^<li[^>]*>/gm, '<ul style="margin-left: 20px; margin-bottom: 20px;"><li>')
    .replace(/<\/li>(?!\s*<li|<\/ul>)/g, "</li></ul>")

  // Process code blocks
  html = html.replace(
    /```([^`]*?)```/gs,
    '<pre style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; overflow-x: auto; margin: 20px 0;"><code>$1</code></pre>',
  )

  // Process inline code
  html = html.replace(
    /`([^`]+)`/g,
    '<code style="background-color: #f5f5f5; padding: 2px 5px; border-radius: 3px; font-family: monospace; font-size: 90%;">$1</code>',
  )

  // Process bold and italic
  html = html
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")

  // Process links
  html = html.replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" style="color: #0070f3; text-decoration: none;">$1</a>')

  // Process blockquotes
  html = html.replace(
    /^> (.*$)/gim,
    '<blockquote style="border-left: 4px solid #ddd; padding-left: 15px; margin: 20px 0; color: #666;">$1</blockquote>',
  )

  // Process horizontal rules
  html = html.replace(/^---+$/gim, '<hr style="border: 0; height: 1px; background-color: #eee; margin: 30px 0;">')

  // Process paragraphs (any line that's not already processed)
  html = html.replace(
    /^(?!<h|<ul|<li|<blockquote|<hr|<pre)(.+)$/gim,
    '<p style="margin-bottom: 16px; line-height: 1.6;">$1</p>',
  )

  // Fix empty lines
  html = html.replace(/^\s*$/gm, "")

  return html
}

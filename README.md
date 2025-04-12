# Bus Ticket Booking System

A comprehensive bus ticket booking platform built with Next.js and React, designed for both passengers and bus agencies. This system provides an intuitive interface for users to search, filter, and book bus tickets, while offering agencies powerful tools to manage routes, schedules, drivers, and bookings.

![Bus Ticket Booking System](/placeholder.svg?height=400&width=800&text=Bus+Ticket+Booking+System)

## 🚀 Features

### For Passengers
- **Advanced Search**: Filter trips by departure/arrival cities, dates, price range, and amenities
- **Detailed Trip Information**: View comprehensive details including departure/arrival times, duration, and available amenities
- **Responsive Design**: Seamless experience across desktop and mobile devices
- **Real-time Availability**: Up-to-date seat availability and pricing
- **Booking Management**: View and manage ticket bookings

### For Bus Agencies
- **Dashboard**: Overview of key metrics and performance indicators
- **Trip Management**: Create, edit, and manage bus trips and schedules
- **Route Management**: Define and manage bus routes
- **Driver Management**: Assign and track driver schedules and performance
- **Booking Administration**: Process and manage passenger bookings
- **Analytics**: Detailed reports and insights on business performance
- **Messaging System**: Communication with passengers and staff
- **Settings**: Configure agency profile and preferences

## 💻 Technologies Used

- **Frontend**: React, Next.js 14, Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **PDF Generation**: html2pdf.js, jsPDF
- **Markdown Rendering**: react-markdown, remark-gfm
- **Syntax Highlighting**: react-syntax-highlighter

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

## 🔧 Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/bus-ticket-booking.git
   cd bus-ticket-booking
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. Create a `.env.local` file in the root directory and add any required environment variables:
   \`\`\`
   # Example environment variables (replace with actual values)
   NEXT_PUBLIC_API_URL=your_api_url
   OPENROUTER_API_KEY=your_openrouter_api_key
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

\`\`\`
bus-ticket-booking/
├── app/                    # Next.js app directory
│   ├── agency/             # Agency dashboard and management pages
│   ├── booking/            # Booking flow pages
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # Reusable React components
│   ├── agency/             # Agency-specific components
│   ├── ui/                 # UI components (shadcn/ui)
│   └── ...
├── lib/                    # Utility functions and helpers
├── public/                 # Static assets
├── styles/                 # Global styles
├── next.config.mjs         # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies and scripts
\`\`\`

## 🔑 Key Components

### Bus Ticket Booking Component
The main component for passengers to search and book tickets, featuring:
- Search form with departure/arrival cities and dates
- Advanced filtering options
- Responsive trip listings with detailed information
- Seat selection and booking flow

### Agency Dashboard
A comprehensive management interface for bus agencies with:
- Overview dashboard with key metrics
- Trip and route management
- Driver scheduling and management
- Booking administration
- Analytics and reporting
- Messaging system

## 📝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request



## 👥 Authors

- **Shema Christian** - *Initial work* - BigOne(https://github.com/BigOne-8)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide React](https://lucide.dev/) for the icon set
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

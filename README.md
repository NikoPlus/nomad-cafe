

☕ Nomad Cafe: The TON-Powered Coffee Shop

```
 _   _                       _____
| \ | |                     /  __ \
|  \| | ___  _ __ ___  ___  | /  \/  ___  _ __ ___
| . ` |/ _ \| '_ ` _ \/ __| | |     / _ \| '__/ _ \
| |\  | (_) | | | | | \__ \ | \__/\| (_) | | |  __/
\_| \_/\___/|_| |_| |_|___/  \____/ \___/|_|  \___|

```

Nomad Cafe isn't just another coffee shop experience—it's a complete on-chain ordering dApp built to help digital nomads find their perfect work-friendly cafe and pay with TON cryptocurrency.

Live Demo: vercel.com/alis-projects-babca186/v0-ton-cafe-app

🚀 Deploy Your Own

Deploy instantly through these integrated platforms:

https://vercel.com/button https://www.netlify.com/img/deploy/button.svg https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge

✨ Features

· 🗺️ Smart Cafe Discovery: Locate nearby work-friendly cafes ordered by real-time distance
· 💎 TON Blockchain Payments: Seamless cryptocurrency payments via the TON network
· 📱 Responsive Design: Flawless experience across all devices, built with Next.js
· 🧩 Modular Architecture: Clean, scalable structure using modern React patterns
· 🌐 Multi-Language Support: Global-ready platform with i18n integration
· 📖 Interactive API Docs: Visit /api-docs for full OpenAPI/Swagger documentation
· 🔔 Augmented Notifications: Real-time order and payment alerts via Sonner
· 🧠 Smart Wallet Connection: Integrated with TON Connect for secure, instant crypto transactions

🛠️ Tech Stack

Category Technologies
Framework https://img.shields.io/badge/Next.js-14.2.33-black?style=flat-square&logo=next.js https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react
Language https://img.shields.io/badge/TypeScript-91.7%25-3178C6?style=flat-square&logo=typescript
Styling https://img.shields.io/badge/Tailwind_CSS-4.1.9-06B6D4?style=flat-square&logo=tailwind-css
UI Components https://img.shields.io/badge/Radix_UI-Latest-512B81?style=flat-square&logo=radix-ui https://img.shields.io/badge/shadcn%2Fui-Latest-000000?style=flat-square
Payment Integration https://img.shields.io/badge/TON_Connect-Latest-2F8BEE?style=flat-square&logo=TON
Charts https://img.shields.io/badge/Recharts-2.15.4-22B5BF?style=flat-square&logo=recharts
Form Handling https://img.shields.io/badge/React_Hook_Form-7.60.0-EC5990?style=flat-square&logo=reacthookform https://img.shields.io/badge/Zod-3.25.76-3E6B9B?style=flat-square&logo=zod
API Documentation https://img.shields.io/badge/Swagger-OpenAPI_3.0-85EA2D?style=flat-square&logo=swagger
Analytics https://img.shields.io/badge/Vercel_Analytics-Latest-000000?style=flat-square&logo=vercel
Code Quality https://img.shields.io/badge/ESLint-8.57.0-4B32C3?style=flat-square&logo=eslint
License https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square
Repository Stats https://img.shields.io/github/stars/NikoPlus/nomad-cafe?style=flat-square&logo=github https://img.shields.io/github/forks/NikoPlus/nomad-cafe?style=flat-square&logo=github https://img.shields.io/github/commit-activity/w/NikoPlus/nomad-cafe?style=flat-square https://img.shields.io/github/languages/top/NikoPlus/nomad-cafe?style=flat-square https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel

📁 Project Structure

```bash
.
├── app/                    # Next.js App Router (Pages, API routes, layouts)
│   ├── api/                # API endpoints (Cafes, Orders, Payments)
│   ├── api-docs/           # OpenAPI/Swagger UI configuration
│   ├── [locale]/           # Internationalized routes
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable UI (shadcn/ui, custom components)
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions, API schemas
├── messages/               # i18n language files
├── public/                 # Static assets
├── styles/                 # Additional styling
├── utils/                  # Helper functions
├── .github/                # GitHub Actions workflows
├── docs/                   # Project documentation
├── components.json         # shadcn/ui configuration
├── i18n.ts                 # Internationalization setup
├── middleware.ts           # Next.js middleware (i18n, auth)
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── .eslintrc.json          # ESLint rules
└── README.md               # This file
```

📡 API Endpoints

The API follows OpenAPI 3.0 standards with full Swagger UI integration.

Method Endpoint Description Auth Required
GET /api/cafes/nearest Get nearest cafes by location No
POST /api/orders Create a new order No
POST /api/payments/submit Submit TON payment proof No

Interactive Documentation

```bash
# Clone the repository
git clone https://github.com/NikoPlus/nomad-cafe

# Install dependencies
npm install

# Run the development server
npm run dev

# Explore the API
http://localhost:3000/api-docs
```

⚡ Getting Started

Prerequisites

· Node.js 18+ and npm/pnpm/yarn
· Git

Installation

1. Clone and Install

```bash
git clone https://github.com/NikoPlus/nomad-cafe
cd nomad-cafe
npm install
```

1. Set Up Environment
      Create a .env.local file and add required environment variables:

```
# TON Configuration
NEXT_PUBLIC_TON_API_KEY=your_api_key_here
TON_WALLET_CONFIG=...

# Optional: Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_id_here
```

1. Run Development Server

```bash
npm run dev
```

1. Build for Production

```bash
npm run build
npm start
```

🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

📄 License

Distributed under the MIT License. See LICENSE for more information.

🙏 Acknowledgements

· Next.js – The React framework for production.
· shadcn/ui – Beautifully designed components.
· TON Foundation – For the amazing blockchain infrastructure.
· Swagger UI – Interactive API documentation.

📞 Contact & Socials

· GitHub: @NikoPlus
· Project Link: github.com/NikoPlus/nomad-cafe

# 🎯 StrategyVault

> **Discover New Service Opportunities (DNSO) Management Platform**  
> Enterprise-grade strategic opportunity analysis tool built with Next.js 14+ and executive-level design standards.

[![Deploy to GitHub Pages](https://github.com/Aricoins/sentinel/actions/workflows/deploy.yml/badge.svg)](https://github.com/Aricoins/sentinel/actions/workflows/deploy.yml)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🚀 Demo

**[Live Demo → https://aricoins.github.io/sentinel/](https://aricoins.github.io/sentinel/)**

*Experience the power of executive-level strategic planning tools*

---

## 💼 What is StrategyVault?

StrategyVault is a **McKinsey/BCG-inspired** strategic opportunity management platform that helps organizations identify, analyze, and prioritize new service opportunities. Built for **C-level executives**, **strategy consultants**, and **business development teams**.

### 🎯 Core Value Proposition

- **📊 Data-Driven Decisions**: ROI calculations, investment analysis, and risk assessments
- **⚡ Executive Dashboard**: High-level metrics and strategic insights at a glance
- **🔍 Advanced Filtering**: Multi-dimensional opportunity analysis by sector, priority, client type
- **📈 Investment Planning**: Detailed cost breakdowns and implementation timelines
- **🎨 Professional Design**: McKinsey/BCG-level executive presentation quality

---

## ✨ Key Features

### 🏢 **Executive Dashboard**
- **Strategic Metrics**: Total ROI potential, sectors covered, average returns
- **Real-time Filtering**: Search across opportunities, sectors, and client types
- **Visual Analytics**: Professional charts and KPI displays
- **Export Capabilities**: Generate executive reports and presentations

### 🎯 **DNSO Management**
- **Opportunity Catalog**: Comprehensive database of service opportunities
- **ROI Analysis**: Min/max investment ranges and return calculations
- **Risk Assessment**: Prevention strategies and mitigation plans
- **Implementation Planning**: Timeline tracking and milestone management

### 🔍 **Strategic Analysis**
- **Sector Intelligence**: Energy, Infrastructure, Government/Defense, Technology
- **Priority Matrix**: Critical, High, Medium priority classification
- **Client Segmentation**: Healthcare, Government, Manufacturing focus
- **Competitive Advantage**: Unique value proposition analysis

### 📋 **Detailed Opportunity Views**
- **Executive Summary**: Strategic overview and value proposition
- **Investment Analysis**: Cost components and financial projections
- **Implementation Plan**: Timeline, geography, and next steps
- **ROI Projections**: Financial impact and return calculations

---

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons

### **Architecture**
- **Static Site Generation (SSG)** for optimal performance
- **Server Components** for data fetching
- **Client Components** for interactivity
- **Responsive Design** for all devices

### **Deployment**
- **GitHub Actions** for CI/CD
- **GitHub Pages** for hosting
- **Automatic builds** on code changes

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aricoins/sentinel.git
   cd sentinel/strategy-vault
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
npm run build    # Build for production
npm run export   # Export static files
npm run deploy   # Deploy to GitHub Pages (auto-triggers on push)
```

---

## 📊 Sample Data Overview

The platform includes **5 strategic DNSOs** across multiple sectors:

| DNSO ID | Sector | Priority | ROI Range | Implementation |
|---------|--------|----------|-----------|----------------|
| DNSO-001 | Energy | Critical | $2.5M - $5M | 12-18 months |
| DNSO-002 | Infrastructure | High | $1.8M - $3.2M | 9-15 months |
| DNSO-003 | Government/Defense | Critical | $3M - $4.5M | 18-24 months |
| DNSO-004 | Technology | High | $1.2M - $2.8M | 6-12 months |
| DNSO-005 | Chemical/Pharmaceutical | Medium | $800K - $1.5M | 12-18 months |

**Total Portfolio Value**: $9.3M - $17M in ROI potential

---

## 🎨 Design Philosophy

### **Executive-Level Aesthetics**
- **McKinsey Blue**: Professional color palette
- **Typography**: Inter + Crimson Text for executive appeal
- **Gradients**: Subtle, sophisticated visual elements
- **Cards**: Clean, modern information architecture

### **User Experience**
- **Intuitive Navigation**: Clear information hierarchy
- **Fast Loading**: Optimized static generation
- **Mobile Responsive**: Works on all devices
- **Accessibility**: WCAG compliance considerations

---

## 🔧 Configuration

### **Environment Setup**
The app is configured for static export by default. Key configurations:

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === 'production' ? '/sentinel' : '',
}
```

### **Customization**
- **Data Source**: Modify `src/data/dnso-data.ts` for your opportunities
- **Styling**: Update `src/app/globals.css` for brand colors
- **Configuration**: Adjust `next.config.ts` for deployment settings

---

## 📈 Use Cases

### **For Strategy Consultants**
- Present opportunity portfolios to clients
- Generate executive-ready proposals
- Analyze market opportunities by sector
- Create investment recommendations

### **For Business Development Teams**
- Track and prioritize new opportunities
- Assess ROI and implementation feasibility
- Manage strategic initiative pipelines
- Report to executive leadership

### **For C-Level Executives**
- Review strategic opportunities at a glance
- Make data-driven investment decisions
- Monitor portfolio performance
- Export presentations for board meetings

---

## 🛡️ Security & Performance

- ✅ **Static Site**: No server vulnerabilities
- ✅ **Fast Loading**: Pre-rendered pages
- ✅ **CDN Ready**: Optimized for global delivery
- ✅ **SEO Optimized**: Server-side generation
- ✅ **TypeScript**: Compile-time error checking

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/Aricoins/sentinel/issues)
- **Discussions**: [Community discussions](https://github.com/Aricoins/sentinel/discussions)

---

## 🏆 Acknowledgments

- **Design Inspiration**: McKinsey & Company, Boston Consulting Group
- **Icons**: [Lucide React](https://lucide.dev/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**Built with ❤️ for strategic excellence**

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Powered by TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

</div>

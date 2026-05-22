# 📊 Smart Expense Tracker

An AI-powered financial intelligence dashboard that transforms raw, unstructured bank statements into actionable business insights and predictive forecasts. 

## 🚀 Overview

Traditional expense tracking relies heavily on manual data entry and fragmented formats (PDFs, CSVs, Excel). The **Smart Expense Tracker** eliminates this friction by leveraging Large Language Models (LLMs) to automatically parse, categorize, and visualize financial data. Designed with a premium Glassmorphism UI, it provides real-time visibility into cash flow, budget health, and predictive spending trends.

### Key Business Impacts
* **Automated Data Pipeline:** Eliminates manual spreadsheet entry by natively parsing diverse document formats.
* **Predictive Analytics:** Uses historical spending patterns to forecast future expenses and identify anomalies.
* **Bank-Grade Privacy:** Implements a zero-storage architecture where sensitive financial documents are processed entirely client-side and never saved to a database.

---

## ✨ Features

* **🤖 Zero-Shot AI Parsing:** Integrates Google Gemini 2.5 Flash API to extract transactional data, calculate savings rates, and identify major operational expenses without manual templates.
* **📈 Interactive Data Visualization:** Utilizes Recharts to render dynamic SVG charts, including weekly trend lines, category donut charts, and cash flow bar graphs.
* **📂 Multi-Format Ingestion:** Supports automated reading of `.pdf`, `.csv`, `.xlsx`, and `.txt` files directly in the browser via HTML5 FileReader and XLSX.
* **🛡️ Edge-Case Resiliency:** Features custom HTTP 429 rate-limit interception to handle temporary AI server overloads gracefully without application crashes.
* **🎨 Enterprise UI/UX:** Built with a modern, responsive Glassmorphism design system for maximum data clarity.

---

## 🛠️ Technology Stack

* **Frontend Framework:** React.js bootstrapped with Vite
* **Data Visualization:** Recharts
* **AI Integration:** Google Gemini API (2.5 Flash)
* **File Processing:** HTML5 FileReader API, SheetJS (xlsx)
* **HTTP Client:** Axios
* **Deployment & CI/CD:** Vercel

---

## 🧠 Skills & Competencies Gained

This project served as a comprehensive bridge between technical development and product analytics, highlighting several core competencies:

* **AI-Assisted Development & Prompt Engineering:** Transparently utilized Google Gemini as an active pair-programming partner to accelerate development, debug complex logic, and implement the core Zero-Shot parsing engine. Demonstrated the ability to write precise, context-aware prompts to force strict JSON outputs from unstructured data.
* **Full Stack API Integration:** Mastered the asynchronous data flow between a React frontend and secure third-party APIs (Google Generative AI) using Axios, including robust error handling for HTTP 429 (Rate Limit) and 503 (Service Unavailable) status codes.
* **Data Visualization & Business Intelligence:** Translated raw, unformatted financial transactions into clean, executive-ready visual dashboards using Recharts to highlight operational metrics and cash flow health.
* **Modern UI/UX Implementation:** Designed a responsive, user-centric interface using CSS Glassmorphism and CSS keyframe animations to create a premium, enterprise-grade feel.
* **Production Deployment:** Managed version control via Git/GitHub and successfully deployed a production-ready build to Vercel, managing secure environment variables for API keys.
  
---

## 🌐 Live Demo
View the Live Deployment Here https://expense-tracker-system-rose.vercel.app/

## 👨‍💻 Author
**Sairam Shetti**

* **Focused on bridging the gap between business intelligence and technical product management.**

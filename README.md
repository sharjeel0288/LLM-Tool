# LLM Toolkit - All-in-One Developer Tools

A comprehensive Next.js web application featuring 20+ useful developer tools and utilities. Built with modern technologies including Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui components.

## 🚀 Features

### 30+ Powerful Tools:

#### General Developer Tools (20+):

1. **Text Analysis & Word Counter** - Analyze text with detailed statistics (characters, words, sentences, paragraphs, lines)
2. **JSON Formatter & Validator** - Format, validate, and minify JSON data
3. **Base64 Encoder/Decoder** - Encode or decode text to/from Base64
4. **Hash Generator** - Generate MD5, SHA1, SHA256, and SHA512 hashes
5. **QR Code Generator** - Generate QR codes from text or URLs
6. **Password Generator** - Generate secure random passwords with customizable options
7. **UUID Generator** - Generate UUIDs (v4) in bulk
8. **Timestamp Converter** - Convert between Unix timestamps and dates
9. **Text Diff Checker** - Compare two texts and see the differences
10. **Regex Tester** - Test regular expressions against text
11. **Markdown Preview** - Preview markdown in real-time
12. **Code Minifier** - Minify HTML, CSS, or JavaScript code
13. **Case Converter** - Convert text between different case styles (camelCase, PascalCase, snake_case, kebab-case, etc.)
14. **Lorem Ipsum Generator** - Generate placeholder text
15. **CSV to JSON Converter** - Convert CSV data to JSON format
16. **Color Converter** - Convert between HEX and RGB color formats
17. **Image to Base64** - Convert images to Base64 data URLs
18. **Text Statistics** - Detailed statistics and analysis of your text
19. **URL Parser** - Parse and analyze URL components
20. **JWT Decoder** - Decode and inspect JWT tokens

#### LLM-Specific Tools (10+):

21. **LLM Model Comparison** - Find the best LLM model for specific tasks with ratings and recommendations
22. **LLM Cost Calculator** - Calculate API costs for different LLM models and token usage
23. **Token Counter** - Estimate token count for your text across different models
24. **LLM Use Cases Library** - Explore practical use cases and examples for LLMs across categories
25. **Model Information Database** - Detailed information about popular LLM models (providers, pricing, strengths, weaknesses)
26. **Prompt Builder** - Build effective prompts for LLMs with structured templates
27. **API Usage Calculator** - Calculate daily, monthly, and yearly costs based on expected API usage
28. **Model Recommender** - Get personalized model recommendations based on budget, speed, and quality requirements

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Additional Libraries**:
  - react-markdown - Markdown rendering
  - qrcode - QR code generation
  - uuid - UUID generation
  - crypto-js - Hash generation
  - date-fns - Date formatting
  - diff - Text diffing

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main page with all tools
│   └── globals.css          # Global styles
├── components/
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── textarea.tsx
│       ├── tabs.tsx
│       └── ...
├── lib/
│   └── utils.ts             # Utility functions
└── package.json
```

## 🎨 Features

- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Dark Mode Ready**: Built with dark mode support
- **Copy to Clipboard**: One-click copy functionality for all outputs
- **Real-time Updates**: Most tools update in real-time as you type
- **Accurate Results**: All tools provide accurate, reliable results
- **Mobile Responsive**: Works perfectly on all device sizes

## 🎯 LLM Tools Highlights

- **Model Comparison**: Compare GPT-4, Claude 3, Gemini, and more with task-specific ratings
- **Cost Analysis**: Real-time cost calculations for input/output tokens across all major providers
- **Use Case Examples**: Practical examples for content creation, development, business, education, and more
- **Model Database**: Comprehensive information about context windows, parameters, pricing, strengths, and weaknesses
- **Smart Recommendations**: Get personalized model suggestions based on your specific needs
- **Token Estimation**: Estimate token counts for your text to help plan API usage
- **Prompt Engineering**: Build effective prompts with structured templates
- **Usage Planning**: Calculate daily, monthly, and yearly costs based on expected usage

## 🔧 Customization

You can easily customize the tools by:
- Modifying the tool components in `app/page.tsx`
- Adding new tools by creating new tab content
- Customizing colors and styling in `tailwind.config.ts`
- Adding new shadcn/ui components as needed

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

---

**Enjoy using LLM Toolkit!** 🎉


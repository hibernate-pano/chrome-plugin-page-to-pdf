# AI Chat to PDF Chrome Extension

A powerful Chrome extension that allows you to save AI chat conversations (ChatGPT, Claude, Bard, etc.) as beautifully formatted PDF documents with a single click.

## Features

- 🚀 One-click conversion of AI chat conversations to PDF
- 💅 Beautiful and consistent formatting
- 🎨 Code syntax highlighting
- 📱 Responsive design
- 🔒 Privacy-focused (all processing done locally)
- ⚡ Fast and efficient
- 🎯 Support for multiple AI chat platforms
- ⚙️ Customizable settings

## Supported Platforms

- ChatGPT (chat.openai.com)
- Claude (claude.ai)
- Google Bard (bard.google.com)
- More platforms coming soon!

## Installation

### From Chrome Web Store

_(Coming Soon)_

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/yourusername/chrome-plugin-page-to-pdf.git
cd chrome-plugin-page-to-pdf
```

2. Install dependencies:

```bash
npm install
```

3. Build the extension:

```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` directory from the project

## Usage

1. Visit any supported AI chat platform
2. Start or continue a conversation
3. Click the extension icon in your browser
4. Click "Save as PDF"
5. Choose save location (optional)
6. Your conversation is now saved as a PDF!

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Chrome browser

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Project Structure

```
chrome-plugin-page-to-pdf/
├── src/               # Source files
├── public/           # Static assets
├── dist/            # Build output
├── tests/           # Test files
└── docs/            # Documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [jsPDF](https://github.com/MrRio/jsPDF) - PDF generation
- [marked](https://github.com/markedjs/marked) - Markdown parsing
- [DOMPurify](https://github.com/cure53/DOMPurify) - HTML sanitization
- [TailwindCSS](https://tailwindcss.com) - Styling

## Support

If you encounter any issues or have questions, please:

1. Check the [FAQ](docs/FAQ.md)
2. Search existing [Issues](https://github.com/yourusername/chrome-plugin-page-to-pdf/issues)
3. Create a new issue if needed

## Roadmap

- [ ] Additional platform support
- [ ] Custom PDF templates
- [ ] Batch conversion
- [ ] Export to other formats
- [ ] Cloud backup integration
- [ ] Collaborative features

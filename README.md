# Drag & Drop Popup/Banner Builder

A modern React-based drag-and-drop editor for creating popups and banners. This system allows users to visually design interactive popups and banners with a simple drag-and-drop interface.

## Features

- **Template Gallery**: Choose from a variety of pre-designed templates
- **Drag & Drop Interface**: Easily add and position elements
- **Block System**: Comprehensive library of elements:
  - Basic elements (text, images, buttons, etc.)
  - Form elements (inputs, checkboxes, etc.)
  - Special elements (countdown timers, progress bars, etc.)
  - Prize elements (spin wheels, scratch cards, etc.)
- **Property Panel**: Customize blocks with an intuitive property panel
- **Export Options**: Export designs as JSX, HTML, or JSON

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/drag-and-drop-builder.git
   cd drag-and-drop-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
DragAndDropBuilder/
├── docs/                  # Documentation
├── public/                # Public assets
├── src/
│   ├── components/        # React components
│   │   ├── Blocks/        # Block components
│   │   ├── Editor/        # Editor components
│   │   ├── TemplateGallery/ # Template gallery components
│   │   └── UI/            # UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── store/             # Zustand store
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## Usage

1. **Home Page**: Choose between popup or banner mode
2. **Template Gallery**: Select a template or start from scratch
3. **Editor**: 
   - Drag blocks from the left sidebar onto the canvas
   - Select blocks to edit their properties in the right sidebar
   - Customize the canvas settings when no block is selected
4. **Export**: Export your design in your preferred format

## Technologies Used

- React
- TypeScript
- Zustand (State Management)
- React DnD (Drag and Drop)
- Tailwind CSS (Styling)
- Vite (Build Tool)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Color scheme inspired by Tailwind CSS

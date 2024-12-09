# SnapGrid Quiz Builder

A modern, interactive quiz building application built with React and Remix.

## Features

- Drag-and-drop quiz component builder
- Real-time quiz preview
- Question and answer management
- Timer configuration
- Progress tracking
- Image support for questions
- Multiple choice options
- Responsive design

## Architecture

### Component Structure

```
app/
├── components/
│   ├── quiz/              # Quiz display components
│   ├── question-config/   # Question configuration components
│   ├── configs/           # Component configuration panels
│   └── ...
├── routes/                # Application routes
├── services/              # Business logic and data services
└── types/                 # TypeScript type definitions
```

### Key Components

1. **QuestionManager**
   - Manages question and options state
   - Handles navigation between questions
   - Coordinates saving of questions and options

2. **ConfigurationPanel**
   - Central configuration interface
   - Component-specific settings
   - Save/cancel functionality

3. **DroppableGrid**
   - Drag-and-drop interface
   - Component placement
   - Layout management

### State Management

- Uses React's useState and useEffect hooks
- Maintains synchronization between questions and options
- Handles form state and validation

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Admin View** (`/admin`)
   - Drag components from the sidebar
   - Configure questions and options
   - Set up timer and progress tracking

2. **Quiz View** (`/quiz`)
   - Preview the quiz
   - Test question flow
   - Verify timer and progress

## Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Best Practices

1. **Question Configuration**
   - Enter questions sequentially
   - Save each question before proceeding
   - Verify question numbering
   - Review all questions after completion

2. **Options Management**
   - Provide clear, distinct options
   - Mark correct answers
   - Review option formatting
   - Test option selection

3. **Navigation**
   - Use Previous/Next buttons for movement
   - Save changes before navigation
   - Verify question synchronization
   - Check progress tracking

## Technical Details

- Built with React and Remix
- TypeScript for type safety
- Tailwind CSS for styling
- DND Kit for drag-and-drop
- Vite for development and building

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
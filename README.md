# Activity Sage

## Overview
Activity Sage is a web application that helps users discover and suggest activities based on various criteria such as budget, mood, and interests. It provides a user-friendly interface for generating activity suggestions and displays them in a visually appealing format.

## Features
- **Activity Suggestion Generator**: Input criteria like budget, mood, and interests to get personalized activity suggestions.
- **Responsive Design**: The application is fully responsive, providing a seamless experience on both desktop and mobile devices.
- **Modern UI**: Features a modern and visually appealing user interface with smooth transitions and hover effects.
- **Real-time Feedback**: Displays response times and error messages to enhance user experience.

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd activity-sage
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- Open the application in your web browser.
- Fill in the form with your preferences for activities.
- Click the "Generate Suggestions" button to receive activity suggestions.
- View the suggested activities displayed in a grid layout.

## Technologies Used
- React
- TypeScript
- CSS for styling
- Vite for build tooling

## License
This project is licensed under the MIT License.

.activity-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 370px;
}

.cost-tag, .activity-card .cost {
  margin-top: auto;
}

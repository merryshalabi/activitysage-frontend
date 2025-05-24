# 🌟 Activity Sage – Frontend

A beautifully designed React + TypeScript application that helps users generate personalized activity suggestions based on their preferences, mood, budget, and more.

This project is the frontend companion to the [`activitysage-backend`](https://github.com/merryshalabi/activitysage-backend), powered by a FastAPI server and an Ollama-hosted LLM.

---

## ✨ Features

- Clean and responsive UI
- Form input for 10+ contextual fields (mood, budget, environment, etc.)
- Axios-based `POST` request to backend
- Displays 3 activity suggestions in styled cards
- Animated UI elements and modern layout
- Error handling and response-time display

---

## 🖼️ Preview

![Activity Sage Preview](preview.png)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/merryshalabi/activitysage-frontend.git
cd activitysage-frontend

```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

---

## 🛠️ Development

- **Development Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Preview Build**: `npm run preview`

---

## 🚀 Deployment

The application is automatically deployed to EC2 when changes are pushed to the main branch. The deployment process:

1. Uses GitHub Actions for CI/CD
2. Deploys to an EC2 instance
3. Sets up a systemd service for process management
4. Serves the application on port 3000

### Manual Deployment

If you need to deploy manually:

1. Build the application:
   ```bash
   npm run build
   ```

2. Copy the service file to the server:
   ```bash
   scp activity-frontend-web.service ubuntu@your-ec2-host:/home/ubuntu/
   ```

3. SSH into the server and run:
   ```bash
   sudo cp /home/ubuntu/activity-frontend-web.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable activity-frontend-web
   sudo systemctl restart activity-frontend-web
   ```

---

## 📁 Project Structure

```
activitysage-frontend/
├── src/               # Source files
├── public/           # Static assets
├── .github/          # GitHub Actions workflows
├── dist/             # Build output (generated)
└── node_modules/     # Dependencies (generated)
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

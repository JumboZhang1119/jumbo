# Jumbo's Travel Blog

Welcome to my personal blog website, built using modern web technologies. This project showcases my journey into full-stack development, combining frontend, backend, and cloud services to create a fast and scalable site.

---

## 🚀 Technology Stack

- **Next.js 15** — React-based framework for building performant web applications with support for server-side rendering (SSR) and static site generation (SSG).
- **Wisp CMS** — Headless CMS used to manage and deliver content via API.
- **Cloudinary** — Cloud-based media management platform for image and video storage, optimization, and transformation.
- **Vercel** — Hosting and deployment platform providing automatic builds, CDN, and serverless functions.
- **GitHub** — Source code repository and version control system, integrated with Vercel for continuous deployment.

---

## 🏗️ Project Structure
/app or /pages # Next.js application pages and routing
/components # Reusable React components
/public # Static assets like images and fonts
/styles # Global and component-level stylesheets
/utils # Utility functions and helpers
/.env.local # Environment variables (not committed)
/next.config.js # Next.js configuration file
/package.json # Project dependencies and scripts

---

## 📦 Installation & Development

1. Clone the repository:

   ```bash
   git clone https://github.com/JumboZhang1119/jumbo.git
   cd jumbo
2. Install dependencies:
npm install
# or
yarn install
3. Run the development server:
npm run dev
# or
yarn dev
Open your browser and visit http://localhost:3000

⚙️ Environment Variables
Create a .env.local file in the root directory with the following variables:

env
複製
編輯
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
WISP_API_ENDPOINT=your_wisp_api_endpoint
Note: Never commit .env.local to public repositories.

🚀 Deployment
This project is deployed on Vercel, which automatically builds and deploys the site when you push changes to the GitHub repository.

Connect your GitHub repo to Vercel.

Vercel handles CDN caching and serverless functions for API routes if any.

📖 About This Project
I have a strong interest in software development — both frontend and backend — and emerging technologies.
This website is my first full-stack project where I integrated Next.js for the frontend, Wisp CMS for content management, Cloudinary for media management, and Vercel for deployment.

🌐 Live Demo
Check out the live site here: https://jumbo-nine.vercel.app

📄 License
This project is licensed under the MIT License.



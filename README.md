# Blog & Photograpy Project

## 📖 About This Project
This project is my first attempt at front-end web development. My main motivation was to showcase some of my favorite photography works on this website and share them with everyone. To achieve this, I started with an example template provided by Vercel (https://github.com/Wisp-CMS/nextjs-blog-cms-wisp) as the foundation and then redesigned the website according to my needs and aesthetic preferences. In addition to the basic About page, I added two more pages: Photography and Blog. In the Photography section, I used a Masonry layout to display the photos and also added features and animations for photo switching. I designed appropriate interactions for users on different devices; for example, mobile users can swipe down to close the photo viewer, and they can click on the left or right half of the screen to switch photos. For each photo, users can also see detailed metadata such as the camera and lens used. In the future, I may also add some academic notes compiled from my coursework.

### 🔗 Demo Link: [jumbo-nine.vercel.app](https://jumbo-nine.vercel.app)
<img src="https://github.com/user-attachments/assets/b578f900-16a7-4cb3-ba24-55909162980d" alt="com" style="width:50%; height:auto;" />&nbsp;<img src="https://github.com/user-attachments/assets/de15672a-d41e-4ddf-9fa5-6d7846f5df83" alt="com" style="width:19%; height:auto;" />

<img src="https://github.com/user-attachments/assets/a7b95775-f553-490b-a9bd-62ed946ce71c" alt="com" style="width:50%; height:auto;" />&nbsp;<img src="https://github.com/user-attachments/assets/6cbfec4d-00d8-4073-bb70-5e6bffcf0eaf" alt="com" style="width:19%; height:auto;" />



---

## 🚀 Technology Stack

- **Next.js 15** — React-based framework for building performant web applications with support for server-side rendering (SSR) and static site generation (SSG).
- **Wisp CMS** — Headless CMS used to manage and deliver content via API.
- **Cloudinary** — Cloud-based media management platform for image and video storage, optimization, and transformation.
- **Vercel** — Hosting and deployment platform providing automatic builds, CDN, and serverless functions.
- **GitHub** — Source code repository and version control system, integrated with Vercel for continuous deployment.

---

## 🏗️ Project Structure
| Path              | Description                                        |
| ----------------- | -------------------------------------------------- |
| `/app`            | Next.js 15 application root (using the App Router) |
| `/app/api`        | Next.js Serverless API Routes                      |
| `/app/components` | Reusable React components                          |
| `/app/styles`     | Global & component-level CSS/SCSS styles           |
| `/app/page.tsx`   | Main “root” page React component                   |
| `/public/images`  | Static image assets                                |
| `/.env.local`     | Environment variables (do not commit to GitHub)    |
| `/next.config.js` | Next.js global configuration file                  |
| `/tsconfig.json`  | TypeScript compiler settings                       |
| `/package.json`   | Project dependencies & npm scripts                 |

---

## 📦 Installation & Development

1. Clone the repository:
   ```bash
   git clone https://github.com/JumboZhang1119/jumbo.git
   cd jumbo
2. Install **Node**.js at https://nodejs.org
3. Install dependencies:
   ```bash
   npm install
4. Run the development server:
   ```bash
   npm run dev
5. Open your browser and visit http://localhost:3000

---

## 🚀 Deployment
This project is deployed on Vercel, which automatically builds and deploys the site when you push changes to the GitHub repository.

Connect your GitHub repo to Vercel.

Vercel handles CDN caching and serverless functions for API routes if any.

---

## 📄 License
This project is licensed under the MIT License.



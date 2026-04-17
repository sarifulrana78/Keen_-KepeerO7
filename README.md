# KeenKeeper

## 📌 Project Name
**KeenKeeper** — Your Personal Shelf of Meaningful Connections

## 📝 Description
KeenKeeper is a modern friendship management application designed to help you stay close to the people who matter most. It empowers you to track interactions with friends, set relationship goals, visualize communication patterns, and nurture meaningful connections in your life. Never miss checking in with someone important again.

## 🛠️ Technologies Used
- **Frontend Framework**: React 18 with Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React (icons)
- **Charts & Visualization**: Recharts
- **Notifications**: React Hot Toast
- **Language**: TypeScript
- **Formatting**: PostCSS
- **Linting**: ESLint

## ✨ Key Features

### 1. **Friend Profile Management & Tracking**
Maintain detailed profiles for each friend with customizable relationship goals. Track days since last contact, set connection frequency targets, and monitor your relationship status (On Track, Almost Due, Overdue). Each friend profile displays their information, bio, tags, and next due date for meaningful interaction.

### 2. **Interaction Logging & Timeline**
Log three types of interactions with friends—Calls, Texts, and Videos—with a single click from the quick check-in interface. View your complete interaction history in a timeline view that shows all recorded communications with timestamps, enabling you to reflect on your relationship journey over time.

### 3. **Friendship Analytics Dashboard**
Visualize your interaction patterns through an interactive donut chart that breaks down communication by type (Calls, Texts, Videos). Hover over chart segments to see detailed metrics including counts and percentages. Get at-a-glance summaries of total interactions and interaction breakdown to understand your communication habits.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd keen-keeper

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

## 📁 Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Home dashboard
│   ├── stats/        # Analytics dashboard
│   ├── timeline/     # Interaction timeline
│   └── friends/      # Friend detail pages
├── components/       # Reusable React components
├── data/            # Static data (friends.json)
├── lib/             # Utilities and helpers
└── types/           # TypeScript type definitions
```

## 🎨 UI/UX Highlights
- Clean, modern design with a cohesive green color palette
- Responsive layout optimized for mobile, tablet, and desktop
- Smooth transitions and hover effects
- Interactive chart with detailed tooltips
- Toast notifications for user feedback
- Intuitive navigation and information hierarchy

## 📊 Data Management
Friend data is stored in JSON format with local state management using React hooks. Interaction records are persisted in the browser's localStorage for seamless user experience.

---

**Created with ❤️ to help you maintain meaningful relationships**

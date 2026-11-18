# SmartNotice AI – Backend

Node.js + Express + MongoDB backend with Gemini AI features.

## Folder Structure

```
backend/
├── server.js                  # Entry point: connect DB, seed data, start server
├── app.js                     # Express app: middleware + route mounting
├── config/
│   ├── db.js                  # MongoDB connection
│   └── gemini.js              # Gemini AI client
├── middleware/
│   └── authMiddleware.js      # Admin JWT authentication
├── models/                    # Mongoose models (Admin, Student, Notice, SavedNotice, Notification)
├── controllers/               # Business logic for each feature
│   ├── noticeController.js
│   ├── savedController.js
│   ├── notificationController.js
│   ├── adminController.js
│   ├── authController.js      # Student register / login
│   └── aiController.js        # AI summary + priority classification
├── routes/                    # URL -> controller mapping
│   ├── noticeRoutes.js        # /api/notices
│   ├── savedRoutes.js         # /api/saved
│   ├── notificationRoutes.js  # /api/notifications
│   ├── adminRoutes.js         # /api/admin
│   ├── authRoutes.js          # /api/auth
│   └── aiRoutes.js            # /api/ai
├── data/
│   └── defaultNotices.js      # Default notices for empty database
└── utils/
    ├── seed.js                # Default admin + default notices seeding
    └── normalizeTitle.js      # Title normalizer for duplicate detection
```

## API Endpoints

| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/notices` | Public |
| POST / PUT / DELETE | `/api/notices`, `/api/notices/:id` | Admin |
| POST / GET | `/api/saved` | Public |
| DELETE | `/api/saved/:noticeId` | Public |
| GET | `/api/notifications` | Public |
| POST | `/api/notifications` | Admin |
| PATCH | `/api/notifications/:id/read` | Public |
| DELETE | `/api/notifications/:id` | Public |
| POST | `/api/admin/register`, `/api/admin/login` | Public |
| POST | `/api/admin/logout` | Admin |
| POST | `/api/auth/register`, `/api/auth/login` | Public (students) |
| POST | `/api/ai/summarize`, `/api/ai/classify-priority` | Admin |

## Run

```
npm install
cp .env.example .env   # then fill in your values
node server.js
```

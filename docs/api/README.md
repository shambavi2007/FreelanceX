# FreelanceX API Documentation

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

## Authentication
All protected routes require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user
- `POST /auth/forgot-password` - Forgot password
- `POST /auth/reset-password` - Reset password

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/upload-avatar` - Upload profile picture
- `GET /users/freelancers` - Get freelancers list
- `GET /users/:id` - Get user by ID

### Jobs
- `GET /jobs` - Get all jobs (with filters)
- `POST /jobs` - Create new job (Client only)
- `GET /jobs/:id` - Get job details
- `PUT /jobs/:id` - Update job (Client only)
- `DELETE /jobs/:id` - Delete job (Client only)
- `GET /jobs/my-jobs` - Get user's jobs

### Proposals
- `GET /proposals` - Get proposals
- `POST /proposals` - Submit proposal (Freelancer only)
- `GET /proposals/:id` - Get proposal details
- `PUT /proposals/:id` - Update proposal
- `DELETE /proposals/:id` - Delete proposal
- `PUT /proposals/:id/accept` - Accept proposal (Client only)
- `PUT /proposals/:id/reject` - Reject proposal (Client only)

### Messages
- `GET /messages/conversations` - Get user conversations
- `GET /messages/:conversationId` - Get conversation messages
- `POST /messages` - Send message
- `PUT /messages/:id/read` - Mark message as read

## Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## Error Format
```json
{
  "success": false,
  "error": "Error message",
  "details": {}
}
```
# Assignment-2 API

A role-based  REST API built with **Express.js, TypeScript, PostgreSQL, and JWT Authentication**. Users can register, log in, create issues, update issues based on permissions, and manage issue workflows.

## Live URL

https://assignment-2-0ucx.onrender.com

---

# Features

* User Registration & Login
* JWT Authentication
* Role-Based Authorization (Contributor / Maintainer)
* Create Issue
* Get All Issues (sorting + filtering)
* Get Single Issue
* Update Issue
* Delete Issue
* PostgreSQL Database Integration
* Modular Folder Structure
* Global Error Handling
* Secure Password Hashing using bcrypt

---

# Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL
* pg

### Authentication

* JWT
* bcrypt

### Deployment

* Render
* Neon PostgreSQL

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/AbuShahma022/assignment-2.git
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create `.env`

```env
CONNECTION_STRING=your_database_url

JWT_SECRET=your_secret_key

PORT= your port
```

## Run Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Run Production

```bash
npm start
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/signup
```

Example Body:

```json
{
"name":"John Doe",
"email":"john@gmail.com",
"password":"123456"
}
```

---

### Login

```http
POST /api/auth/login
```

Example Body:

```json
{
"email":"john@gmail.com",
"password":"123456"
}
```

---

## Issue Management

### Create Issue

Contributor / Maintainer

```http
POST /api/issues
```

Header:

```txt
Authorization: JWT_TOKEN
```

---
### body example
```json
{
  "title": "Database connection timeout under load from maintainer 2",
  "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
  "type": "bug"
}
```

### Get All Issues

Public

Supports:

```txt
sort=newest

sort=oldest

type=bug

type=feature_request

status=open

status=in_progress

status=resolved
```

Example:

```http
GET /api/issues?sort=newest&type=bug
```

---

### Get Single Issue

Public

```http
GET /api/issues/:id
```

---

### Update Issue

Maintainer:

* Can update any issue
* Can update status

Contributor:

* Can update own issue only
* Only if issue status is open
* Cannot update status

```http
PATCH /api/issues/:id
```

Header:

```txt
Authorization: JWT_TOKEN
```

---

### Delete Issue

Maintainer Only

```http
DELETE /api/issues/:id
```

Header:

```txt
Authorization: JWT_TOKEN
```

---

# Database Schema Summary

## Users Table

| Field      | Type                     |
| ---------- | ------------------------ |
| id         | SERIAL                   |
| name       | VARCHAR(100)             |
| email      | VARCHAR(150) UNIQUE      |
| password   | TEXT                     |
| role       | contributor / maintainer |
| created_at | TIMESTAMP                |
| updated_at | TIMESTAMP                |

---

## Issues Table

| Field       | Type                          |
| ----------- | ----------------------------- |
| id          | SERIAL                        |
| title       | VARCHAR(150)                  |
| description | TEXT                          |
| type        | bug / feature_request         |
| status      | open / in_progress / resolved |
| reporter_id | INT                           |
| created_at  | TIMESTAMP                     |
| updated_at  | TIMESTAMP                     |

---

# Access Rules

## Contributor

* Create issue
* Update own issue only
* Cannot change status
* Cannot delete issue

## Maintainer

* Create issue
* Update any issue
* Update status
* Delete any issue

---



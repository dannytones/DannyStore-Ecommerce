> A production-grade, event-driven microservices e-commerce ecosystem built with modern web technologies and architectural best practices.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2.7-red.svg)](https://turbo.build/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Microservices Breakdown](#microservices-breakdown)
- [Getting Started](#getting-started)
- [Development](#development)
- [Why This Architecture?](#why-this-architecture)

## Overview

DannyStore is a full-stack, production-ready e-commerce platform that demonstrates enterprise-level software architecture and modern development practices. Built as a monorepo using Turborepo, it features a decoupled microservices backend with event-driven communication and specialized frontend applications optimized for different user roles.

## Client 

#### Front page

<img width="1920" height="2204" alt="client front page" src="https://github.com/user-attachments/assets/bb4adbaa-887e-4efe-a788-7626417e5608" />

#### Product Page

<img width="1920" height="1115" alt="client card apge" src="https://github.com/user-attachments/assets/5834164f-55df-4733-8a8b-9e5c5433ac7b" />

#### Cart

<img width="1920" height="947" alt="client cart" src="https://github.com/user-attachments/assets/fe6f040a-2b7e-4f1e-ba2c-65bed5927895" />

#### Stripe Payment

<img width="1920" height="992" alt="client payment stripe" src="https://github.com/user-attachments/assets/e20b5fa8-f963-44ba-b085-3db8fe055750" />

#### Return Page

<img width="1920" height="1135" alt="client return" src="https://github.com/user-attachments/assets/3e2ef86b-e3db-4c4f-afac-ef9c3e63e029" />

#### Client Orders Page

<img width="1920" height="1284" alt="client orders" src="https://github.com/user-attachments/assets/d54623dd-6cbe-46ec-aea7-c4eba845b4e1" />

## Admin
<img width="1869" height="1296" alt="Screenshot 2026-01-22 at 21-11-02 Create Next App" src="https://github.com/user-attachments/assets/a5250f4f-6ec0-455f-84cd-051fc6e3be98" />

## Prisma

#### Home
<img width="1920" height="1325" alt="admin home" src="https://github.com/user-attachments/assets/e58013fa-c950-4498-a2b6-a4dc3f3424ab" />

#### All products
<img width="1920" height="947" alt="admin all products" src="https://github.com/user-attachments/assets/09a03b69-5d30-4e41-ac92-c63a9a6ccb02" />

#### Add Product
<img width="363" height="936" alt="admin add product sidebar" src="https://github.com/user-attachments/assets/f2023477-f5fc-4f4b-bec9-7c63d8e3809a" />

**What makes this project stand out:**
- Real-world microservices architecture with proper service boundaries
- Event-driven communication using Apache Kafka for asynchronous processing
- Type-safe end-to-end with shared TypeScript types across services
- Multi-framework approach - choosing the right tool for each job
- Production-ready features: payment processing, automated emails, authentication
- Modern UI/UX with Next.js 16 and React 19

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
├──────────────────────────────┬──────────────────────────────────┤
│   Customer Storefront        │      Admin Dashboard             │
│   (Next.js - Port 3000)      │   (Next.js - Port 3002)          │
│   - Product browsing         │   - Inventory management         │
│   - Shopping cart            │   - Order processing             │
│   - Checkout flow            │   - Analytics & reports          │
│   - Order tracking           │   - User management              │
└──────────────────────────────┴──────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │   API Gateway Layer    │
                    └───────────┬───────────┘
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
┌───────▼────────┐    ┌────────▼────────┐    ┌────────▼────────┐
│ Product Service│    │  Order Service  │    │ Payment Service │
│   (Express)    │    │   (Fastify)     │    │     (Hono)      │
│   Port: 3001   │    │   Port: 3004    │    │   Port: 3003    │
└───────┬────────┘    └────────┬────────┘    └────────┬────────┘
        │                      │                       │
        │             ┌────────▼────────┐              │
        │             │  Auth Service   │              │
        │             │   (Vanilla Node)│              │
        │             │   Port: 3005    │              │
        │             └────────┬────────┘              │
        │                      │                       │
        └──────────────────────┼───────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Apache Kafka      │
                    │  Message Broker     │
                    │  (Event Bus)        │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Email Service      │
                    │  (Kafka Consumer)   │
                    │  - Welcome emails   │
                    │  - Order confirmations│
                    └─────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                        PERSISTENCE LAYER                        │
├─────────────────────────┬───────────────────────────────────────┤
│   PostgreSQL            │   MongoDB                             │
│   (Products, Categories)│   (Orders, Transactions)              │
└─────────────────────────┴───────────────────────────────────────┘
```

### Event Flow Example: User Places Order

```
Customer → Payment Service → Kafka (order.created event)
                                    ↓
                    ┌───────────────┼───────────────┐
                    ↓                               ↓
            Email Service                    Order Service
         (sends confirmation)            (updates database)
```

## Key Features

### Customer-Facing Features
- **Shopping Experience**
  - Real-time product search and filtering
  - Dynamic shopping cart with Zustand state management
  - Category-based product browsing
  - Responsive product cards with image optimization

- **Checkout & Payments**
  - Secure Stripe integration
  - Multi-step checkout process
  - Shipping information collection
  - Order confirmation with tracking

- **User Management**
  - Clerk authentication (OAuth, email/password)
  - Protected routes and role-based access
  - User profile management
  - Order history tracking

### Admin Features
- **Analytics Dashboard**
  - Revenue tracking with interactive charts (Recharts)
  - Order statistics and trends
  - User growth metrics
  - Product performance insights

- **Inventory Management**
  - Product CRUD operations
  - Category management
  - Bulk operations with data tables
  - Real-time stock updates

- **User Administration**
  - User role management
  - Account status control
  - Activity monitoring
  - Customer insights

### Backend Features
- **Event-Driven Architecture**
  - Apache Kafka for asynchronous messaging
  - Event sourcing for order state changes
  - Decoupled service communication
  - Scalable message processing

- **Automated Email System**
  - Welcome emails on user registration
  - Order confirmation emails
  - Event-triggered notifications
  - Template-based email system using Nodemailer

- **Security**
  - JWT-based authentication
  - Clerk integration for identity management
  - Role-based access control (RBAC)
  - Middleware authentication on all services

- **Database Architecture**
  - PostgreSQL with Prisma ORM for product data
  - MongoDB for order management
  - Database connection pooling
  - Type-safe database queries

## Technology Stack

### Frontend Applications
| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| **Next.js 16** | React framework | Server-side rendering, excellent SEO, file-based routing |
| **React 19** | UI library | Latest features, improved performance, React Compiler |
| **TypeScript** | Type safety | Catch errors early, better IDE support, self-documenting code |
| **Tailwind CSS v4** | Styling | Utility-first, rapid development, consistent design |
| **shadcn/ui** | Component library | Accessible, customizable, production-ready components |
| **Zustand** | State management | Simple, lightweight, TypeScript-first |
| **TanStack Query** | Data fetching | Caching, invalidation, automatic refetching |
| **React Hook Form** | Form handling | Performance, validation, better UX |
| **Clerk** | Authentication | Easy integration, OAuth providers, user management |

### Backend Services
| Service | Framework | Why This Choice |
|---------|-----------|----------------|
| **Product Service** | Express.js | Battle-tested, extensive middleware ecosystem, flexible |
| **Order Service** | Fastify | High performance, JSON schema validation, low overhead |
| **Payment Service** | Hono | Edge-ready, zero dependencies, ultra-fast routing |
| **Auth Service** | Vanilla Node.js | Lightweight for simple JWT operations |
| **Email Service** | Node.js + Kafka | Event-driven, async processing |

### Infrastructure & Tools
- **Turborepo**: Monorepo build system with intelligent caching
- **Apache Kafka**: Event streaming platform for microservices communication
- **PostgreSQL**: Relational database for structured product data
- **MongoDB**: NoSQL database for flexible order data
- **Prisma**: Modern ORM with type safety and migrations
- **Stripe**: Payment processing
- **Nodemailer**: Email delivery
- **pnpm**: Fast, disk space efficient package manager
- **Docker**: Containerization (via Kafka setup)

### Developer Experience
- **TypeScript 5.9**: Static typing across the entire stack
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **tsx**: Fast TypeScript execution for development
- **Shared Types Package**: End-to-end type safety

## Project Structure

```
danny-ecommerce/
├── apps/
│   ├── client/                 # Customer-facing Next.js storefront
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router pages
│   │   │   ├── components/    # React components
│   │   │   └── stores/        # Zustand state management
│   │   └── package.json
│   │
│   ├── admin/                  # Admin dashboard (Next.js)
│   │   ├── src/
│   │   │   ├── app/           # Dashboard pages
│   │   │   ├── components/    # Admin UI components
│   │   │   └── hooks/         # Custom React hooks
│   │   └── package.json
│   │
│   ├── product-service/        # Product API (Express)
│   │   ├── src/
│   │   │   ├── controllers/   # Business logic
│   │   │   ├── routes/        # API endpoints
│   │   │   └── middleware/    # Auth, error handling
│   │   └── package.json
│   │
│   ├── order-service/          # Order API (Fastify)
│   │   ├── src/
│   │   │   ├── routes/        # Order endpoints
│   │   │   ├── utils/         # Order processing logic
│   │   │   └── middleware/    # Authentication
│   │   └── package.json
│   │
│   ├── payment-service/        # Payment API (Hono)
│   │   ├── src/
│   │   │   ├── routes/        # Stripe integration
│   │   │   └── utils/         # Payment helpers
│   │   └── package.json
│   │
│   ├── auth-service/           # Authentication (Node.js)
│   │   ├── src/
│   │   │   ├── routes/        # Auth endpoints
│   │   │   └── utils/         # JWT, Clerk integration
│   │   └── package.json
│   │
│   └── email-service/          # Email notifications (Kafka Consumer)
│       ├── src/
│       │   ├── index.ts       # Kafka consumer setup
│       │   └── utils/         # Mailer configuration
│       └── package.json
│
├── packages/
│   ├── types/                  # Shared TypeScript types
│   │   └── src/
│   │       ├── auth.ts
│   │       ├── cart.ts
│   │       ├── order.ts
│   │       └── product.ts
│   │
│   ├── product-db/             # PostgreSQL/Prisma for products
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── src/
│   │
│   ├── order-db/               # MongoDB for orders
│   │   └── src/
│   │       ├── connection.ts
│   │       └── order-model.ts
│   │
│   ├── kafka/                  # Kafka client library
│   │   ├── docker-compose.yml
│   │   └── src/
│   │       ├── client.ts
│   │       ├── producer.ts
│   │       └── consumer.ts
│   │
│   ├── eslint-config/          # Shared ESLint configurations
│   └── typescript-config/      # Shared TypeScript configurations
│
├── turbo.json                  # Turborepo pipeline configuration
├── pnpm-workspace.yaml         # pnpm workspace configuration
└── package.json                # Root package.json
```

## 🔧 Microservices Breakdown

### 1. Product Service (Express.js - Port 3001)
**Responsibility**: Product catalog management

**Why Express?**: Mature ecosystem, extensive middleware support, familiar patterns for CRUD operations.

**Endpoints**:
- `GET /api/products` - List all products with pagination
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (admin)

**Key Features**:
- Prisma ORM with PostgreSQL
- Category-based filtering
- Search functionality
- Image URL management
- Kafka event publishing on product changes

---

### 2. Order Service (Fastify - Port 3004)
**Responsibility**: Order processing and management

**Why Fastify?**: High performance (up to 30% faster than Express), built-in JSON schema validation, TypeScript-first design.

**Endpoints**:
- `GET /api/orders` - User's order history
- `GET /api/orders/:id` - Order details
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status (admin)

**Key Features**:
- MongoDB for flexible order schema
- Order status state machine
- Kafka consumer for payment events
- Date-based order filtering
- Order aggregation and statistics

---

### 3. Payment Service (Hono - Port 3003)
**Responsibility**: Stripe payment integration

**Why Hono?**: Edge-compatible, zero dependencies, blazing fast routing, perfect for payment webhooks.

**Endpoints**:
- `POST /api/create-checkout-session` - Initialize Stripe checkout
- `POST /api/webhook` - Stripe webhook handler
- `GET /api/session/:id` - Verify payment session

**Key Features**:
- Stripe Checkout integration
- Webhook signature verification
- Order status updates via Kafka
- Automatic email triggering on successful payment
- Secure payment processing

---

### 4. Auth Service (Vanilla Node.js - Port 3005)
**Responsibility**: User authentication and authorization

**Why Vanilla Node?**: Minimal overhead for simple JWT operations, demonstrates understanding of Node fundamentals.

**Endpoints**:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification
- `GET /api/users/:id` - User profile

**Key Features**:
- Clerk integration for identity management
- JWT token generation
- Kafka event publishing for user.created
- Role-based access control

---

### 5. Email Service (Kafka Consumer)
**Responsibility**: Automated email notifications

**Why Event-Driven?**: Decouples email sending from critical business logic, allows retry mechanisms, scales independently.

**Kafka Topics Consumed**:
- `user.created` - Sends welcome email
- `order.created` - Sends order confirmation

**Key Features**:
- Nodemailer integration
- HTML email templates
- Automatic retry on failure
- Event-driven architecture
- Non-blocking email delivery

## Getting Started

### Prerequisites

```bash
Node.js >= 18.x
pnpm >= 10.x
PostgreSQL (running)
MongoDB (running)
Docker (for Kafka)
```

### Environment Variables

Create `.env` files in each service directory:

**apps/product-service/.env**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/products"
CLERK_SECRET_KEY="your_clerk_secret"
PORT=3001
```

**apps/order-service/.env**
```env
MONGODB_URI="mongodb://localhost:27017/orders"
CLERK_SECRET_KEY="your_clerk_secret"
PORT=3004
```

**apps/payment-service/.env**
```env
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
CLERK_PUBLISHABLE_KEY="pk_test_..."
PORT=3003
```

**apps/email-service/.env**
```env
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"
```

**apps/client/.env.local**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_PRODUCT_SERVICE_URL="http://localhost:3001"
NEXT_PUBLIC_ORDER_SERVICE_URL="http://localhost:3004"
NEXT_PUBLIC_PAYMENT_SERVICE_URL="http://localhost:3003"
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/danny-ecommerce.git
cd danny-ecommerce
```

2. Install dependencies
```bash
pnpm install
```

3. Set up databases
```bash
# Generate Prisma client and run migrations
cd packages/product-db
pnpm prisma generate
pnpm prisma migrate dev

# Ensure MongoDB is running
mongosh # Should connect successfully
```

4. Start Kafka (Docker)
```bash
cd packages/kafka
docker-compose up -d
```

5. Start all services in development mode
```bash
# From root directory
pnpm dev
```

This will start:
- Client (http://localhost:3000)
- Admin (http://localhost:3002)
- Product Service (http://localhost:3001)
- Payment Service (http://localhost:3003)
- Order Service (http://localhost:3004)
- Auth Service (http://localhost:3005)
- Email Service (background)

## Development

### Monorepo Commands

```bash
# Install all dependencies
pnpm install

# Run all apps and services in development mode
pnpm dev

# Build all apps and services
pnpm build

# Run linting across all workspaces
pnpm lint

# Format code with Prettier
pnpm format

# Type check all TypeScript code
pnpm check-types
```

### Individual Service Commands

```bash
# Run specific app
pnpm --filter client dev
pnpm --filter admin dev
pnpm --filter product-service dev

# Build specific service
pnpm --filter payment-service build

# Run Prisma migrations
cd packages/product-db
pnpm prisma migrate dev --name your_migration_name
```

### Turborepo Pipeline

The project uses Turborepo for intelligent task scheduling and caching:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "check-types": {}
  }
}
```

**Benefits**:
- Runs tasks in parallel where possible
- Caches build outputs to avoid redundant work
- Understands dependency graph
- Only rebuilds what changed

## Why This Architecture?

### Business Benefits

1. **Scalability**: Each microservice can be scaled independently based on demand
   - Example: Scale payment service during Black Friday without touching product catalog

2. **Resilience**: Failure in one service doesn't bring down the entire system
   - Example: Email service down? Orders still process successfully

3. **Development Velocity**: Teams can work on different services simultaneously
   - Frontend team works on UI while backend team updates payment flow

4. **Technology Flexibility**: Use the best tool for each job
   - Hono for edge-compatible payment webhooks
   - Fastify for high-performance order processing
   - Express for traditional CRUD operations

### Technical Benefits

1. **Type Safety**: Shared types package ensures consistency
```typescript
// packages/types/src/order.ts
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
}

// Used in both frontend and backend with same shape
```

2. **Event-Driven Communication**: Loose coupling between services
```typescript
// Payment successful → Kafka event → Multiple consumers react
producer.send('order.created', orderData);
// ✓ Email service sends confirmation
// ✓ Order service updates database
// ✓ Analytics service tracks revenue
```

3. **Code Reusability**: Shared packages reduce duplication
```typescript
// packages/product-db - used by product-service and admin
import { prisma } from '@repo/product-db';

// packages/kafka - used by all services
import { createProducer } from '@repo/kafka';
```

4. **Developer Experience**:
   - Hot reload across all services
   - Shared TypeScript configs
   - Consistent linting rules
   - Centralized dependency management

### Real-World Scenarios This Handles

**Scenario 1: Payment Processing**
```
User clicks "Pay" → Payment Service (Stripe) → Kafka Event
                                                    ↓
                                            ┌───────┼───────┐
                                            ↓               ↓
                                    Order Service    Email Service
                                 (update status)  (send confirmation)
```

**Scenario 2: Product Update**
```
Admin updates product → Product Service → Kafka Event → Cache Invalidation
                                                              ↓
                                                    Frontend refreshes data
```

**Scenario 3: New User Registration**
```
User signs up → Auth Service → Kafka Event (user.created)
                                         ↓
                                  Email Service
                              (sends welcome email)
```

## What I Learned Building This

1. **Microservices Architecture**
   - Service boundaries and responsibilities
   - Inter-service communication patterns
   - Data consistency in distributed systems

2. **Event-Driven Systems**
   - Apache Kafka producer/consumer patterns
   - Eventual consistency
   - Message ordering and idempotency

3. **Framework Selection**
   - Performance trade-offs (Fastify vs Express vs Hono)
   - Use case suitability
   - Edge computing considerations

4. **Full-Stack Type Safety**
   - Monorepo workspace management
   - Shared type definitions
   - End-to-end TypeScript

5. **Modern Frontend Practices**
   - Server components in Next.js 16
   - React 19 features
   - State management patterns

6. **Production Considerations**
   - Authentication & authorization
   - Payment processing security
   - Error handling and logging
   - Database optimization

## Performance Optimizations

- **Turborepo Caching**: Reduces build times by up to 85%
- **Next.js Image Optimization**: Automatic WebP conversion, lazy loading
- **Database Indexing**: Optimized queries with Prisma
- **Lazy Loading**: Code splitting in Next.js
- **State Management**: Zustand for minimal re-renders
- **Edge-Ready Payment Webhooks**: Hono for sub-millisecond response times

## Security Features

- JWT-based authentication
- Clerk for OAuth providers (Google, GitHub)
- CORS configuration
- Environment variable management
- Stripe webhook signature verification
- SQL injection prevention (Prisma)
- XSS protection in React
- Role-based access control

## Future Enhancements

- [ ] Docker Compose for full-stack deployment
- [ ] Kubernetes configurations
- [ ] GraphQL API layer
- [ ] Redis caching layer
- [ ] Elasticsearch for product search
- [ ] WebSocket for real-time order updates
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Unit and E2E tests
- [ ] Monitoring with Prometheus/Grafana
- [ ] CDN integration for static assets


## About the Developer

This project demonstrates my ability to:
- Design and implement microservices architecture
- Work with event-driven systems (Kafka)
- Build full-stack applications with modern frameworks
- Make informed technology choices based on requirements
- Write type-safe, maintainable code
- Handle production concerns (payments, auth, emails)
- Manage complex monorepo structures

**Looking for a developer who can architect scalable systems and ship production-ready code? Let's connect!**

[danylotones@gmail.com]

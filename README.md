# Microservices E-commerce Ecosystem (Turborepo)

This is a high-performance, full-stack monorepo featuring a decoupled microservices backend and specialized frontend applications. Built with scalability and developer experience in mind.
## Project Layout
### Apps and Packages
    apps/client: A customer-facing Next.js storefront optimized for SEO and conversion.
    apps/admin: A robust React dashboard for inventory and order management.
# Architecture & Visuals
## client 
<img width="1869" height="2235" alt="Screenshot 2026-01-22 at 21-10-48 Dannys Store - best store" src="https://github.com/user-attachments/assets/6c83faba-47c9-40d6-85c4-b01ad27b73b3" />
## admin
<img width="1869" height="1296" alt="Screenshot 2026-01-22 at 21-11-02 Create Next App" src="https://github.com/user-attachments/assets/a5250f4f-6ec0-455f-84cd-051fc6e3be98" />
# Backend Microservices
## I utilized a "right tool for the job" approach, implementing different frameworks within the monorepo:
    Hono: Used for its edge-compatibility and zero-latency routing.
    Fastify: Leveraged for its high-performance JSON schema validation and speed.
    Vanilla Node.js: Kept lightweight for core utility functions.
## Features
    Turborepo Pipeline: Optimized build caching and task execution.
    Microservices: Decoupled architecture allowing independent scaling and deployment.
    Shared Types: End-to-end type safety between backend services and frontend apps.
    Performance: Optimized Lighthouse scores (LCP/CLS) and reduced API overhead.
## Utilities
# This Turborepo has some additional configurations that I've added to help with development:
    TypeScript for static type checking
    ESLint for code linting
    Prettier for code formatting

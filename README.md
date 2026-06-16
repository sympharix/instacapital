# Instacapital SaaS Platform

Instacapital is a modern, production-grade, multi-tenant B2B SaaS platform designed for loan consultancies and financial agencies. It manages the complete lifecycle of a loan from public lead generation and document collection to administrative workflow automations.

## Core Features
* **Multi-Tenant Architecture**: A single deployment can host multiple independent financial consultancies (Agencies), ensuring isolated data (Leads, Customers, Documents) for each `Company`.
* **Public Customer Portal (`/apply`)**: A self-serve onboarding wizard where customers can securely authenticate via OTP, enter personal details, and upload required documents (PAN, Aadhaar, Bank Statements) directly into the CRM.
* **Cinematic Dark UI**: The frontend is built with an aesthetic glassmorphism design system using React and Material UI, complete with micro-interactions, dynamic ambient blobs, and a premium UX.
* **Intelligent Document Vault**: Uploaded documents are automatically organized into visual folders per Lead/Customer, allowing admins to easily verify files.
* **Asynchronous Automation (n8n & Celery)**: Built-in integration with `n8n` allows ops teams to visually build webhooks and workflows (e.g., SLA alerts, automated welcome emails) without writing backend code. Heavy tasks are offloaded to Celery & Redis.

## Tech Stack
### Frontend
- **Framework**: React 19 + TypeScript (built via Vite)
- **UI Library**: Material UI (MUI v6)
- **State Management**: Redux Toolkit
- **Styling**: Vanilla CSS (Cinematic Dark Mode + Glassmorphism Tokens)

### Backend
- **Framework**: Python 3.13 + Django 5 + Django Rest Framework (DRF)
- **Database**: PostgreSQL
- **Caching & Message Broker**: Redis
- **Task Queue**: Celery
- **Workflow Engine**: n8n (Local Docker Node)

## Prerequisites
Ensure you have the following installed on your machine:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
* [Node.js 20+](https://nodejs.org/en/) (Optional, if running frontend outside Docker)
* [Python 3.13+](https://www.python.org/downloads/) (Optional, if running backend outside Docker)

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd instacapital-saas
   ```

2. **Start the Docker Stack**
   The entire stack (PostgreSQL, Redis, Django, Celery, React, n8n) is orchestrated via Docker Compose.
   ```bash
   docker-compose up -d --build
   ```

3. **Apply Database Migrations**
   ```bash
   docker-compose exec backend python manage.py migrate
   ```

4. **Access the Applications**
   * **Frontend Application**: [http://localhost:5173](http://localhost:5173)
   * **Backend API (Swagger Docs)**: [http://localhost:8000/swagger/](http://localhost:8000/swagger/)
   * **n8n Automation Builder**: [http://localhost:5678](http://localhost:5678)

## Testing the OTP Flow Locally
To avoid SMS provider costs during local development, the OTP is not sent to a live phone number. 
When you enter a phone number on the `/apply` portal, monitor your backend Docker logs to view the generated OTP:
```bash
docker-compose logs -f backend
```
You will see a log entry formatted like: `🚀 OTP for user@example.com: 123456`

## Documentation Overview
For a deeper dive into the system architecture and database schema, please review the [ARCHITECTURE.md](./ARCHITECTURE.md) file.

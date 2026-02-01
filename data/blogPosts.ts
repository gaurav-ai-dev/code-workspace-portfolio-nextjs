export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  tags: string[]; 
  featured: boolean;
  gradient: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "building-scalable-react-applications",
    title: "Building Scalable React Applications",
    date: "Jan 15, 2024",
    category: "React",
    readTime: "8 min read",
    excerpt: "Lessons learned from scaling a React app to handle 1M+ daily active users. Covering code splitting, memoization, and state management.",
    tags: ["React", "Performance", "Architecture"],
    featured: true,
    gradient: "from-blue-500/20 to-cyan-500/20",
    content: `
## Introduction

Scaling a React application to handle millions of users is no small feat. After working on a project that grew from a small startup MVP to serving over 1 million daily active users, I've learned some valuable lessons that I want to share.

## Code Splitting: The Foundation

One of the first things we implemented was aggressive code splitting. React's lazy loading combined with Suspense made this surprisingly easy.

\`\`\`jsx
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

This reduced our initial bundle size by 60%, significantly improving first contentful paint.

## Memoization Strategies

Not everything needs to be memoized, but knowing when to use \`useMemo\`, \`useCallback\`, and \`React.memo\` is crucial.

### When to Memoize

- **Expensive calculations**: Any computation that takes more than a few milliseconds
- **Reference equality**: When passing objects or functions to optimized child components
- **Stable references**: For dependencies in other hooks

### When NOT to Memoize

- Simple primitive values
- Components that always re-render anyway
- When the cost of memoization exceeds the benefit

## State Management at Scale

We started with Redux but eventually migrated to a hybrid approach:

1. **Server state**: React Query for all API data
2. **UI state**: Local component state with Context for shared UI concerns
3. **Global state**: Zustand for truly global application state

This separation made our codebase much more maintainable and reduced unnecessary re-renders.

## Virtual Lists for Large Data

When dealing with lists of thousands of items, virtualization is essential. We used \`react-virtual\` to render only visible items:

\`\`\`jsx
const virtualizer = useVirtualizer({
  count: items.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 50,
});
\`\`\`

## Key Takeaways

1. **Measure first**: Use React DevTools Profiler before optimizing
2. **Start with architecture**: Good component structure prevents many performance issues
3. **Lazy load aggressively**: Users shouldn't download what they don't need
4. **Cache smartly**: React Query's caching alone solved 80% of our data-fetching performance issues
5. **Monitor in production**: Performance in development doesn't reflect production reality

Building for scale is a journey, not a destination. These patterns have served us well, but the React ecosystem continues to evolve with features like Server Components and Concurrent Rendering opening new possibilities.
    `
  },
  {
    id: 2,
    slug: "mongodb-vs-postgresql-when-to-use-which",
    title: "MongoDB vs PostgreSQL: When to Use Which",
    date: "Jan 08, 2024",
    category: "Database",
    readTime: "6 min read",
    excerpt: "A practical comparison based on real project experiences. Understanding trade-offs between flexibility and ACID compliance.",
    tags: ["MongoDB", "PostgreSQL", "Backend"],
    featured: true,
    gradient: "from-purple-500/20 to-pink-500/20",
    content: `
## The Eternal Debate

Every developer has been in this situation: starting a new project and needing to choose between MongoDB and PostgreSQL. After using both extensively in production, here's my practical guide.

## When MongoDB Shines

### 1. Rapidly Evolving Schemas

If your data model is still being figured out, MongoDB's flexibility is invaluable:

\`\`\`javascript
// Easy to add new fields without migrations
db.users.insertOne({
  name: "John",
  email: "john@example.com",
  // New field? No problem!
  preferences: {
    theme: "dark",
    notifications: true
  }
});
\`\`\`

### 2. Document-Centric Data

When your data naturally forms documents (like articles, products with varying attributes, or user profiles), MongoDB's document model is intuitive.

### 3. Horizontal Scaling Needs

MongoDB's sharding capabilities make horizontal scaling more straightforward for read-heavy workloads.

## When PostgreSQL Wins

### 1. Complex Relationships

When you have highly relational data with complex joins:

\`\`\`sql
SELECT 
  orders.id,
  customers.name,
  products.title,
  order_items.quantity
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN order_items ON orders.id = order_items.order_id
JOIN products ON order_items.product_id = products.id
WHERE orders.created_at > NOW() - INTERVAL '30 days';
\`\`\`

### 2. ACID Compliance is Critical

For financial applications, inventory management, or anywhere data integrity is paramount, PostgreSQL's ACID guarantees are essential.

### 3. Advanced Querying

PostgreSQL's support for window functions, CTEs, and full-text search makes complex analytics queries possible without additional tools.

## Real-World Scenarios

### E-commerce Platform
**Choice**: PostgreSQL  
**Reason**: Orders, inventory, and payments require ACID compliance

### Content Management System
**Choice**: MongoDB  
**Reason**: Flexible content types with varying fields

### Analytics Dashboard
**Choice**: PostgreSQL  
**Reason**: Complex aggregations and time-series queries

### Real-time Chat Application
**Choice**: MongoDB  
**Reason**: High write throughput, flexible message schemas

## The Hybrid Approach

Sometimes the answer is "both." In our latest project, we use:
- PostgreSQL for user accounts, orders, and payments
- MongoDB for activity logs, user-generated content, and analytics events

## Conclusion

There's no universal winner. The best database is the one that fits your specific use case. Consider:

1. Your data structure and relationships
2. Consistency requirements
3. Scaling needs
4. Team expertise
5. Ecosystem and tooling

Both databases are excellent choices—the key is matching their strengths to your needs.
    `
  },
  {
    id: 3,
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics",
    date: "Dec 20, 2023",
    category: "TypeScript",
    readTime: "10 min read",
    excerpt: "Deep dive into TypeScript generics with practical examples. From basic usage to advanced patterns like conditional types.",
    tags: ["TypeScript", "JavaScript", "Types"],
    featured: false,
    gradient: "from-green-500/20 to-emerald-500/20",
    content: `
## Why Generics Matter

Generics are one of TypeScript's most powerful features, enabling you to write flexible, reusable code while maintaining type safety.

## Basic Generics

Let's start with a simple example:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

const num = identity(42);        // type: number
const str = identity("hello");   // type: string
\`\`\`

The \`<T>\` is a type parameter that gets inferred from usage.

## Generic Interfaces

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: string;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: "1", name: "John" },
  status: 200,
  message: "Success"
};
\`\`\`

## Generic Constraints

Sometimes you need to constrain what types can be used:

\`\`\`typescript
interface HasId {
  id: string;
}

function findById<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}
\`\`\`

## Multiple Type Parameters

\`\`\`typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const result = merge({ name: "John" }, { age: 30 });
// type: { name: string } & { age: number }
\`\`\`

## Conditional Types

This is where things get interesting:

\`\`\`typescript
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>;  // true
type Test2 = IsArray<number>;    // false
\`\`\`

## Practical Example: Type-Safe API Client

\`\`\`typescript
type ApiEndpoints = {
  "/users": { response: User[]; params: { limit?: number } };
  "/users/:id": { response: User; params: { id: string } };
  "/posts": { response: Post[]; params: { userId?: string } };
};

async function apiCall<E extends keyof ApiEndpoints>(
  endpoint: E,
  params: ApiEndpoints[E]["params"]
): Promise<ApiEndpoints[E]["response"]> {
  // Implementation
}

// Fully type-safe!
const users = await apiCall("/users", { limit: 10 });
const user = await apiCall("/users/:id", { id: "123" });
\`\`\`

## Mapped Types with Generics

\`\`\`typescript
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  name: string;
  email: string;
}

type NullableUser = Nullable<User>;
// { name: string | null; email: string | null }
\`\`\`

## Key Takeaways

1. Start simple—basic generics solve most problems
2. Use constraints to narrow down acceptable types
3. Conditional types unlock advanced patterns
4. Mapped types + generics = powerful transformations
5. Don't over-engineer—use generics when you need flexibility

Generics might seem complex at first, but once you understand them, they become an essential tool for writing robust TypeScript code.
    `
  },
  {
    id: 4,
    slug: "optimizing-nodejs-api-performance",
    title: "Optimizing Node.js API Performance",
    date: "Dec 10, 2023",
    category: "Backend",
    readTime: "7 min read",
    excerpt: "Techniques that helped reduce our API response time by 60%. Covering caching strategies and async patterns.",
    tags: ["Node.js", "Performance", "API"],
    featured: false,
    gradient: "from-orange-500/20 to-yellow-500/20",
    content: `
## The Performance Challenge

Our API was struggling with response times averaging 800ms. After optimization, we brought this down to 300ms. Here's how.

## 1. Database Query Optimization

### Use Indexes Wisely

\`\`\`javascript
// Before: Full table scan
db.users.find({ email: "user@example.com" });

// After: Create an index
db.users.createIndex({ email: 1 });
\`\`\`

### Select Only What You Need

\`\`\`javascript
// Bad: Fetching entire documents
const users = await User.find({});

// Good: Projection
const users = await User.find({}, { name: 1, email: 1 });
\`\`\`

## 2. Implement Caching

We used Redis for multi-level caching:

\`\`\`javascript
const Redis = require('ioredis');
const redis = new Redis();

async function getUserWithCache(userId) {
  const cacheKey = \`user:\${userId}\`;
  
  // Check cache first
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached);
  
  // Fetch from DB
  const user = await User.findById(userId);
  
  // Cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(user));
  
  return user;
}
\`\`\`

## 3. Parallelize Independent Operations

\`\`\`javascript
// Bad: Sequential
const user = await getUser(id);
const posts = await getPosts(id);
const notifications = await getNotifications(id);

// Good: Parallel
const [user, posts, notifications] = await Promise.all([
  getUser(id),
  getPosts(id),
  getNotifications(id)
]);
\`\`\`

## 4. Implement Connection Pooling

\`\`\`javascript
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
\`\`\`

## 5. Use Compression

\`\`\`javascript
const compression = require('compression');
app.use(compression());
\`\`\`

## 6. Implement Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

## Results

| Metric | Before | After |
|--------|--------|-------|
| Avg Response Time | 800ms | 300ms |
| P95 Latency | 2s | 500ms |
| Throughput | 500 req/s | 2000 req/s |

## Key Lessons

1. **Measure first**: Use APM tools to identify actual bottlenecks
2. **Cache aggressively**: But invalidate correctly
3. **Think parallel**: Most operations can run concurrently
4. **Monitor continuously**: Performance degrades over time without attention

Performance optimization is iterative. Start with the biggest wins and work your way down.
    `
  },
  {
    id: 5,
    slug: "docker-for-frontend-developers",
    title: "Docker for Frontend Developers",
    date: "Nov 28, 2023",
    category: "DevOps",
    readTime: "5 min read",
    excerpt: "A beginner-friendly guide to containerizing React applications. Setting up development environments that work everywhere.",
    tags: ["Docker", "DevOps", "React"],
    featured: false,
    gradient: "from-red-500/20 to-rose-500/20",
    content: `
## Why Docker?

"It works on my machine" is a phrase that Docker eliminates. As a frontend developer, Docker helps you:

- Ensure consistent environments across teams
- Simplify onboarding for new developers
- Match development and production environments

## Your First Dockerfile

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
\`\`\`

## Docker Compose for Development

\`\`\`yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: npm run dev
\`\`\`

## Essential Commands

\`\`\`bash
# Build image
docker build -t my-app .

# Run container
docker run -p 3000:3000 my-app

# Start with compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down
\`\`\`

## Hot Reloading in Docker

For Vite projects, update your config:

\`\`\`javascript
// vite.config.js
export default defineConfig({
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true
    }
  }
});
\`\`\`

## Multi-Environment Setup

\`\`\`yaml
# docker-compose.override.yml (development)
services:
  app:
    environment:
      - VITE_API_URL=http://localhost:4000

# docker-compose.prod.yml
services:
  app:
    environment:
      - VITE_API_URL=https://api.example.com
\`\`\`

## Optimizing Image Size

\`\`\`dockerfile
# Use multi-stage builds
# Use alpine images
# Add .dockerignore

# .dockerignore
node_modules
.git
*.md
.env*
\`\`\`

## Tips for Frontend Devs

1. **Use .dockerignore**: Don't copy node_modules
2. **Multi-stage builds**: Keep production images small
3. **Use volumes**: For hot reloading in development
4. **Layer caching**: Put package.json COPY before code COPY

Docker might seem like overkill for frontend, but once you experience consistent environments and easy deployments, there's no going back.
    `
  }
];

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

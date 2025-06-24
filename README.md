## Tech Stack

- React 18 + TypeScript
- Axios for API calls
- React Router DOM
- Bootstrap (optional styling)

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run dev
```

The app will be available at:(http://localhost:5173)

> Make sure the Spring Boot backend is running at `http://localhost:8080`.

---

## API Configuration

All API calls are made through `axios` using a base URL:

```ts
const API_URL = "http://localhost:8080";
```

---

## Features

- List all products and users
- View product/user details
- Edit product/user (except immutable fields like ID, createdAt)
- Delete product/user with confirmation
- Filter/search by name or category
- Responsive table layout with Bootstrap

---

## Scripts

| Script          | Description                   |
| --------------- | ----------------------------- |
| `npm install`   | Install dependencies          |
| `npm run dev`   | Run development server (Vite) |
| `npm run build` | Build for production          |

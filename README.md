# Elegant - An E-commerce Application built in Next.js 14 (2024)

## Tech Stack
- Next.js 14
- Stripe (Payment processing)
- Resend (Email delivery)
- Tailwind CSS (Utility-first CSS framework) or Shaden-UI (Component library) (whichever is used)
- TypeScript (Static typing)
- Zod (Schema validation)
- Prisma (ORM for interacting with Postgres database)

## Features
### Admin Dashboard

- Dashboard (Overview): Visually appealing charts and statistics providing insights into key metrics like orders, sales, and user activity.
- Orders Page: CRUD operations for managing orders, including order details, and customer information.
- Products Page: CRUD operations for managing products, including adding, editing, deleting, and managing product information (images, descriptions, prices, categories, etc.).
- Coupons Page: CRUD operations for managing coupons, including creating, editing, deleting, assigning coupons to specific products, and setting expiration dates.
- Sales Page: Comprehensive view of sales data, potentially including detailed reports, filters, and visualizations.

### Customer Interface

- Product Browsing: Intuitive navigation and product categorization to help customers find what they're looking for.
- Filtering by Categories: Streamline browsing with well-defined categories that match your product catalog.
- Search Functionality: Robust product search by name, category, or other relevant attributes for efficient product discovery.
- Product Details: Informative product pages with clear descriptions, images, pricing, and potentially reviews/ratings.
- Checkout Process: Secure and user-friendly checkout flow with Stripe integration.
- Order Confirmation and Email Receipt: Timely order confirmation and a detailed email receipt sent via Resend upon purchase.
- Order History: Allow customers to access their order history by entering their email address for tracking and managing past purchases (potentially leveraging SSAs to fetch order data based on the customer's email).

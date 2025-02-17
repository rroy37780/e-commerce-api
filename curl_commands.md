```bash
# Ensure your server is running on port 3000 before executing these commands

# User POST Requests

# Create user 1
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'

# Create user 2
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Jane Smith", "email": "jane@example.com", "password": "password123"}'

# Create user 3
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Alice Johnson", "email": "alice@example.com", "password": "password123"}'

# Create user 4
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Bob Brown", "email": "bob@example.com", "password": "password123"}'

# Create user 5
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "Charlie Davis", "email": "charlie@example.com", "password": "password123"}'

# User CRUD Operations

# Create user
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'

# Get all users
curl -X GET http://localhost:3000/users

# Get user by ID
curl -X GET http://localhost:3000/users/{userId}

# Update user by ID
curl -X PUT http://localhost:3000/users/{userId} -H "Content-Type: application/json" -d '{"name": "John Doe Updated", "email": "john_updated@example.com", "password": "newpassword123"}'
 
# Patch user by ID
curl -X PATCH http://localhost:3000/users/{userId} -H "Content-Type: application/json" -d '{"name": "John Doe Patched"}'

# Delete user by ID
curl -X DELETE http://localhost:3000/users/{userId}

# Product POST Requests

# Create product 1
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "Product A", "price": 100, "stock": 50}'

# Create product 2
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "Product B", "price": 200, "stock": 30}'

# Create product 3
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "Product C", "price": 150, "stock": 20}'

# Create product 4
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "Product D", "price": 250, "stock": 10}'

# Create product 5
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "Product E", "price": 300, "stock": 5}'

# Product CRUD Operations

# Create product
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name": "Product A", "price": 100, "stock": 50}'

# Get all products
curl -X GET http://localhost:3000/products

# Get product by ID
curl -X GET http://localhost:3000/products/{productId}

# Update product by ID
curl -X PUT http://localhost:3000/products/{productId} -H "Content-Type: application/json" -d '{"name": "Product A Updated", "price": 150, "stock": 40}'

# Patch product by ID
curl -X PATCH http://localhost:3000/products/{productId} -H "Content-Type: application/json" -d '{"price": 120}'

# Delete product by ID
curl -X DELETE http://localhost:3000/products/{productId}

# Order POST Requests

# Create order 1
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"userId": "{userId1}", "productId": "{productId1}", "quantity": 2}'

# Create order 2
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"userId": "{userId2}", "productId": "{productId2}", "quantity": 1}'

# Create order 3
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"userId": "{userId3}", "productId": "{productId3}", "quantity": 3}'

# Create order 4
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"userId": "{userId4}", "productId": "{productId4}", "quantity": 4}'

# Create order 5
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"userId": "{userId5}", "productId": "{productId5}", "quantity": 5}'

# Order CRUD Operations

# Create order
curl -X POST http://localhost:3000/orders -H "Content-Type: application/json" -d '{"userId": "{userId}", "productId": "{productId}", "quantity": 2}'

# Get all orders
curl -X GET http://localhost:3000/orders

# Get order by ID
curl -X GET http://localhost:3000/orders/{orderId}

# Update order by ID
curl -X PUT http://localhost:3000/orders/{orderId} -H "Content-Type: application/json" -d '{"userId": "{userId}", "productId": "{productId}", "quantity": 3}'

# Patch order by ID
curl -X PATCH http://localhost:3000/orders/{orderId} -H "Content-Type: application/json" -d '{"quantity": 4}'

# Delete order by ID
curl -X DELETE http://localhost:3000/orders/{orderId}

# Analytics Requests

# Get top N products by selling
curl -X GET http://localhost:3000/analytics/top-products?limit=5

# Get top N customers by spending
curl -X GET http://localhost:3000/analytics/top-customers?limit=5

# Get total revenue from all orders
curl -X GET http://localhost:3000/analytics/revenue

# Get average order value
curl -X GET http://localhost:3000/analytics/average-order-value

# Get customer lifetime value for a user
curl -X GET http://localhost:3000/analytics/customer-ltv/{user_id}
```

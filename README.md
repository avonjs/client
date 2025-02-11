## `Gate` SDK Methods

### `async can(user: User, ability: string): Promise<boolean>`

Checks if a decoded JWT user has a specific ability.

- **Parameters**:
  - `user`: The decoded JWT object representing the user.
  - `ability`: The specific permission to check (e.g., `blog.articles.create`).

- **Returns**: A boolean indicating whether the user has the specified ability.

---

### `async any(user: User, abilities: string[]): Promise<boolean>`

Checks if the decoded JWT user has at least one of the specified abilities.

- **Parameters**:
  - `user`: The decoded JWT object.
  - `abilities`: Array of abilities to check.

- **Returns**: `true` if the user has any of the abilities, `false` otherwise.

---

### `async every(user: User, abilities: string[]): Promise<boolean>`

Checks if the decoded JWT user has all of the specified abilities.

- **Parameters**:
  - `user`: The decoded JWT object.
  - `abilities`: Array of abilities to check.

- **Returns**: `true` if the user has all specified abilities, `false` otherwise.

---

### `async forUser(user: User): Promise<PermissionCollection>`

Fetches all permissions for the decoded JWT user and returns them as a `PermissionCollection` object.

- **Parameters**:
  - `user`: The decoded JWT object.

- **Returns**: A `PermissionCollection` instance.

---

### `async share(user: User, permissions: string[], ttl: number)`

Stores permissions for a decoded JWT user in Redis with a time-to-live (TTL).

- **Parameters**:
  - `user`: The decoded JWT object.
  - `permissions`: Array of permissions to store.
  - `ttl`: Expiry time for the permissions in seconds.

- **Returns**: The `Gate` instance for method chaining.

---

### `async authorize(user: User, permissions: string[], ttl: number)`

Alias for `share`. Adds permissions for a decoded JWT user with a specified TTL.

---

### `async forget(user: User)`

Deletes all cached permissions for the decoded JWT user from Redis.

- **Parameters**:
  - `user`: The decoded JWT object.

- **Returns**: The `Gate` instance for method chaining.

---

### `async refresh(user: User, permissions: string[])`

Updates the permissions for a decoded JWT user, preserving existing TTLs for the cached data.

- **Parameters**:
  - `user`: The decoded JWT object.
  - `permissions`: New set of permissions to update.

- **Returns**: The `Gate` instance for method chaining.

---

### `async all(user: User): Promise<string[]>`

Retrieves all permissions for a decoded JWT user from Redis as an array of strings.

- **Parameters**:
  - `user`: The decoded JWT object.

- **Returns**: Array of permissions associated with the user.

---

### `async isRevoked(user: User): Promise<boolean>`

Checks if the decoded JWT user has no active permissions.

- **Parameters**:
  - `user`: The decoded JWT object.

- **Returns**: `true` if the user has no permissions, `false` otherwise.

---

### `debugUsing(debugUsing: Debugger)`

Sets a custom debugger function for logging.

- **Parameters**:
  - `debugUsing`: The custom debug function to use.

- **Returns**: The `Gate` instance for method chaining.

---

### Example Usage

Install the SDK:

```
npm i @del-internet/sdk-radius
```
Then: 

```typescript
import Gate from '@del-internet/sdk-radius';

const config = { host: 'localhost', port: 6379 };
const gate = new Gate(config);

async function checkUserPermissions() {
  const user = { id: 'user123', key: 'user:permissions:user123' }; // Decoded JWT object
  const permissions = ['blog.articles.create', 'blog.articles.update'];

  await gate.share(user, permissions, 3600); // Cache permissions for 1 hour

  const canCreate = await gate.can(user, 'blog.articles.create');
  console.log(`User can create: ${canCreate}`);
}

checkUserPermissions();
```

This documentation assumes the user parameter represents a decoded JWT object containing relevant details such as `id` and `key`.

Title: Optimistic Concurrency for Bookings

Context: We must prevent double-booking of inventory units (seats, rooms). Pessimistic locking (locking a row before updating) can cause bottlenecks.

Decision: We will use an optimistic concurrency control strategy. Each inventory item will have a version number. The update operation will atomically check and increment this version. If the version has changed since we read it, the transaction fails, and the user must retry.

Consequences: High performance for non-contentious updates. Requires client-side logic to handle 409 Conflict responses.


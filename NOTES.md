# Decisions

- Leveraged Redux to keep track of Read/Unread messages.
- Count of unread meessages are shows on the sidebar as a red circled number
  - if there are no unread messages, no number will be shown
- Unread messages are bolded, until marked read.

# What I would do differently if I had more time.

- Attempt to mimic a live server environment. Instead of using Redux to keep track of read/unread messages. Create a mock POST request that will mark when messages are read/unread. This will have the incoming data be the only source of truth.
- Notifications can be just a dropdown panel in the header, and clicking notifications can open a webpage of full details on the notfication
- Complete the following pages of routes
  - `/patients`
  - `/orders`
  - `/settings`

# Things I didnt get to

- A `mark all notifications as read` button.
- Caching the read/unread messages to localstorage.
  - check local storage before fetching for new data.
  - so when users refresh page, their notifications that are `read` will stay `read`

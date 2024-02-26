# Breadit


## About our Breadit app:
    Our app allows users to view and create 'Subbreadits', 'Toasts', and 'Comments', it also allows users to 'Subscribe' to a Subbreddit if they wish to curate their home feed. It implements a search feature that allows the user to search through the available Subbreadits.

Site: https://breadit-qg9l.onrender.com

Database Schema: https://github.com/jjlazo/breadit/wiki/Database-Schema

Features List: https://github.com/jjlazo/breadit/wiki/Features-List

## Technologies Used:
    This project uses flask as the backend, react and redux for the frontend rendering and data. Data is stored in a postgres database, and the backend interfaces with it through sqlalchemy. Authentication is handled with a csrf token, so once users sign in, they can remain signed in until that auth expires.

## Features

### Subbreadits
Individual users can peruse, search and create Subbreadits. When a user creates a subbreadit they will be assigned moderator and given the ability to delete posts and comments that belong to their subbreadit.

### Toasts
 Users can create a toast on a subbreadit. Users can read all toasts, toasts of a specific subbreadit, a single toast, toasts made by a specific user, and their own toasts. They can edit and delete their own toasts, which will indicate that it has been edited with an 'Edited' tag. They can also delete posts on subbreadits of which they are the moderator.

### Comments
Users can read and create comments on toasts. They can edit and delete their own comments, which will indicate that it has been edited with an 'Edited' tag. They can also delete comments on subbreadits of which they are the moderator.

### Subscriptions
Users can curate their experience by subscribing or unsubscribing from subbreadits.

## Future Features

### Up-Votes/Down-Votes
Users will be able to up-vote or down-vote a toast, allowing them another manner in which to give the original toaster feedback.

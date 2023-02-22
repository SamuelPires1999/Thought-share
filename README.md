## Thought share

Thought share is a basic "twitter-like" forum where the user can make a post and recieve comments, as well as make comments on other people posts.

Everything here is very basic (and probably a mess) in terms of code, I used this project to try out the
new NextJS App directory as well as experimental server components by default.

In the future I may improve the UI with some fancy animations, and I look to keep this updated with some
other best practices that I've been learning with my studies.

## Making it run

To run this project you will need two major things.

- A google OAuth credential, wich you will need to create using the [google api console](https://console.developers.google.com/apis/credentials).
- A postgres database, you can run this on Supabase, railway or even locally, it doesnt matter.

Just create a dot env file, and paste the credentials following the ".env.example" file.

After that you can use `npx prisma migrate dev` and now your database should be synced with the correct data types, and your prisma client generated.

If everything goes well, you will be able to run `npm run dev` and check localhost:3000 to see your application running.

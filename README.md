# Campstone_goodbank - Virtual Bank simulation


This project is a simulation of a virtual bank that allows users to perform basic operations such as logging in, depositing money, withdrawing money, and transferring funds between users. It uses technologies such as Next.js, React, Tailwind CSS, Clerk for authentication, TypeScript, and Firestore.

## Key Features

- **Login:** Users can securely log in using Clerk as the authentication provider.

- **Deposit and Withdrawal:** Users can perform transactions to deposit and withdraw funds from their accounts.

- **Fund Transfer:** The platform enables users to transfer money between accounts.

## Technologies Used

- **Next.js:** React framework for web development.

- **React:** JavaScript library for building user interfaces.

- **TypeScript:** Superset of JavaScript that adds static typing.

- **Tailwind CSS:** CSS framework usable with any web development framework.

- **Clerk:** Authentication provider for a secure login implementation.

- **Firestore:** Database used to store user information, balances, and transactions.

## Project Setup

1. Clone this repository.
2. Install dependencies using the command: `npm install`.
3. Start the project with: `npm run dev`.

## Deployment with Vercel

This project is deployed using Vercel, a platform that offers seamless deployment for frontend applications. Some advantages of using Vercel include:

- **Easy Configuration:** Vercel simplifies the deployment process with straightforward configuration options.

- **Automatic Deployments:** Connect your GitHub repository to Vercel, and it will automatically deploy changes on every push.

- **Serverless Functions:** Easily integrate serverless functions to enhance your application's functionality.

## Access to Firestore

This project makes direct requests to Firestore from the client side to retrieve relevant user information such as name, balance, and transactions. It is important to note that this omits certain security layers, and it is recommended to implement back-end development to ensure the validation of data and transactions in future versions.

## Future Development

There are plans to implement back-end development to enhance security and validate transaction data. This will ensure a more secure and reliable handling of information.

## Contribution

If you want to contribute to this project, we are open to collaborations! Feel free to send pull requests and report issues.

## License

This project is under the [MIT license](LICENSE).

---
© [Project Name]

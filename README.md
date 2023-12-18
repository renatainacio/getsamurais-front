# Get Samurais
"Get Samurais" is a REST API designed for connecting service providers to service users. This application enables users to register, query and update services.

# Demo
Try it out at this [link](https://getsamurais-front-renatainacio.vercel.app/)!

# How it works
This project is the front-end of the application. To check the back-end, please refer to [link](https://github.com/renatainacio/getsamurais-api)

## Features
- Sign up / Sign in
- Register a service
- List all services
- Search for a service by name
- Filter services by category

# Technologies

- Javascript
- React (v.18.2.0);
- Vite;
- Styled-Components;
- Axios;

# How to run it for development
To run this project in a development mode, follow these steps:

1. Clone this repository
2. Install all dependencies

    ```bash
    npm i
    ```
3. Populate `.env` file based on `.env.example`. `VITE_API_URL` should point to the API.
4. Run in the terminal:
    ```bash
    npm run dev
    ```
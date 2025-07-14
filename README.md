GitHub repository: https://github.com/sbraende/stride-labs


# Stride Labs – AI-Powered Shoe Shop

**Stride Labs** is an AI-enhanced online shoe store built with React and Vite. It helps users discover the perfect shoe based on their preferences using natural language search powered by a language model.

This is a final project for the Frontend Development course at Kristiania.

**Live Site:** [https://sbraende-stridelabs.netlify.app](https://sbraende-stridelabs.netlify.app)

![Screenshot of site](/client/public/screenshots/stride-labs.png)

## Features

- **AI-Powered Search**: Users can type natural queries like _“Running shoes for mountains”_ and receive intelligent product recommendations.
- **Authentication**: Users must be signed in to access certain features.
- **Form Validation**: Input forms are validated to ensure clean and usable data.
- **API Integration**: Integrates a language model API to power smart search.
- **Firestore Database**: Product data is fetched and managed via Firebase Firestore.
- **Responsive Design**: Optimized for both desktop and mobile experiences.
- **Routing**: Uses React Router for seamless navigation.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/sbraende/stride-labs
```

2. Navigate into the project folder:

```bash
cd stride-labs
```

3. Install dependencies:

```bash
npm install
```

4. Start the local development server:

```bash
npm run dev
```

## Figma Prototype

You can view the project prototype here: [Figma Link](https://www.figma.com/design/zBhvJqTttTMZMjZFvxUFj8/Shoe-shop?m=auto&t=EoYNkw1mV8lEOkIL-1)

## Resources

### Design Inspiration

- [https://www.salomon.com/](https://www.salomon.com/)
- [https://fynd.no/](https://fynd.no/)
- [https://www.norrona.com/](https://www.norrona.com/)
- [https://hyroxshop.de/](https://hyroxshop.de/)

## Acknowledgements

### Images

- [https://www.salomon.com/](https://www.salomon.com/) - Product images
- [https://unsplash.com/](https://unsplash.com/) - Banner images
- [https://iconoir.com/](https://iconoir.com/) - Icons

### AI Assistance – ChatGPT

- Helped set up redirecting from the Search component to the SearchResults page, including how to use `encodeURIComponent` and `URLSearchParams`.
- Debug the `pure function` error I got with using localStorage in cartReducer.
- Assisted with structure for MyAccount components and nested routing.
- Extra VerifyEmail RouteGuard logic.
- Debug findVarientDetails.js.
- `_redirects` file for handelig file-based routes on Netlify.
- Initial draft of `README.md`.

### Frontend at Høyskolen Kristiania

- Some of the programming patterns and sections of the code have been inspired by the Frontend course at Høyskolen Kristiania.

## License

This project is licensed under the [MIT License](./LICENSE). You’re free to use, modify, and distribute this project under its terms.

## Assigment notes

- Reza has approved Gemini as external API.

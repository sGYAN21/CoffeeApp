☕ Coffee Paglu
A premium, modern React Native application designed for coffee lovers. This app provides a seamless experience for browsing specialty coffee, managing a personal favorites list, and secure authentication through Firebase.

🚀 Features
🔐 Firebase Authentication: Secure Email & Password Login and User Registration flows.

☕ Premium Coffee Catalog: Browse specialized coffee types like Espresso, Latte, and Cappuccino with high-quality imagery.

🛒 Interactive Cart: Real-time volume selection (e.g., 100ml) and price calculation for orders.

❤️ Favorites System: Save your preferred brews to a dedicated favorites list for quick access.

🔍 Smart Search: Easily filter through the coffee menu to find exactly what you're looking for.

📱 Modern UI: Sleek, coffee-themed aesthetic with a custom "scooped" header design and smooth transitions.

🔄 Real-time Data: User sessions and preferences are securely maintained via the Firebase SDK.

🛠️ Tech Stack
Framework: React Native (CLI)

Language: TypeScript / JavaScript

Backend: Firebase Authentication & Firestore

Navigation: React Navigation (Native Stack & Bottom Tabs)

Icons: React Native Vector Icons (Ionicons & MaterialCommunity)

Styling: React Native StyleSheet with custom theme variables

🔐 Authentication Flow
Users can create a new account or sign in to an existing one using Firebase Auth.

Input validation ensures email formats and password strengths are met.

Navigation logic automatically directs authenticated users to the Home dashboard while redirecting unauthenticated users to the Login screen.

📸 App Screenshots
All screenshots are stored in the Screenshots/ directory.

Authentication
<p align="center"> <img src="screenshots/sigin.png" width="30%" alt="Sign In Screen" /> <img src="screenshots/signup.png" width="30%" alt="Sign Up Screen" /> </p>

Home & Menu
<p align="center"> <img src="screenshots/HomePage.png" width="30%" alt="Coffee Dashboard" /> <img src="screenshots/DetalilPage.png" width="30%" alt="Coffee Details" /> </p>
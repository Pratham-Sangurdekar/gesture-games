# Gesture Games 🎮⚡

A revolutionary mobile gaming platform where users control games entirely through hand gestures captured by their device camera - no screen taps needed!

## 🌟 Features

### Onboarding Experience
- **Welcome Screen**: Introduces the app concept
- **Camera Permission**: Requests and explains camera access
- **Gesture Tutorial**: Interactive 3-page tutorial teaching gestures (Point, Pinch, Swipe, Draw)
- **Practice Mode**: Live camera practice with gesture detection

### Games Dashboard
- 8 game slots with gesture-based navigation
- **Air Pictionary** (Playable): Draw in the air, AI guesses your drawing
- 7 additional games (Coming Soon): Target Tap, Beat Master, Puzzle Swipe, and more

### Air Pictionary Game
- **VS AI Mode**: Draw words in the air using hand gestures
- Real-time AI guessing powered by OpenAI
- 2-minute rounds with 20 simple words
- Success/timeout results screen

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **Camera**: Expo Camera
- **Drawing**: React Native SVG
- **Storage**: AsyncStorage
- **Gesture Recognition**: MediaPipe Hands (structure in place)
- **AI**: OpenAI GPT-4 Vision API (with mock fallback)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Physical device for camera testing (recommended)

## 🚀 Getting Started

### 1. Clone and Install

```bash
cd gesture-games
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key (optional):

```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

**Note**: The app works without an API key using mock AI guessing. For real AI recognition, get an API key from [OpenAI Platform](https://platform.openai.com/api-keys).

### 3. Run the App

```bash
# Start the development server
npx expo start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Scan QR code with Expo Go app (physical device)
```

### 4. Testing on Physical Device (Recommended)

For the best experience with camera and gesture tracking:

1. Install **Expo Go** app on your iOS or Android device
2. Run `npx expo start`
3. Scan the QR code with your device
4. Grant camera permissions when prompted

## 📁 Project Structure

```
gesture-games/
├── App.tsx                          # Root component with navigation
├── app.json                         # Expo configuration
├── src/
│   ├── screens/                     # All screen components
│   │   ├── WelcomeScreen.tsx
│   │   ├── CameraPermissionScreen.tsx
│   │   ├── GestureTutorialScreen.tsx
│   │   ├── InteractivePracticeScreen.tsx
│   │   ├── GamesDashboardScreen.tsx
│   │   └── pictionary/
│   │       ├── ModeSelectionScreen.tsx
│   │       ├── GameplayScreen.tsx
│   │       └── ResultsScreen.tsx
│   ├── components/                  # Reusable components
│   │   ├── GameCard.tsx
│   │   ├── Toast.tsx
│   │   └── VirtualCursor.tsx
│   ├── services/                    # Business logic
│   │   ├── storageService.ts
│   │   ├── gestureService.ts
│   │   ├── cameraService.ts
│   │   ├── wordService.ts
│   │   └── aiService.ts
│   ├── types/                       # TypeScript definitions
│   ├── theme/                       # Design system
│   ├── data/                        # Static data (word bank)
│   └── utils/                       # Helper functions
└── assets/                          # Images and icons
```

## 🎮 How to Play

### Onboarding (First Launch)
1. Tap "GET STARTED" on welcome screen
2. Grant camera permission
3. Learn the gestures (Point, Pinch, Swipe, Draw)
4. Practice gestures with live feedback

### Playing Air Pictionary
1. From Dashboard, select "AIR PICTIONARY" (featured card)
2. Choose "VS AI" mode
3. See your word prompt (e.g., "🍎 APPLE")
4. Draw in the air by touching and moving on the canvas
5. Watch AI guesses appear in real-time
6. Win when AI correctly guesses your word!

## 🔧 Development Notes

### Gesture Recognition
The current implementation includes the structure for MediaPipe Hands gesture recognition. For production:
- MediaPipe Hands integration requires platform-specific setup
- Consider using `react-native-mediapipe` or TensorFlow Lite
- Current gesture detection is simulated/mock for development

### AI Integration
- **With API Key**: Uses OpenAI GPT-4 Vision for real image recognition
- **Without API Key**: Uses mock AI that simulates guessing (correct after 5-7 attempts)
- Rate limited to 1 request per second

### Camera Permissions
- iOS: Camera usage description in `app.json`
- Android: CAMERA permission declared
- Users must grant permission to proceed past onboarding

## 🎨 Design System

### Colors
- Background: `#333333` (dark gray)
- Cards: `#1a1a1a` (darker gray)
- Borders: `#666`, `#999` (gray shades)
- Text: White primary, gray secondary
- Accents: Green for success, red for errors

### Theme
- **Neon & Energetic Gaming** aesthetic
- Dark mode only
- High contrast for visibility
- Bold typography
- Portrait orientation

## 📱 Platform Support

### iOS
- iOS 13.0 or higher
- iPhone only (tablet not supported)
- Camera permission required

### Android
- Android 6.0 (API 23) or higher
- Phone optimized
- Camera permission required

## 🐛 Known Limitations

- MediaPipe Hands requires additional native modules for production
- Gesture tracking less accurate in poor lighting
- AI guessing uses mock mode without API key
- Drawing uses touch input (gesture drawing structure in place)
- Single player only (multiplayer coming soon)

## 🚧 Future Enhancements

- [ ] Production MediaPipe Hands integration
- [ ] Real gesture-based drawing (no touch)
- [ ] Private Room multiplayer mode
- [ ] Additional games (7 more slots)
- [ ] Difficulty levels
- [ ] User profiles and statistics
- [ ] Leaderboards
- [ ] Custom word lists
- [ ] Sound effects and haptic feedback

## 📄 License

This project is created for educational and demonstration purposes.

## 🤝 Contributing

This is a showcase project. Feel free to fork and experiment!

## 📞 Support

For issues or questions:
- Check camera permissions are granted
- Ensure running on physical device for camera features
- Review console logs for errors
- Test with Expo Go app for best results

## 🎯 Quick Start Checklist

- [ ] Node.js installed
- [ ] `npm install` completed
- [ ] `.env` file created (optional for AI)
- [ ] Physical device ready (for camera testing)
- [ ] Expo Go app installed on device
- [ ] Camera permissions granted
- [ ] QR code scanned and app running

---

**Built with ⚡ by following best practices in React Native, TypeScript, and mobile UX design.**

Enjoy playing Gesture Games! 🎮


# 📍 GooglePlacesApp

A React Native app built with **Expo**, **Google Maps**, and **Places API**.

This project allows users to:
- 🔍 Search locations using Google Places Autocomplete
- 🗺️ Display selected locations on a map
- 🕓 Maintain a local history of searched places
- 📱 Persist history using AsyncStorage
- ♻️ Revisit places from history and refocus the map

---

## 📦 Tech Stack

- React Native + Expo
- Google Maps SDK (native)
- Google Places API
- AsyncStorage
- TypeScript

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rishiankush/google-places-react-native-assignment.git
cd GooglePlacesApp
```

### 2. Install Dependencies

```bash
npm install
```
---

## 🔐 Configuration

### 3. Create `.env` file

Create a `.env` file in the root with:

```env
GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

Ensure your key has:
- ✅ Maps SDK for iOS/Android
- ✅ Places API

---

## 📱 iOS Setup with Google Maps SDK

> ⚠️ This project uses **custom native code** and requires a development build using EAS.

### Step 1: Install CocoaPods

```bash
cd ios
pod install
cd ..
```

### Step 2: Manual Podfile Change (Important)

After running `expo prebuild`, manually edit `ios/Podfile`:

```ruby
# react-native-maps support for Google Maps
rn_maps_path = File.dirname(`node --print "require.resolve('react-native-maps/package.json')"`)
pod 'react-native-maps/Google', :path => rn_maps_path
```

> 🛑 Do **not** run `npx expo prebuild` again after this, or your changes will be lost.

---

## 🔨 Build Dev Client (EAS)

Install EAS CLI:

```bash
npm install -g eas-cli
```

Configure and build:

```bash
eas build:configure

eas build --platform ios --profile development
eas build --platform android --profile development
```

After build completes:
- 📲 Install it on your simulator or real device
- ✅ This enables native modules like `react-native-maps`

---

## ▶️ Run Locally

You can run the app via **Expo Dev Client**, **Xcode**, or **Android Studio**:

---

### ✅ Option 1: Expo Dev Client

```bash
npx expo start --dev-client
```

Then open the app on your **device or simulator** that has the dev build installed.

---

### 🧪 Option 2: iOS via Xcode (Simulator or Device)

1. Make sure you've run:

   ```bash
   cd ios && pod install && cd ..
   ```

2. Open `ios/GooglePlacesApp.xcworkspace` in Xcode:

   ```bash
   open ios/GooglePlacesApp.xcworkspace
   ```

3. Select a target (Simulator or real device)

4. Press ▶️ Run

> 💡 Make sure your API keys and provisioning are correctly configured.

---

### 🤖 Option 3: Android via Android Studio

1. Open the project in Android Studio

2. Let it sync gradle + build

3. Run on an emulator or connected Android device

---

> ✅ All options assume you've done `npm install` and built dev clients (if needed).

---

## ✅ Android Notes

For Android, make sure:
- You are using a dev client build (`eas build --platform android`)
- Your API key is added to `app.json > android > config.googleMaps.apiKey`

---

## 📂 Project Structure

```
app/
├── screens/
│   └── HomeScreen.tsx         # Main screen with map and search
├── components/
│   ├── SearchBar.tsx          # Autocomplete input
│   └── SearchHistory.tsx      # AsyncStorage-based history
├── utils/
│   └── storage.ts             # Helper for storing/searching places
├── types/
│   └── Place.ts               # Type definitions
```

---

## 📌 Key Features

| Feature                    | Implementation                       |
|---------------------------|---------------------------------------|
| Google Places Autocomplete| Google Places API via axios          |
| Interactive Map           | `react-native-maps` native SDK       |
| History Persistence       | `@react-native-async-storage/async-storage` |
| Cross-platform            | iOS & Android support via Expo Dev Client |
| Native Maps               | Full SDK support (not web fallback)  |

---

## 🧹 Known Caveats

- Re-running `expo prebuild` will **wipe manual Podfile changes**

---

## 📮 Contact / Issues

Feel free to open an issue or reach out via GitHub or email: ankushrishi5@gmail.com if you encounter any problems!

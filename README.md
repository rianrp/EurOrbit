# EurOrbit - European Weather Forecast Website

A responsive weather forecast website that displays 7-day weather forecasts for major European cities using the 7Timer API.

## Project Overview

This project was created to help a European travel agency increase travel bookings by providing website visitors with the ability to look up weather forecasts for major European cities. The website integrates with an external weather API to retrieve and display forecast data.

## Features

- **7-Day Weather Forecast**: Displays weather predictions for the next 7 days
- **Multiple European Cities**: Includes 40+ major European cities
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Data**: Fetches live weather data from 7Timer API
- **Visual Weather Icons**: Uses emoji icons to represent different weather conditions
- **Day/Night Icons**: Shows both day and night weather conditions for each forecast day
- **Error Handling**: Gracefully handles API errors and network issues
- **Loading States**: Provides visual feedback while data is being fetched

## Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with flexbox and grid layouts
- **JavaScript (ES6+)**: Asynchronous API calls, JSON processing, DOM manipulation
- **7Timer API**: Free weather forecast API (no API key required)

## Project Structure

```
website-using-an-api-with-html-javascript-and-json/
│
├── index.html          # Main HTML file with structure
├── styles.css          # All CSS styling and responsive design
├── script.js           # JavaScript for API calls and interactivity
└── README.md           # Project documentation (this file)
```

## How It Works

### API Integration

The website uses the **7Timer API** (https://www.7timer.info) which provides free weather forecasts without requiring an API key. The API is called with latitude and longitude coordinates for each city:

```javascript
const apiUrl = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civil&output=json`;
```

### Asynchronous Data Fetching

The application uses modern `async/await` syntax to fetch data from the API:

```javascript
async function fetchWeatherData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Process and display data
}
```

### JSON Data Processing

The API returns JSON data with the following structure:

```json
{
    "dataseries": [
        {
            "timepoint": 3,
            "weather": "clear",
            "temp2m": 20,
            ...
        }
    ]
}
```

The JavaScript code processes this data to extract:
- Weather conditions
- Temperatures
- Forecast timing
- And displays it in a user-friendly format

### Dynamic HTML Generation

Weather cards are dynamically created using JavaScript:

```javascript
function createWeatherCard(dayData, index) {
    const card = document.createElement('div');
    card.className = 'weather-card';
    card.innerHTML = `...`; // Dynamic content
    return card;
}
```

## Key Features Implementation

### 1. City Selection
- 40+ European cities with precise latitude/longitude coordinates
- Dropdown selector for easy city switching
- Automatic weather fetch on city change

### 2. Temperature Conversion
- Toggle between Celsius (°C) and Fahrenheit (°F)
- Real-time conversion without re-fetching data
- User preference maintained during session

### 3. Weather Conditions
Maps 15 different weather conditions to visual icons:
- Clear/Sunny
- Cloudy variations
- Rain (light, heavy, showers)
- Snow
- Thunderstorms
- Fog
- And more

### 4. Responsive Design
- Grid layout adapts to screen size
- Mobile-first approach
- Breakpoints at 768px and 480px
- Touch-friendly controls

### 5. Error Handling
```javascript
try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Process data
} catch (error) {
    showError(`Failed to fetch weather data: ${error.message}`);
}
```

## How to Use

### Running the Project

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser (Chrome, Firefox, Safari, Edge)
3. **Select a city** from the dropdown menu
4. **View the 7-day forecast** displayed in cards
5. **Toggle temperature units** if desired

### Live Server (Recommended)

For the best development experience, use a local server:

**Option 1: VS Code Live Server Extension**
```bash
# Install Live Server extension in VS Code
# Right-click index.html and select "Open with Live Server"
```

**Option 2: Python HTTP Server**
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

**Option 3: Node.js HTTP Server**
```bash
npx http-server -p 8000
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## API Information

### 7Timer API
- **Website**: https://www.7timer.info
- **Product Used**: Civil Weather Forecast
- **Format**: JSON
- **Authentication**: None required (free, no API key)
- **Rate Limiting**: Reasonable use policy
- **Coverage**: Global

### API Parameters
- `lon`: Longitude of the location
- `lat`: Latitude of the location
- `product`: Type of forecast (we use 'civil')
- `output`: Format (we use 'json')

## Project Objectives Achievement

✅ **Provide 7-day weather forecasts for European cities**
   - Implemented with dropdown selection of 40+ cities
   - Displays full week forecast with detailed information

✅ **Keep website visitors engaged longer**
   - Interactive city selection
   - Temperature unit toggle
   - Visual appeal with icons and gradients
   - Responsive and fast loading

✅ **Increase online bookings**
   - Helps users plan trips based on weather
   - Professional, trustworthy design
   - Easy-to-use interface encourages exploration

## Code Quality Highlights

### HTML
- Semantic HTML5 elements
- Proper ARIA labels for accessibility
- Clean, organized structure
- No deprecated tags or attributes

### CSS
- Modern CSS3 features (Grid, Flexbox, Gradients)
- Mobile-first responsive design
- Smooth transitions and animations
- Well-organized with clear comments
- No hard-coded pixel values for responsive elements

### JavaScript
- Modern ES6+ syntax (async/await, arrow functions, template literals)
- Clear variable and function names
- Comprehensive comments
- Error handling with try/catch
- Asynchronous API calls
- Clean separation of concerns
- Bug-free implementation

## Future Enhancements

Potential improvements for future versions:
- Add hourly forecast option
- Include wind speed and direction
- Show humidity and precipitation probability
- Add weather alerts/warnings
- Implement geolocation for automatic city detection
- Add favorite cities feature with local storage
- Include weather maps
- Add more detailed weather information (UV index, air quality)

## Credits

- **Weather Data**: 7Timer API (https://www.7timer.info)
- **Icons**: Unicode emoji characters
- **Design**: Custom gradient backgrounds and card layouts
- **Developer**: [Your Name]

## License

This project is created for educational purposes as part of a Coursera project.

## Contact

For questions or feedback about this project:
- GitHub: [\[Your GitHub Profile\]](https://github.com/rianrp)
- Email: riansatro@gmail.com

---

**© Copyright 2026 EurOrbit - European Weather Forecast**

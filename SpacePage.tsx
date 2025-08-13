import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Planet {
  id: number;
  name: string;
  description: string;
  distance: string;
  temperature: string;
  gravity: string;
  image: string;
  features: string[];
}

export default function SpacePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Enhanced starfield background with parallax effect
  const Stars = () => {
    const stars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      delay: Math.random() * 5,
      layer: Math.floor(Math.random() * 3),
    }));

    return (
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3 + star.layer * 2,
              repeat: Infinity,
              delay: star.delay,
            }}
            className={`bg-white dark:bg-blue-300 rounded-full absolute ${
              star.layer === 0 ? 'opacity-100' : star.layer === 1 ? 'opacity-70' : 'opacity-40'
            }`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: `${star.y}%`,
              left: `${star.x}%`,
              zIndex: star.layer,
            }}
          />
        ))}
      </div>
    );
  };

  // Celestial lighting component (Sun/Moon)
  const CelestialLighting = () => {
    if (darkMode) {
      // Moon lighting for dark mode
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Moon */}
          <motion.div
            className="absolute top-16 right-16 w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-white shadow-2xl"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Moon glow effect */}
          <motion.div
            className="absolute top-16 right-16 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 via-purple-500/5 to-transparent"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Subtle moonbeams */}
          <motion.div
            className="absolute top-16 right-16 w-80 h-80 rounded-full bg-gradient-to-br from-blue-300/5 via-purple-400/3 to-transparent"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>
      );
    } else {
      // Sun lighting for light mode
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Sun */}
          <motion.div
            className="absolute top-20 left-20 w-40 h-40 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 shadow-2xl"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Sun rays */}
          <motion.div
            className="absolute top-20 left-20 w-96 h-96"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-b from-yellow-400/60 to-transparent origin-bottom"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-50%)`,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  scaleY: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
          
          {/* Sun glow effect */}
          <motion.div
            className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-yellow-300/20 via-orange-400/15 to-red-500/10"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Warm light overlay for light mode */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-yellow-200/5 via-orange-300/3 to-transparent"
            animate={{
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      );
    }
  };

  // Floating planets component
  const FloatingPlanets = () => {
    const planets = [
      { name: "Mars", color: "from-red-500 to-orange-600", size: "w-16 h-16", distance: "top-20 right-20" },
      { name: "Jupiter", color: "from-yellow-400 to-orange-500", size: "w-20 h-20", distance: "top-40 left-16" },
      { name: "Saturn", color: "from-yellow-300 to-amber-400", size: "w-18 h-18", distance: "bottom-32 right-32" },
      { name: "Neptune", color: "from-blue-400 to-blue-600", size: "w-14 h-14", distance: "bottom-20 left-24" },
    ];

    return (
      <div className="absolute inset-0 pointer-events-none">
        {planets.map((planet, index) => (
          <motion.div
            key={planet.name}
            className={`absolute ${planet.distance} ${planet.size} rounded-full bg-gradient-to-br ${planet.color} shadow-2xl`}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    );
  };

  // Planet data for exploration section
  const planets = [
    {
      id: 1,
      name: "Mars",
      description: "The Red Planet, home to the largest volcano in the solar system.",
      distance: "225M km",
      temperature: "-63°C",
      gravity: "0.38g",
      image: "🔴",
      features: ["Olympus Mons", "Valles Marineris", "Phobos & Deimos"]
    },
    {
      id: 2,
      name: "Jupiter",
      description: "The largest planet, a gas giant with a Great Red Spot storm.",
      distance: "778M km",
      temperature: "-110°C",
      gravity: "2.34g",
      image: "🟡",
      features: ["Great Red Spot", "79 Moons", "Jupiter Rings"]
    },
    {
      id: 3,
      name: "Saturn",
      description: "Famous for its spectacular ring system and hexagonal storm.",
      distance: "1.4B km",
      temperature: "-140°C",
      gravity: "0.93g",
      image: "🟠",
      features: ["Saturn Rings", "Titan Moon", "Hexagonal Storm"]
    },
    {
      id: 4,
      name: "Neptune",
      description: "The windiest planet with supersonic storms and dark spots.",
      distance: "4.5B km",
      temperature: "-200°C",
      gravity: "1.12g",
      image: "🔵",
      features: ["Great Dark Spot", "Triton Moon", "Fast Winds"]
    }
  ];

  // Mission timeline data
  const missions = [
    { year: "1969", title: "Apollo 11", description: "First human landing on the Moon", status: "completed" },
    { year: "1977", title: "Voyager 1 & 2", description: "Interstellar space exploration", status: "active" },
    { year: "1990", title: "Hubble Telescope", description: "Deep space observations", status: "active" },
    { year: "2004", title: "Spirit & Opportunity", description: "Mars rover exploration", status: "completed" },
    { year: "2012", title: "Curiosity Rover", description: "Advanced Mars science", status: "active" },
    { year: "2021", title: "Perseverance", description: "Mars sample collection", status: "active" },
    { year: "2024", title: "Artemis Program", description: "Return to the Moon", status: "planned" },
    { year: "2030", title: "Mars Mission", description: "First human mission to Mars", status: "planned" }
  ];

  // Navigation component
  const Navigation = () => (
    <nav className="hidden md:flex space-x-8 text-sm">
      {[
        { id: "home", label: "Home", icon: "🏠" },
        { id: "explore", label: "Explore", icon: "🔍" },
        { id: "missions", label: "Missions", icon: "🚀" },
        { id: "gallery", label: "Gallery", icon: "🌌" },
        { id: "about", label: "About", icon: "ℹ️" }
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            activeSection === item.id
              ? darkMode
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-lg"
                : "bg-purple-100/80 text-purple-700 border border-purple-300/50 shadow-lg"
              : darkMode 
                ? "text-gray-300 hover:text-white hover:bg-white/5" 
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/50"
          }`}
        >
          <span className="text-sm">{item.icon}</span>
          <span className="font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );

  // Hero section with enhanced content
  const HeroSection = () => (
    <section className="relative z-10 flex flex-col items-center text-center p-8 min-h-screen justify-center">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl"
      >
        <motion.h1
          className={`text-5xl md:text-7xl font-extrabold mb-6 ${
            darkMode 
              ? 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent'
          }`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Discover the Wonders of the Universe
        </motion.h1>

        <motion.p
          className={`text-xl md:text-2xl mb-8 leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Embark on an extraordinary journey through our solar system and beyond. 
          Explore distant planets, witness cosmic phenomena, and discover the secrets 
          that lie in the vast expanse of space.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold rounded-lg shadow-2xl text-lg transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 Start Exploring
          </motion.button>
          <motion.button
            className="px-8 py-4 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold rounded-lg transition-all duration-300 text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📚 Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating astronaut */}
      <motion.div
        className="absolute right-10 top-1/2 text-6xl"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        👨‍🚀
      </motion.div>
    </section>
  );

  // Planet exploration section
  const ExploreSection = () => (
    <section className="relative z-10 py-20 px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Explore Our Solar System
        </h2>
        <p className={`text-xl max-w-3xl mx-auto ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Journey through the planets, each with its own unique characteristics and mysteries waiting to be discovered.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {planets.map((planet, index) => (
          <motion.div
            key={planet.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-purple-500/50'
                : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50 hover:border-purple-400/50 shadow-lg'
            }`}
            onClick={() => setSelectedPlanet(planet)}
          >
            <div className="text-6xl mb-4 text-center">{planet.image}</div>
            <h3 className={`text-2xl font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>{planet.name}</h3>
            <p className={`mb-4 text-sm leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>{planet.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Distance:</span>
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>{planet.distance}</span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Temperature:</span>
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>{planet.temperature}</span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Gravity:</span>
                <span className={darkMode ? 'text-white' : 'text-gray-800'}>{planet.gravity}</span>
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t ${
              darkMode ? 'border-gray-600' : 'border-gray-300'
            }`}>
              <p className={`text-xs mb-2 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Key Features:</p>
              <div className="flex flex-wrap gap-1">
                {planet.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 text-xs rounded-full ${
                      darkMode 
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-purple-100/80 text-purple-700'
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );

  // Mission timeline section
  const MissionsSection = () => (
    <section className="relative z-10 py-20 px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Space Mission Timeline
        </h2>
        <p className={`text-xl max-w-3xl mx-auto ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          From the first Moon landing to future Mars missions, explore humanity's greatest achievements in space exploration.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
          
          {missions.map((mission, index) => (
            <motion.div
              key={mission.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'text-right' : 'text-left'
              }`}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'}`}>
                                 <div className={`p-6 rounded-lg backdrop-blur-sm ${
                   index % 2 === 0 ? 'mr-8' : 'ml-8'
                 } ${
                   darkMode
                     ? mission.status === 'completed' 
                       ? 'bg-green-500/20 border border-green-500/30' 
                       : mission.status === 'active'
                       ? 'bg-blue-500/20 border border-blue-500/30'
                       : 'bg-purple-500/20 border border-purple-500/30'
                     : mission.status === 'completed' 
                       ? 'bg-green-100/80 border border-green-300/50' 
                       : mission.status === 'active'
                       ? 'bg-blue-100/80 border border-blue-300/50'
                       : 'bg-purple-100/80 border border-purple-300/50'
                 }`}>
                   <div className={`text-2xl font-bold mb-2 ${
                     darkMode ? 'text-white' : 'text-gray-800'
                   }`}>{mission.year}</div>
                   <h3 className={`text-xl font-semibold mb-2 ${
                     darkMode ? 'text-white' : 'text-gray-800'
                   }`}>{mission.title}</h3>
                   <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{mission.description}</p>
                   <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-3 ${
                     darkMode
                       ? mission.status === 'completed' 
                         ? 'bg-green-500/30 text-green-300' 
                         : mission.status === 'active'
                         ? 'bg-blue-500/30 text-blue-300'
                         : 'bg-purple-500/30 text-purple-300'
                       : mission.status === 'completed' 
                         ? 'bg-green-200/80 text-green-700' 
                         : mission.status === 'active'
                         ? 'bg-blue-200/80 text-blue-700'
                         : 'bg-purple-200/80 text-purple-700'
                   }`}>
                     {mission.status}
                   </span>
                 </div>
              </div>
              
              {/* Timeline dot */}
              <div className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full ${
                mission.status === 'completed' 
                  ? 'bg-green-500' 
                  : mission.status === 'active'
                  ? 'bg-blue-500'
                  : 'bg-purple-500'
              } border-4 border-gray-900 ${
                index % 2 === 0 ? 'left-1/2 -translate-x-1/2' : 'left-1/2 -translate-x-1/2'
              }`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  // Gallery section
  const GallerySection = () => (
    <section className="relative z-10 py-20 px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
          darkMode ? 'text-white' : 'text-gray-800'
        }`}>
          Cosmic Gallery
        </h2>
        <p className={`text-xl max-w-3xl mx-auto ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Stunning images and visualizations from our exploration of the cosmos.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {[
          { title: "Nebula Cluster", emoji: "🌌", description: "Distant star-forming regions" },
          { title: "Galaxy Merger", emoji: "🌠", description: "Colliding galaxies in deep space" },
          { title: "Black Hole", emoji: "⚫", description: "Event horizon visualization" },
          { title: "Solar Flare", emoji: "☀️", description: "Massive solar eruptions" },
          { title: "Aurora Borealis", emoji: "🌈", description: "Earth's magnetic light show" },
          { title: "Space Station", emoji: "🛰️", description: "International Space Station" }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 text-center ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-purple-500/50'
                : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50 hover:border-purple-400/50 shadow-lg'
            }`}
          >
            <div className="text-8xl mb-4">{item.emoji}</div>
            <h3 className={`text-2xl font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>{item.title}</h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );

  // About section
  const AboutSection = () => (
    <section className="relative z-10 py-20 px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            About Space Exploration
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Dedicated to advancing human knowledge and understanding of our universe through innovative technology and scientific discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🔬",
              title: "Scientific Research",
              description: "Advancing our understanding of space, planets, and cosmic phenomena through cutting-edge research and technology."
            },
            {
              icon: "🚀",
              title: "Innovation",
              description: "Developing new technologies and methods for space exploration, from propulsion systems to life support."
            },
            {
              icon: "🌍",
              title: "Global Collaboration",
              description: "Working with international partners to achieve common goals in space exploration and scientific discovery."
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center p-6"
            >
                             <div className="text-6xl mb-4">{item.icon}</div>
               <h3 className={`text-2xl font-bold mb-3 ${
                 darkMode ? 'text-white' : 'text-gray-800'
               }`}>{item.title}</h3>
               <p className={`leading-relaxed ${
                 darkMode ? 'text-gray-300' : 'text-gray-600'
               }`}>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );

  // Footer with enhanced content
  const Footer = () => (
    <footer className={`relative z-10 py-12 px-8 mt-20 transition-all duration-700 ${
      darkMode 
        ? 'bg-gradient-to-t from-black/80 to-transparent' 
        : 'bg-gradient-to-t from-gray-100/80 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className={`text-2xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>🚀 Space Web</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Exploring the final frontier and sharing the wonders of space with the world.
            </p>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>Quick Links</h4>
            <ul className={`space-y-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li><button onClick={() => setActiveSection("home")} className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Home</button></li>
              <li><button onClick={() => setActiveSection("explore")} className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Explore</button></li>
              <li><button onClick={() => setActiveSection("missions")} className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Missions</button></li>
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>Resources</h4>
            <ul className={`space-y-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li><a href="#" className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Space News</a></li>
              <li><a href="#" className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Educational Content</a></li>
              <li><a href="#" className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Research Papers</a></li>
            </ul>
          </div>
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>Connect</h4>
            <ul className={`space-y-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <li><a href="#" className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Contact Us</a></li>
              <li><a href="#" className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Newsletter</a></li>
              <li><a href="#" className={`hover:transition-colors ${
                darkMode ? 'hover:text-white' : 'hover:text-gray-800'
              }`}>Social Media</a></li>
            </ul>
          </div>
        </div>
        
        <div className={`border-t pt-8 text-center ${
          darkMode ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            © {new Date().getFullYear()} Space Exploration Project. All rights reserved. | 
            Made with ❤️ for space enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );

  // Main content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "explore":
        return <ExploreSection />;
      case "missions":
        return <MissionsSection />;
      case "gallery":
        return <GallerySection />;
      case "about":
        return <AboutSection />;
      default:
        return <HeroSection />;
    }
  };

  return (
    <div className={`relative min-h-screen text-white transition-all duration-700 ${
      darkMode 
        ? 'bg-gradient-to-b from-slate-900 via-purple-900/30 to-black' 
        : 'bg-gradient-to-b from-blue-50 via-orange-100/30 to-yellow-50/20'
    }`}>
      <Stars />
      <FloatingPlanets />
      <CelestialLighting />

      {/* Header */}
      <header className={`flex justify-between items-center p-6 relative z-20 backdrop-blur-md border-b transition-all duration-700 ${
        darkMode 
          ? 'bg-black/30 border-white/20 shadow-2xl' 
          : 'bg-white/40 border-gray-300/40 shadow-xl'
      }`}>
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-full ${
            darkMode ? 'bg-purple-500/20' : 'bg-purple-100/80'
          }`}>
            <span className="text-3xl">🚀</span>
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Space Exploration
            </h1>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Discover the Cosmos
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <Navigation />
          <button
            onClick={toggleTheme}
            className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-700 hover:scale-105 shadow-lg overflow-hidden ${
              darkMode 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
            }`}
          >
            <span className="relative z-10 flex items-center space-x-2">
              <span className="text-lg">{darkMode ? "☀️" : "🌙"}</span>
              <span>{darkMode ? "Light" : "Dark"}</span>
            </span>
            <div className={`absolute inset-0 transition-all duration-700 ${
              darkMode 
                ? 'bg-gradient-to-r from-yellow-300 to-orange-400' 
                : 'bg-gradient-to-r from-indigo-400 to-purple-500'
            } opacity-0 hover:opacity-100`} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Planet detail modal */}
      {selectedPlanet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPlanet(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-2xl w-full border border-purple-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">{selectedPlanet.name}</h2>
              <button
                onClick={() => setSelectedPlanet(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="text-8xl text-center mb-6">{selectedPlanet.image}</div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">{selectedPlanet.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-purple-500/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-300">{selectedPlanet.distance}</div>
                <div className="text-sm text-gray-400">Distance</div>
              </div>
              <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-300">{selectedPlanet.temperature}</div>
                <div className="text-sm text-gray-400">Temperature</div>
              </div>
              <div className="text-center p-4 bg-green-500/20 rounded-lg">
                <div className="text-2xl font-bold text-green-300">{selectedPlanet.gravity}</div>
                <div className="text-sm text-gray-400">Gravity</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-white">Key Features:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedPlanet.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

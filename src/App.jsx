import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaTshirt,
  FaCalendarAlt,
  FaMagic,
  FaCloudSun,
  FaMapMarkerAlt,
  FaStar,
  FaRegHeart,
  FaHeart,
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
} from "react-icons/fa";
import {
  GiClothes,
  GiRunningShoe,
  GiNecklace,
  GiLargeDress,
} from "react-icons/gi";

const App = () => {
  // Chatbot states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Outfit Planner. Tell me about an event or weather conditions, and I'll suggest perfect outfits!",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [weatherInput, setWeatherInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);

  // Outfit likes state
  const [outfitLikes, setOutfitLikes] = useState([false, false, false, false]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (isWeatherOpen) setIsWeatherOpen(false);
  };

  const toggleWeather = () => {
    setIsWeatherOpen(!isWeatherOpen);
    if (isChatOpen) setIsChatOpen(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const botResponse = await mockAICall(inputValue);

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          text: botResponse,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Error calling AI API:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          text: "Sorry, I encountered an error. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const mockAICall = async (query) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const systemPrompt =
      "You are a professional outfit planner AI. Provide detailed, personalized outfit recommendations based on the user's request. Consider weather, occasion, and personal style. Offer multiple options when possible.";
    const fullPrompt = `${systemPrompt}\n\nUser: ${query}`;

    console.log("Sending to AI:", fullPrompt);

    if (query.toLowerCase().includes("outfit for")) {
      if (query.toLowerCase().includes("party")) {
        return "For a party, here are 3 great options:\n1. Sleek black dress with statement jewelry and heels\n2. Jumpsuit with metallic accessories\n3. Tailored suit with a silk blouse\n\nWhich style do you prefer?";
      } else if (query.toLowerCase().includes("work")) {
        return "Professional outfit ideas:\n- Navy blazer with white shirt and gray trousers\n- Pencil skirt with blouse and cardigan\n- Dress pants with a shell top and blazer\n\nWould you like suggestions for accessories too?";
      }
    } else if (
      query.toLowerCase().includes("weather") ||
      query.toLowerCase().includes("rain") ||
      query.toLowerCase().includes("cold")
    ) {
      return "For the current weather conditions, I recommend:\n- Waterproof jacket or trench coat\n- Layered clothing for temperature changes\n- Comfortable waterproof footwear\n\nWould you like more specific suggestions?";
    }

    return "I'd be happy to help plan your outfit! Could you tell me:\n1. The occasion or activity\n2. Your location or weather conditions\n3. Any preferred colors or styles?";
  };

  const handleGetWeather = async () => {
    if (!weatherInput.trim()) return;

    setIsWeatherLoading(true);
    try {
      const mockWeather = {
        city: weatherInput,
        temp: Math.floor(Math.random() * 30) + 10,
        condition: ["Sunny", "Cloudy", "Rainy", "Snowy"][
          Math.floor(Math.random() * 4)
        ],
        humidity: Math.floor(Math.random() * 50) + 30,
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setWeatherData(mockWeather);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeatherData({ error: "Couldn't fetch weather data" });
    } finally {
      setIsWeatherLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isChatOpen) handleSendMessage();
      if (isWeatherOpen) handleGetWeather();
    }
  };

  const toggleLike = (index) => {
    const newLikes = [...outfitLikes];
    newLikes[index] = !newLikes[index];
    setOutfitLikes(newLikes);
  };

  // Outfit items for the boxes
  const outfitItems = [
    {
      title: "Evening Elegance",
      items: ["Silk Blouse", "Tailored Pants", "Statement Heels"],
      icon: <GiLargeDress className="text-4xl text-pink-400" />,
      rating: 4,
      occasion: "Formal Event",
    },
    {
      title: "Weekend Casual",
      items: ["Graphic Tee", "Distressed Jeans", "White Sneakers"],
      icon: <GiClothes className="text-4xl text-blue-400" />,
      rating: 5,
      occasion: "Casual Outing",
    },
    {
      title: "Office Ready",
      items: ["Blazer", "Shell Top", "Pencil Skirt"],
      icon: <GiNecklace className="text-4xl text-purple-400" />,
      rating: 4,
      occasion: "Work Meeting",
    },
    {
      title: "Date Night",
      items: ["Wrap Dress", "Strappy Heels", "Delicate Jewelry"],
      icon: <GiRunningShoe className="text-4xl text-red-400" />,
      rating: 5,
      occasion: "Romantic Dinner",
    },
  ];

  // Weather icon component
  const WeatherIcon = ({ condition }) => {
    switch (condition) {
      case "Sunny":
        return <FaSun className="text-yellow-400 text-3xl" />;
      case "Cloudy":
        return <FaCloud className="text-gray-400 text-3xl" />;
      case "Rainy":
        return <FaCloudRain className="text-blue-400 text-3xl" />;
      case "Snowy":
        return <FaSnowflake className="text-blue-200 text-3xl" />;
      default:
        return <FaCloudSun className="text-gray-300 text-3xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Personal{" "}
            <span className="text-purple-400">Style Companion</span>
          </motion.h1>

          <motion.p
            className="text-xl text-gray-400 mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Revolutionize your wardrobe with AI-powered outfit planning tailored
            to your unique style, body type, and local weather conditions.
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-400 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
              Start Your Style Journey
            </button>
            <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 rounded-full font-semibold text-lg hover:scale-105 transition-transform">
              Take the Style Quiz
            </button>
          </motion.div>
        </div>

        {/* Outfit Showcase Boxes */}
        <div className="lg:w-1/2 grid grid-cols-2 gap-6">
          {outfitItems.map((outfit, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-xl border border-gray-700 p-6 flex flex-col hover:border-purple-500 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  {outfit.icon}
                  <div>
                    <h3 className="text-lg font-semibold">{outfit.title}</h3>
                    <p className="text-xs text-gray-400">{outfit.occasion}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleLike(index)}
                  className="text-pink-400 hover:text-pink-300 transition-colors"
                >
                  {outfitLikes[index] ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>

              <ul className="mb-4 space-y-2 flex-1">
                {outfit.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < outfit.rating ? "text-yellow-400" : "text-gray-500"
                      }
                    />
                  ))}
                </div>
                <button className="text-sm bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-full transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            How Our <span className="text-purple-400">Outfit Planner</span>{" "}
            Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-gray-700 p-8 rounded-xl border border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Tell Us About Yourself
              </h3>
              <p className="text-gray-400">
                Complete a quick style quiz about your preferences, body type,
                and wardrobe.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-700 p-8 rounded-xl border border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Connect Your Closet
              </h3>
              <p className="text-gray-400">
                Upload photos of your clothes or browse our virtual closet.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-700 p-8 rounded-xl border border-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Daily Outfits</h3>
              <p className="text-gray-400">
                Receive personalized outfit recommendations every morning.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose Our <span className="text-purple-400">Outfit Planner</span>
        </h2>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
          We combine artificial intelligence with fashion expertise to create
          looks you'll love
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaMagic className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Stylist</h3>
            <p className="text-gray-400">
              Our AI analyzes your body type, skin tone, and preferences to
              suggest perfect outfits
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCalendarAlt className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Event Ready</h3>
            <p className="text-gray-400">
              From casual brunches to black tie galas, we've got your perfect
              look covered
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaTshirt className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Mix & Match</h3>
            <p className="text-gray-400">
              Discover new combinations from clothes you already own with our
              virtual closet
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCloudSun className="text-2xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Weather Smart</h3>
            <p className="text-gray-400">
              Real-time weather integration ensures you're always dressed
              appropriately
            </p>
          </motion.div>
        </div>
      </section>

      {/* Style Tips Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pro <span className="text-purple-400">Style Tips</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <FaTshirt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      The Power of Layers
                    </h3>
                    <p className="text-gray-400">
                      Master layering to create versatile looks that work for
                      any occasion and weather.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
                    <GiNecklace className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Accessorize Right
                    </h3>
                    <p className="text-gray-400">
                      Learn how accessories can transform a basic outfit into
                      something special.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                    <GiRunningShoe className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Shoe Game Strong
                    </h3>
                    <p className="text-gray-400">
                      How the right footwear can make or break your entire look.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2 bg-gray-700 rounded-xl p-8 border border-gray-600"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">
                Today's <span className="text-purple-400">Featured Outfit</span>
              </h3>
              <div className="aspect-square bg-gray-600 rounded-lg mb-6 flex items-center justify-center">
                <GiLargeDress className="text-8xl text-purple-400" />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">
                    Business Casual Perfection
                  </h4>
                  <p className="text-gray-400">
                    Ideal for client meetings or office presentations
                  </p>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Tailored Blazer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Silk Shell Top</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Straight-leg Trousers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-purple-400">•</span>
                    <span>Pointed-toe Flats</span>
                  </li>
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full font-medium hover:opacity-90 transition-opacity">
                  Save This Outfit
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-16">
          What Our <span className="text-purple-400">Users Say</span>
        </h2>
        <div className="flex overflow-x-auto gap-8 pb-6 px-2 scrollbar-hide">
          <motion.div
            className="min-w-[300px] bg-gray-800 p-8 rounded-xl border border-gray-700 text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="italic mb-4">
              "This saved me so much time getting ready for events! I used to
              spend hours deciding what to wear."
            </p>
            <span className="text-purple-300 font-semibold">- Sarah J.</span>
          </motion.div>

          <motion.div
            className="min-w-[300px] bg-gray-800 p-8 rounded-xl border border-gray-700 text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="italic mb-4">
              "Never worry about what to wear anymore. The AI suggestions are
              spot on and help me look my best."
            </p>
            <span className="text-purple-300 font-semibold">- Michael T.</span>
          </motion.div>

          <motion.div
            className="min-w-[300px] bg-gray-800 p-8 rounded-xl border border-gray-700 text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="italic mb-4">
              "My wardrobe has never been more organized. The outfit
              combinations are endless and I always feel confident."
            </p>
            <span className="text-purple-300 font-semibold">- Emma L.</span>
          </motion.div>
        </div>
      </section>

      {/* Weather Chatbot */}
      <AnimatePresence>
        {isWeatherOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-96 bg-gray-800 rounded-xl shadow-xl border border-gray-700 flex flex-col z-50"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="bg-gradient-to-r from-teal-500 to-green-500 p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="font-semibold flex items-center gap-2">
                <FaCloudSun /> Weather Assistant
              </h3>
              <button onClick={toggleWeather} className="hover:opacity-80">
                <FaTimes />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col overflow-y-auto">
              {weatherData ? (
                weatherData.error ? (
                  <p className="text-red-400 m-auto text-center">
                    Couldn't fetch weather data
                  </p>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <h4 className="flex items-center justify-center gap-2 mb-2">
                        <FaMapMarkerAlt /> {weatherData.city}
                      </h4>
                      <div className="flex justify-center items-center gap-4 my-4">
                        <WeatherIcon condition={weatherData.condition} />
                        <div className="text-5xl font-bold">
                          {weatherData.temp}°C
                        </div>
                      </div>
                      <div className="text-xl text-teal-300">
                        {weatherData.condition}
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="mb-4 text-center">
                        Humidity: {weatherData.humidity}%
                      </div>
                      <button
                        className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-medium transition-colors"
                        onClick={() => {
                          toggleWeather();
                          toggleChat();
                          setInputValue(
                            `What should I wear in ${
                              weatherData.city
                            } with ${weatherData.condition.toLowerCase()} weather at ${
                              weatherData.temp
                            }°C?`
                          );
                        }}
                      >
                        Get Outfit Suggestions
                      </button>
                    </div>
                  </>
                )
              ) : (
                <>
                  <div className="mb-6 text-center">
                    <FaCloudSun className="text-5xl text-teal-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold">
                      Check Local Weather
                    </h3>
                    <p className="text-gray-400 mt-2">
                      Get outfit recommendations based on current conditions
                    </p>
                  </div>
                  <div className="flex mb-4">
                    <input
                      type="text"
                      value={weatherInput}
                      onChange={(e) => setWeatherInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Enter city name..."
                      className="flex-1 px-4 py-2 bg-gray-700 rounded-l-full outline-none"
                    />
                    <button
                      onClick={handleGetWeather}
                      disabled={isWeatherLoading}
                      className="px-4 bg-teal-500 hover:bg-teal-600 rounded-r-full transition-colors disabled:opacity-50"
                    >
                      {isWeatherLoading ? "..." : "Go"}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm text-center mt-auto">
                    Example: "New York", "London", "Tokyo"
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outfit Planner Chatbot */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 h-[500px] bg-gray-800 rounded-xl shadow-xl border border-gray-700 flex flex-col z-50"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 rounded-t-xl flex justify-between items-center">
              <h3 className="font-semibold flex items-center gap-2">
                <FaRobot /> Outfit Planner
              </h3>
              <button onClick={toggleChat} className="hover:opacity-80">
                <FaTimes />
              </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === "user"
                      ? "bg-purple-600 ml-auto rounded-br-none"
                      : "bg-gray-700 mr-auto rounded-bl-none"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="max-w-[80%] p-3 bg-gray-700 rounded-lg rounded-bl-none mr-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 bg-gray-300 rounded-full"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-700">
              <div className="flex bg-gray-700 rounded-full overflow-hidden">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about outfit ideas..."
                  className="flex-1 px-4 py-2 bg-transparent outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="px-4 bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Try: "What should I wear to a summer wedding?"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-green-500 shadow-lg flex items-center justify-center text-white"
          onClick={toggleWeather}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FaCloudSun className="text-xl" />
        </motion.button>

        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg flex items-center justify-center text-white"
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <FaRobot className="text-xl" />
        </motion.button>
      </div>
    </div>
  );
};

export default App;

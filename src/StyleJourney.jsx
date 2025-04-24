import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaTshirt,
  FaPalette,
  FaUserAlt,
  FaTimes,
  FaMapMarkedAlt,
  FaRuler,
  FaTemperatureLow,
  FaCalendarDay,
  FaMagic,
  FaCheckCircle,
  FaArrowRight,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { GiClothes, GiRunningShoe, GiNecklace } from "react-icons/gi";

const StyleJourney = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    height: "",
    weight: "",
    skinTone: "",
    preferredColors: [],
    stylePreferences: [],
    weatherLocation: "",
    occasion: "",
  });

  const colors = [
    "Red",
    "Blue",
    "Green",
    "Black",
    "White",
    "Gray",
    "Pink",
    "Purple",
    "Yellow",
  ];
  const styles = [
    "Casual",
    "Formal",
    "Sporty",
    "Bohemian",
    "Streetwear",
    "Vintage",
    "Minimalist",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleColorSelect = (color) => {
    setFormData((prev) => {
      const newColors = prev.preferredColors.includes(color)
        ? prev.preferredColors.filter((c) => c !== color)
        : [...prev.preferredColors, color];
      return { ...prev, preferredColors: newColors };
    });
  };

  const handleStyleSelect = (style) => {
    setFormData((prev) => {
      const newStyles = prev.stylePreferences.includes(style)
        ? prev.stylePreferences.filter((s) => s !== style)
        : [...prev.stylePreferences, style];
      return { ...prev, stylePreferences: newStyles };
    });
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const submitForm = () => {
    console.log("Form submitted:", formData);
    // Here you would typically send this data to your backend
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        className="bg-gray-800 rounded-xl border border-purple-500 shadow-2xl w-full max-w-4xl max-h-screen overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-400">
              <FaMagic className="inline mr-2" />
              Style Your Journey
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {currentStep > step ? <FaCheckCircle /> : step}
                  </div>
                  <span className="text-xs mt-1 text-gray-400">
                    {
                      ["Profile", "Style", "Colors", "Location", "Review"][
                        step - 1
                      ]
                    }
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1 bg-gray-700 rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(currentStep - 1) * 25}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaUserAlt className="mr-2 text-purple-400" />
                Tell Us About Yourself
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">
                    <FaRuler className="inline mr-1" />
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Style Preferences */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <GiClothes className="mr-2 text-purple-400" />
                Your Style Preferences
              </h3>
              <div className="mb-6">
                <label className="block text-gray-400 mb-3">
                  Select your preferred styles:
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {styles.map((style) => (
                    <motion.button
                      key={style}
                      type="button"
                      onClick={() => handleStyleSelect(style)}
                      className={`py-2 px-4 rounded-lg border transition-all ${
                        formData.stylePreferences.includes(style)
                          ? "border-purple-500 bg-purple-900 text-white"
                          : "border-gray-600 hover:border-purple-400"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {style}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Skin Tone</label>
                <div className="flex space-x-4 mb-6">
                  {["Light", "Medium", "Dark", "Olive", "Tan"].map((tone) => (
                    <motion.div
                      key={tone}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, skinTone: tone }))
                      }
                      className={`w-12 h-12 rounded-full cursor-pointer ${
                        formData.skinTone === tone
                          ? "ring-4 ring-purple-500"
                          : ""
                      }`}
                      style={{
                        backgroundColor:
                          tone === "Light"
                            ? "#f5d0b9"
                            : tone === "Medium"
                            ? "#e5b887"
                            : tone === "Dark"
                            ? "#8d5524"
                            : tone === "Olive"
                            ? "#b5a642"
                            : "#d2b48c",
                      }}
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Color Preferences */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaPalette className="mr-2 text-purple-400" />
                Your Color Preferences
              </h3>
              <p className="text-gray-400 mb-6">
                Select colors you love to wear:
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {colors.map((color) => (
                  <motion.div
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`flex flex-col items-center cursor-pointer ${
                      formData.preferredColors.includes(color)
                        ? "opacity-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full mb-2 shadow-lg"
                      style={{
                        backgroundColor: color.toLowerCase(),
                        border:
                          color.toLowerCase() === "white"
                            ? "1px solid #4B5563"
                            : "none",
                      }}
                    />
                    <span className="text-sm text-gray-300">{color}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Location & Occasion */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-purple-400" />
                Location & Occasion
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2">
                    <FaTemperatureLow className="inline mr-1" />
                    Your Location (for weather-based recommendations)
                  </label>
                  <input
                    type="text"
                    name="weatherLocation"
                    value={formData.weatherLocation}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">
                    <FaCalendarDay className="inline mr-1" />
                    Upcoming Special Occasion
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select an occasion</option>
                    <option value="work">Work/Office</option>
                    <option value="wedding">Wedding</option>
                    <option value="party">Party/Night Out</option>
                    <option value="date">Date Night</option>
                    <option value="interview">Job Interview</option>
                    <option value="vacation">Vacation</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <FaCheckCircle className="mr-2 text-green-400" />
                Review Your Style Profile
              </h3>
              <div className="bg-gray-700 rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-3">
                      Personal Info
                    </h4>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-400">Name:</span>{" "}
                        {formData.name || "Not provided"}
                      </p>
                      <p>
                        <span className="text-gray-400">Gender:</span>{" "}
                        {formData.gender || "Not provided"}
                      </p>
                      <p>
                        <span className="text-gray-400">Height:</span>{" "}
                        {formData.height
                          ? `${formData.height} cm`
                          : "Not provided"}
                      </p>
                      <p>
                        <span className="text-gray-400">Weight:</span>{" "}
                        {formData.weight
                          ? `${formData.weight} kg`
                          : "Not provided"}
                      </p>
                      <p>
                        <span className="text-gray-400">Skin Tone:</span>{" "}
                        {formData.skinTone || "Not provided"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-purple-400 mb-3">
                      Style Preferences
                    </h4>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-400">Preferred Colors:</span>
                        {formData.preferredColors.length > 0
                          ? formData.preferredColors.join(", ")
                          : "Not specified"}
                      </p>
                      <p>
                        <span className="text-gray-400">Styles:</span>
                        {formData.stylePreferences.length > 0
                          ? formData.stylePreferences.join(", ")
                          : "Not specified"}
                      </p>
                      <p>
                        <span className="text-gray-400">Location:</span>
                        {formData.weatherLocation || "Not specified"}
                      </p>
                      <p>
                        <span className="text-gray-400">Occasion:</span>
                        {formData.occasion || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4">
                <h4 className="font-semibold text-purple-300 mb-2">
                  Ready to begin your style journey?
                </h4>
                <p className="text-gray-300 text-sm">
                  Based on your preferences, our AI will create personalized
                  outfit recommendations tailored just for you!
                </p>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <motion.button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg ${
                currentStep === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              whileHover={currentStep !== 1 ? { scale: 1.05 } : {}}
              whileTap={currentStep !== 1 ? { scale: 0.95 } : {}}
            >
              Back
            </motion.button>

            {currentStep < 5 ? (
              <motion.button
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Next <FaArrowRight className="ml-2" />
              </motion.button>
            ) : (
              <motion.button
                onClick={submitForm}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Complete Your Style Profile
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StyleJourney;

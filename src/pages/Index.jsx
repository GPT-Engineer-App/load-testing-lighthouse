import { useState, useEffect, useRef } from "react";
import { Cat, ChevronDown, Paw, Heart, Info, Star, Moon, Sun, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [hoveredBreed, setHoveredBreed] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const catCharacteristics = [
    { icon: <Paw className="h-8 w-8" />, text: "Excellent hunters with sharp claws and teeth" },
    { icon: <Cat className="h-8 w-8" />, text: "Flexible bodies and quick reflexes" },
    { icon: <Star className="h-8 w-8" />, text: "Keen senses, especially hearing and night vision" },
    { icon: <Heart className="h-8 w-8" />, text: "Communicate through vocalizations, body language, and scent" },
  ];

  const catBreeds = [
    { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg", description: "Known for their distinctive color points and blue almond-shaped eyes." },
    { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg", description: "Characterized by their long, fluffy coat and flat face." },
    { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG", description: "One of the largest domesticated cat breeds, known for their intelligence and playful personality." },
    { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg", description: "Recognized for their round face and dense, plush coat." },
    { name: "Sphynx", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg", description: "Distinctive for their lack of fur, with a warm and soft skin often described as feeling like chamois leather." },
  ];

  const catFacts = [
    { title: "Sleeping Habits", content: "Cats sleep for 70% of their lives." },
    { title: "Unique Noses", content: "Each cat's nose is unique, like a human fingerprint." },
    { title: "Powerful Jump", content: "Cats can jump up to 6 times their length." },
    { title: "Whisker Wonders", content: "A cat's whiskers are the same width as its body." },
    { title: "Night Vision", content: "Cats need only 1/6th the light humans do to see clearly." },
  ];

  const { data: catPopulationData } = useQuery({
    queryKey: ['catPopulation'],
    queryFn: async () => {
      // Simulated API call
      return [
        { year: 2018, population: 95 },
        { year: 2019, population: 98 },
        { year: 2020, population: 103 },
        { year: 2021, population: 108 },
        { year: 2022, population: 112 },
      ];
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLikeCount((prevCount) => prevCount + Math.floor(Math.random() * 5) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-b from-gray-100 to-gray-200'} overflow-hidden transition-colors duration-500`}>
      {showAlert && (
        <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-96">
          <Cat className="h-4 w-4" />
          <AlertTitle>Meow!</AlertTitle>
          <AlertDescription>
            You've activated the cat alert. Prepare for cuteness overload!
          </AlertDescription>
        </Alert>
      )}
      <motion.div 
        className="relative h-screen bg-cover bg-center"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center"
          style={{ scale }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-8xl font-bold text-white mb-6 flex items-center justify-center"
          >
            <Cat className="mr-4 h-24 w-24" /> All About Cats
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center bg-white bg-opacity-20 rounded-full px-8 py-4"
          >
            <Heart className="text-red-500 h-8 w-8 mr-3" />
            <span className="text-white text-3xl font-semibold">{likeCount} cat lovers</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <Button 
              size="lg" 
              className="text-2xl px-8 py-6 bg-purple-600 hover:bg-purple-700"
              onClick={() => setShowAlert(true)}
            >
              Activate Cat Mode <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      <Button
        className="fixed top-4 right-4 z-50"
        onClick={toggleDarkMode}
        variant="outline"
      >
        {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-3xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-12 text-center leading-relaxed`}
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. 
          They are known for their independence, agility, and affectionate nature.
        </motion.p>

        <h2 className={`text-5xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Characteristics of Cats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {catCharacteristics.map((char, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} p-10 rounded-xl shadow-2xl flex items-center`}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <span className="text-6xl mr-8">{char.icon}</span>
              <p className="text-2xl">{char.text}</p>
            </motion.div>
          ))}
        </div>

        <h2 className={`text-5xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Popular Cat Breeds</h2>
        <Carousel className="mb-24">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-2xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                    onClick={() => setSelectedBreed(breed)}
                  >
                    <CardContent className="flex aspect-square items-center justify-center p-8">
                      <div className="text-center">
                        <img src={breed.image} alt={breed.name} className="w-full h-64 object-cover rounded-lg mb-6" />
                        <h3 className="text-3xl font-semibold">{breed.name}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <h2 className={`text-5xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Cat Population Growth</h2>
        <motion.div 
          className="w-full h-[500px] mb-24"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={catPopulationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Line type="monotone" dataKey="population" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <AnimatePresence>
          {selectedBreed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedBreed(null)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-12 rounded-2xl max-w-3xl w-full shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                <img src={selectedBreed.image} alt={selectedBreed.name} className="w-full h-96 object-cover rounded-xl mb-6" />
                <h3 className="text-4xl font-bold mb-4">{selectedBreed.name}</h3>
                <p className="text-2xl mb-8">{selectedBreed.description}</p>
                <Button size="lg" onClick={() => setSelectedBreed(null)} className="text-xl px-8 py-4">Close</Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className={`text-5xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Interesting Cat Facts</h2>
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto mb-24">
          {catFacts.map((fact, index) => (
            <AccordionItem key={index} value={`item-${index}`} className={isDarkMode ? 'border-gray-700' : 'border-gray-200'}>
              <AccordionTrigger className={`text-3xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {fact.title}
              </AccordionTrigger>
              <AccordionContent className={`text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {fact.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <p className={`text-4xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-12`}>
            Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and mystery.
          </p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" className={`text-2xl px-12 py-8 ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  Explore the Feline World
                </Button>
              </TooltipTrigger>
              <TooltipContent className="text-lg p-4">
                <p>Embark on a journey through the fascinating world of cats!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;

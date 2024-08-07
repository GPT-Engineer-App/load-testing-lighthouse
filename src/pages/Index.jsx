import { useState } from "react";
import { Cat, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Index = () => {
  const [hoveredBreed, setHoveredBreed] = useState(null);

  const catCharacteristics = [
    { icon: "🐾", text: "Excellent hunters with sharp claws and teeth" },
    { icon: "🐈", text: "Flexible bodies and quick reflexes" },
    { icon: "👁️", text: "Keen senses, especially hearing and night vision" },
    { icon: "😺", text: "Communicate through vocalizations, body language, and scent" },
  ];

  const catBreeds = [
    "Siamese",
    "Persian",
    "Maine Coon",
    "British Shorthair",
    "Sphynx",
  ];

  const catFacts = [
    { title: "Sleeping Habits", content: "Cats sleep for 70% of their lives." },
    { title: "Unique Noses", content: "Each cat's nose is unique, like a human fingerprint." },
    { title: "Powerful Jump", content: "Cats can jump up to 6 times their length." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="relative h-[60vh] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold text-white mb-6 flex items-center justify-center"
          >
            <Cat className="mr-4 h-16 w-16" /> All About Cats
          </motion.h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-gray-700 mb-8 text-center"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
        </motion.p>

        <h2 className="text-3xl font-semibold mb-6 text-center">Characteristics of Cats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {catCharacteristics.map((char, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md flex items-center"
            >
              <span className="text-4xl mr-4">{char.icon}</span>
              <p className="text-lg text-gray-700">{char.text}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-center">Popular Cat Breeds</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {catBreeds.map((breed, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredBreed(breed)}
              onMouseLeave={() => setHoveredBreed(null)}
            >
              <div className={`bg-white px-6 py-3 rounded-full shadow-md transition-all duration-300 ${hoveredBreed === breed ? 'bg-primary text-white' : ''}`}>
                {breed}
              </div>
              {hoveredBreed === breed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute mt-2 p-2 bg-white rounded shadow-lg text-sm"
                >
                  Learn more about {breed} cats
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-center">Interesting Cat Facts</h2>
        <Accordion type="single" collapsible className="w-full max-w-2xl mx-auto">
          {catFacts.map((fact, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-xl">
                {fact.title}
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                {fact.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-2xl text-gray-700 mt-12 text-center"
        >
          Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and mystery.
        </motion.p>
      </div>
    </div>
  );
};

export default Index;

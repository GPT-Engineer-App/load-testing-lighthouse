import { useState, useEffect } from "react";
import { Cat, ChevronDown, Paw, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const Index = () => {
  const [hoveredBreed, setHoveredBreed] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  const catCharacteristics = [
    { icon: <Paw className="h-8 w-8" />, text: "Excellent hunters with sharp claws and teeth" },
    { icon: <Cat className="h-8 w-8" />, text: "Flexible bodies and quick reflexes" },
    { icon: "👁️", text: "Keen senses, especially hearing and night vision" },
    { icon: "😺", text: "Communicate through vocalizations, body language, and scent" },
  ];

  const catBreeds = [
    { name: "Siamese", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
    { name: "Persian", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
    { name: "Maine Coon", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
    { name: "British Shorthair", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
    { name: "Sphynx", image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Sphinx2_July_2006.jpg" },
  ];

  const catFacts = [
    { title: "Sleeping Habits", content: "Cats sleep for 70% of their lives." },
    { title: "Unique Noses", content: "Each cat's nose is unique, like a human fingerprint." },
    { title: "Powerful Jump", content: "Cats can jump up to 6 times their length." },
    { title: "Whisker Wonders", content: "A cat's whiskers are the same width as its body." },
    { title: "Night Vision", content: "Cats need only 1/6th the light humans do to see clearly." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLikeCount((prevCount) => prevCount + Math.floor(Math.random() * 5) + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="relative h-[70vh] bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl font-bold text-white mb-6 flex items-center justify-center"
          >
            <Cat className="mr-4 h-20 w-20" /> All About Cats
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center bg-white bg-opacity-20 rounded-full px-6 py-3"
          >
            <Heart className="text-red-500 h-6 w-6 mr-2" />
            <span className="text-white text-2xl font-semibold">{likeCount} cat lovers</span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl text-gray-700 mb-12 text-center leading-relaxed"
        >
          Cats are fascinating creatures that have been domesticated for thousands of years. 
          They are known for their independence, agility, and affectionate nature.
        </motion.p>

        <h2 className="text-4xl font-semibold mb-8 text-center">Characteristics of Cats</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {catCharacteristics.map((char, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-5xl mr-6">{typeof char.icon === 'string' ? char.icon : char.icon}</span>
              <p className="text-xl text-gray-700">{char.text}</p>
            </motion.div>
          ))}
        </div>

        <h2 className="text-4xl font-semibold mb-8 text-center">Popular Cat Breeds</h2>
        <Carousel className="mb-16">
          <CarouselContent>
            {catBreeds.map((breed, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div className="text-center">
                      <img src={breed.image} alt={breed.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                      <h3 className="text-2xl font-semibold">{breed.name}</h3>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <h2 className="text-4xl font-semibold mb-8 text-center">Interesting Cat Facts</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto mb-16">
          {catFacts.map((fact, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-2xl">
                {fact.title}
              </AccordionTrigger>
              <AccordionContent className="text-xl">
                {fact.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-3xl text-gray-700 mb-8">
            Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and mystery.
          </p>
          <Button size="lg" className="text-xl px-8 py-6">
            Learn More About Cats
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;

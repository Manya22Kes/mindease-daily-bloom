
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const MotivationalQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const quotes = [
    {
      text: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      category: "Motivation"
    },
    {
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
      category: "Self-Belief"
    },
    {
      text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
      author: "Unknown",
      category: "Mental Health"
    },
    {
      text: "It's okay to not be okay. It's not okay to stay that way.",
      author: "Unknown",
      category: "Mental Health"
    },
    {
      text: "You are braver than you believe, stronger than you seem, and smarter than you think.",
      author: "A.A. Milne",
      category: "Self-Worth"
    },
    {
      text: "Progress, not perfection.",
      author: "Unknown",
      category: "Growth"
    },
    {
      text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious. Having feelings doesn't make you a negative person.",
      author: "Lori Deschene",
      category: "Emotional Health"
    },
    {
      text: "The strongest people are not those who show strength in front of us, but those who win battles we know nothing about.",
      author: "Unknown",
      category: "Strength"
    }
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(randomIndex);
  };

  const toggleFavorite = (index: number) => {
    setFavorites(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    // Set a random quote on component mount
    getRandomQuote();
  }, []);

  const quote = quotes[currentQuote];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 gradient-peaceful rounded-2xl flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Daily Inspiration</h2>
        <p className="text-gray-600">Words of encouragement for your journey</p>
      </div>

      {/* Featured Quote */}
      <Card className="p-12 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-white/50 text-center">
        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="text-6xl opacity-20">❝</div>
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
            {quote.text}
          </blockquote>
          <div className="space-y-2">
            <cite className="text-lg text-gray-600 not-italic">— {quote.author}</cite>
            <div className="inline-block px-3 py-1 bg-white/60 rounded-full text-sm text-gray-600">
              {quote.category}
            </div>
          </div>
          
          <div className="flex justify-center space-x-4 pt-4">
            <Button
              onClick={() => toggleFavorite(currentQuote)}
              variant={favorites.includes(currentQuote) ? "default" : "outline"}
              className={`px-6 py-3 rounded-xl ${
                favorites.includes(currentQuote)
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Heart className={`w-5 h-5 mr-2 ${favorites.includes(currentQuote) ? 'fill-current' : ''}`} />
              {favorites.includes(currentQuote) ? 'Favorited' : 'Add to Favorites'}
            </Button>
            
            <Button 
              onClick={getRandomQuote}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl"
            >
              New Quote
            </Button>
          </div>
        </div>
      </Card>

      {/* Quote Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {['Motivation', 'Mental Health', 'Self-Worth', 'Growth'].map((category) => (
          <Card key={category} className="p-6 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-center space-y-2">
              <div className="text-2xl">
                {category === 'Motivation' && '⚡'}
                {category === 'Mental Health' && '🧠'}
                {category === 'Self-Worth' && '✨'}
                {category === 'Growth' && '🌱'}
              </div>
              <h3 className="font-semibold text-gray-800">{category}</h3>
              <p className="text-sm text-gray-600">
                {quotes.filter(q => q.category === category).length} quotes
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <Card className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 text-center">Your Favorite Quotes</h3>
            <div className="space-y-4">
              {favorites.map((index) => (
                <div key={index} className="p-4 bg-white/70 rounded-xl">
                  <blockquote className="text-gray-800 mb-2">"{quotes[index].text}"</blockquote>
                  <cite className="text-gray-600 text-sm">— {quotes[index].author}</cite>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MotivationalQuotes;

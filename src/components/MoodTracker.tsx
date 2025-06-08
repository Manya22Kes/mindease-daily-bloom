
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [savedMoods, setSavedMoods] = useState<Array<{date: string, mood: string, emoji: string}>>([
    { date: '2024-01-15', mood: 'Great', emoji: '😊' },
    { date: '2024-01-14', mood: 'Good', emoji: '🙂' },
    { date: '2024-01-13', mood: 'Okay', emoji: '😐' },
  ]);

  const moods = [
    { name: 'Amazing', emoji: '🤩', color: 'from-green-400 to-green-600' },
    { name: 'Great', emoji: '😊', color: 'from-blue-400 to-blue-600' },
    { name: 'Good', emoji: '🙂', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Okay', emoji: '😐', color: 'from-orange-400 to-orange-600' },
    { name: 'Not Great', emoji: '😔', color: 'from-red-400 to-red-600' },
  ];

  const handleSaveMood = () => {
    if (selectedMood) {
      const moodData = moods.find(m => m.name === selectedMood);
      if (moodData) {
        const newEntry = {
          date: new Date().toISOString().split('T')[0],
          mood: selectedMood,
          emoji: moodData.emoji
        };
        setSavedMoods([newEntry, ...savedMoods.slice(0, 6)]);
        setSelectedMood(null);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 gradient-calm rounded-2xl flex items-center justify-center mx-auto">
          <Smile className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">How are you feeling today?</h2>
        <p className="text-gray-600">Take a moment to check in with your emotions</p>
      </div>

      {/* Mood Selection */}
      <Card className="p-8 bg-white/80 backdrop-blur-sm">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-center text-gray-800">Select Your Current Mood</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.name}
                onClick={() => setSelectedMood(mood.name)}
                className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedMood === mood.name
                    ? `bg-gradient-to-r ${mood.color} text-white shadow-lg scale-105`
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">{mood.emoji}</div>
                  <div className="text-sm font-medium">{mood.name}</div>
                </div>
              </button>
            ))}
          </div>

          {selectedMood && (
            <div className="text-center space-y-4 animate-fade-in">
              <p className="text-gray-600">You selected: <strong>{selectedMood}</strong></p>
              <Button 
                onClick={handleSaveMood}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 rounded-xl"
              >
                Save Today's Mood
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Mood History */}
      <Card className="p-8 bg-white/80 backdrop-blur-sm">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Recent Moods</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savedMoods.map((entry, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl">{entry.emoji}</div>
                  <div className="font-medium text-gray-800">{entry.mood}</div>
                  <div className="text-sm text-gray-600">{entry.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Mood Insights</h3>
          <p className="text-gray-700">
            You've been tracking your mood for 7 days. Your most common mood this week has been "Good" - that's wonderful! 
            Keep up the positive momentum.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <div className="bg-white/50 px-4 py-2 rounded-lg">
              <span className="font-medium">Average:</span> Good 🙂
            </div>
            <div className="bg-white/50 px-4 py-2 rounded-lg">
              <span className="font-medium">Streak:</span> 3 days positive
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MoodTracker;

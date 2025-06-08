
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { BookOpen } from 'lucide-react';

const JournalSpace = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [entries, setEntries] = useState([
    {
      id: 1,
      date: '2024-01-15',
      title: 'A Good Day',
      content: 'Today was particularly peaceful. I took a walk in the park and felt grateful for the small moments...',
      mood: '😊'
    },
    {
      id: 2,
      date: '2024-01-14',
      title: 'Reflection',
      content: 'Been thinking about my goals and what really matters to me. Progress feels slow but steady...',
      mood: '🤔'
    }
  ]);

  const [entryTitle, setEntryTitle] = useState('');

  const prompts = [
    "What are three things you're grateful for today?",
    "Describe a moment that brought you joy recently.",
    "What challenge are you facing, and how might you approach it?",
    "Write about someone who has positively impacted your life.",
    "What would you tell your younger self?",
    "Describe your ideal day from start to finish.",
    "What are you learning about yourself lately?",
    "Write about a goal you're working towards."
  ];

  const saveEntry = () => {
    if (currentEntry.trim()) {
      const newEntry = {
        id: entries.length + 1,
        date: new Date().toISOString().split('T')[0],
        title: entryTitle || 'Untitled Entry',
        content: currentEntry,
        mood: '📝'
      };
      setEntries([newEntry, ...entries]);
      setCurrentEntry('');
      setEntryTitle('');
    }
  };

  const usePrompt = (prompt: string) => {
    setCurrentEntry(prompt + '\n\n');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 gradient-calm rounded-2xl flex items-center justify-center mx-auto">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Your Journal Space</h2>
        <p className="text-gray-600">A safe place to express your thoughts and feelings</p>
      </div>

      {/* Writing Area */}
      <Card className="p-8 bg-white/80 backdrop-blur-sm">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">New Entry</h3>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Give your entry a title (optional)"
              value={entryTitle}
              onChange={(e) => setEntryTitle(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <Textarea
              placeholder="What's on your mind today? Write freely about your thoughts, feelings, experiences, or anything else you'd like to explore..."
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              className="min-h-[200px] p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {currentEntry.length} characters
              </span>
              <Button 
                onClick={saveEntry}
                disabled={!currentEntry.trim()}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-xl disabled:opacity-50"
              >
                Save Entry
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Writing Prompts */}
      <Card className="p-4 sm:p-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="space-y-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Need inspiration? Try these prompts:</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {prompts.slice(0, 6).map((prompt, index) => (
              <button
                key={index}
                onClick={() => usePrompt(prompt)}
                className="p-3 sm:p-4 bg-white/70 rounded-xl text-left hover:bg-white/90 transition-colors border border-white/50 text-sm sm:text-base"
              >
                <p className="text-gray-700">{prompt}</p>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Previous Entries */}
      <Card className="p-8 bg-white/80 backdrop-blur-sm">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-800">Your Recent Entries</h3>
          
          <div className="space-y-4">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <span className="mr-2">{entry.mood}</span>
                      {entry.title}
                    </h4>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {entry.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Journal Stats */}
      <Card className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Your Journaling Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-orange-600">{entries.length}</div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-yellow-600">7</div>
              <div className="text-sm text-gray-600">Days Journaling</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">3</div>
              <div className="text-sm text-gray-600">Week Streak</div>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            Journaling helps process emotions and track personal growth. Keep it up!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default JournalSpace;

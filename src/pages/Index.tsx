
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MoodTracker from '@/components/MoodTracker';
import MotivationalQuotes from '@/components/MotivationalQuotes';
import JournalSpace from '@/components/JournalSpace';
import EmotionalCheckin from '@/components/EmotionalCheckin';
import { Heart, BookOpen, MessageCircle, Smile } from 'lucide-react';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'mood':
        return <MoodTracker />;
      case 'quotes':
        return <MotivationalQuotes />;
      case 'journal':
        return <JournalSpace />;
      case 'checkin':
        return <EmotionalCheckin />;
      default:
        return <Dashboard setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-calm rounded-xl flex items-center justify-center animate-breathe">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  MindEase
                </h1>
                <p className="text-sm text-muted-foreground">Your Mental Health Companion</p>
              </div>
            </div>
            
            {activeSection !== 'dashboard' && (
              <Button 
                variant="outline" 
                onClick={() => setActiveSection('dashboard')}
                className="hover:bg-blue-50 transition-colors"
              >
                Back to Dashboard
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderSection()}
      </main>
    </div>
  );
};

const Dashboard = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  const features = [
    {
      id: 'mood',
      title: 'Mood Tracker',
      description: 'Track your daily emotions and see patterns over time',
      icon: Smile,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'quotes',
      title: 'Daily Inspiration',
      description: 'Discover motivational quotes to brighten your day',
      icon: Heart,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'journal',
      title: 'Journal Space',
      description: 'A safe space to express your thoughts and feelings',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'checkin',
      title: 'Wellness Check-in',
      description: 'Quick emotional assessments to understand yourself better',
      icon: MessageCircle,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="animate-float">
          <div className="w-20 h-20 gradient-peaceful rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 text-shadow-soft">
          Welcome to Your Mental Wellness Journey
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Take a moment to check in with yourself. Your mental health matters, and every small step counts.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">7</div>
            <div className="text-sm text-blue-700">Days Active</div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">12</div>
            <div className="text-sm text-green-700">Journal Entries</div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">Good</div>
            <div className="text-sm text-purple-700">Current Mood</div>
          </div>
        </Card>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <Card 
            key={feature.id}
            className={`p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${feature.bgColor} border-white/50 backdrop-blur-sm`}
            onClick={() => setActiveSection(feature.id)}
          >
            <div className="space-y-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center transform transition-transform hover:rotate-12`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <span>Tap to explore</span>
                <div className="ml-2 w-2 h-2 bg-current rounded-full animate-pulse"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Daily Affirmation */}
      <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 border-white/50">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Today's Affirmation</h3>
          <p className="text-xl italic text-gray-700">
            "You are stronger than you think, braver than you feel, and more loved than you know."
          </p>
          <div className="flex justify-center">
            <Heart className="w-6 h-6 text-pink-500 animate-pulse" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;

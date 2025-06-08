
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const EmotionalCheckin = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'energy',
      question: 'How would you rate your energy level today?',
      type: 'scale',
      options: [
        { value: 1, label: 'Very Low', emoji: '😴' },
        { value: 2, label: 'Low', emoji: '😑' },
        { value: 3, label: 'Moderate', emoji: '🙂' },
        { value: 4, label: 'Good', emoji: '😊' },
        { value: 5, label: 'Very High', emoji: '⚡' }
      ]
    },
    {
      id: 'stress',
      question: 'How stressed do you feel right now?',
      type: 'scale',
      options: [
        { value: 1, label: 'Not at all', emoji: '😌' },
        { value: 2, label: 'A little', emoji: '🙂' },
        { value: 3, label: 'Somewhat', emoji: '😐' },
        { value: 4, label: 'Very', emoji: '😰' },
        { value: 5, label: 'Extremely', emoji: '😵' }
      ]
    },
    {
      id: 'sleep',
      question: 'How was your sleep quality last night?',
      type: 'scale',
      options: [
        { value: 1, label: 'Very Poor', emoji: '😵‍💫' },
        { value: 2, label: 'Poor', emoji: '😴' },
        { value: 3, label: 'Fair', emoji: '😐' },
        { value: 4, label: 'Good', emoji: '😊' },
        { value: 5, label: 'Excellent', emoji: '✨' }
      ]
    },
    {
      id: 'social',
      question: 'How connected do you feel to others today?',
      type: 'scale',
      options: [
        { value: 1, label: 'Very Isolated', emoji: '😞' },
        { value: 2, label: 'Somewhat Isolated', emoji: '😔' },
        { value: 3, label: 'Neutral', emoji: '😐' },
        { value: 4, label: 'Connected', emoji: '🙂' },
        { value: 5, label: 'Very Connected', emoji: '🤗' }
      ]
    },
    {
      id: 'activities',
      question: 'What activities brought you joy today?',
      type: 'multiple',
      options: [
        { value: 'exercise', label: 'Exercise', emoji: '🏃‍♀️' },
        { value: 'nature', label: 'Time in Nature', emoji: '🌳' },
        { value: 'friends', label: 'Time with Friends', emoji: '👥' },
        { value: 'hobbies', label: 'Hobbies', emoji: '🎨' },
        { value: 'reading', label: 'Reading', emoji: '📚' },
        { value: 'music', label: 'Music', emoji: '🎵' },
        { value: 'cooking', label: 'Cooking', emoji: '🍳' },
        { value: 'meditation', label: 'Meditation', emoji: '🧘‍♀️' }
      ]
    }
  ];

  const handleResponse = (questionId: string, value: any) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetCheckin = () => {
    setCurrentStep(0);
    setResponses({});
    setShowResults(false);
  };

  const getWellnessScore = () => {
    const scores = [
      responses.energy || 0,
      5 - (responses.stress || 0) + 1, // Invert stress score
      responses.sleep || 0,
      responses.social || 0
    ];
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    return Math.round((average / 5) * 100);
  };

  const getRecommendations = () => {
    const recommendations = [];
    
    if ((responses.stress || 0) >= 4) {
      recommendations.push({
        type: 'Stress Management',
        suggestion: 'Try some deep breathing exercises or a short meditation session.',
        emoji: '🧘‍♀️'
      });
    }
    
    if ((responses.energy || 0) <= 2) {
      recommendations.push({
        type: 'Energy Boost',
        suggestion: 'Consider a short walk, some light stretching, or staying hydrated.',
        emoji: '⚡'
      });
    }
    
    if ((responses.sleep || 0) <= 2) {
      recommendations.push({
        type: 'Sleep Hygiene',
        suggestion: 'Try establishing a calming bedtime routine for better rest tonight.',
        emoji: '😴'
      });
    }
    
    if ((responses.social || 0) <= 2) {
      recommendations.push({
        type: 'Social Connection',
        suggestion: 'Reach out to a friend or family member for a quick chat.',
        emoji: '💬'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'Keep It Up!',
        suggestion: 'You\'re doing great! Keep maintaining these positive habits.',
        emoji: '🌟'
      });
    }
    
    return recommendations;
  };

  if (showResults) {
    const wellnessScore = getWellnessScore();
    const recommendations = getRecommendations();

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 gradient-peaceful rounded-2xl flex items-center justify-center mx-auto">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Your Wellness Check-in Results</h2>
        </div>

        {/* Wellness Score */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Today's Wellness Score</h3>
            <div className="relative">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-800">{wellnessScore}%</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              {wellnessScore >= 80 ? "Excellent! You're having a great day." :
               wellnessScore >= 60 ? "Good work! You're on a positive track." :
               wellnessScore >= 40 ? "You're doing okay. Small steps matter." :
               "Take it easy today. Be kind to yourself."}
            </p>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Personalized Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{rec.emoji}</span>
                      <h4 className="font-semibold text-gray-800">{rec.type}</h4>
                    </div>
                    <p className="text-gray-700 text-sm">{rec.suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Summary */}
        <Card className="p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Your Responses Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>Energy Level: {responses.energy}/5</div>
              <div>Stress Level: {responses.stress}/5</div>
              <div>Sleep Quality: {responses.sleep}/5</div>
              <div>Social Connection: {responses.social}/5</div>
            </div>
            {responses.activities && (
              <div>
                <strong>Activities that brought joy:</strong> {responses.activities.join(', ')}
              </div>
            )}
          </div>
        </Card>

        <div className="text-center">
          <Button 
            onClick={resetCheckin}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl"
          >
            Take Another Check-in
          </Button>
        </div>
      </div>
    );
  }

  const question = questions[currentStep];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 gradient-calm rounded-2xl flex items-center justify-center mx-auto">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Wellness Check-in</h2>
        <p className="text-gray-600">Take a moment to reflect on how you're feeling</p>
      </div>

      {/* Progress */}
      <div className="max-w-md mx-auto">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <Card className="p-8 bg-white/80 backdrop-blur-sm">
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-gray-800 text-center">
            {question.question}
          </h3>

          {question.type === 'scale' && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleResponse(question.id, option.value)}
                  className={`p-6 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    responses[question.id] === option.value
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {question.type === 'multiple' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {question.options.map((option) => {
                const isSelected = (responses[question.id] || []).includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      const current = responses[question.id] || [];
                      const updated = isSelected 
                        ? current.filter((v: string) => v !== option.value)
                        : [...current, option.value];
                      handleResponse(question.id, updated);
                    }}
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-2xl">{option.emoji}</div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <div className="text-center">
            <Button 
              onClick={nextStep}
              disabled={!responses[question.id]}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 rounded-xl disabled:opacity-50"
            >
              {currentStep === questions.length - 1 ? 'See Results' : 'Next Question'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmotionalCheckin;

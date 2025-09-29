import React, { useState, useCallback } from 'react';
import { generateArticle, generateImage, contentAngles } from './services/geminiService';
import { useDailyGeneration } from './hooks/useDailyGeneration';
import { countries, Country } from './countries';
import type { ArticleData, ArticleContent } from './types';
import { ArticleDisplay } from './components/ArticleDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RegenerateIcon, GlobeIcon } from './components/IconComponents';

const Header = () => (
    <header className="text-center py-8 md:py-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            Al Nafi Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Content Strategist</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Generate unique, AI-powered articles on emerging tech, tailored for different countries and cultures.
        </p>
    </header>
);

const Footer = () => (
    <footer className="text-center py-6 mt-12 border-t border-slate-700/50">
        <p className="text-gray-500">Powered by Google Gemini. Built for Al Nafi International College.</p>
    </footer>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(countries.find(c => c.code === 'US') || null);
  
  const { canGenerate, todaysArticle, saveArticleForToday, nextTopic, remainingTopicsCount } = useDailyGeneration(selectedCountry?.code || null);

  const runGeneration = useCallback(async () => {
    if (!nextTopic || !selectedCountry) {
        setError("Please select a country and ensure a topic is available.");
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const angle = contentAngles[Math.floor(Math.random() * contentAngles.length)];
      
      const articleContent: ArticleContent = await generateArticle(nextTopic, angle, selectedCountry.name, selectedCountry.language);
      const imageUrl = await generateImage(articleContent.imagePrompt, selectedCountry.name, nextTopic);
      
      const articleData: Omit<ArticleData, 'topic'> = { ...articleContent, imageUrl };
      saveArticleForToday(articleData, nextTopic);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [saveArticleForToday, nextTopic, selectedCountry]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    const country = countries.find(c => c.code === countryCode) || null;
    setSelectedCountry(country);
    setError(null); // Clear error when country changes
  };

  const handleGenerate = useCallback(async () => {
    if (!canGenerate || isLoading || !selectedCountry) return;
    await runGeneration();
  }, [canGenerate, isLoading, runGeneration, selectedCountry]);

  const handleRegenerate = useCallback(async () => {
    if (isLoading || !selectedCountry) return;
    await runGeneration();
  }, [isLoading, runGeneration, selectedCountry]);

  const renderInitialState = () => (
    <div className="text-center my-12 bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 p-8 md:p-12 border border-slate-700/50">
        <div className="flex flex-col items-center gap-6">
            <label htmlFor="country-select" className="sr-only">Select a Country</label>
            <div className="relative w-full max-w-md">
                <GlobeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 pointer-events-none" />
                <select 
                    id="country-select"
                    value={selectedCountry?.code || ""}
                    onChange={handleCountryChange}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/80 border border-slate-600 rounded-lg text-white text-lg focus:ring-2 focus:ring-teal-400 focus:outline-none appearance-none"
                >
                    <option value="" disabled>-- Select a Country --</option>
                    {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                </select>
            </div>

            {error && <p className="text-red-400 bg-red-900/50 border border-red-700 rounded-md p-4 max-w-md">{error}</p>}
            
            <button
                onClick={handleGenerate}
                disabled={!canGenerate || isLoading || !selectedCountry}
                className="bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-4 px-12 rounded-full text-xl shadow-lg shadow-teal-500/20 hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
                {selectedCountry ? (canGenerate ? `Generate Article for ${selectedCountry.name}` : 'Article Generated for Today') : 'Select a Country to Begin'}
            </button>
            
            {selectedCountry && !canGenerate && <p className="text-gray-400 mt-2">Come back tomorrow for a new article for {selectedCountry.name}!</p>}
        </div>
    </div>
  );
  
  const CountrySelector = ({id}: {id: string}) => (
    <div className="relative">
      <GlobeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      <select 
          id={id}
          value={selectedCountry?.code || ""}
          onChange={handleCountryChange}
          className="w-full pl-10 pr-4 py-2 bg-slate-800/60 border border-slate-600 rounded-lg text-white font-semibold focus:ring-2 focus:ring-teal-400 focus:outline-none appearance-none"
          aria-label="Select a country to display an article for"
      >
          {countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
      </select>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-900 font-sans flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 flex flex-col items-center justify-center">
            {isLoading && <LoadingSpinner />}
            {!isLoading && todaysArticle ? (
                <>
                    <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                        <div className="flex items-center gap-4">
                            <CountrySelector id="country-select-active" />
                            <div className="text-center sm:text-left">
                                <p className="font-bold text-white text-lg">Topic: <span className="font-semibold text-teal-400">{todaysArticle.topic}</span></p>
                                <p className="text-sm text-gray-400">{remainingTopicsCount} Technologies Remaining</p>
                            </div>
                        </div>
                        <button
                            onClick={handleRegenerate}
                            disabled={isLoading}
                            className="flex items-center gap-2 bg-slate-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            <RegenerateIcon className="w-5 h-5" />
                            <span>Regenerate Article</span>
                        </button>
                    </div>
                    {error && <p className="text-red-400 bg-red-900/50 border border-red-700 rounded-md p-3 text-center mb-4 max-w-xl w-full">{error}</p>}
                    <ArticleDisplay article={todaysArticle} />
                </>
            ) : !isLoading && renderInitialState()}
        </main>
        <Footer />
    </div>
  );
};

export default App;
import React, { useState, useCallback, useEffect } from 'react';
import type { ArticleData } from '../types';
import { ClipboardIcon, CheckIcon } from './IconComponents';

interface ArticleDisplayProps {
  article: ArticleData;
}

type Tab = 'article' | 'caption' | 'translation';

const CopyButton: React.FC<{ textToCopy: string; isHtml?: boolean }> = ({ textToCopy, isHtml = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (isHtml) {
        const htmlBlob = new Blob([textToCopy], { type: 'text/html' });
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = textToCopy;
        const plainText = tempDiv.textContent || "";
        const textBlob = new Blob([plainText], { type: 'text/plain' });

        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': htmlBlob,
            'text/plain': textBlob,
          })
        ]);
      } else {
        await navigator.clipboard.writeText(textToCopy);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Could not copy text: ", err);
      // Fallback for any error
      try {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = textToCopy;
        const plainText = tempDiv.textContent || "";
        await navigator.clipboard.writeText(plainText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err2) {
          console.error("Fallback plain text copy failed: ", err2);
      }
    }
  }, [textToCopy, isHtml]);


  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 bg-slate-700/50 hover:bg-teal-600/80 text-white font-bold p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-sm z-10"
      aria-label="Copy to clipboard"
    >
      {copied ? <CheckIcon className="h-5 w-5 text-green-400" /> : <ClipboardIcon className="h-5 w-5" />}
    </button>
  );
};

export const ArticleDisplay: React.FC<ArticleDisplayProps> = ({ article }) => {
  const [activeTab, setActiveTab] = useState<Tab>('article');

  // Reset to article tab if article changes
  useEffect(() => {
    setActiveTab('article');
  }, [article]);

  const renderContent = () => {
    let contentToRender, textToCopy, isHtml = false;
    
    switch (activeTab) {
      case 'article':
        contentToRender = <div className="prose prose-invert lg:prose-lg max-w-none prose-p:text-gray-300 prose-headings:text-gray-100 prose-headings:font-extrabold prose-h1:text-3xl prose-h1:text-teal-400 prose-h2:text-2xl prose-h2:text-blue-400 prose-h3:text-xl prose-h3:text-gray-200 prose-strong:text-white prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-ul:list-disc prose-li:my-1 prose-li:text-gray-300" dangerouslySetInnerHTML={{ __html: article.articleBody }} />;
        textToCopy = article.articleBody;
        isHtml = true;
        break;
      case 'caption':
        contentToRender = <p className="whitespace-pre-wrap text-gray-300 text-base leading-relaxed">{article.caption}</p>;
        textToCopy = article.caption;
        break;
      case 'translation':
        contentToRender = <div className="prose prose-invert lg:prose-lg max-w-none prose-p:text-gray-300 prose-headings:text-gray-100" dangerouslySetInnerHTML={{ __html: article.translatedArticleBody || "Translation not available." }} />;
        textToCopy = article.translatedArticleBody || "";
        isHtml = true;
        break;
      default:
        contentToRender = null;
        textToCopy = "";
    }
    return <div className="relative p-1"><CopyButton textToCopy={textToCopy} isHtml={isHtml} />{contentToRender}</div>
  };

  const getTabClass = (tabName: Tab) => 
    `px-4 py-2 text-sm font-semibold rounded-t-md transition-colors duration-300 flex items-center gap-2 border-b-2 ${
      activeTab === tabName 
        ? 'bg-slate-800/60 text-teal-400 border-teal-400' 
        : 'bg-transparent text-gray-400 hover:text-white border-transparent hover:border-gray-500'
    }`;
    
  return (
    <div className="w-full max-w-6xl mx-auto my-8 animate-fade-in">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/30 overflow-hidden border border-slate-700/50">
            
            <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-[500px] object-cover" />

            <div className="p-6 md:p-8 flex flex-col">
            
                <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight text-center">{article.title}</h1>
                
                <div className="flex-grow flex flex-col mt-4">
                    <div className="flex space-x-2 border-b border-slate-700">
                        <button onClick={() => setActiveTab('article')} className={getTabClass('article')}>
                            Main Article
                        </button>
                        <button onClick={() => setActiveTab('caption')} className={getTabClass('caption')}>
                            Caption
                        </button>
                        {article.translatedTitle && (
                           <button onClick={() => setActiveTab('translation')} className={getTabClass('translation')}>
                                English Translation
                           </button>
                        )}
                    </div>

                    <div className="bg-slate-900/50 rounded-b-lg flex-grow p-4 md:p-6 min-h-[300px] overflow-y-auto">
                        {renderContent()}
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

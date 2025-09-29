import { useState, useEffect, useCallback } from 'react';
import type { ArticleData } from '../types';
import { technologyTopics, technologyTopicsVersion } from '../services/geminiService';

const getArticleStorageKey = (countryCode: string) => `dailyArticleData_${countryCode}`;
// Suffix changed to prevent conflicts with old storage format
const getTopicQueueKey = (countryCode: string) => `topicQueue_v2_${countryCode}`;

interface StoredData {
  date: string;
  article: ArticleData;
}

interface StoredQueue {
  version: string;
  queue: string[];
}

const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format in UTC
};

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const useDailyGeneration = (countryCode: string | null) => {
  const [canGenerate, setCanGenerate] = useState<boolean>(false);
  const [todaysArticle, setTodaysArticle] = useState<ArticleData | null>(null);
  const [nextTopic, setNextTopic] = useState<string | null>(null);
  const [remainingTopicsCount, setRemainingTopicsCount] = useState<number>(0);

  useEffect(() => {
    if (!countryCode) {
      setCanGenerate(false);
      setTodaysArticle(null);
      setNextTopic(null);
      setRemainingTopicsCount(0);
      return;
    }

    try {
      const articleKey = getArticleStorageKey(countryCode);
      const queueKey = getTopicQueueKey(countryCode);

      // Check for today's article
      const storedDataString = localStorage.getItem(articleKey);
      if (storedDataString) {
        const storedData: StoredData = JSON.parse(storedDataString);
        if (storedData.date === getTodayDateString()) {
          setCanGenerate(false);
          setTodaysArticle(storedData.article);
        } else {
          setCanGenerate(true);
          setTodaysArticle(null);
        }
      } else {
        setCanGenerate(true);
        setTodaysArticle(null);
      }

      // Initialize or load topic queue with version check
      const storedQueueString = localStorage.getItem(queueKey);
      let queue: string[] = [];
      let queueNeedsUpdate = true;

      if (storedQueueString) {
          try {
              const storedQueueData: StoredQueue = JSON.parse(storedQueueString);
              if (storedQueueData.version === technologyTopicsVersion && storedQueueData.queue.length > 0) {
                  queue = storedQueueData.queue;
                  queueNeedsUpdate = false;
              }
          } catch (e) {
              console.warn("Could not parse topic queue from localStorage. A new one will be created.");
          }
      }

      if (queueNeedsUpdate) {
          queue = shuffleArray(technologyTopics);
          const newQueueData: StoredQueue = { version: technologyTopicsVersion, queue: queue };
          localStorage.setItem(queueKey, JSON.stringify(newQueueData));
      }
      
      setNextTopic(queue[0] || null);
      setRemainingTopicsCount(queue.length);

    } catch (error) {
        console.error("Failed to read from localStorage", error);
        setCanGenerate(true);
        // Fallback to a default state
        const freshQueue = shuffleArray(technologyTopics);
        setNextTopic(freshQueue[0]);
        setRemainingTopicsCount(freshQueue.length);
    }
  }, [countryCode]);

  const saveArticleForToday = useCallback((article: Omit<ArticleData, 'topic'>, topic: string) => {
    if (!countryCode) return;

    const articleKey = getArticleStorageKey(countryCode);
    const queueKey = getTopicQueueKey(countryCode);

    const fullArticleData: ArticleData = { ...article, topic };

    const dataToStore: StoredData = {
      date: getTodayDateString(),
      article: fullArticleData,
    };
    try {
        localStorage.setItem(articleKey, JSON.stringify(dataToStore));
        setCanGenerate(false);
        setTodaysArticle(fullArticleData);

        // Advance the version-aware queue
        const storedQueueString = localStorage.getItem(queueKey);
        let queue: string[] = [];
        if (storedQueueString) {
            try {
                const storedQueueData: StoredQueue = JSON.parse(storedQueueString);
                if(storedQueueData.version === technologyTopicsVersion) {
                    queue = storedQueueData.queue;
                }
            } catch(e) { /* will create new queue below */ }
        }
        
        queue.shift(); // Remove the topic we just used
        
        if (queue.length === 0) {
            queue = shuffleArray(technologyTopics);
        }
        
        const newQueueData: StoredQueue = { version: technologyTopicsVersion, queue: queue };
        localStorage.setItem(queueKey, JSON.stringify(newQueueData));
        setNextTopic(queue[0] || null);
        setRemainingTopicsCount(queue.length);

    } catch(error) {
        console.error("Failed to write to localStorage", error);
    }
  }, [countryCode]);

  return { canGenerate, todaysArticle, saveArticleForToday, nextTopic, remainingTopicsCount };
};
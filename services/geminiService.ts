import { GoogleGenAI, Type } from "@google/genai";
import type { ArticleContent } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const technologyTopicsVersion = '1.1';

// Generic list of technology domains, applicable to any country
export const technologyTopics = [
  // Digital & Intelligence Power
  "AI & Machine Learning",
  "Cloud Computing & Big Data",
  "5G/6G Communication and Beyond",
  "Cybersecurity",
  "Blockchain",
  "Synthetic Media",
  "Brain-Computer Interfaces",
  "Digital Infrastructure & Platforms (AWS, SaaS, low-code/no-code)",
  "Data Science & Analytics (BI, data engineering, visualization)",
  
  // Defense & Security Power
  "Semiconductor & Chip Design",
  "Quantum Computing",
  "Drone & Autonomous Weapons",
  "Robotics & Automation",
  "Optics & Photonics (lasers, sensors, quantum comms)",
  "Satellite & Navigation Systems (GNSS, ISR, space internet)",
  "Nuclear Technologies (Civil & Defense)",
  
  // Industrial & Manufacturing Power
  "Advanced Materials Science (composites, metamaterials, superconductors)",
  "Advanced Manufacturing (Industry 4.0: 3D/4D printing, digital twins, smart factories)",
  "Supply Chain Tech",
  "Nanotechnology",
  
  // Energy & Environmental Power
  "Energy Systems (renewables, smart grids, nuclear fusion)",
  "Environmental & Climate Tech (carbon capture, green hydrogen, geoengineering)",
  "Desalination & Water",
  "Green Jobs & Sustainability Tech (ESG, smart cities, renewables ops)",
  
  // Health & Bio Power
  "Bioengineering",
  "Agricultural Biotech",
  "Synthetic Biology",
  "Pharmaceuticals & Genomics (CRISPR, precision medicine, vaccines)",
  "Healthcare & Remote Health Tech (telemedicine, health informatics, AI diagnostics)",
  
  // Space & Aerospace Power
  "Space Tech (exploration, propulsion, defense)",
  
  // Financial & Economic Power
  "High-Frequency Finance",
  "Financial Technologies (FinTech & Digital Currencies: CBDCs, DeFi, sovereign rails)",
  "E-Commerce & Digital Trade (online marketplaces, cross-border fintech, logistics)",
  
  // Creative & Mobility Power
  "Creative & Digital Content Industries (gaming, VR/AR, digital marketing, AI media creation)",
  "Transportation & Smart Mobility (EVs, autonomous vehicles, IoT logistics, drone delivery)"
];

// Generic list of content angles
export const contentAngles = [
    "Focus on the specific investments the country is making in this technology and the expected ROI for the nation.",
    "Explore how this technology is being applied in the context of one of the country's major national projects.",
    "Analyze the impact of this technology on the local workforce, the demand for new skills, and the role of education.",
    "Detail the application of this technology within a specific, critical sector like Defense, Finance, or Healthcare in the country.",
    "Provide a deep-dive into the current landscape of startups and established companies in this tech sector within the country.",
    "Discuss the policy and regulatory frameworks the country is developing to support and govern this technology.",
    "Based on recent news and developments, project the 5-year future of this technology in the country.",
    "Compare the country's approach and progress in this technology to other leading countries in its region.",
    "Examine the role of public-private partnerships in accelerating the adoption and development of this technology.",
    "Write about how this technology is directly helping to achieve specific national goals or visions."
];

// Define the response schema for the article content
const articleSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: 'A viral, high-stakes headline (max 15 words) in the target language. It must be intensely curiosity-driven, posing a bold claim or a provocative question about the technology\'s monumental impact on the country\'s future. The tone should be authoritative yet sensational, making it irresistible for professionals to click. For example, instead of a simple title like "Saudi Arabia\'s Blockchain Dawn", a better headline would be "The Single Blockchain Investment Set to Redefine Saudi Arabia\'s Global Power." It must feel urgent, transformational, and directly tied to the nation\'s identity and ambitions.'
    },
    articleBody: {
      type: Type.STRING,
      description: 'The main article content in HTML format (using h2, h3, p, ul, li, strong tags), written in the target language. The article should be 500-700 words. It must naturally integrate mentions of "Al Nafi International College" and its "Diploma in AIOPS" 1-2 times *within the body*, positioning AIOPS as a foundational skill for the discussed technology. This is in addition to the final paragraph. The article MUST conclude with a powerful call-to-action as its final paragraph, seamlessly integrating a mention of the "Diploma in AIOPS" and a hyperlink to `https://alnafi.com/aiops` using an `<a>` tag with `target="_blank"`. This CTA must be persuasive and feel like a natural conclusion.'
    },
    caption: {
      type: Type.STRING,
      description: 'A short, engaging social media caption (e.g., for LinkedIn) written in the target language. Include relevant hashtags related to the country, its national vision (if any), and the specific technology.'
    },
    imageHeadline: {
        type: Type.STRING,
        description: 'A very short, powerful phrase (3-5 words) in the target language to be overlaid on the generated image. This should be an evocative, abstract tagline capturing the core theme, like a movie poster tagline for a tech thriller.'
    },
    imagePrompt: {
      type: Type.STRING,
      description: 'A detailed, descriptive prompt for an image generation model. The prompt must create a powerful, photorealistic image that is instantly and unmistakably identifiable with the target country AND the specific technology topic. It must masterfully blend clear, recognizable visual elements of the technology with an iconic, famous national symbol (e.g., a monument, flag colors, or traditional art style). The visual representation of the technology must be central and integral to the image, not a generic or background element. For example, for "Quantum Computing", this could be visual metaphors for quantum states integrated with the architecture of a famous landmark. The final scene must look like a high-budget, cinematic shot, conveying ambition, innovation, and national pride. Avoid generic sci-fi visuals. The prompt must not contain any female figures.'
    }
  },
  required: ['title', 'articleBody', 'caption', 'imageHeadline', 'imagePrompt']
};

const researchTopic = async (topic: string, angle: string, country: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Using Google Search, gather ONLY verifiable facts, key figures, official names, and dates related to the topic: "${topic}" with a specific focus on this angle: "${angle}". The context is exclusively ${country}. Present this information as a structured list of bullet points. Do not synthesize, analyze, or predict future events unless they are confirmed in search results. The output should be a raw collection of factual data points, not a prose summary.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error during research phase:", error);
    throw new Error("Failed to gather authentic information using Google Search.");
  }
};

const translateContentToEnglish = async (content: ArticleContent): Promise<Partial<ArticleContent>> => {
    try {
        const translationPrompt = `Translate the following JSON content's 'title', 'articleBody' (preserving HTML structure), and 'caption' fields to English. Return ONLY the translated JSON object with the fields: translatedTitle, translatedArticleBody, translatedCaption.

        Original Content:
        ${JSON.stringify({ title: content.title, articleBody: content.articleBody, caption: content.caption })}
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: translationPrompt
        });

        // Robustly extract JSON from the model's response string
        const text = response.text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error("No valid JSON object found in translation response.");
        }
        
        const translated = JSON.parse(jsonMatch[0]);

        return {
            translatedTitle: translated.translatedTitle,
            translatedArticleBody: translated.translatedArticleBody,
            translatedCaption: translated.translatedCaption
        };

    } catch (error) {
        console.error("Error translating content:", error);
        return {
            translatedTitle: "Translation Failed",
            translatedArticleBody: `<p>Could not translate content. Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>`,
            translatedCaption: "Translation Failed"
        };
    }
};


export const generateArticle = async (topic: string, angle: string, country: string, language: string): Promise<ArticleContent> => {
  const researchResults = await researchTopic(topic, angle, country);

  try {
    const generationPrompt = `
    **CRITICAL INSTRUCTION: Adhere Strictly to the Provided Research.**
    You will be provided with a list of verified facts. You MUST use ONLY this information to generate the article package.
    - **NO FABRICATION:** Do not invent any details (names, dates, programs, laws) not present in the research.
    - **NO SPECULATION:** Do not invent or predict future events unless explicitly stated in the research.
    - **GROUNDING:** Every claim in your output must be directly supported by the research material below.
    - **FAILURE:** Any violation of these rules is a critical failure.

    --- VERIFIED RESEARCH FACTS START ---
    ${researchResults}
    --- VERIFIED RESEARCH FACTS END ---

    Now, using ONLY the facts above, generate the article package.
    The target language for all generated text is: ${language}.
    The topic is "${topic}" in the context of ${country}.
    The specific angle is: "${angle}".

    **Content Integration Mandate:**
    Throughout the article, whenever discussing the need for new skills or professional development to manage this technology, you must naturally and contextually mention 'Al Nafi International College'. Frame its 'Diploma in AIOPS' as the essential foundation required to enter these advanced fields. Explain that Al Nafi's unique model allows students to combine this core AIOPS diploma with specialized practical labs in any of the 36 critical technologies, like the one discussed in this article. Weave this into the narrative 1-2 times *before* the final call-to-action.

    The article must tell a compelling story, deeply rooted in the context of ${country}, its ambitions, and its specific national initiatives (e.g., 'Vision 2030' for Saudi Arabia, 'Digital India' for India, etc.). Use geopolitical keywords where relevant.
    The headings used within the article body should be crafted to be emotionally engaging and culturally specific, capturing the attention of a professional audience within ${country}.
    Crucially, the final paragraph of the article body must seamlessly integrate a call-to-action promoting the "Diploma in AIOPS" with a link to https://alnafi.com/aiops.`;
      
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: generationPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: articleSchema,
        systemInstruction: "You are an elite global tech analyst and cultural commentator specializing in how emerging technologies intersect with national strategies. Your primary directive is to ensure 100% factual accuracy based ONLY on the verified research provided to you. You must be authoritative and insightful without ever inventing information. Your writing must be deeply culturally resonant for the target country. The entire JSON output, including all text fields, must be in the specified target language.",
      },
    });

    const jsonText = response.text.trim();
    const articleContent = JSON.parse(jsonText) as ArticleContent;

    // --- Translation Step (if needed) ---
    if (language.toLowerCase() !== 'english') {
        const translations = await translateContentToEnglish(articleContent);
        return { ...articleContent, ...translations };
    }
    return articleContent;

  } catch (error) {
    console.error(`Error during article generation:`, error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate article content: ${error.message}`);
    }
    throw new Error(`An unknown error occurred during article generation.`);
  }
};

export const generateImage = async (prompt: string, countryName: string, topic: string): Promise<string> => {
  try {
    const reinforcedPrompt = `${prompt}. The image MUST prominently and clearly feature visual elements related to the technology topic: "${topic}". It must be a powerful, cinematic, photorealistic representation of ${countryName}'s technological future, instantly recognizable as being from ${countryName} through its unique cultural and architectural identity. The aesthetic must be premium, polished, and powerful, like a shot from a blockbuster film.`;
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: reinforcedPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated.");
    }
  } catch (error)
  {
    console.error("Error generating image:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};
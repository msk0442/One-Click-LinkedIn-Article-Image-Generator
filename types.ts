export interface ArticleContent {
  title: string;
  articleBody: string;
  caption: string;
  imageHeadline: string; // The short, punchy text for the image itself.
  imagePrompt: string;
  translatedTitle?: string;
  translatedArticleBody?: string;
  translatedCaption?: string;
}

export interface ArticleData extends ArticleContent {
  imageUrl: string;
  topic: string;
}

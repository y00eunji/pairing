export interface idealRecommendList {
  name: string;
  age: number;
  city: string;
  district: string;
  images: string[];
}

export interface keywordRecommendList {
  keywordId: number;
  name: string;
  age: number;
  city: string;
  district: string;
  images: string[];
}

export interface keywordsList {
  keywordId: number;
  icon: React.ReactNode;
  title: string;
}

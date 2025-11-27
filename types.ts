export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface RecipePreview {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'Cães' | 'Gatos' | 'Bebidas';
}

export interface FaqItem {
  question: string;
  answer: string;
}
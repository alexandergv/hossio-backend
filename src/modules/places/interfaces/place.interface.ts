// interfaces/place.interface.ts
export interface Review {
    text: string;
    author: string;
  }
  
  export interface Place {
    id: number;
    name: string;
    description: string;
    rating: number;
    images: string[];
    reviews: Review[];
    latitude: string;
    longitude: string;
  }
  
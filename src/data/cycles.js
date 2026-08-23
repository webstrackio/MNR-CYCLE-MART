import {
  Mountain,
  Bike,
  Zap,
  Smile,
  Heart,
  Bus,
} from 'lucide-react';

const cycles = [
  {
    id: 1,
    title: 'Mountain Bikes',
    icon: Mountain,
    description: 'For trails, adventure, and off-road riding. Built tough for the roughest terrain.',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Road Bikes',
    icon: Bike,
    description: 'For speed, distance, and performance. Lightweight frames for serious riders.',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Hybrid Bikes',
    icon: Smile,
    description: 'For everyday city rides and versatile cycling. The best of both worlds.',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Kids Cycles',
    icon: Heart,
    description: 'Safe and comfortable cycles for young riders. Fun designs they will love.',
    image: 'https://images.unsplash.com/photo-1559432215-99c5e37f00e4?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Electric Cycles',
    icon: Zap,
    description: 'Modern assisted cycling for convenient rides. Go farther with less effort.',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'City Cycles',
    icon: Bus,
    description: 'Comfortable options for everyday use. Stylish, practical, and reliable.',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&h=400&fit=crop',
  },
];

export default cycles;
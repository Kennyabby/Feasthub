import burgerImg from '@assets/stock_images/delicious_gourmet_bu_4b6815a1.jpg';
import pizzaImg from '@assets/stock_images/pepperoni_pizza_dark_2f5fb716.jpg';
import shawarmaImg from '@assets/stock_images/chicken_shawarma_wra_9f0ec0d2.jpg';
import riceImg from '@assets/stock_images/jollof_rice_with_gri_6e3baba3.jpg';
import wingsImg from '@assets/stock_images/grilled_bbq_chicken__415af449.jpg';
import cakeImg from '@assets/stock_images/decadent_chocolate_c_70a0eee6.jpg';
import milkshakeImg from '@assets/stock_images/strawberry_milkshake_87b3d89a.jpg';
import pastaImg from '@assets/stock_images/creamy_pasta_carbona_2c0405fb.jpg';
import saladImg from '@assets/stock_images/fresh_greek_salad_bo_836b1f50.jpg';
import cocktailImg from '@assets/stock_images/cocktail_drink_glass_696ec9f0.jpg';
import plantainImg from '@assets/stock_images/plate_of_fried_plant_c4f199cf.jpg';

export const categories = [
  { id: "rice", name: "Rice Meals", image: riceImg },
  { id: "shawarma", name: "Shawarma", image: shawarmaImg },
  { id: "burgers", name: "Burgers", image: burgerImg },
  { id: "grills", name: "Grills", image: wingsImg },
  { id: "pasta", name: "Pasta", image: pastaImg },
  { id: "sides", name: "Sides", image: plantainImg },
  { id: "drinks", name: "Drinks", image: cocktailImg },
  { id: "desserts", name: "Desserts", image: cakeImg },
];

export const products = [
  {
    id: 1,
    name: "Ultimate Double Cheese Burger",
    description: "Double beef patty, melted cheddar, caramelized onions, and special sauce.",
    price: 4500,
    rating: 4.8,
    category: "burgers",
    image: burgerImg,
    popular: true,
  },
  {
    id: 2,
    name: "Spicy Chicken Shawarma",
    description: "Grilled chicken strips, fresh veggies, spicy garlic sauce in toasted pita.",
    price: 3000,
    rating: 4.7,
    category: "shawarma",
    image: shawarmaImg,
    popular: true,
  },
  {
    id: 3,
    name: "Jollof Rice Fiesta",
    description: "Smoky party jollof rice served with fried plantain and grilled chicken.",
    price: 3500,
    rating: 4.9,
    category: "rice",
    image: riceImg,
    popular: true,
  },
  {
    id: 4,
    name: "BBQ Chicken Wings (6pcs)",
    description: "Tender chicken wings glazed in our signature smoky BBQ sauce.",
    price: 4000,
    rating: 4.6,
    category: "grills",
    image: wingsImg,
    popular: true,
  },
  {
    id: 5,
    name: "Pepperoni Feast Pizza",
    description: "Loaded with pepperoni, mozzarella cheese, and rich tomato sauce.",
    price: 6000,
    rating: 4.8,
    category: "pizza",
    image: pizzaImg,
    popular: true,
  },
  {
    id: 6,
    name: "Oreo Milkshake",
    description: "Creamy vanilla shake blended with crushed Oreo cookies.",
    price: 2500,
    rating: 4.9,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80",
    popular: false,
  },
  {
    id: 7,
    name: "Grilled Catfish",
    description: "Whole grilled catfish marinated in spicy herbs, served with coleslaw.",
    price: 7000,
    rating: 4.5,
    category: "grills",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    popular: false,
  },
  {
    id: 8,
    name: "Fried Rice & Turkey",
    description: "Classic fried rice with veggies and fried turkey wings.",
    price: 3800,
    rating: 4.4,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
    popular: false,
  },
  {
    id: 9,
    name: "Creamy Carbonara",
    description: "Italian pasta with rich creamy sauce, bacon bits, and parmesan cheese.",
    price: 5500,
    rating: 4.7,
    category: "pasta",
    image: pastaImg,
    popular: true,
  },
  {
    id: 10,
    name: "Fried Plantain (Dodo)",
    description: "Sweet ripe plantains fried to golden perfection.",
    price: 1000,
    rating: 4.8,
    category: "sides",
    image: plantainImg,
    popular: true,
  },
  {
    id: 11,
    name: "Greek Salad",
    description: "Fresh cucumbers, tomatoes, olives, and feta cheese with olive oil dressing.",
    price: 3500,
    rating: 4.5,
    category: "sides",
    image: saladImg,
    popular: false,
  },
  {
    id: 12,
    name: "Decadent Chocolate Cake",
    description: "Rich, moist chocolate cake layered with ganache.",
    price: 3000,
    rating: 4.9,
    category: "desserts",
    image: cakeImg,
    popular: true,
  },
  {
    id: 13,
    name: "Strawberry Milkshake",
    description: "Made with real strawberries and premium vanilla ice cream.",
    price: 2800,
    rating: 4.6,
    category: "drinks",
    image: milkshakeImg,
    popular: false,
  },
  {
    id: 14,
    name: "Sunset Cocktail",
    description: "Refreshing blend of tropical juices with a splash of grenadine (Non-alcoholic).",
    price: 2000,
    rating: 4.7,
    category: "drinks",
    image: cocktailImg,
    popular: false,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    text: "The delivery was super fast! Food arrived hot and tasted amazing. The Jollof rice is a must-try.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Michael Adebayo",
    text: "Best shawarma in town. I order from here at least twice a week. The spicy sauce is legendary.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Jessica Wu",
    text: "Love the user interface of the website. Ordering is so easy and the tracking feature is very accurate.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export const services = [
  {
    "number": "01",
    "title": "Recurring Cleaning",
    "slug": "recurring-cleaning",
    "description": "Weekly, biweekly or monthly cleaning that fits your schedule.",
    "image": "/recurring-cleaning.png",
    "basePrice": 0,
    "complexityOptions": [],
    "fullDescription": "Keep your home consistently clean without having to think about it. Our recurring cleaning service is available on a weekly, biweekly, or customized schedule based on your needs. We take care of the routine cleaning so you can spend less time maintaining your home and more time enjoying it."
  },
  {
    "number": "02",
    "title": "One-Time Cleaning",
    "slug": "one-time-cleaning",
    "description": "A fresh start for your space, whenever you need it.",
    "image": "/one-time-cleaning.png",
    "basePrice": 0,
    "complexityOptions": [],
    "fullDescription": "Need your home refreshed before guests arrive, after a busy week, or simply because it needs extra attention? Our one-time cleaning service gives your space a thorough professional clean without requiring an ongoing commitment. We focus on the areas that need it most and leave your home feeling fresh, tidy, and comfortable."
  },
  {
    "number": "03",
    "title": "Move-In / Move-Out Cleaning",
    "slug": "move-in-move-out-cleaning",
    "description": "A thorough clean as you leave one home or settle into another.",
    "image": "/move-in-move-out-cleaning.png",
    "basePrice": 0,
    "complexityOptions": [],
    "fullDescription": "Moving is stressful enough without having to worry about cleaning every surface. Our move-in and move-out cleaning service prepares the space for a fresh start, whether you are leaving a property or settling into a new one. We focus on kitchens, bathrooms, floors, fixtures, cabinets, and other high-use areas that often need extra attention during a move."
  },
  {
    "number": "04",
    "title": "Apartment / Condo Cleaning",
    "slug": "apartment-condo-cleaning",
    "description": "Cleaning tailored to your apartment or condo.",
    "image": "/apartment-condo-cleaning.png",
    "basePrice": 0,
    "complexityOptions": [],
    "fullDescription": "Our apartment and condo cleaning service is designed for smaller spaces where every room matters. We clean kitchens, bathrooms, living areas, bedrooms, floors, and high-touch surfaces while working efficiently within your space. Whether you live in a studio, apartment, or high-rise condo, we help keep your home clean, comfortable, and easy to maintain."
  },
  {
    "number": "05",
    "title": "Light Commercial / Office Cleaning",
    "slug": "office-cleaning",
    "description": "Keep your workspace clean and ready for the day.",
    "image": "/office-cleaning.png",
    "basePrice": 0,
    "complexityOptions": [],
    "fullDescription": "A clean workplace creates a more welcoming environment for employees, customers, and visitors. Our light commercial cleaning service is ideal for offices and smaller professional spaces that need dependable routine cleaning. We can take care of work surfaces, common areas, washrooms, floors, and other frequently used spaces while minimizing disruption to your business."
  },
  {
    "number": "06",
    "title": "Deep / Seasonal Cleaning",
    "slug": "deep-seasonal-cleaning",
    "description": "Extra attention for the areas that need a more detailed clean.",
    "image": "/deep-seasonal-cleaning.png",
    "basePrice": 0,
    "complexityOptions": [],
    "fullDescription": "Sometimes your home needs more than routine maintenance. Our deep and seasonal cleaning service gives extra attention to areas that can be overlooked during regular cleaning, including baseboards, fixtures, detailed surfaces, and built-up dust or grime. It is a great option for spring cleaning, seasonal resets, or whenever your home needs a more thorough refresh."
  },
  {
    "number": "07",
    "title": "Cleaning for Seniors",
    "slug": "cleaning-for-seniors",
    "description": "Discuss the cleaning support and household priorities that work for you.",
    "image": "/cleaning-for-seniors.png",
    "basePrice": 0,
    "complexityOptions": [],
    "fullDescription": "Our cleaning service for seniors is designed to help keep the home comfortable, clean, and easy to enjoy. We provide respectful, dependable assistance with routine household cleaning while working around each client’s preferences and needs. Our goal is to make maintaining a clean home simpler while providing service with care, patience, and attention to detail."
  },
  {
    "number": "08",
    "title": "Post-Renovation / Post-Construction Cleaning",
    "slug": "post-renovation-construction-cleaning",
    "description": "A clean-up for your space once the building work is finished.",
    "image": "/post-renovation-construction-cleaning.png",
    "basePrice": 0,
    "complexityOptions": [],
    "fullDescription": "Renovations can leave behind dust, debris, and residue even after the work is complete. Our post-renovation and post-construction cleaning service focuses on removing that final layer of dust from floors, surfaces, fixtures, cabinetry, and other finished areas. We help turn a newly renovated space into a clean, polished, and ready-to-use home or workplace"
  }
];
export type Service = typeof services[number];
export const getServiceBySlug = (slug:string) => services.find(s=>s.slug===slug);

// Menu data for each day of the week
let menuData = document.menuData = {
    0: { // Sunday
        dayName: "Sunday",
        meal: "Restaurant Closed",
        description: "The canteen is closed today. Enjoy your weekend rest and come back tomorrow for fresh meals.",
        items: [
            {
                category: "Main Course",
                name: "Closed",
                icon: "fa-ban",
                status: "unavailable"
            }
        ]
    },
    1: { // Monday
        dayName: "Monday",
        meal: "Rice + Egg + Beef Rendang",
        description: "Start your week with our hearty beef rendang served over fluffy white rice, paired with a perfectly cooked egg.",
        items: [
            {
                category: "Main Course",
                name: "White Rice & Beef Rendang",
                icon: "fa-bowl-rice",
                status: "cooking",
                estimatedTime: "15 mins"
            }
        ]
    },
    2: { // Tuesday
        dayName: "Tuesday",
        meal: "Nasi Goreng Special",
        description: "Enjoy our spicy nasi goreng special topped with succulent shrimp and savory garnishes for a satisfying lunch.",
        items: [
            {
                category: "Main Course",
                name: "Nasi Goreng Special with Shrimp",
                icon: "fa-bowl-food",
                status: "cooking",
                estimatedTime: "20 mins"
            }
        ]
    },
    3: { // Wednesday
        dayName: "Wednesday",
        meal: "Chicken Katsu Rice",
        description: "Midweek comfort with crispy chicken katsu served on steamed rice for a delicious lunch.",
        items: [
            {
                category: "Main Course",
                name: "Crispy Chicken Katsu Rice",
                icon: "fa-drumstick-bite",
                status: "cooking",
                estimatedTime: "25 mins"
            }
        ]
    },
    4: { // Thursday
        dayName: "Thursday",
        meal: "Mie Goreng",
        description: "Warm up your Thursday with spicy mie goreng, mixed with savory sauce and crunchy toppings.",
        items: [
            {
                category: "Main Course",
                name: "Spicy Mie Goreng",
                icon: "fa-fire",
                status: "cooking",
                estimatedTime: "12 mins"
            }
        ]
    },
    5: { // Friday
        dayName: "Friday",
        meal: "Soto Ayam",
        description: "Finish the week with warm soto ayam soup, fragrant turmeric broth, and tender chicken.",
        items: [
            {
                category: "Main Course",
                name: "Soto Ayam Kuning",
                icon: "fa-bowl-food",
                status: "ready",
                estimatedTime: "Ready now"
            }
        ]
    },
    6: { // Saturday
        dayName: "Saturday",
        meal: "Special Weekend Menu",
        description: "Enjoy our weekend special with grilled fish and bright sambal.",
        items: [
            {
                category: "Main Course",
                name: "Grilled Fish with Rice",
                icon: "fa-fish",
                status: "cooking",
                estimatedTime: "30 mins"
            }
        ]
    }
};
"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Section from "../components/Section";
import { useRouter } from "next/navigation";

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  customerID: string;
}

interface Product {
  name: string;
  price: string;
  badge: string;
  img: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Redirect to auth if not logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (!storedUser) {
      router.replace("/auth");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  // All products in one array for easier searching
  const allProducts = {
    freshPicks: [
      { name: "Organic Red Apples", price: "Rs 180.00/Kg", badge: "25% Off", img: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=300&h=300&fit=crop" },
      { name: "Dairy Farm Milk (1 Lit)", price: "Rs 58.60", badge: "BOGO", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop" },
      { name: "Artisan Whole Wheat Bread", price: "Rs 65.15", badge: "New", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop" },
      { name: "Ripe Avocados (2-pack)", price: "Rs 180.40", badge: "Limited", img: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&h=300&fit=crop" },
    ],
    pantryEssentials: [
      { name: "Premium Basmati Rice (5 Kg)", price: "Rs 800.05", badge: "15% Off", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop" },
      { name: "Italian Penne Pasta", price: "Rs 189.99", badge: "Bulk Buy", img: "https://rukminim2.flixcart.com/image/832/832/ksnjp8w0/pasta/3/z/n/2-penne-pasta-penne-pasta-whole-wheat-premium-2kg-regular-1-original-imag66dnqvek83zu.jpeg?q=70&crop=false" },
      { name: "Extra Virgin Olive Oil (1L)", price: "Rs 499.99", badge: "Best Seller", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop" },
      { name: "Premium Ground Coffee (200gm)", price: "Rs 205.50", badge: "Daily Deal", img: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop" },
    ],
    snackBeverage: [
      { name: "Chocolate Chip Cookies", price: "Rs 129.00", badge: "New", img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop" },
      { name: "Green Tea Bags (20 piece)", price: "Rs 305.30", badge: "15% Off", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=300&fit=crop" },
      { name: "Soda Pack (6 cans)", price: "Rs 450.50", badge: "Limited", img: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop" },
      { name: "Mixed Nuts (250g)", price: "Rs 80.00", badge: "Best Seller", img: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=300&h=300&fit=crop" },
    ],
    popularItems: [
      { name: "Organic Bananas", price: "Rs 35.60/D", badge: "Top Pick", img: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=300&h=300&fit=crop" },
      { name: "Fresh Strawberries", price: "Rs 186.50/D", badge: "Trending", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop" },
      { name: "Almond Milk ", price: "Rs 60.50", badge: "Hot Deal", img: "https://m.media-amazon.com/images/I/518HFxXWlUL.jpg" },
      { name: "Whole Grain Bread", price: "Rs 45.05", badge: "Popular", img: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=300&h=300&fit=crop" },
    ],
    weeklySaver: [
      { name: "Chicken Breasts (250 G)", price: "Rs 140.40", badge: "Weekly Saver", img: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop" },
      { name: "Salmon Fillets (500g)", price: "Rs 700.50", badge: "Discount", img: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=300&h=300&fit=crop" },
      { name: "Eggs (12pcs)", price: "Rs 59.00", badge: "Best Deal", img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&h=300&fit=crop" },
      { name: "Greek Yogurt (500g)", price: "Rs 46.00", badge: "Save More", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop" },
    ],
    dailyEssentials: [
      { name: "Toothpaste (100gm)", price: "Rs 99.99", badge: "Daily Use", img: "https://saltoralcare.com/cdn/shop/files/SALT4105-copy.jpg?v=1746443913&width=2000" },
      { name: "Shampoo (250ml)", price: "RS 269.00", badge: "Must Have", img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRmDKdBKZRWEhdfLeCxJ74zba5VyCx7j73lYRoSUFXguFrbunuPWPLvnNKbL2z54eqQYcR79Pg" },
      { name: "Bath Soap (100g)", price: "Rs 145.50", badge: "Top Rated", img: "https://m.media-amazon.com/images/I/819JnfuPZHL.jpg" },
      { name: "Hand Sanitizer (200ml)", price: "Rs 199.00", badge: "Essential", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ1GM_StqrZyvR7tjXfjvCWk0EqnL8I92KTYvhwqGaZYzaFe2BDK2rTj4ZeZKxG1GOOLeCrRIhwdQ" },
    ],
  };

  // Filter products based on search query
  const filterProducts = (products: Product[]) => {
    if (!searchQuery.trim()) return products;
    
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredProducts = {
    freshPicks: filterProducts(allProducts.freshPicks),
    pantryEssentials: filterProducts(allProducts.pantryEssentials),
    snackBeverage: filterProducts(allProducts.snackBeverage),
    popularItems: filterProducts(allProducts.popularItems),
    weeklySaver: filterProducts(allProducts.weeklySaver),
    dailyEssentials: filterProducts(allProducts.dailyEssentials),
  };

  // Check if there are any search results
  const hasResults = Object.values(filteredProducts).some(arr => arr.length > 0);

  if (!user) return null;

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="container-fluid py-4">
        {/* Search Results Info */}
        {searchQuery && (
          <div className="row mb-3">
            <div className="col-12">
              <div className="alert alert-info">
                {hasResults ? (
                  <>
                    Showing results for: <strong>{searchQuery}</strong>
                    <button
                      className="btn btn-sm btn-link float-end"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </button>
                  </>
                ) : (
                  <>
                    No results found for: <strong>{searchQuery}</strong>
                    <button
                      className="btn btn-sm btn-link float-end"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Banner Ads - only show when not searching */}
        {!searchQuery && (
          <div className="row g-3 mb-4">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=150&fit=crop"
                className="ad-banner"
                alt="Veg Deals"
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=150&fit=crop"
                className="ad-banner"
                alt="Dairy Promo"
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }}
              />
            </div>
          </div>
        )}

        {/* Product Sections */}
        <div className="row g-4">
          {filteredProducts.freshPicks.length > 0 && (
            <Section title="Fresh Picks for You" products={filteredProducts.freshPicks} />
          )}
          {filteredProducts.pantryEssentials.length > 0 && (
            <Section title="Your Pantry Essentials" products={filteredProducts.pantryEssentials} />
          )}
          {filteredProducts.snackBeverage.length > 0 && (
            <Section title="Snack & Beverage Bargains" products={filteredProducts.snackBeverage} />
          )}
          {filteredProducts.popularItems.length > 0 && (
            <Section title="Popular Items" products={filteredProducts.popularItems} />
          )}
          {filteredProducts.weeklySaver.length > 0 && (
            <Section title="Weekly Super Saver" products={filteredProducts.weeklySaver} />
          )}
          {filteredProducts.dailyEssentials.length > 0 && (
            <Section title="Daily Essentials" products={filteredProducts.dailyEssentials} />
          )}
        </div>

        {/* No Results Message */}
        {searchQuery && !hasResults && (
          <div className="row mt-5">
            <div className="col-12 text-center">
              <h3>No products found</h3>
              <p className="text-muted">Try searching for something else</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
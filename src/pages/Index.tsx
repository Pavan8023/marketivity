import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { SupplierCard } from "@/components/SupplierCard";
import { SupplierProfile } from "@/components/SupplierProfile";
import suppliersData from "@/data/suppliers.json";

interface Supplier {
  id: number;
  name: string;
  location: string;
  city: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  description: string;
  specialties: string[]; // Fixed typo (was specialties)
  deliveryTime: string;
  minOrder: number;
  products: any[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Prices");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [cartItems] = useState(0); // Removed setter since it's not used

  const suppliers: Supplier[] = suppliersData;

  // Filter suppliers based on search and filters
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // City filter (case-insensitive)
      const matchesCity = selectedCity === "All Cities" || 
        supplier.city.toLowerCase() === selectedCity.toLowerCase();

      // Rating filter
      const matchesRating = selectedRating === "All Ratings" || 
        (selectedRating === "4.5+ Stars" && supplier.rating >= 4.5) ||
        (selectedRating === "4.0+ Stars" && supplier.rating >= 4.0) ||
        (selectedRating === "3.5+ Stars" && supplier.rating >= 3.5);

      // Price range filter
      const matchesPriceRange = selectedPriceRange === "All Prices" ||
        (selectedPriceRange === "₹0-500" && supplier.minOrder <= 500) ||
        (selectedPriceRange === "₹500-1000" && supplier.minOrder > 500 && supplier.minOrder <= 1000) ||
        (selectedPriceRange === "₹1000+" && supplier.minOrder > 1000);

      return matchesSearch && matchesCity && matchesRating && matchesPriceRange;
    });
  }, [suppliers, searchQuery, selectedCity, selectedRating, selectedPriceRange]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCity !== "All Cities") count++;
    if (selectedRating !== "All Ratings") count++;
    if (selectedPriceRange !== "All Prices") count++;
    return count;
  }, [selectedCity, selectedRating, selectedPriceRange]);

  const handleClearFilters = () => {
    setSelectedCity("All Cities");
    setSelectedRating("All Ratings");
    setSelectedPriceRange("All Prices");
    setSearchQuery("");
  };

  const handleViewSupplier = (supplierId: number) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
      setSelectedSupplier(supplier);
    }
  };

  const handleBackToList = () => {
    setSelectedSupplier(null);
  };

  if (selectedSupplier) {
    return (
      <div className="min-h-screen bg-gradient-amber">
        <Header 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          cartItems={cartItems}
        />
        <main className="container mx-auto px-4 py-6">
          <SupplierProfile 
            supplier={selectedSupplier}
            onBack={handleBackToList}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItems={cartItems}
      />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Connect with Trusted Suppliers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quality raw materials for your street food business from verified local suppliers across India
          </p>
        </div>

        {/* Filters */}
        <FilterBar
          selectedCity={selectedCity}
          selectedRating={selectedRating}
          selectedPriceRange={selectedPriceRange}
          onCityChange={setSelectedCity}
          onRatingChange={setSelectedRating}
          onPriceRangeChange={setSelectedPriceRange}
          onClearFilters={handleClearFilters}
          activeFiltersCount={activeFiltersCount}
        />

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {filteredSuppliers.length} Suppliers Found
            </h2>
            {searchQuery && (
              <p className="text-gray-600">
                Showing results for "{searchQuery}"
              </p>
            )}
          </div>

          {filteredSuppliers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No suppliers found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSuppliers.map((supplier) => (
                <SupplierCard
                  key={supplier.id}
                  supplier={supplier}
                  onViewDetails={handleViewSupplier}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
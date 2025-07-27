import { Search, Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom"; // Added for navigation

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItems: number;
}

export const Header = ({ searchQuery, onSearchChange, cartItems }: HeaderProps) => {
  const navigate = useNavigate(); // Navigation hook

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center">
        {/* Logo with green gradient */}
        <div className="flex items-center space-x-2 mr-6">
          <div className="h-8 w-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="font-bold text-xl text-foreground">VendorConnect</span>
        </div>


        {/* Right Actions */}
        <div className="flex items-center w-full">
          <div className="flex items-center space-x-2">

            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Get Started Button - Green variant aligned to the far right */}
          <Button
            variant="default"
            className="bg-green-600 hover:bg-green-700 ml-auto hidden md:inline-flex"
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
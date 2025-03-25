import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { Search, Bell, User as UserIcon, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { searchContent, getImageUrl } from '../api/tmdb';

type SearchResult = {
  id: number;
  poster_path?: string;
  title?: string;
  name?: string;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const fetchResults = async () => {
        try {
          const response = await searchContent(searchTerm);
          setSearchResults(response?.data?.results || []);
        } catch (error) {
          console.error('Error fetching search results:', error);
          setSearchResults([]);
        }
      };
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black'}`}>
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="h-8"
            />
          </Link>
        </div>
        
        <div className="relative flex items-center space-x-6">
          {showSearch ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-1 rounded-md bg-gray-800 text-white focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <X
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                onClick={() => {
                  setSearchTerm('');
                  setShowSearch(false);
                }}
              />
            </div>
          ) : (
            <Search className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" onClick={() => setShowSearch(true)} />
          )}
          <Bell className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer transition-colors" />
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-white" />
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors">
              Sign In
            </Link>
          )}
        </div>
      </div>
      
      {searchResults.length > 0 && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-black p-4 rounded-md shadow-lg">
          <ul>
            {searchResults.map((item) => (
              <li key={item.id} className="flex items-center p-2 border-b border-gray-700 hover:bg-gray-800 transition">
                <img src={getImageUrl(item.poster_path || '', 'w500')} alt={item.title || item.name || 'Unknown'} className="w-12 h-16 object-cover rounded-md mr-4" />
                <span className="text-white">{item.title || item.name || 'Untitled'}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

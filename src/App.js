import React, { useState, useRef } from 'react';
import { Camera, Plus, Shirt, Filter, Heart, Calendar, MapPin, Thermometer, Search, Home, Grid, User, Settings, Zap, Users } from 'lucide-react';

const VirtualClosetApp = () => {
  const [activeTab, setActiveTab] = useState('closet');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [outfits, setOutfits] = useState([]);
  const [showScanner, setShowScanner] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState(null);
  const [showOutfitBuilder, setShowOutfitBuilder] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  
  // Mock community outfits data
  const [communityOutfits] = useState([
    {
      id: 'c1',
      user: 'StyleMaven_NYC',
      userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNGNTdDMDAiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K',
      name: 'Casual Friday Vibes',
      items: [
        { name: 'White Button-Down', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI0Y4RjlGQSIgc3Ryb2tlPSIjRTVFN0VCIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2ZyB4PSIxOCIgeT0iMTgiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTYgMmwyIDJoOGwyLTJNNCAxOGguMDFNNCAyMmguMDEiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2Zz4KPC9zdmc+' },
        { name: 'Dark Wash Jeans', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzM3NDE1MSIvPgo8c3ZnIHg9IjE4IiB5PSIxOCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNNiAyaDEydjIwSDZWMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2Zz4KPC9zdmc+' }
      ],
      likes: 156,
      occasion: 'Casual',
      weather: 'Mild'
    },
    {
      id: 'c2',
      user: 'MinimalistMari',
      userAvatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiM4QjVDRjYiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K',
      name: 'All Black Everything',
      items: [
        { name: 'Black Turtleneck', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzFGMkEzNyIvPgo8c3ZnIHg9IjE4IiB5PSIxOCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNNiAyaDEydjIwSDZWMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2Zz4KPC9zdmc+' },
        { name: 'Black Trousers', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzM3NDE1MSIvPgo8c3ZnIHg9IjE4IiB5PSIxOCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNNiAyaDEydjIwSDZWMiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHN2Zz4KPC9zdmc+' }
      ],
      likes: 203,
      occasion: 'Professional',
      weather: 'Any'
    }
  ]);
  
  // Mock clothing data
  const [clothingItems, setClothingItems] = useState([
    {
      id: 1,
      name: "Blue Denim Jacket",
      category: "outerwear",
      brand: "Levi's",
      size: "M",
      color: "Blue",
      season: "spring",
      care: "Machine wash cold, tumble dry low",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzRGNzBBNiIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SmFja2V0PC90ZXh0Pjwvc3ZnPg==",
      status: "clean"
    },
    {
      id: 2,
      name: "White Cotton T-Shirt",
      category: "tops",
      brand: "Uniqlo",
      size: "S",
      color: "White",
      season: "all",
      care: "Machine wash warm, tumble dry low",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0Y4RjlGQSIgc3Ryb2tlPSIjRTVFN0VCIi8+PHRleHQgeD0iMTAwIiB5PSIxMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPnQtU2hpcnQ8L3RleHQ+PC9zdmc+",
      status: "clean"
    },
    {
      id: 3,
      name: "Black Skinny Jeans",
      category: "bottoms",
      brand: "Zara",
      size: "32",
      color: "Black",
      season: "all",
      care: "Machine wash cold, hang dry",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SmVhbnM8L3RleHQ+PC9zdmc+",
      status: "clean"
    },
    {
      id: 4,
      name: "Red Summer Dress",
      category: "dresses",
      brand: "H&M",
      size: "M",
      color: "Red",
      season: "summer",
      care: "Hand wash cold, lay flat to dry",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0VGNDQ0NCIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHJlc3M8L3RleHQ+PC9zdmc+",
      status: "clean"
    },
    {
      id: 5,
      name: "Black Blazer",
      category: "outerwear",
      brand: "Theory",
      size: "M",
      color: "Black",
      season: "all",
      care: "Dry clean only",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzFGMjkzNyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QmxhemVyPC90ZXh0Pjwvc3ZnPg==",
      status: "clean"
    },
    {
      id: 6,
      name: "Blue Oxford Shirt",
      category: "tops",
      brand: "J.Crew",
      size: "M",
      color: "Blue",
      season: "all",
      care: "Machine wash cold, iron medium heat",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzN0FCNyIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2hpcnQ8L3RleHQ+PC9zdmc+",
      status: "clean"
    }
  ]);

  const categories = [
    { id: 'all', name: 'All', icon: Grid },
    { id: 'tops', name: 'Tops', icon: Shirt },
    { id: 'bottoms', name: 'Bottoms', icon: Shirt },
    { id: 'dresses', name: 'Dresses', icon: Shirt },
    { id: 'outerwear', name: 'Outerwear', icon: Shirt }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? clothingItems 
    : clothingItems.filter(item => item.category === selectedCategory);

  // Enhanced barcode scanning function
  const startBarcodeScanning = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Simulate barcode detection after 3 seconds
        setTimeout(() => {
          const mockBarcodes = [
            { code: '123456789012', product: 'Nike Air Max 270' },
            { code: '098765432109', product: 'Levi\'s 501 Jeans' },
            { code: '555444333222', product: 'H&M Cotton T-Shirt' }
          ];
          
          const randomBarcode = mockBarcodes[Math.floor(Math.random() * mockBarcodes.length)];
          setScanResult(randomBarcode);
          
          // Stop video stream
          stream.getTracks().forEach(track => track.stop());
          setIsScanning(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setIsScanning(false);
      // Fallback to file upload
      fileInputRef.current?.click();
    }
  };

  const processScannedItem = (barcode) => {
    // Mock API call to fetch product details
    const productDetails = {
      name: barcode.product,
      brand: barcode.product.split(' ')[0],
      category: 'tops',
      size: 'M',
      color: 'Blue',
      season: 'all',
      care: 'Machine wash cold, tumble dry low',
      barcode: barcode.code,
      image: `data:image/svg+xml;base64,${btoa(`<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="200" fill="#4F70A6"/><text x="100" y="100" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">${barcode.product}</text></svg>`)}`
    };

    const newItem = {
      id: Date.now(),
      ...productDetails,
      status: "clean"
    };

    setClothingItems([...clothingItems, newItem]);
    setScanResult(null);
    setShowScanner(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Simulate adding a new item
        const newItem = {
          id: Date.now(),
          name: "New Item",
          category: "tops",
          brand: "Unknown",
          size: "M",
          color: "Unknown",
          season: "all",
          care: "Check care label",
          image: e.target.result,
          status: "clean"
        };
        setClothingItems([...clothingItems, newItem]);
        setShowScanner(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleItemSelection = (item) => {
    const isSelected = selectedItems.find(i => i.id === item.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const saveOutfit = () => {
    if (selectedItems.length > 0) {
      const newOutfit = {
        id: Date.now(),
        name: `Outfit ${outfits.length + 1}`,
        items: [...selectedItems],
        created: new Date(),
        weather: "Mild"
      };
      setOutfits([...outfits, newOutfit]);
      setSelectedItems([]);
      setShowOutfitBuilder(false);
      setActiveTab('outfits');
    }
  };

  const WeatherWidget = () => (
    <div className="bg-blue-50 p-4 rounded-lg mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Today's Weather</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">72°F</div>
          <div className="text-sm text-gray-600">Partly Cloudy</div>
        </div>
      </div>
    </div>
  );

  const ScannerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-bold mb-4">Add New Item</h3>
        
        {isScanning ? (
          <div className="space-y-4">
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 border-2 border-white border-dashed m-8 rounded-lg flex items-center justify-center">
                <div className="text-white text-sm text-center">
                  <div className="w-16 h-16 border-2 border-white rounded-lg mx-auto mb-2"></div>
                  Position barcode within frame
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="animate-pulse text-blue-600 font-medium">Scanning for barcode...</div>
            </div>
          </div>
        ) : scanResult ? (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  ✓
                </div>
                <div>
                  <div className="font-medium text-green-900">Product Found!</div>
                  <div className="text-sm text-green-700">{scanResult.product}</div>
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <strong>Barcode:</strong> {scanResult.code}
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setScanResult(null)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Try Again
              </button>
              <button 
                onClick={() => processScannedItem(scanResult)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Item
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              onClick={startBarcodeScanning}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50"
            >
              <Camera className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 font-medium">Scan Barcode</p>
              <p className="text-xs text-gray-500 mt-1">Point camera at clothing tag</p>
            </button>
            
            <div className="text-center">
              <span className="text-gray-400">or</span>
            </div>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
            >
              <Plus className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">Upload Photo</p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        )}
        
        {!isScanning && !scanResult && (
          <button 
            onClick={() => setShowScanner(false)}
            className="w-full mt-4 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );

  const ItemDetailsModal = ({ item }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4 max-h-96 overflow-y-auto">
        <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
        <div className="space-y-2 text-sm">
          <div><span className="font-medium">Brand:</span> {item.brand}</div>
          <div><span className="font-medium">Size:</span> {item.size}</div>
          <div><span className="font-medium">Color:</span> {item.color}</div>
          <div><span className="font-medium">Season:</span> {item.season}</div>
          <div><span className="font-medium">Status:</span> <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'clean' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{item.status}</span></div>
        </div>
        <div className="mt-4">
          <h4 className="font-medium mb-2">Care Instructions:</h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{item.care}</p>
        </div>
        <button 
          onClick={() => setShowItemDetails(null)}
          className="w-full mt-4 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );

  const OutfitBuilderModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 max-h-96 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Create New Outfit</h3>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Selected Items ({selectedItems.length}):</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedItems.map(item => (
              <div key={item.id} className="relative">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border-2 border-blue-500" />
                <button 
                  onClick={() => toggleItemSelection(item)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Add More Items:</h4>
          <div className="grid grid-cols-4 gap-2">
            {clothingItems.filter(item => !selectedItems.find(s => s.id === item.id)).map(item => (
              <div key={item.id} className="relative cursor-pointer" onClick={() => toggleItemSelection(item)}>
                <img src={item.image} alt={item.name} className="w-full h-16 object-cover rounded hover:opacity-75" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowOutfitBuilder(false)}
            className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={saveOutfit}
            disabled={selectedItems.length === 0}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Outfit
          </button>
        </div>
      </div>
    </div>
  );

  const renderCloset = () => (
    <div className="pb-20">
      <div className="p-4 bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">My Closet</h1>
          <button 
            onClick={() => setShowScanner(true)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        
        <WeatherWidget />
        
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              onClick={() => setShowItemDetails(item)}
              className="bg-white rounded-lg shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
            >
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-3">
                <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <div className={`mt-2 px-2 py-1 rounded-full text-xs inline-block ${
                  item.status === 'clean' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOutfits = () => (
    <div className="pb-20">
      <div className="p-4 bg-white sticky top-0 z-10 border-b">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">My Outfits</h1>
          <button 
            onClick={() => setShowOutfitBuilder(true)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        {outfits.length === 0 ? (
          <div className="text-center py-12">
            <Shirt className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No outfits yet</h3>
            <p className="text-gray-500 mb-4">Create your first outfit to get started</p>
            <button 
              onClick={() => setShowOutfitBuilder(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Outfit
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {outfits.map(outfit => (
              <div key={outfit.id} className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{outfit.name}</h3>
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
                <div className="flex space-x-2 mb-3">
                  {outfit.items.map(item => (
                    <img key={item.id} src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created {outfit.created.toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSuggestions = () => (
    <div className="pb-20">
      <div className="p-4 bg-white sticky top-0 z-10 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Style Suggestions</h1>
        <p className="text-sm text-gray-600">Discover outfit ideas from the community</p>
      </div>
      
      <div className="p-4 space-y-4">
        {communityOutfits.map(outfit => (
          <div key={outfit.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center mb-3">
              <img src={outfit.userAvatar} alt={outfit.user} className="w-8 h-8 rounded-full mr-3" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">@{outfit.user}</div>
                <div className="text-sm text-gray-600">{outfit.name}</div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Heart className="w-4 h-4 mr-1" />
                {outfit.likes}
              </div>
            </div>
            
            <div className="flex space-x-2 mb-3">
              {outfit.items.map((item, index) => (
                <div key={index} className="relative">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {outfit.occasion}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {outfit.weather} Weather
                </span>
              </div>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-xs">
                Try This Look
              </button>
            </div>
          </div>
        ))}
        
        <div className="text-center py-8">
          <Zap className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">More Coming Soon!</h3>
          <p className="text-gray-500">Share your outfits to inspire others</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Main Content */}
      {activeTab === 'closet' && renderCloset()}
      {activeTab === 'outfits' && renderOutfits()}
      {activeTab === 'suggestions' && renderSuggestions()}
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('closet')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'closet' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Home className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Closet</span>
          </button>
          <button
            onClick={() => setActiveTab('outfits')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'outfits' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Grid className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Outfits</span>
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'suggestions' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Users className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Suggestions</span>
          </button>
          <button
            onClick={() => setShowScanner(true)}
            className="flex-1 py-3 px-4 text-center text-gray-400"
          >
            <Plus className="w-6 h-6 mx-auto mb-1" />
            <span className="text-xs">Add</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      {showScanner && <ScannerModal />}
      {showItemDetails && <ItemDetailsModal item={showItemDetails} />}
      {showOutfitBuilder && <OutfitBuilderModal />}
    </div>
  );
};

export default VirtualClosetApp;
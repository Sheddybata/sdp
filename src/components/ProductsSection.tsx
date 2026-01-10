import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Product {
  id: string;
  name: string;
  nameKey: string;
  price: number;
  imagePath: string;
  description: string;
  descriptionKey: string;
}

const products: Product[] = [
  {
    id: 't-shirts',
    name: 'T-Shirts',
    nameKey: 'products.tShirts',
    price: 7500,
    imagePath: '/Products/t-shirts.png',
    description: 'Show your support with our premium quality SDP branded t-shirts. Made with comfortable, durable fabric.',
    descriptionKey: 'products.tShirtsDesc'
  },
  {
    id: 'corporate-package',
    name: 'Corporate Package',
    nameKey: 'products.corporatePackage',
    price: 9000,
    imagePath: '/Products/corproratepackage.png',
    description: 'Complete corporate branding package for businesses and organizations supporting SDP.',
    descriptionKey: 'products.corporatePackageDesc'
  },
  {
    id: 'crest',
    name: 'Crest',
    nameKey: 'products.crest',
    price: 5555,
    imagePath: '/Products/crest.png',
    description: 'Official SDP party crest - a symbol of unity, progress, and commitment to good governance.',
    descriptionKey: 'products.crestDesc'
  }
];

export const ProductsSection: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePurchase = (product: Product) => {
    // TODO: Implement purchase flow
    console.log('Purchase:', product);
    // You can integrate with a payment gateway or redirect to a purchase page
    alert(`Purchase ${product.name} for ${formatPrice(product.price)}`);
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef8636]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1daa62]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-sdp-dark">
            {t('products.title') || 'Support SDP with Official Products'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('products.subtitle') || 'Show your support and help fund our mission with quality SDP merchandise'}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {!imageErrors[product.id] ? (
                  <img
                    src={product.imagePath}
                    alt={product.name}
                    className={`w-full h-full object-contain transition-transform duration-500 p-4 ${
                      hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                    }`}
                    onError={(e) => {
                      console.error('Image failed to load:', product.imagePath);
                      handleImageError(product.id);
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#ef8636]/20 to-[#1daa62]/20">
                    <ShoppingCart className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                {/* Price badge */}
                <div className="absolute top-4 right-4 bg-[#ef8636] text-white px-4 py-2 rounded-full font-bold text-lg shadow-xl">
                  {formatPrice(product.price)}
                </div>
              </div>

              <CardContent className="p-6">
                {/* Product Name */}
                <h3 className="text-2xl font-bold mb-3 text-sdp-dark group-hover:text-[#ef8636] transition-colors">
                  {t(product.nameKey) || product.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed min-h-[60px]">
                  {t(product.descriptionKey) || product.description}
                </p>

                {/* Purchase Button */}
                <Button
                  onClick={() => handlePurchase(product)}
                  className="w-full bg-[#ef8636] hover:bg-[#ef8636]/90 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
                >
                  <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  <span>{t('products.buyNow') || 'Buy Now'}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            {t('products.footer') || 'All proceeds support SDP initiatives and campaigns across Nigeria'}
          </p>
        </div>
      </div>
    </section>
  );
};


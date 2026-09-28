'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '../../lib/types';
import { useAppStore } from '../../lib/store';
import {
  Flame,
  ShoppingCart,
  ClipboardList,
  CheckCircle2,
  Clock,
  Heart,
  ArrowRight,
  Gauge,
  Zap,
  Weight,
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useAppStore();
  const isWishlisted = wishlist.includes(product.id);
  const [cartPressed, setCartPressed] = useState(false);

  const formatPrice = (val: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);

  const handleAddToCart = () => {
    setCartPressed(true);
    addToCart(product, 1);
    setTimeout(() => setCartPressed(false), 600);
  };

  return (
    <div
      className="card-item flex flex-col justify-between overflow-hidden group transition-all duration-250"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid rgba(183, 198, 194, 0.3)',
        boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* ── Image & Badges Container ─────────────────────────────── */}
      <div className="relative p-3">
        <div
          className="relative overflow-hidden rounded-[18px] bg-[#eeebe3]"
          style={{ aspectRatio: '4/3' }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Mode Badge (Red #ca0013 for Quote, Charcoal #171e19 for Direct) */}
          <div className="absolute top-3 left-3 z-10">
            {product.mode === 'quote' ? (
              <span
                className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider text-white shadow-sm"
                style={{ backgroundColor: '#ca0013' }}
              >
                <ClipboardList className="w-3 h-3" />
                Custom Quote
              </span>
            ) : (
              <span
                className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider text-white shadow-sm"
                style={{ backgroundColor: '#171e19' }}
              >
                <ShoppingCart className="w-3 h-3" />
                Direct Order
              </span>
            )}
          </div>

          {/* Circular Trailing Wishlist Button (40px) */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md bg-white hover:bg-[#ca0013] hover:text-white"
            style={{
              color: isWishlisted ? '#ca0013' : '#171e19',
              border: '1px solid rgba(183, 198, 194, 0.4)',
            }}
            title="Save to Wishlist"
            aria-label="Toggle wishlist"
          >
            <Heart
              className="w-4 h-4 transition-colors"
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </button>

          {/* Availability Pill */}
          <div className="absolute bottom-3 left-3">
            <span
              className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md"
              style={{
                color: product.availability === 'in_stock' ? '#171e19' : '#ca0013',
                border: '1px solid rgba(183, 198, 194, 0.4)',
              }}
            >
              {product.availability === 'in_stock' ? (
                <CheckCircle2 className="w-3 h-3 text-[#171e19]" />
              ) : (
                <Clock className="w-3 h-3 text-[#ca0013]" />
              )}
              {product.availability === 'in_stock' ? 'In Stock (Thanagazi)' : 'Built to Order'}
            </span>
          </div>

          {/* Featured Badge */}
          {product.isFeatured && (
            <div className="absolute bottom-3 right-3">
              <span
                className="flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider text-white"
                style={{ backgroundColor: '#171e19' }}
              >
                <Flame className="w-2.5 h-2.5 text-[#ca0013]" />
                Featured
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ─────────────────────────────── */}
      <div className="px-5 pb-5 pt-1 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* SKU / HSN */}
          <div
            className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider mb-1"
            style={{ color: '#b7c6c2' }}
            suppressHydrationWarning
          >
            <span>SKU: {product.sku}</span>
            <span>HSN: {product.hsnCode}</span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3
              className="font-extrabold text-base leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[#ca0013]"
              style={{ color: '#171e19' }}
            >
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Bento Metric Spec Card (Glassmorphism-lite) */}
        <div
          className="bento-card grid grid-cols-3 gap-2"
          style={{
            backgroundColor: 'rgba(238, 235, 227, 0.6)',
            borderRadius: '16px',
            border: '1px solid rgba(183, 198, 194, 0.3)',
          }}
        >
          {[
            { icon: Zap, label: 'Capacity', value: product.capacity },
            { icon: Gauge, label: 'Pressure', value: product.pressure },
            { icon: Weight, label: 'Fuel', value: product.fuelType },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center mx-auto mb-1"
                style={{ backgroundColor: 'rgba(202, 0, 19, 0.1)' }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: '#ca0013' }} />
              </div>
              <span className="block text-[9px] font-bold uppercase tracking-wider" style={{ color: '#b7c6c2' }}>
                {label}
              </span>
              <strong className="block text-[11px] font-black leading-tight truncate" style={{ color: '#171e19' }}>
                {value}
              </strong>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="font-black text-lg" style={{ color: '#171e19' }}>
              {product.mode === 'quote' ? 'Custom Quote' : formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.mode === 'direct' && (
              <span className="ml-2 text-xs line-through text-gray-400 font-semibold">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#b7c6c2' }}>
            +{product.gstRate}% GST
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          {/* Secondary Button: Details */}
          <Link
            href={`/products/${product.slug}`}
            className="btn-secondary flex items-center justify-center gap-1 py-2.5 text-xs font-bold"
          >
            Specs
          </Link>

          {/* Primary CTA Button: Red #ca0013 */}
          <Link
            href={`/request-quote?productId=${product.id}`}
            className="btn-primary flex items-center justify-center gap-1.5 py-2.5 text-xs font-extrabold"
          >
            Get Quote <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};

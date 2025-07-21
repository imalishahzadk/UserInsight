"use client";

import { useState } from "react";
import { formatAmountWithCommas } from "@/utils";
import {
  Calendar,
  DollarSign,
  Info,
  Tag,
  Truck,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ItemDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
}

const ItemDetailModal = ({ isOpen, onClose, item }: ItemDetailModalProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen) return null;

  const hasImages = item.images && item.images.length > 0;
  const activeImage = hasImages ? item.images[activeImageIndex].url : null;

  const handlePrevImage = () => {
    if (hasImages) {
      setActiveImageIndex((prev) =>
        prev === 0 ? item.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (hasImages) {
      setActiveImageIndex((prev) =>
        prev === item.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Format data for specification list
  const specifications = [
    { label: "Stock Number", value: item.stockNumber, icon: Tag },
    { label: "Year", value: item.year, icon: Calendar },
    {
      label: "Condition",
      value: item.isNew ? "New" : "Used",
      icon: Info,
      className: item.isNew ? "text-[#10B981]" : "text-[#F97316]",
    },
    { label: "Product Type", value: item.productType, icon: Truck },
    {
      label: "Price",
      value:
        item.prices && item.prices.salePrice
          ? formatAmountWithCommas(item.prices.salePrice)
          : "N/A",
      icon: DollarSign,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="relative bg-[#0a0f1e] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#070b15] px-6 py-4 flex justify-between items-center border-b border-[rgba(255,255,255,0.1)]">
          <h2 className="text-xl font-bold text-white">
            {item.make} {item.model}
          </h2>
          <button
            onClick={onClose}
            className="text-[rgba(255,255,255,0.7)] hover:text-white p-1 rounded-full focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image Gallery */}
            <div className="space-y-4">
              <div className="relative bg-[#070b15] rounded-lg overflow-hidden aspect-video">
                {hasImages ? (
                  <>
                    <img
                      src={activeImage}
                      alt={`${item.make} ${item.model}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-vehicle.jpg";
                      }}
                    />

                    {/* Navigation arrows */}
                    {item.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-all"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Image counter */}
                    {item.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-60 rounded text-white text-xs">
                        {activeImageIndex + 1} / {item.images.length}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[rgba(255,255,255,0.5)]">
                      No image available
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail preview */}
              {item.images && item.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {item.images.map((image: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 ${
                        index === activeImageIndex
                          ? "border-[#00e5ff]"
                          : "border-transparent hover:border-[rgba(0,229,255,0.5)]"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-vehicle.jpg";
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Specifications
                </h3>
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center border-b border-[rgba(255,255,255,0.1)] pb-3"
                    >
                      <div className="p-2 bg-[rgba(0,229,255,0.1)] rounded-full mr-3">
                        <spec.icon className="text-[#00e5ff]" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[rgba(255,255,255,0.7)] text-sm">
                          {spec.label}
                        </p>
                        <p
                          className={`text-white font-medium ${
                            spec.className || ""
                          }`}
                        >
                          {spec.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Section */}
              {item.description && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Description
                  </h3>
                  <p className="text-[rgba(255,255,255,0.7)]">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Additional Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Additional Details
                </h3>
                <div className="bg-[#070b15] rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {item.manufacturer && (
                      <div>
                        <p className="text-[rgba(255,255,255,0.5)] text-xs">
                          Manufacturer
                        </p>
                        <p className="text-white">{item.manufacturer}</p>
                      </div>
                    )}
                    {item.itemDetailUrl && (
                      <div>
                        <p className="text-[rgba(255,255,255,0.5)] text-xs">
                          External Link
                        </p>
                        <a
                          href={item.itemDetailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00e5ff] hover:underline"
                        >
                          View Original
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#070b15] px-6 py-4 border-t border-[rgba(255,255,255,0.1)]">
          <button
            onClick={onClose}
            className="bg-[rgba(0,229,255,0.1)] text-[#00e5ff] py-2 px-6 rounded-lg hover:bg-[rgba(0,229,255,0.2)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;

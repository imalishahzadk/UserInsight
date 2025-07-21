"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import inventoryService from "@/services/api/client/inventory-service";
import {
  Download,
  FileDown,
  Filter,
  Users,
  DollarSign,
  Search,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  ChevronDown,
} from "lucide-react";
import { formatAmountWithCommas } from "@/utils";
import ItemDetailModal from "./ItemDetailModal";

interface IFilters {
  stockNumber: string;
  isNew: string;
  make: string;
  model: string;
  year: string;
  productType: string;
  priceRange: string;
  manufacturer: string;
  page: number;
  limit: number;
}

interface TableFilterProps {
  filters: IFilters;
  handleFilterChange: (key: string, value: string | number) => void;
  handleExportCSV: () => void;
  handleExportPDF: () => void;
}

const TableFilters = ({
  filters,
  handleFilterChange,
  handleExportCSV,
  handleExportPDF,
}: TableFilterProps) => {
  const clearFilters = () => {
    handleFilterChange("stockNumber", "");
    handleFilterChange("isNew", "");
    handleFilterChange("make", "");
    handleFilterChange("model", "");
    handleFilterChange("year", "");
    handleFilterChange("productType", "");
    handleFilterChange("priceRange", "");
    handleFilterChange("manufacturer", "");
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Filter className="w-5 h-5 mr-2 text-[#00e5ff]" />
          Filter Inventory
        </h2>
        <div className="flex gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-[#0a1429] text-[#00e5ff] rounded-md hover:bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.3)] shadow-md flex items-center transition-all duration-300 font-medium"
          >
            <FileDown className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 bg-[#0a1429] text-[#00e5ff] rounded-md hover:bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.3)] shadow-md flex items-center transition-all duration-300 font-medium"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="bg-[#0a1429] p-5 rounded-lg border border-[rgba(0,229,255,0.15)] shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Stock Number */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.7)] mb-1 ml-1">
              Stock Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[rgba(255,255,255,0.5)]" />
              </div>
              <input
                type="text"
                placeholder="Search Stock Number"
                value={filters.stockNumber}
                onChange={(e) =>
                  handleFilterChange("stockNumber", e.target.value)
                }
                className="pl-10 w-full py-2.5 rounded-md bg-[#0f1a33] text-white border border-[rgba(0,229,255,0.2)] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] placeholder-[rgba(255,255,255,0.5)] transition-all duration-200"
              />
            </div>
          </div>

          {/* Condition */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.7)] mb-1 ml-1">
              Condition
            </label>
            <div className="relative">
              <select
                value={filters.isNew}
                onChange={(e) => handleFilterChange("isNew", e.target.value)}
                className="w-full py-2.5 rounded-md bg-[#0f1a33] text-white border border-[rgba(0,229,255,0.2)] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] appearance-none transition-all duration-200 pl-3 pr-10"
              >
                <option value="">All Conditions</option>
                <option value="true">New</option>
                <option value="false">Used</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-[rgba(255,255,255,0.5)]" />
              </div>
            </div>
          </div>

          {/* Make */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.7)] mb-1 ml-1">
              Make
            </label>
            <input
              type="text"
              placeholder="Enter Make"
              value={filters.make}
              onChange={(e) => handleFilterChange("make", e.target.value)}
              className="w-full py-2.5 px-3 rounded-md bg-[#0f1a33] text-white border border-[rgba(0,229,255,0.2)] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] placeholder-[rgba(255,255,255,0.5)] transition-all duration-200"
            />
          </div>

          {/* Model */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.7)] mb-1 ml-1">
              Model
            </label>
            <input
              type="text"
              placeholder="Enter Model"
              value={filters.model}
              onChange={(e) => handleFilterChange("model", e.target.value)}
              className="w-full py-2.5 px-3 rounded-md bg-[#0f1a33] text-white border border-[rgba(0,229,255,0.2)] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] placeholder-[rgba(255,255,255,0.5)] transition-all duration-200"
            />
          </div>

          {/* Year */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.7)] mb-1 ml-1">
              Year
            </label>
            <input
              type="number"
              placeholder="Enter Year"
              value={filters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              className="w-full py-2.5 px-3 rounded-md bg-[#0f1a33] text-white border border-[rgba(0,229,255,0.2)] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] placeholder-[rgba(255,255,255,0.5)] transition-all duration-200"
            />
          </div>

          {/* Product Type */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.7)] mb-1 ml-1">
              Product Type
            </label>
            <input
              type="text"
              placeholder="Enter Product Type"
              value={filters.productType}
              onChange={(e) =>
                handleFilterChange("productType", e.target.value)
              }
              className="w-full py-2.5 px-3 rounded-md bg-[#0f1a33] text-white border border-[rgba(0,229,255,0.2)] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] placeholder-[rgba(255,255,255,0.5)] transition-all duration-200"
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.7)] mb-1 ml-1">
              Price Range
            </label>
            <div className="relative">
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
                className="w-full py-2.5 rounded-md bg-[#0f1a33] text-white border border-[rgba(0,229,255,0.2)] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] appearance-none transition-all duration-200 pl-3 pr-10"
              >
                <option value="">All Price Ranges</option>
                <option value="under-30000">Under $30,000</option>
                <option value="30000-50000">$30,000 - $50,000</option>
                <option value="above-50000">Over $50,000</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-[rgba(255,255,255,0.5)]" />
              </div>
            </div>
          </div>

          {/* Manufacturer */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-medium text-[rgba(255,255,255,0.7)] mb-1 ml-1">
              Manufacturer
            </label>
            <input
              type="text"
              placeholder="Enter Manufacturer"
              value={filters.manufacturer}
              onChange={(e) =>
                handleFilterChange("manufacturer", e.target.value)
              }
              className="w-full py-2.5 px-3 rounded-md bg-[#0f1a33] text-white border border-[rgba(0,229,255,0.2)] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] placeholder-[rgba(255,255,255,0.5)] transition-all duration-200"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-[#0f1a33] text-[rgba(255,255,255,0.7)] rounded-md hover:bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] shadow-sm flex items-center transition-all duration-200 text-sm"
          >
            <X className="w-3.5 h-3.5 mr-1.5" />
            Clear Filters
          </button>
        </div>
      </div>
    </>
  );
};

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Calculate visible page numbers
  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 mt-6 px-2">
      <div className="flex items-center text-[rgba(255,255,255,0.6)] text-sm">
        <span>Showing</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="mx-2 bg-[#070b15] border border-[rgba(0,229,255,0.2)] rounded-md text-white focus:outline-none focus:ring-[#00e5ff] focus:border-[#00e5ff]"
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span>of {totalItems} items</span>
      </div>

      <div className="flex items-center space-x-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md bg-[#070b15] border border-[rgba(0,229,255,0.2)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(0,229,255,0.1)]"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md bg-[#070b15] border border-[rgba(0,229,255,0.2)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(0,229,255,0.1)]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`w-10 h-10 rounded-md text-sm font-medium ${
              currentPage === pageNumber
                ? "bg-[#00e5ff] text-[#070b15]"
                : "bg-[#070b15] text-white border border-[rgba(0,229,255,0.2)] hover:bg-[rgba(0,229,255,0.1)]"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md bg-[#070b15] border border-[rgba(0,229,255,0.2)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(0,229,255,0.1)]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md bg-[#070b15] border border-[rgba(0,229,255,0.2)] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[rgba(0,229,255,0.1)]"
        >
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

const Table = ({
  filters,
}: {
  filters: IFilters & {
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
  };
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const {
    data: inventoryResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["inventoryItems", filters],
    queryFn: () => inventoryService.getInventoryItems(filters),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00e5ff]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center py-8 text-red-400">
        <AlertCircle className="w-5 h-5 mr-2" />
        Error fetching inventory data
      </div>
    );
  }

  if (!inventoryResponse || inventoryResponse.inventoryItems.length <= 0) {
    return (
      <div className="flex justify-center items-center py-12 text-[rgba(255,255,255,0.6)]">
        No inventory items match your criteria
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full divide-y divide-[rgba(255,255,255,0.1)]">
        <thead className="bg-[rgba(0,229,255,0.05)]">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.7)] uppercase tracking-wider">
              Stock #
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.7)] uppercase tracking-wider">
              Image
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.7)] uppercase tracking-wider">
              Make/Model
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.7)] uppercase tracking-wider">
              Manufacturer
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.7)] uppercase tracking-wider">
              Year
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.7)] uppercase tracking-wider">
              Condition
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-[rgba(255,255,255,0.7)] uppercase tracking-wider">
              Price
            </th>
            <th className="px-4 py-3 text-center text-xs font-medium text-[rgba(255,255,255,0.7)] uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#0a0f1e] divide-y divide-[rgba(255,255,255,0.05)]">
          {inventoryResponse.inventoryItems.map((item) => (
            <tr
              key={item._id}
              className="hover:bg-[rgba(0,229,255,0.05)] transition-colors"
            >
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-[#00e5ff]">
                {item.stockNumber}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0].url}
                    alt={`${item.make} ${item.model}`}
                    className="h-12 w-16 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-vehicle.jpg";
                    }}
                  />
                ) : (
                  <div className="h-12 w-16 bg-[#0f1625] rounded flex items-center justify-center">
                    <span className="text-xs text-[rgba(255,255,255,0.5)]">
                      No image
                    </span>
                  </div>
                )}
              </td>
              <td className="px-4 py-4 text-sm text-white">
                {item.make} {item.model}
              </td>
              <td className="px-4 py-4 text-sm text-white">
                {item.manufacturer}
              </td>
              <td className="px-4 py-4 text-sm text-[rgba(255,255,255,0.7)]">
                {item.year}
              </td>
              <td className="px-4 py-4 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.isNew
                      ? "bg-[rgba(16,185,129,0.1)] text-[#10B981]"
                      : "bg-[rgba(249,115,22,0.1)] text-[#F97316]"
                  }`}
                >
                  {item.isNew ? "New" : "Used"}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-white">
                {item.prices && item.prices.salePrice
                  ? formatAmountWithCommas(item.prices.salePrice)
                  : "N/A"}
              </td>
              <td className="px-4 py-4 text-sm text-center">
                <button
                  onClick={() => handleViewDetails(item)}
                  className="inline-flex items-center justify-center p-2 bg-[rgba(0,229,255,0.1)] rounded-full text-[#00e5ff] hover:bg-[rgba(0,229,255,0.2)] transition-colors"
                  title="View details"
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={filters.page}
        totalItems={inventoryResponse.totalCount}
        itemsPerPage={filters.limit}
        onPageChange={(page) => filters.onPageChange(page)}
        onItemsPerPageChange={(limit) => filters.onLimitChange(limit)}
      />

      {/* Item Detail Modal */}
      {showDetailModal && selectedItem && (
        <ItemDetailModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          item={selectedItem}
        />
      )}
    </div>
  );
};

const InventoryTable = () => {
  const [filters, setFilters] = useState<
    IFilters & {
      onPageChange: (page: number) => void;
      onLimitChange: (limit: number) => void;
    }
  >({
    stockNumber: "",
    isNew: "",
    make: "",
    model: "",
    year: "",
    productType: "",
    priceRange: "",
    manufacturer: "",
    page: 1,
    limit: 10,
    onPageChange: (page: number) => handleFilterChange("page", page),
    onLimitChange: (limit: number) => {
      handleFilterChange("limit", limit);
      handleFilterChange("page", 1); // Reset to first page when changing items per page
    },
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setFilters((prev) => ({ ...prev, page: 1 }));
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [
    filters.stockNumber,
    filters.isNew,
    filters.make,
    filters.model,
    filters.year,
    filters.productType,
    filters.priceRange,
    filters.manufacturer,
  ]);

  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="bg-[#0a0f1e] shadow-lg rounded-lg overflow-hidden mt-6 border border-[rgba(0,229,255,0.2)]">
      <div className="p-6">
        <TableFilters
          filters={filters}
          handleExportCSV={() => {}}
          handleExportPDF={() => {}}
          handleFilterChange={handleFilterChange}
        />
        <Table filters={filters} />
      </div>
    </div>
  );
};

export default InventoryTable;

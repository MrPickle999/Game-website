
import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, setActiveCategory }) => {
  const categories = Object.values(Category);

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all text-sm font-medium ${
            activeCategory === cat
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30'
              : 'bg-slate-900/50 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;

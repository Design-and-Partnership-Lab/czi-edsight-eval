import React, { FC, useState } from 'react';

const categories = ['Emerging', 'Progressing', 'Excelling'] as const;
type Category = typeof categories[number];

interface EPECategorySelectorProps {
  onNext?: (selectedCategory: Category) => void;
}

const EPECategorySelector: FC<EPECategorySelectorProps> = ({ onNext }) => {
  const [selected, setSelected] = useState<Category | ''>('');

  return (
    <div className="mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-black">
        Which EPE category (Emerging, Progressing, Excelling) do you think this reflection best fits into?
      </h2>

      <div className="flex space-x-4 mb-6 max-w-5xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`
              flex-1 py-3 font-semibold transition-colors duration-200 focus:outline-none
              ${
                selected === cat
                  ? 'bg-slate-600 text-white'
                  : 'bg-slate-200 text-slate-900 hover:bg-slate-300'
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {!selected ? (
        <a
          href="#"
          className="text-slate-500 hover:underline"
        >
          Not sure? View EPE rubric &rarr;
        </a>
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (onNext) onNext(selected);
            }}
            className="bg-[#001F54] text-white py-2 px-10 font-semibold rounded-3xl hover:bg-blue-800 transition-colors duration-200 focus:outline-none"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default EPECategorySelector;

import React, { FC, CSSProperties } from 'react';

const categories = ['Emerging', 'Progressing', 'Excelling'] as const;
export type Category = typeof categories[number];

interface EPECategorySelectorProps {
  selected: Category | null;
  onSelect: (cat: Category) => void;
}

const colorMap: Record<Category, string> = {
  Emerging:   'rgba(125, 210, 251, 1)',
  Progressing:'rgba(14, 164, 232, 1)',
  Excelling:  'rgba(3, 105, 160, 1)',
};

const BUTTON_STYLE_BASE: CSSProperties = {
  width: 180,
  height: 57,
  borderRadius: 30,
  borderWidth: 2,
  borderStyle: 'solid',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'background-color 0.2s, color 0.2s, border-color 0.2s',
  outline: 'none',
};

const EPECategorySelector: FC<EPECategorySelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="mx-auto" style={{ maxWidth: 900 }}>
      <h2 className="text-xl font-semibold mb-6 text-black">
        Which EPE category (Emerging, Progressing, Excelling) do you think this reflection best fits into?
      </h2>

      <div className="flex justify-between space-x-4">
        {categories.map(cat => {
          const isSelected = selected === cat;
          const brandColor = colorMap[cat];
          const buttonStyle: CSSProperties = {
            ...BUTTON_STYLE_BASE,
            backgroundColor: isSelected ? brandColor : '#ffffff',
            color:           isSelected ? '#ffffff' : brandColor,
            borderColor:     brandColor,
          };

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelect(cat)}
              style={buttonStyle}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EPECategorySelector;

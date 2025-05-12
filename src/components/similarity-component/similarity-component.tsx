import React from 'react';

interface SimilarityPillProps {
  leftText: string;
  phrase: string;
  rightText: string;
  similarity: number;
}

const SimilarityPill: React.FC<SimilarityPillProps> = ({
  leftText,
  phrase,
  rightText,
  similarity,
}) => {
  const s           = Math.max(0, Math.min(1, similarity));
  const greenPct    = s * 100;
  const sidePct     = (100 - greenPct) / 2;
  const fadeWidth   = 3; 
  const b2gStart    = Math.max(0, sidePct - fadeWidth);
  const b2gEnd      = Math.min(100, sidePct + fadeWidth);
  const g2yStart    = Math.max(0, sidePct + greenPct - fadeWidth);
  const g2yEnd      = Math.min(100, sidePct + greenPct + fadeWidth);

  const gradient = `
    linear-gradient(
      to right,
        /* solid blue until fade zone */
        #DBEAFE 0%,
        #DBEAFE ${b2gStart}%,
        /* fade blue → green between b2gStart…b2gEnd */
        #BBF7D0 ${b2gEnd}%,
        /* solid green until next fade */
        #BBF7D0 ${g2yStart}%,
        /* fade green → yellow between g2yStart…g2yEnd */
        #FEF3C7 ${g2yEnd}%,
        /* solid yellow to the end */
        #FEF3C7 100%
    )
  `.replace(/\s+/g, ' ');

  return (
    <div className="flex items-center w-full">
      {/* left box */}
      <div className="flex-1 min-w-0">
        <div className="bg-blue-100 text-gray-900 px-6 py-3 rounded break-words">
          {leftText}
        </div>
      </div>

      <div className="flex-shrink-0 w-16 h-4 bg-blue-100" />

      {/* center box */}
      <div className="flex-1 min-w-0">
        <div
          className="px-6 py-3 rounded text-center break-words"
          style={{ backgroundImage: gradient }}
        >
          <span className="relative text-gray-900 font-medium">
            {phrase}
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 w-16 h-4 bg-yellow-100" />

      {/* right box */}
      <div className="flex-1 min-w-0">
        <div className="bg-yellow-100 text-gray-900 px-6 py-3 rounded break-words">
          {rightText}
        </div>
      </div>
    </div>
  );
};

export default SimilarityPill;

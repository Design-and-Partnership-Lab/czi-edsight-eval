// "use client";

// import React, { useState } from "react";
// import QUESTIONS from "@/lib/questions";

// import {
//   ReflectionQuestion,
//   ReflectionResponseTranscript,
//   Student,
// } from "@prisma/client";
// import { Card, Divider, Text, Title } from "@tremor/react";
// import EPECategorySelector, { Category } from "@/components/task2/epe-guess-question";

// type EPEData = {
//   student: Student;
//   reflectionQuestion: ReflectionQuestion;
//   reflectionResponseTranscript: ReflectionResponseTranscript;
// };

// export default function EPEPage({
//   student,
//   reflectionQuestion,
//   reflectionResponseTranscript,
// }: EPEData) {
//   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

//   const category = reflectionQuestion?.category || "No category";
//   const transcript =
//     reflectionResponseTranscript?.transcript || "No transcript available";

//   const prompt =
//     QUESTIONS[reflectionQuestion.question as keyof typeof QUESTIONS];

//   const handleNextClick = () => {
//     if (selectedCategory) {
//       console.log("User picked:", selectedCategory);
//       // TODO: onNext logic 
//     }
//   };

//   return (
//     <div className="flex justify-center text-black">
//       <Card className="w-full rounded-lg bg-white">
//         <div className="flex items-center justify-between">
//           <Title className="text-2xl font-semibold text-slate-600">
//             Reflection #1
//           </Title>
//           <button
//             onClick={handleNextClick}
//             disabled={!selectedCategory}
//             className={`
//               py-2 px-6 font-semibold rounded-3xl transition-colors duration-200 focus:outline-none
//               ${selectedCategory
//                 ? "bg-[#001F54] text-white cursor-pointer"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"}
//             `}
//           >
//             Next Activity → 
//           </button>
//         </div>

//         <div className="mt-6 grid grid-cols-5 gap-6 border p-10">
//           <div className="col-span-2 pr-4">
//             <Title className="text-xl font-semibold">Prompt</Title>
//             <Text className="mt-2 text-gray-700">
//               {`${category === "Criticalthinking"
//                 ? "Critical Thinking"
//                 : category
//               }: ${prompt.question}`}
//             </Text>

//             <Divider className="my-5" />

//             <Title className="text-xl font-semibold">Response</Title>
//             <Text className="mt-2 text-gray-700">{transcript}</Text>
//           </div>

//           <div className="col-span-3 border-l border-gray-200 pl-10">
//             <EPECategorySelector
//               selected={selectedCategory}
//               onSelect={setSelectedCategory}
//             />
//           </div>
//         </div>
//       </Card>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import QUESTIONS from "@/lib/questions";

import {
  ReflectionQuestion,
  ReflectionResponseTranscript,
  Student,
} from "@prisma/client";
import { Card, Divider, Text, Title } from "@tremor/react";
import EPECategorySelector, { Category } from "@/components/task2/epe-guess-question";

type EPEData = {
  student: Student;
  reflectionQuestion: ReflectionQuestion;
  reflectionResponseTranscript: ReflectionResponseTranscript;
};

export default function EPEPage({
  student,
  reflectionQuestion,
  reflectionResponseTranscript,
}: EPEData) {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // load your highlighted HTML
  const [annotatedText, setAnnotatedText] = useState<string>("");
  useEffect(() => {
    const saved = localStorage.getItem("annotatedText");
    if (saved) setAnnotatedText(saved);
  }, []);

  const category = reflectionQuestion?.category || "No category";
  const prompt =
    QUESTIONS[reflectionQuestion.question as keyof typeof QUESTIONS];

  const handleNextClick = () => {
    if (selectedCategory) {
      console.log("User picked:", selectedCategory);
      // TODO: onNext logic
    }
  };

  return (
    <div className="flex justify-center text-black">
      <Card className="w-full rounded-lg bg-white">
        <div className="flex items-center justify-between">
          <Title className="text-2xl font-semibold text-slate-600">
            Reflection #1
          </Title>
          <button
            onClick={handleNextClick}
            disabled={!selectedCategory}
            className={`
              py-2 px-6 font-semibold rounded-3xl transition-colors duration-200 focus:outline-none
              ${selectedCategory
                ? "bg-[#001F54] text-white cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"}
            `}
          >
            Next Activity →
          </button>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-6 border p-10">
          <div className="col-span-2 pr-4">
            <Title className="text-xl font-semibold">Prompt</Title>
            <Text className="mt-2 text-gray-700">
              {`${category === "Criticalthinking"
                ? "Critical Thinking"
                : category
              }: ${prompt.question}`}
            </Text>

            <Divider className="my-5" />

            <Title className="text-xl font-semibold">Response</Title>
            {/* <-- replaced transcript with your highlighted HTML */}
            <div
              className="mt-2 text-gray-700 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: annotatedText }}
            />
          </div>

          <div className="col-span-3 border-l border-gray-200 pl-10">
            <EPECategorySelector
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

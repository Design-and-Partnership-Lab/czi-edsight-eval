import { useState } from "react";
import { type Category } from "@/components/mvp/lib/utils";
import { Summary } from "@/components/mvp/task-three/summary";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/tremor/Tabs";
import { SubcategoryBucket } from "@prisma/client";
import { Text, Textarea } from "@tremor/react";
import { CircleIcon } from "lucide-react";

interface TaskThreeProps {
    reflectionResponseId: number;
    teacherEval: Category | null;
    aiEval: Category;
    handleCanProgress: (value: boolean) => void;
    aiRationale: SubcategoryBucket[];
    teacherFeedback: string | null;
    setTeacherFeedback: (value: string) => void;
}

const TABS = [
    "Openmindedness",
    "Sources",
    "Innovation",
    "Materials",
    "Reflection",
];

type Subcategory = {
  bucket: string;
  score: number;
  rationale: string[];
};

type Reflection = {
  Openmindedness: Subcategory;
  Sources: Subcategory;
  Innovation: Subcategory;
  Materials: Subcategory;
  Reflection: Subcategory;
};

type AllReflections = {
  [reflectionId: number]: Reflection;
};

const allReflections: AllReflections = {
    30518: {
        Openmindedness: {
        bucket: "PROGRESSING",
        score: 1.5,
        rationale: [
            "The student reflects on their own creative process and achievements without mentioning any contrasting perspectives from others.",
            "The student contrasts their own quick script writing process with that of their classmates, implying that they were able to complete their work faster than others.",
            "The student created a product and script for a commercial without prior experience, demonstrating a willingness to embrace uncertainty and explore their creativity.",
            "The student took initiative to create a product and prop despite the uncertainty of how it would be received, demonstrating a positive response to ambiguity in their creative process.",
            "The student does not indicate that they changed their actions based on new information; they describe their creative process but do not mention any adjustments made in response to feedback or new insights.",
            "The student does not indicate any specific changes in their actions based on new information; they reflect on their creative process but do not mention adapting their approach in response to feedback or new insights."
            ]},
        Sources: {
        bucket: "EMERGING",
        score: 0,
        rationale: [
            "The student does not mention seeking support or feedback from others during the process of creating their commercial.",
            "The student does not mention seeking support or feedback from others during their creative process.",
            "The student reflects on their own creative process and experiences without mentioning any external sources of information or inspiration.",
            "The student does not mention using any specific sources of information or inspiration for their project; they focus on their own creativity and process."
            ]},
        Innovation: {
        bucket: "PROGRESSING",
        score: 1.5,
        rationale: [
            "The student created a unique product called Magic Chews and developed a script for a commercial, demonstrating their ability to generate original ideas and solutions for the assignment.",
            "The student addressed the challenge of creating a commercial by developing a unique product, designing a prop, and efficiently writing a script, showcasing their creativity in the process.",
            "The student describes their process of creating a product and script but does not indicate that they considered multiple solutions or alternatives during their creative process.",
            "The student describes multiple creative solutions, including the creation of a product, the use of materials for a prop, and the efficient writing of a script, showcasing their ability to generate ideas and execute them effectively."
            ]},

        Materials: {
        bucket: "PROGRESSING",
        score: 1.5,
        rationale: [
            "The student mentions using a cardboard box and colored paper to create a prop for their commercial, indicating the use of multiple materials in their creative process.",
            "The student describes using a cardboard box and colored paper to create a prop for their commercial, demonstrating the use of different materials in their creative process.",
            "The student mentions using a cardboard box and colored paper to create a prop for their commercial, but does not explain why they chose those specific materials to achieve their goals.",
            "The student describes using a cardboard box and colored paper to create a prop for their commercial, as well as designing and coloring their product to showcase their creativity."
            ]},

        Reflection: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student reflects on their creative process by describing how they created a product and script for a commercial, discussing their use of materials, the speed of their work compared to classmates, and their feelings of pride and accomplishment in their creativity.",
            "The student reflects on their creative process by discussing the steps they took to create a product and script, their feelings of pride in their work, their efficiency compared to peers, and their recognition of their own creativity.",
            "The student reflects on their ability to use creativity effectively and mentions learning to express their ideas quickly, indicating personal growth and a desire to continue developing their creative skills.",
            "The student reflects on their ability to use creativity efficiently, expresses pride in their hard work, acknowledges being seen as creative, and recognizes the value of following their instincts in creative endeavors."
            ]},
    },

    109270:{
        Openmindedness: {
        bucket: "EXCELLING",
        score: 3.0,
        rationale: [
            "The student acknowledges the importance of collaboration and mentions that 'everybody has creative ideas,' indicating an awareness of perspectives different from their own, especially when discussing the unique ideas from their group members.",
            "The student acknowledges the importance of collaboration and mentions that everyone in the group had unique ideas, which contrasts with their own perspective of being the primary idea generator for the project.",
            "The student engaged in a brainstorming process with their group, suggesting new ideas and adapting based on feedback, which indicates a positive response to the ambiguity of the project's direction.",
            "The student demonstrates a positive response to ambiguity by actively engaging in brainstorming, researching, and iterating on ideas, showing adaptability and openness to different possibilities throughout the project.",
            "The student mentions gathering feedback from others and making multiple drafts, indicating that they adjusted their actions and ideas based on new information received during the collaborative process.",
            "The student changed their actions by gathering feedback from others and making multiple drafts, which indicates they adapted their project based on new insights and collaborative input."
            ]},
        Sources: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student mentions gathering feedback from others and making multiple drafts during the project.",
            "The student actively sought support and feedback by gathering input from others and creating multiple drafts to refine their project.",
            "The student mentions researching various issues and products, as well as health issues that different age groups had, indicating they sought multiple sources of information to inform their creative process.",
            "The student sought multiple sources of information by researching health issues, gathering feedback, and utilizing different software to enhance their project."
            ]},
        Innovation: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student actively contributed original ideas during the brainstorming process and ultimately suggested a unique product, Paci-Free, to address a health issue for infants.",
            "The student actively contributed to the project by suggesting ideas, conducting research, and iterating on their work based on feedback, which helped the group develop a creative health product.",
            "The student actively suggested new ideas during brainstorming, researched various issues, and engaged in discussions with their group, indicating they considered multiple solutions throughout their creative process.",
            "The student describes multiple solutions throughout the creative process, including idea generation, research, collaboration, and iterative design."
            ]},
        Materials: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student mentions using various software to perfect their design, indicating the use of multiple kinds of media in their creative process, along with brainstorming and researching.",
            "The student used various media and materials by researching health issues, creating slides for their presentation, and utilizing software to draw and perfect their product design.",
            "The student explains that they used various software to perfect their design, indicating a choice of materials and media to achieve their project's goals.",
            "The student mentions using different software to create a design that matched their vision for the health product, Paci-Free."
            ]},
        Reflection: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student provides a detailed account of their creative process, including brainstorming, researching, collaborating with their group, and reflecting on the importance of collaboration and feedback in developing their project.",
            "The student reflects on their creative process by detailing how they contributed ideas, conducted research, collaborated with their group, and iterated on their project through feedback and drafts. They also express pride in their final product and the lessons learned about collaboration.",
            "The student reflects on their creative process and emphasizes the importance of collaboration, indicating an understanding of how listening to others' ideas can enhance their own creativity and teamwork skills.",
            "The student reflects on their growth by acknowledging the value of collaboration and the importance of listening to others' creative ideas during the project."
            ]},

    },
    114390: {
        Openmindedness: {
        bucket: "PROGRESSING",
        score: 2.5,
        rationale: [
            "The student reflects on their own creative process and contributions without mentioning any contrasting perspectives from others.",
            "The student contrasts their own creative alternative with the initial design concept and original plan, indicating that sticking to the original approach was not effective in solving the problem.",
            "The student adapted to a problem with their initial design concept by brainstorming multiple solutions and proposing a new idea, demonstrating a positive response to the ambiguity of the situation.",
            "The student demonstrates a positive response to ambiguity by suggesting an alternative solution when faced with a problem, brainstorming multiple options, and being open to exploring different possibilities, which led to innovative outcomes.",
            "The student encountered a problem with their initial design concept and chose to suggest a creative alternative, indicating they changed their actions based on the new information about the issue at hand.",
            "The student changed their actions by suggesting a new solution after identifying a problem with the original design. This demonstrates their ability to adapt and think creatively in response to challenges."
        ]},
        Sources: {
        bucket: "PROGRESSING",
        score: 1.5,
        rationale: [
            "The student collaborated with their team to propose a creative alternative, indicating they sought input and feedback from others to improve the project.",
            "The student does not mention seeking support or feedback from others; instead, they focus on their own creative process and contributions to the team.",
            "The student mentions brainstorming multiple solutions and considering project requirements and constraints, indicating they sought various sources of information and perspectives to inform their creative process.",
            "The student sought multiple sources of information by brainstorming various solutions and taking into account the project requirements and constraints to propose a creative alternative."
        ]},
        Innovation: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student identified a problem with the initial design concept and proposed a creative alternative, demonstrating their ability to generate their own solution to address the issue.",
            "The student proposed a new idea to address a design issue and engaged in brainstorming to find the best solution, demonstrating flexibility and creativity in problem-solving.",
            "The student explicitly mentions brainstorming multiple solutions and being open to exploring different possibilities, indicating a clear consideration of various options in their creative process.",
            "The student describes several solutions they proposed during the creative process, demonstrating flexibility and adaptability in problem-solving."
        ]},
        Materials: {
        bucket: "EMERGING",
        score: 0,
        rationale: [
            "The student discusses their creative process in terms of brainstorming and proposing solutions, but there is no mention of using multiple kinds of materials or media.",
            "The student discusses their creative process and problem-solving approach but does not mention using any specific media or materials in their creative process.",
            "The student discusses their creative process and problem-solving approach but does not mention specific materials or media they chose to use in their project.",
            "The student discusses their creative process and problem-solving approach but does not specify any particular media or materials used in their project."
        ]},
        Reflection: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student provides a detailed reflection on their creative process, including brainstorming solutions, adapting to challenges, and the impact of their creative thinking on the project outcome. They also discuss the lessons learned about flexibility and collaboration.",
            "The student reflects on their creative process by discussing how they adapted their initial design, brainstormed solutions, and proposed ideas, while also expressing pride in their contributions and learning from the experience.",
            "The student reflects on their growth by discussing how they learned the importance of flexibility and adaptability in problem-solving, gained confidence in their creative thinking, and recognized the value of creativity in achieving successful outcomes.",
            "The student reflects on their growth by identifying lessons learned about flexibility, confidence in creative thinking, and the importance of creativity in achieving successful outcomes."
        ]},
    },
    41318: {
        Openmindedness: {
        bucket: "PROGRESSING",
        score: 2.5,
        rationale: [
            "The student focuses on their own creative process and the feedback they receive from friends, without mentioning any contrasting perspectives.",
            "The student contrasts their own perspective of seeking feedback and improvement with the positive reinforcement they receive from friends, highlighting different viewpoints on their art.",
            "The student actively seeks feedback from friends and experiments with different ideas and techniques in their art, demonstrating a willingness to embrace uncertainty and improve through the creative process.",
            "The student actively seeks feedback and explores different ideas and color combinations, demonstrating a positive approach to the uncertainty involved in the creative process.",
            "The student actively seeks feedback from friends and uses their input to improve their art, such as making adjustments to colors or techniques based on the suggestions received.",
            "The student actively seeks feedback from friends on their drawings, which leads them to make adjustments to improve their art, such as fixing colors and enhancing overall quality based on the suggestions received."
        ]},
        Sources: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student actively seeks feedback from friends on their drawings and learns from their input to improve their art.",
            "The student actively sought support and feedback by sharing their art with friends, gathering references, and asking for specific feedback on their work, which helped them improve their art.",
            "The student mentions gathering references and ideas from multiple sources, as well as seeking feedback from friends to improve their art.",
            "The student sought multiple sources of information by gathering references, seeking feedback from friends, and incorporating ideas from peers to improve their artwork."
        ]},
        Innovation: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student actively seeks feedback from friends to improve their art, demonstrating a creative approach to enhancing their skills and addressing the challenge of artistic development.",
            "The student actively seeks feedback from friends to enhance their art and incorporates various references and ideas to improve their work.",
            "The student actively seeks feedback from friends and gathers various references and ideas, indicating they consider multiple solutions and approaches throughout their creative process.",
            "The student describes a process of gathering ideas, seeking feedback, and iterating on their artwork, demonstrating multiple solutions to improve their creative work."
        ]},
        Materials: {
        bucket: "PROGRESSING",
        score: 1.5,
        rationale: [
            "The student describes a process that includes gathering references, making sketches, creating line art, testing colors, and adding details, indicating the use of various techniques and possibly different media in their artistic process.",
            "The student describes using various steps in their drawing process, including gathering references, creating sketches, testing colors, and adding details, which indicates the use of different media and materials in their creative process.",
            "The student describes their process of creating art and seeking feedback from friends, but does not explain why they chose specific materials or media for their artwork.",
            "The student describes using various media and materials in their creative process, such as gathering references, testing colors, and adding details to enhance their artwork."
        ]},
        Reflection: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student provides a detailed account of their creative process, including gathering references, sketching, testing colors, and seeking feedback from friends, which shows reflection on how these steps contribute to their improvement.",
            "The student reflects on their creative process by detailing how they seek feedback, gather ideas, and describe their artistic workflow, as well as the learning and emotional benefits they gain from sharing their art with friends.",
            "The student reflects on their process of creating art and acknowledges the feedback from friends as a way to improve their skills, indicating an awareness of personal growth.",
            "The student reflects on their growth by discussing how feedback from friends helps improve their art and how compliments encourage their progress."
        ]}
    },
    40653: {
        Openmindedness: {
        bucket: "PROGRESSING",
        score: 2.5,
        rationale: [
            "The student describes their own creative process and project without mentioning any contrasting perspectives or ideas from others.",
            "The student describes their innovative approach to creating an eco-friendly energy generator, contrasting it with traditional methods of energy generation that may not be as creative or environmentally friendly.",
            "The student describes creating an innovative project that involved inventing something new, which inherently involves uncertainty and ambiguity. They embraced the challenge of developing a unique energy-generating contraption despite not having prior experience.",
            "The student took on the challenge of inventing a new device, demonstrating a willingness to explore unknown concepts and navigate the uncertainties involved in creating something innovative.",
            "The student describes a process of invention where they gathered information about magnetic forces and applied that knowledge to create a unique energy-generating contraption. This indicates they changed their actions based on their understanding of how magnets work.'",
            "The student changed their actions by applying their understanding of magnetic forces to create a contraption that generates energy, indicating they adapted their project based on new insights gained during the design process."
        ]},
        Sources: {
        bucket: "EMERGING",
        score: 0.5,
        rationale: [
            "The student describes their project and creative process but does not mention seeking support or feedback from others.",
            "The student does not mention seeking support or feedback from others during their project.",
            "The student describes a project that involved inventing something new and mentions using concepts related to energy generation and magnetism, indicating they likely drew from various scientific principles and possibly external sources to inform their design.",
            "The student does not mention any specific sources of information or inspiration used in their project. They describe their creative process but do not indicate seeking external information."
        ]},
        Innovation: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student describes creating an innovative project to generate energy in an eco-friendly way, demonstrating their ability to generate a unique solution to a problem.",
            "The student designed and built a unique device to generate energy in an eco-friendly manner, showcasing their creativity and problem-solving skills.",
            "The student describes a process of invention that involved experimentation and iteration, indicating they considered multiple solutions and learned from their flaws during the project.",
            "The student describes their innovative project of creating an energy generator, showcasing multiple solutions through the design and construction of their contraption.'"
        ]},
        Materials: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student describes using various materials and components, such as magnets, a rotor, a soldering pen, and a hopper coil, to create an energy-generating contraption, indicating a diverse range of materials in their project.",
            "The student describes using various materials such as magnets, a soldering pen, and a hopper coil to create a contraption that generates energy, showcasing their creative process through the use of different media.",
            "The student explains their choice of materials, such as magnets and a hopper coil, to create a contraption that generates energy in an eco-friendly way, detailing how these components work together to achieve their goal.'",
            "'The student describes using various materials and tools, such as magnets, a soldering pen, and a hopper coil, to create an eco-friendly energy-generating contraption for their engineering project."
        ]},
        Reflection: {
        bucket: "EXCELLING",
        score: 2.0,
        rationale: [
            "The student reflects on their creative process by describing how they invented a project, detailing the steps they took to create it, and acknowledging the flaws and learning experiences they encountered during the process.",
            "The student reflects on their creative process by detailing how they seek feedback, gather ideas, and describe their artistic workflow, as well as the learning and emotional benefits they gain from sharing their art with friends.",
            "The student reflects on their project and mentions seeing their flaws, indicating an awareness of areas for improvement and personal growth in their innovative activities",
            "The student reflects on their experience by acknowledging that they were able to see their flaws during the innovative project, indicating an awareness of areas for improvement."
        ]}
    },
}

export function TaskThree({
    teacherEval,
    reflectionResponseId,
    aiEval,
    handleCanProgress,
    aiRationale,
    teacherFeedback,
    setTeacherFeedback,
}: TaskThreeProps) {
    const [activeTab, setActiveTab] = useState("Openmindedness");
    const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
        new Set(["Openmindedness"])
    );
    const hasScrolledThroughTabs = visitedTabs.size === TABS.length;

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setVisitedTabs((prev) => {
            const next = new Set(prev);
            next.add(tab);
            return next;
        });
    };

    const handleInput = (value: string) => {
        setTeacherFeedback(value);
        handleCanProgress(!!value.length);
    };

    if (!teacherEval) {
        return "Teacher Eval was not provided.";
    }

    return (
        <>
            <Summary
                teacherEval={teacherEval}
                aiEval={aiEval}
            />

            <div>
                <Tabs
                    defaultValue={activeTab}
                    onValueChange={handleTabClick}
                >
                    <TabsList
                        variant="line"
                        className="mb-4"
                    >
                        {TABS.map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="flex items-center gap-x-2 text-lg font-bold"
                            >
                                {tab}
                                {visitedTabs.has(tab) ? (
                                    <CircleIcon className="size-4 fill-blue-500 text-blue-500" />
                                ) : (
                                    <CircleIcon className="size-4" />
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {TABS.map((tab) => {
                        let bulletPoints: string[] = [];

                        if (reflectionResponseId) {
                            // Use the rationale from allReflections and split each string at ', '
                            bulletPoints = allReflections[reflectionResponseId][tab as keyof Reflection].rationale;
                
                        } else {
                            // Default: use aiRationale as before
                            const rationale = aiRationale.find(
                                (r) => r.subcategory.toLowerCase() === tab.toLowerCase()
                            );
                            if (rationale) {
                                bulletPoints = [rationale.rationale];
                            }
                        }

                        return (
                            <TabsContent
                                key={tab}
                                value={tab}
                                className="min-h-[8rem] pl-8 text-gray-800"
                            >
                                {bulletPoints.length > 0 ? (
                                    <ul className="list-disc first-letter:uppercase">
                                        {bulletPoints.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="">
                                        No rationale available for this subcategory.
                                    </p>
                                )}
                            </TabsContent>
                        );
                    })}
                </Tabs>

                <div>
                    <Text className="mb-4 text-lg font-bold text-ee-black">
                        Think about how your annotations compare and contrast
                        with the AI Rationale. What stood out to you? When you
                        are ready and have viewed all AI Rationale sections,
                        please type into the box below.
                    </Text>

                    <Textarea
                        placeholder={
                            hasScrolledThroughTabs
                                ? "Input your response here..."
                                : "You must read through all five sub-skills before you can respond to this question."
                        }
                        disabled={!hasScrolledThroughTabs}
                        value={teacherFeedback ?? ""}
                        onValueChange={handleInput}
                        className="min-h-24"
                    />

                    {/* <div className="mt-2 flex justify-end">
                        <Button
                            size="xs"
                            variant="secondary"
                            icon={Mic}
                            disabled={!hasScrolledThroughTabs}
                        >
                            Record
                        </Button>
                    </div> */}
                </div>
            </div>
        </>
    );
}

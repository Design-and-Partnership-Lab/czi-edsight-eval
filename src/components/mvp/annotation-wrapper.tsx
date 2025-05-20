import { Text, Title } from "@tremor/react";

export function AnnotationWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-6 border">
            <div className="col-span-2 space-y-8 border-r p-10">
                <div className="space-y-2">
                    <Title className="text-ee-gray-dark text-xl font-semibold">
                        Prompt
                    </Title>
                    <Text className="text-ee-gray-light">
                        Critical Thinking: Describe an experience in this class
                        when learning felt like a big challenge to you. How did
                        you overcome this challenge? What did you learn about
                        yourself during the process? Thinking back, what would
                        you do differently to overcome the challenge?
                    </Text>
                </div>

                <div className="space-y-2">
                    <Title className="text-ee-gray-dark text-xl font-semibold">
                        Response
                    </Title>
                    <Text className="text-ee-gray-light">
                        [[ THE COMPONENT ]]
                    </Text>
                </div>
            </div>

            <div className="col-span-4 p-10">{children}</div>
        </div>
    );
}

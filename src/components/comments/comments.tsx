import { Card, Divider, Text, Title } from "@tremor/react";
import AnnotateText from "@/components/annotate/AnnotateText";
import { Recogito } from '@recogito/recogito-js';

export default function Comment({ promptCode }: CommentProps) {
    return (
        <div className="flex justify-center p-32 text-black">
            <Card className="w-full rounded-lg bg-white">
                <Title className="text-4xl font-semibold">
                    {promptCode}
                </Title>
                <div className="col-span-3 rounded-lg border p-6">
                    <Title className="text-3xl font-semibold">
                        Prompt
                    </Title>
                    <Text className="mt-2 text-gray-700">
                        something
                    </Text>
                    <Divider className="my-4" />

                    <Title className="text-3xl font-semibold">
                        Response
                    </Title>

                    <Text className="mt-2 italic text-gray-700">
                        Please review the student&apos;s response and
                        highlight any sections where the AI Rationale is not
                        consistent with your interpretation of the
                        student&apos;s response.
                    </Text>

                    <div className="mt-2 text-gray-700">
                        <AnnotateText>
                            Quis exercitation ut id laborum
                            excepteur. Veniam aute sit mollit commodo dolore
                            irure. Dolor laborum labore cupidatat consequat
                            ex voluptate proident ea.
                        </AnnotateText>
                    </div>
                </div>
            </Card>
        </div>
    );
}

interface CommentProps {
    promptCode: string;
}

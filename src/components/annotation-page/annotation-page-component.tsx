"use client";

import React, { useState } from "react";
import { Card, Text } from "@tremor/react";
import AnnotateLexical from "../../app/annotation-lexical/AnnotateLexical";
import ProgressBar from "../progress-bar/progress-bar";

export default function ReflectionPage() {
    const [annotations, setAnnotations] = useState([]);

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-6xl mx-auto">
                <ProgressBar currentStep={0} />
                <div className="flex justify-between my-6 place-content-center">
                    <h1 className="text-2xl font-semibold text-gray-800">Reflection #1</h1>
                    <button
                        className={`${annotations.length > 0 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-full px-4 py-2 flex items-center`}
                        disabled={annotations.length === 0}
                    >
                        Next Activity
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>

                <div className="flex border rounded-2xl p-4 px-8">
                    <div className="flex-grow mr-4">
                        <Card className="p-6 rounded-md mb-4">
                            <div className="mb-6">
                                <div className="flex items-start">
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-semibold mb-2 text-neutral-800">Read the prompt and the student response. Annotate what stood out to you. Please note that you will not be able to revise your annotations afterward.</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold mb-2 text-neutral-800 text-lg">Prompt</h3>
                                <p className="text-neutral-700">
                                    Critical Thinking: Describe an experience in this class when learning felt like a big challenge to you. How did you overcome this challenge? What did you learn about yourself during the process? Thinking back, what would you do differently to overcome the challenge?
                                </p>
                            </div>

                            <div>
                                <div className="flex justify-row items-center mb-2">
                                    <h3 className="font-semibold text-neutral-800 text-lg">Response</h3>
                                    <button
                                        className="flex items-center bg-blue-800 text-white px-3 py-1 text-sm rounded-2xl font-semibold ml-3" 
                                        disabled={true}
                                    >
                                        Annotating...
                                        <svg width="15" height="15" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.2513 0.501C17.4325 0.501282 17.6074 0.567168 17.7437 0.686476C17.8801 0.805783 17.9686 0.970444 17.993 1.15001L18 1.25201L17.996 5.7491C17.9946 6.3021 17.79 6.8353 17.4212 7.24722C17.0524 7.65915 16.5452 7.92107 15.9959 7.98314V10.2432C15.996 10.8133 15.7797 11.3622 15.3908 11.779C15.0019 12.1957 14.4694 12.4492 13.9008 12.4882L13.7469 12.4932H13.494V15.2853C13.4942 15.6833 13.3888 16.0743 13.1886 16.4183C12.9884 16.7622 12.7006 17.0469 12.3545 17.2433L12.1996 17.3233L5.56753 20.4294C5.46099 20.4792 5.34422 20.5033 5.22666 20.4996C5.1091 20.496 4.99405 20.4647 4.89081 20.4083C4.78757 20.352 4.69903 20.2721 4.63236 20.1752C4.56568 20.0782 4.52274 19.967 4.507 19.8504L4.5 19.7504V12.4932H4.24811C3.67824 12.4933 3.12959 12.2769 2.71304 11.8878C2.29649 11.4988 2.04311 10.966 2.00411 10.3972L1.99911 10.2432V7.98314C1.4774 7.92478 0.992534 7.68567 0.628518 7.30724C0.264503 6.92881 0.0442768 6.43491 0.00599738 5.9111L0 5.7471V1.25101C5.82167e-05 1.06099 0.0722125 0.878066 0.201883 0.739213C0.331554 0.60036 0.509072 0.515926 0.698569 0.502974C0.888067 0.490022 1.07541 0.549516 1.22276 0.669436C1.3701 0.789355 1.46645 0.960758 1.49234 1.14901L1.49933 1.25101V5.7471C1.49933 6.1271 1.78121 6.44111 2.14705 6.49111L2.249 6.49711H15.744C16.1238 6.49711 16.4387 6.2141 16.4897 5.8481L16.4967 5.7471L16.5007 1.25001C16.5007 1.0511 16.5796 0.860329 16.7202 0.719674C16.8608 0.579019 17.0515 0.5 17.2503 0.5M11.9947 12.4932H6.00033V18.5703L11.5649 15.9643C11.6773 15.9115 11.775 15.8316 11.8489 15.7318C11.9229 15.632 11.9709 15.5153 11.9887 15.3923L11.9967 15.2853L11.9947 12.4932ZM14.4956 7.99714H3.49845V10.2432C3.49845 10.6232 3.78032 10.9372 4.14616 10.9862L4.24811 10.9932H13.7469C13.928 10.9932 14.1031 10.9275 14.2396 10.8084C14.3761 10.6893 14.4649 10.5247 14.4896 10.3452L14.4966 10.2432L14.4956 7.99714Z" fill="white" />
                                        </svg>
                                    </button>
                                </div>
                                <AnnotateLexical 
                                    className="text-neutral-800 pt-2"
                                >
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum venenatis eget metus id mattis. Morbi eget leo nec diam tincidunt viverra. Nullam molestie quam et sollicitudin bibendum. Proin egestas volutpat lacus, ut rhoncus ligula dignissim a. Aliquam vitae consectetur magna. Vestibulum volutpat interdum eros vel egestas. Praesent euismod orci et quam mollis, id efficitur risus bibendum. Vestibulum sollicitudin quam nunc, eget ullamcorper libero pellentesque sit amet. Nunc faucibus odio placerat nisi vestibulum, elementum viverra sapien elementum. Etiam vel posuere felis. Nullam auctor tincidunt hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </AnnotateLexical>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
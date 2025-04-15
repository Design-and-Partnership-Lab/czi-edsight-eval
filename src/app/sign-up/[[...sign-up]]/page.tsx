import { SignUp } from "@clerk/nextjs";

export default async function Page() {
    return (
        <div className="w-screen h-screen flex overflow-hidden">
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-sky-400 to-indigo-600 relative overflow-hidden">
                <div className="absolute w-full h-full flex flex-col justify-center items-center px-12 z-10">
                    <img className="w-64 h-auto mb-2" src="/edsightlogo-white.svg" alt="EdSight Logo" 
                    />
                    <p className="text-white/80 text-lg text-center max-w-md">
                        Blah bal labsd  fds f oidhsdoifahsdfo ahb Blakh asdioasdhjasd sahdaud
                    </p>
                      <div className="absolute bottom-8 left-0 w-full flex justify-center">
                        <div className="text-white/70 text-sm">
                            © 2025 Edsight. All rights reserved.
                        </div>
                    </div>
                </div>
                
                {/* bubbles */}
                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-blue-300/20 rounded-full blur-xl"></div>
                <div className="absolute top-1/4 -right-8 w-32 h-32 bg-indigo-300/30 rounded-full blur-lg"></div>
            </div>
            
            {/* right side */}
            <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-6">
                <div className="w-full max-w-md">
                    <div className="flex justify-center mb-8 md:hidden">
                        <img 
                            className="w-48 h-auto" 
                            src="/edsightlogo.svg" 
                            alt="EdSight Logo" 
                        />
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <SignUp/>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500 text-center">
                                Need help? <button className="text-blue-600 font-medium hover:text-blue-700">Contact support</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
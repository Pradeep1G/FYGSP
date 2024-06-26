import sistlogologin from "../assets/sistlogologin.png";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function StudentNormalNavbar({ StudentMailId }) {
    const [Toggle, setToggle] = useState(false);

    return (
        <>
            <div>
                <nav className="flex items-center justify-between bg-[#9e1c3f] p-10 py-5">
                    <div className="flex items-center">
                        <a href="/">
                            <img
                                src={sistlogologin}
                                alt="Logo"
                                className="object-scale-down h-35 w-80 px-3 pt-3"
                            />
                        </a>
                    </div>

                    <div
                        className="lg:hidden"
                        onClick={() => {
                            setToggle(!Toggle);
                        }}
                    >
                        <FiMenu color="white" size={36} />
                    </div>

                    {/* Display StudentMailId or any other relevant information */}
                    <div className="lg:flex space-x-4 items-center hidden">
                        <div className="font-semibold text-lg">
                            <p>{StudentMailId}</p>
                        </div>
                    </div>
                </nav>
                {Toggle && (
                    <div className="lg:hidden flex justify-center bg-[#9e1c3f] pb-6">
                        <div className="flex-col space-y-4 items-center">
                            <div className="font-semibold text-lg">
                                <p>{StudentMailId}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

import Image from "next/image";
import Link from "next/link";

export default function SuccessAccount() {
    return (
        <div className="max-w-[1420px] mx-auto px-4 py-10 flex flex-col items-center space-y-6 min-h-screen justify-center text-scheer-primary-dark">
            {/* Party Icon Placeholder */}
            <div className="w-16 h-16" />
            <Image
                src={"/congress.png"}
                alt=""
                height={250}
                width={250}
            />

            <h1 className="text-2xl md:text-[56px] font-bold text-center">
                Your Company Profile <br /> is Almost Ready!
            </h1>
            <p className="text-center text-scheer-body-gray text-xl max-w-[785px]">
                You’ve successfully set up your company profile. Now, you can start posting jobs and connecting with top talent!
            </p>

            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 cursor-pointer transition-all duration-300 font-semibold flex items-center gap-2">
                Check Your Email to Acccess Your Dashboard
            </button>
            <Link href={"/"}>
                <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-800 cursor-pointer transition-all duration-300 font-semibold flex items-center gap-2">
                    Go Home
                </button>
            </Link>


        </div>
    );
}
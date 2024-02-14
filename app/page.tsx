import Image from "next/image";
import NavBar from "./components/nav-bar";

export default function Home() {
    return (
        <>
            <div>
                <section className="flex h-screen items-center justify-center flex-col">
                    <h1 className="text-2xl font-bold md:text-5xl">
                        Weclome to
                    </h1>
                    <span className="block text-6xl md:text-9xl">
                        Vixel Flow
                    </span>
                    <p className="text-xl ">Image editing at its finest.</p>
                </section>
                <section className="flex h-screen items-center justify-center flex-col relative">
                    <h1 className="md:text-xl font-bold">Instant Effects</h1>
                    <span className="block text-4xl md:text-8xl z-[10]">
                        Instant Downloads
                    </span>
                    <p>All from one place</p>
                    <div className="md:w-[500px] bottom-0 absolute  inset-0 flex flex-col justify-center py-10 z-[0]">
                        <div className="bg-blue-300 dark:bg-blue-600 h-[50px] md:h-[500px] rounded-r-2xl shadow-2xl shadow-blue-900 w-full"></div>
                    </div>
                </section>
            </div>
        </>
    );
}

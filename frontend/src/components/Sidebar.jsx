const Sidebar = () => {
    return (
        <sidebar className="h-[calc(100vh-40px)] fixed min-w-[200px] flex flex-col justify-between my-10 px-4 border-r-2 border-gray-500">

            <div className="flex gap-2 items-center">
                <img className="w-[60px]" src="/Flirtini/logo.png" alt="Flirtini Logo" />
                <h1 className="text-white text-3xl font-bold font-[Dancing_Script]">Flirtini</h1>
            </div>

            <div className="flex flex-col gap-5">
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200 flex gap-2 flex-nowrap">
                    <span className="material-symbols-outlined">explore</span>
                    <p>Explore</p>
                </a>
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200 flex gap-2 flex-nowrap">
                    <span className="material-symbols-outlined">favorite</span>
                    <p>Liked</p>
                </a>
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200 flex gap-2 flex-nowrap">
                    <span className="material-symbols-outlined">local_bar</span>
                    <p>Compose</p>
                </a>
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200 flex gap-2 flex-nowrap">
                    <span className="material-symbols-outlined">star</span>
                    <p>Today's choice</p>
                </a>
            </div>

            <div>
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200 flex gap-2 flex-nowrap">
                    <span className="material-symbols-outlined">person</span>
                    <p>Profile</p></a>
            </div>

        </sidebar>
    )
}

export default Sidebar;
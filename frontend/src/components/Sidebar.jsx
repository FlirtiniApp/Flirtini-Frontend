const Sidebar = () => {
    return (
        <sidebar className="h-[calc(100vh-40px)] fixed min-w-[200px] flex flex-col justify-between my-10 px-4 border-r-2 border-gray-500">

            <div className="">
                <h1 className="text-white text-lg font-bold">Flirtini</h1>
            </div>

            <div className="flex flex-col gap-5">
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200 flex gap-2 flex-nowrap">
                    <span class="material-symbols-outlined">explore</span>
                    <p>Explore</p>
                </a>
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200 flex gap-2 flex-nowrap">
                    <p>Liked</p>
                </a>
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200"><p>Compose</p></a>
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200">Today's choice</a>
            </div>

            <div>
                <a href="#" className="text-gray-300 text-md hover:text-white transition-colors duration-200">Profile</a>
            </div>

        </sidebar>
    )
}

export default Sidebar;
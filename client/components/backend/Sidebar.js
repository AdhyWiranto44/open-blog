import Link from "next/link";


export default function Sidebar() {
    const menus = [
        {
            "mainMenu": "Admin",
            "menuList": [
                {
                    "title": "Dashboard",
                    "url": "/admin/dashboard",
                    "icon": "ti-dashboard"
                },
            ]
        },
        {
            "mainMenu": "Post",
            "menuList": [
                {
                    "title": "Tambah Post Baru",
                    "url": "/admin/posts/add",
                    "icon": "ti-plus"
                },
                {
                    "title": "Tampil Semua Post",
                    "url": "/admin/posts",
                    "icon": "ti-list"
                },
                {
                    "title": "Arsip Post",
                    "url": "/admin/posts/archive",
                    "icon": "ti-archive"
                },
            ]
        },
        {
            "mainMenu": "Settings",
            "menuList": [
                // {
                //     "title": "Ubah Password",
                //     "url": "/admin/update-password",
                //     "icon": "ti-pencil-alt"
                // },
                // {
                //     "title": "Reset Password",
                //     "url": "/admin/reset-password",
                //     "icon": "ti-key"
                // },
                {
                    "title": "Logout",
                    "url": "/",
                    "icon": "ti-arrow-left"
                },
            ]
        },
    ]
    
    return (
        <div className="sidebar overflow-auto">
            <div className="sidebar-header">
                <h4>
                <Link href="/">
                    <a className="text-light">Open Blog</a>
                </Link>
                </h4>
            </div>

            <div className="sidebar-menu">
                <ul className="sidebar-menu-container">
                    {menus.map((menu) => {
                        return (
                            <li className="sidebar-menu-section">
                                <h5>{menu.mainMenu}</h5>
                                <ul>
                                {menu.menuList.map((subMenu) => {
                                    return (
                                        <li>
                                            <span className={subMenu.icon}></span>
                                            <Link href={subMenu.url}>
                                                <a>{subMenu.title}</a>
                                            </Link>
                                        </li>
                                    );
                                })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
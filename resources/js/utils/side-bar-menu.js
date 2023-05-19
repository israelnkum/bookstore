export const SidebarMenus = [
    {
        title: 'HOME',
        link: '/',
        children: [],
        permissions: [],
        icon: 'home',
        key: 'home'
    },
    {
        title: 'Books',
        link: '#',
        children: [
            {
                permission: 'add-book',
                modal: true,
                title: 'Add Book',
                link: '/books/form',
                key: 'add-book'
            },
            {
                permission: 'view-book',
                modal: false,
                title: 'All Books',
                link: 'books',
                key: 'view-book'
            }
        ],
        permissions: ['add-book', 'view-book'],
        icon: 'books',
        key: 'books'
    }
]

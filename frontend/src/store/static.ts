import { MenuLink } from "@/types/menu";

const menuLinks: MenuLink[] = [
  {name: 'Авторизация', href: '/login', inMenu: false},
  {name: 'Создание объекта', href: '/objects/create', inMenu: true},
  {name: 'Реестр объектов', href: '/objects', inMenu: true},
  {name: 'Карточка объекта', href: '/objects/:id', inMenu: true},
  {name: 'Дашборд', href: '/agenda/:id/dashboard', inMenu: true},
  {name: 'Создание задачи к объекту', href: '/objects/:id/tasks/create', inMenu: true},
  {name: 'Создание повестки', href: '/agenda/:id', inMenu: true},
  {name: 'Профиль', href: '/profile/:login', inMenu: true},
]

export {
	menuLinks,
}
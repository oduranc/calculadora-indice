import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { NavLink } from "react-router-dom";

const token = localStorage.getItem("accessToken");
//TODO: Change fname to usertype
var userType = null;
var navigation = [];

if (token) {
  userType = JSON.parse(localStorage.getItem("user"))["role"];
  switch (userType) {
    case "Admin":
      navigation = [
        { name: "Estudiantes", href: "/admin/students" },
        { name: "Profesores", href: "/admin/teachers" },
        { name: "Administradores", href: "/admin/admins"},
        { name: "Asignaturas", href: "/admin/subjects" },
      ];
      break;
    case "Student":
      navigation = [
        { name: "Asignaturas", href: "/student/subjects" },
        { name: "Ranking", href: "/student/ranking" },
      ];
      break;
    case "Teacher":
      navigation = [
        { name: "Asignaturas", href: "/teacher/subjects" },
      ];
      break;
    default:
      break;
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MobileMenuBtn(open) {
  return (
    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:darker-brown focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  );
}

function ProfileMenu() {
  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="darker-brown flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src="https://icon-library.com/images/profile-png-icon/profile-png-icon-2.jpg"
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 nav ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href="/profile"
                className={classNames(
                  active ? "darker-brown" : "",
                  "block px-4 py-2 text-sm text-white"
                )}
              >
                Perfil
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                onClickCapture={logout}
                href="/"
                className={classNames(
                  active ? "darker-brown" : "",
                  "block px-4 py-2 text-sm text-white"
                )}
              >
                Cerrar Sesión
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                {token ? MobileMenuBtn(open) : null}
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="block">GPA Calculator</h1>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) => {
                          return classNames(
                            "px-3 py-2 rounded-md text-sm font-medium",
                            isActive
                              ? "darker-brown text-white"
                              : "text-gray-100 hover:opacity-50 hover:text-white"
                          );
                        }}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {token ? ProfileMenu() : null}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={({ isActive }) => {
                    return classNames(
                      "block px-3 py-2 rounded-md text-base font-medium",
                      isActive
                        ? "darker-brown text-white"
                        : "text-gray-100 hover:opacity-50 hover:text-white"
                    );
                  }}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

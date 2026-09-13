import { NavLink } from "react-router-dom";

const items = [
  {
    to: "/",
    label: "Home",
    end: true,
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10.5V20h4.5v-5.5h3V20H18v-9.5" />
      </svg>
    ),
  },
  {
    to: "/habits",
    label: "Habits",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="4" cy="6.5" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="4" cy="12" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="4" cy="17.5" r="1.4" fill="currentColor" stroke="none" />
        <path d="M9 6.5h11M9 12h11M9 17.5h11" />
      </svg>
    ),
  },
  {
    to: "/progress",
    label: "Progress",
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V11M10 20V5M16 20v-8M22 20H2" />
      </svg>
    ),
  },
];

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => (isActive ? "active" : "")}>
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

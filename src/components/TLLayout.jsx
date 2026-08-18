import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function TLLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="tl-layout-wrapper">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="tl-layout-main">
        <Navbar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        <Outlet />
      </main>
    </div>
  );
}

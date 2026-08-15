import { Outlet } from "react-router-dom";
import { ConfigProvider } from "antd";

export function RootLayout() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1ba672",
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
          borderRadius: 12,
        },
      }}
    >
      <div className="mobile-shell min-h-screen bg-page shadow-[0_0_40px_rgba(0,0,0,0.12)]">
        <Outlet />
      </div>
    </ConfigProvider>
  );
}

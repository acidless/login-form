import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {LoginPage} from "../pages/login";
import {ConfigProvider} from "antd";

const queryClient = new QueryClient();

function App() {


  return (
      <QueryClientProvider client={queryClient}>
          <ConfigProvider
              theme={{
                  token: {
                      fontFamily: 'SF Pro, system-ui, sans-serif',
                  },
              }}
          >
              <main>
                  <LoginPage />
              </main>
          </ConfigProvider>

      </QueryClientProvider>
  )
}

export default App

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {LoginPage} from "../pages/login";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <main>
              <LoginPage />
          </main>
      </QueryClientProvider>
  )
}

export default App

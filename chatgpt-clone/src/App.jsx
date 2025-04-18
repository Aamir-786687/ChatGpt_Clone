import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Layout>
                                    <Home />
                                     </Layout>
        }/>
      </Routes>
    </Router>
  )
}

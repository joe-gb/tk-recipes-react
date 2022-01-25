import React from "react";
import RecipeList from "./pages/RecipeList";
import { RecipeEdit, RecipeCreate } from "./pages/RecipeCreateEdit";
import RecipeView from "./pages/RecipeView";
import RecipeDelete from "./pages/RecipeDelete";
import Home from "./pages/Home";
import { ReactComponent as Logo } from "./travelperk-logo-light.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Title } from "./components/Text";
import { Container, Header, Nav, Navbar } from "./components/Layout";
import { Card } from "./components/Card";

function App() {
  return (
    <Router>
      <Header className="App-header">
        <nav>
          <Container>
            <Logo className="logo " />
            <Navbar>
              <Nav to="/">Home</Nav>
              <Nav to="/recipes">Recipes</Nav>
              <Nav to="/recipes/add">Submit a new recipe</Nav>
            </Navbar>
          </Container>
        </nav>
      </Header>
      <article>
        <Title>TK Recipes</Title>
        <Card>
          <Routes>
            <Route path="/recipes/add" element={<RecipeCreate />} />
            <Route path="/recipes/:id" element={<RecipeView />} />
            <Route path="/recipes/edit/:id" element={<RecipeEdit />} />
            <Route path="/recipes/delete/:id" element={<RecipeDelete />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Card>
      </article>
    </Router>
  );
}

export default App;

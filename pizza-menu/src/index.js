import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <h1>Hello React!</h1>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "40px", textTransform: "uppercase" };
  const style = {};
  return (
    <header className="header footer">
      <h1 style={style}>Fast REACT PIZZA CO.</h1>
    </header>
  );
}

const Menu = function () {
  const pizzas = pizzaData;
  // const pizzas = [];
  const numPizza = pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>
      {numPizza > 0 ? (
        <>
          <p>
            Authentic italic cuisine, 6 creative dishes to choose from .All from
            our stone oven,all organic,all delicious
          </p>
          <ul className="pizzas">
            {pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>we are working on our menu please comeback later</p>
      )}
      {/* /* <Pizza
        name="Pizza Spinacci"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoname="pizzas/spinaci.jpg"
        price={10}
      />
      <Pizza
        name="Pizza Funghi"
        ingredients="Tomato, mozarella, mushrooms, and onion"
        photoname="pizzas/funghi.jpg"
        price={20}
      /> */}
    </main>
  );
};

function Pizza({ pizzaObj }) {
  console.log(pizzaObj);
  // if (pizzaObj.soldOut) return null;
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img className="imge" src={pizzaObj.photoName} alt={pizzaObj.name} />
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

const Footer = () => {
  const hour = new Date().getHours();
  const openHours = 8;
  const closeHours = 23;
  const isopen = openHours <= hour && hour <= closeHours;
  // if (open) alert("We are currently open!");
  // else alert("Sorry we are closed");
  // console.log(open);
  // if (!isopen)
  return (
    <footer className="footer">
      {isopen ? (
        <Order closeHours={closeHours} openHours={openHours} />
      ) : (
        <p>
          were happy to welcome you between {openHours}:00 and {closeHours}
          :00.
        </p>
      )}
    </footer>
  );
};

function Order({ closeHours, openHours }) {
  return (
    <div className="order">
      <p>
        were happy to welcome you between {openHours}:00 and {closeHours}
        :00.
      </p>
      <button className="btn">order</button>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

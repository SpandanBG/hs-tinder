import { CardList } from "./features/card-list";
import "./styles.css";

const cardTitles = [
  { title: "hello" },
  { title: "world." },
  { title: "how" },
  { title: "are" },
  { title: "you?" },
];

export default function App() {
  return <CardList cards={cardTitles} />;
}

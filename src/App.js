import { CardList } from "./features/card-list";
import {VideoCard} from "./components/video"
import "./styles.css";

const cardTitles = [
  { title: "hello" },
  { title: "world." },
  { title: "how" },
  { title: "are" },
  { title: "you?" },
];

export default function App() {
  return <div>
    <VideoCard/>
    <CardList cards={cardTitles} />;
  </div> 
}

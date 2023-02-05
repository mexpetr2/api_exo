import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const ApiUrl = "https://parseapi.back4app.com/classes/KonexioStudent";
  const header = {
    headers: {
      "X-Parse-Application-Id": "tjuNVNNcLoRdi9trjBbqnPirqFKxugjwgTDDhrQP",
      "X-Parse-REST-API-Key": "GQhLehqMOEz16w4uUnZUVCM9ssl46odDLYO344as",
    },
  };
  const [studentsData, setStudentsData] = useState([]);
  const [maxage, setMaxage] = useState(0);
  const [minage, setMinage] = useState(0);

  useEffect(() => {
    axios
      .get(ApiUrl, header)
      .then((response) => {
        setStudentsData(response.data.results);
        setMaxage(Math.max(...studentsData.map((student) => student.age)));
        setMinage(Math.min(...studentsData.map((student) => student.age)));
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  console.log(maxage);

  const [range, setRange] = useState(maxage);
  console.log(range);
  const [language, setLanguage] = useState("");

  const handleRange = (e) => {
    setRange(e.target.value);
  };

  const handleSelect = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="App">
      <h1>List Students</h1>
      <div>
        <label htmlFor="age">Age</label>
        <h4>Current age seleted {range}</h4>
        <input
          value={range}
          onChange={handleRange}
          min={minage}
          max={maxage}
          name="age"
          type="range"
        ></input>

        <select onChange={handleSelect}>
          <option value="">Language</option>
          <option value="Javascript">Javascript</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="CMS">CMS</option>
          <option value="NodeJS">NodeJS</option>
        </select>
      </div>
      <div className="containerStudents">
        {studentsData
          .filter((student) => student.age <= range)
          .filter((student) =>
            language === "" ? student : student.language === language
          )
          .map((student) => (
            <Card key={student.objectId} student={student} />
          ))}
      </div>
    </div>
  );
}

export default App;

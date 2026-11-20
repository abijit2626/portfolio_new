import { Paper, Tape, Label } from "../components/Paper.jsx";
import { profile } from "../content.js";

// The About page lives inside the scrapbook (#/about), so the whole site stays on one index.html.
export default function About() {
  return (
    <div className="wrap about">
      <Paper torn className="month-hero">
        <Tape style={{ top: -8, left: "30%", transform: "rotate(-3deg)" }} />
        <p className="pixel">about me</p>
        <h1>abijit arun</h1>
        <p className="intro">{profile.intro}</p>
        <p className="hand">
          find me on <a href={profile.github}>github</a> · <a href="#/">back to the scrapbook →</a>
        </p>
      </Paper>

      <Label>what i want to learn</Label>
      <Paper className="todo">
        <ul className="about-list">
          <li>displays, sensors and motion, through dewy</li>
          <li>audio and wireless</li>
          <li>voice AI, with a small on-device model listening for a wake word</li>
          <li>designing a custom PCB, so the final build has no loose wires</li>
          <li>defensive security and CTFs, the thing i keep coming back to</li>
        </ul>
      </Paper>
    </div>
  );
}

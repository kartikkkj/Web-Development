import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
export default function Run(props) {
  const [out, setOut] = useState(false);
  const [codeOutput, setCodeOutput] = useState("");
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [response, setRespopnse] = useState(true);
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [executionTime, setExecutionTime] = useState("");
  useEffect(() => {
    if (props.editorRef.current) {
      setCode(props.editorRef.current.getValue());
    }
  });
  async function handleSubmit() {
    setRespopnse(false);
    if (props.editorRef.current) setCode(props.editorRef.current.getValue());
    const data = {
      lang: props.lang,
      code: code,
      input,
    };
    try {
      setStatus("Pending");
      setJobId("");
      setExecutionTime("");
      const output = await axios.post("http://localhost:5000/run", data);
      let intervalId;
      intervalId = setInterval(async () => {
        const { data } = await axios.get("http://localhost:5000/status", {
          params: { id: output.data.jobId },
        });
        setJobId(output.data.jobId);
        const { success, job, error } = data;
        if (success) {
          const { status, output: out, startedAt, completedAt } = job;
          setStatus(status);
          if (status === "Pending") return;
          const end = moment(completedAt);
          const start = moment(startedAt);
          const timeDiff = end.diff(start, "seconds", true) + "s";
          setExecutionTime(timeDiff);
          setCodeOutput(out);
          setRespopnse(true);
          clearInterval(intervalId);
        } else {
          setCodeOutput(error);
          setRespopnse(true);
          clearInterval(intervalId);
        }
      }, 500);
      setCodeOutput(output.data.output);
    } catch (err) {
      setStatus("Error");
      if (err.response.data.stderr) setCodeOutput(err.response.data.stderr);
      else setCodeOutput("Unable to Connect With Server");
    }
  }
  function closebtnHandle() {
    setOut(false);
    setCodeOutput("");
    setRespopnse(true);
    setStatus("");
    setExecutionTime("");
  }
  return (
    <div className="run-container">
      {out === false ? (
        <div></div>
      ) : (
        <div className="InOut">
          <div className="output-cont">
            <h3>Input</h3>
            <div
              className="output"
              contentEditable
              onKeyUp={(e) => {
                setInput(e.target.innerText);
              }}
            ></div>
          </div>
          <div className="output-cont">
            <h3>Output</h3>
            <div className="output">{codeOutput}</div>
          </div>
        </div>
      )}
      <div className="btn-wrapper">
        {out === false ? (
          <>
            <button className="btn copy-btn" onClick={() => setOut(true)}>
              Give Input
            </button>
            {status === "" ? (
              <p>{status}</p>
            ) : status === "Pending" ? (
              <p style={{ color: "orange", fontWeight: "bold" }}>{status}</p>
            ) : status === "Success" ? (
              <p style={{ color: "green", fontWeight: "bold" }}>{status}</p>
            ) : (
              <p style={{ color: "red", fontWeight: "bold" }}>{status}</p>
            )}
            {executionTime === "" ? (
              <p></p>
            ) : (
              <p style={{ fontWeight: "bold", color: "green" }}>
                {executionTime}
              </p>
            )}
            <button className="btn leave-btn" onClick={() => setOut(false)}>
              Close
            </button>
          </>
        ) : (
          <>
            {response ? (
              <button className="btn copy-btn" onClick={handleSubmit}>
                Compile and Run
              </button>
            ) : (
              <button
                className="btn copy-btn"
                style={{ backgroundColor: "wheat" }}
              >
                Compile and Run
              </button>
            )}
            {status === "" ? (
              <p>{status}</p>
            ) : status === "Pending" ? (
              <p style={{ color: "orange", fontWeight: "bold" }}>{status}</p>
            ) : status === "Success" ? (
              <p style={{ color: "green", fontWeight: "bold" }}>{status}</p>
            ) : (
              <p style={{ color: "red", fontWeight: "bold" }}>{status}</p>
            )}
            {executionTime === "" ? (
              <p></p>
            ) : (
              <p style={{ fontWeight: "bold", color: "green" }}>
                {executionTime}
              </p>
            )}
            <button className="btn leave-btn" onClick={closebtnHandle}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

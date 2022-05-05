import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/comment/comment";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/anyword-hint";
import "codemirror/addon/wrap/hardwrap";
import { connect } from "react-redux";
import Run from "./Run";
import ACTION from "../../Actions";
const mapStateToProps = (state) => {
  return {
    Mymode: state.mode,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    chooseLang: (val) => dispatch({ type: val }),
  };
};
function Editor(props) {
  const [curMode, setCurMode] = useState(props.Mymode);
  const editorRef = useRef(null);
  const [lang, setLang] = useState("cpp");
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("code"),
        {
          mode: curMode,
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          lineWrapping: true, 
          tabMode: "indent",
          styleActiveLine: true,
          foldGutter: true,
          dragDrop: true,
          lint: true,
          gutters: [
            "CodeMirror-lint-markers",
            "CodeMirror-linenumbers",
            "CodeMirror-foldgutter",
          ],
          extraKeys: { "Ctrl-Space": "autocomplete" },
        }
      );

      if (curMode === "text/x-c++src") {
        editorRef.current.setValue(`#include<bits/stdc++.h> 
using namespace std;                      
int main(){
  // Write Here

  return 0;
}`);
        setLang("cpp");
      } else if (curMode === "python") {
        editorRef.current.setValue(`# Write Here`);
        setLang("py");
      } else if (curMode === "text/x-java") {
        editorRef.current.setValue(`import java.util.*;
class HelloWorld {
  public static void main(String[] args) {
    // Write Here

  }
}`);
        setLang("java");
      } else if (curMode === "javascript") {
        editorRef.current.setValue(`// Write Here`);
        setLang("js");
      }

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        props.onCodeChange(code);
        if (origin !== "setValue") {
          props.socketRef.current.emit(ACTION.CODE_CHANGE, {
            roomId: props.roomId,
            code,
          });
        }
      });
    }
    init();
    setCurMode(props.Mymode);
  });

  useEffect(() => {
    if (props.socketRef.current) {
      props.socketRef.current.on(ACTION.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
        props.socketRef.current.on(ACTION.LANG, ({ val }) => {
          props.chooseLang(val);
        });
      });
      return () => {
        props.socketRef.current.off(ACTION.CODE_CHANGE);
        props.socketRef.current.off(ACTION.LANG);
      };
    }
  }, [props.socketRef.current]);

  return (
    <>
      <textarea id="code" className="textArea"></textarea>
      <div className="editor-wrapper">
        <Run editorRef = {editorRef} lang={lang} />
      </div>
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);

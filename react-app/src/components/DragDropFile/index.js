// drag drop file component
import React from "react";
import './DragDropFile.css'

function DragDropFile() {
    // drag state
  const [dragActive, setDragActive] = React.useState(false);

  // ref
const inputRef = React.useRef(null);

// triggers the input when the button is clicked
const onButtonClick = () => {
    inputRef.current.click();
  };

  // handle drag events
  const handleDrag = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
const handleDrop = function(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // at least one file has been dropped so do something
      // handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
const handleChange = function(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // at least one file has been selected so do something
      // handleFiles(e.target.files);

    //   Of course, this is just your front end code. Once the files get dropped, you will need to do something with them. You might want to use a HTTP client like axios or fetch to send the files back to your server and upload them somewhere, for example.

    //   And although this post was just focused on the drag and drop functionality, you probably also want to do some validation on your server to stop invalid or malicious files.


    }
  };

    return (
      <form id="form-file-upload">
        <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
        <label id="label-file-upload" htmlFor="input-file-upload">
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div>
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    );
  };

  export default DragDropFile

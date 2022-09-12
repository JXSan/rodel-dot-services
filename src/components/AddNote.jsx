import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createNote } from "../api/notes";

const AddNote = () => {
  const [note, setNote] = useState("");
  const { id } = useParams();

  const test_note = {
    id: id,
    createdBy: "Jonthan Sanchez",
    createdOn: "09/04/2022 9:12 AM PST",
    lastUpdatedBy: "",
    lastUpdatedOn: "",
    comment:
      "This is a test notes section. I am writing this to see what it would feel like to write a note.",
  };

  const handleSubmit = async (e) => {
    // Save this to the database, then set note to empty for the next note.
    const note = await createNote(test_note);
    if (note) {
      setNote("");
    }
  };

  return (
    <div className="w-full">
      <label
        for="my-modal-3"
        className="p-2 cursor-pointer flex items-center justify-center btn hover: glass border-none text-black rounded-lg drop-shadow-md bg-gray-100 w-full modal-button"
      >
        Add Note
      </label>
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2 hover:glass"
          >
            ✕
          </label>
          <h1 className="left-0 top-0 text-gray-500">Notes Section</h1>
          <textarea
            className="w-full textarea border my-2 border-gray-400 rounded-md drop-shadow-md"
            onChange={(e) => {
              setNote(e.target.value);
            }}
            value={note}
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <div className="w-full flex justify-end items-center">
            <label onClick={handleSubmit} for="my-modal-3" className="btn">
              Save
            </label>
            {/* <button
              for="my-modal-3"
              onClick={handleSubmit}
              className="p-2 btn cursor-pointer border-none rounded-lg drop-shadow-md bg-gray-400"
            >
              Save Note
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
